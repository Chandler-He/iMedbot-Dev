import os
import shutil
import string
import webbrowser

import numpy as np
import pandas

#from chatbot import chatbot
from flask import Flask, render_template, request, after_this_request,session, send_file
#from flask_bootstrap import Bootstrap
import pyttsx3 as tts
import json
import datetime
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename, redirect
from utils import modelTraining
import shap
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV, StratifiedKFold, StratifiedShuffleSplit
import matplotlib.pyplot as plt
import joblib
import time
import pymongo
from datetime import datetime
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
import random
from trello_wrapper import *



application = Flask(__name__)
application.static_folder = 'static'
application.secret_key = 'BAD_SECRET_KEY'

mail = Mail(application) # instantiate the mail class

# configuration of mail
application.config['MAIL_SERVER'] = 'smtp.gmail.com'
application.config['MAIL_PORT'] = 465
# application.config['MAIL_USERNAME'] = 'imedbot.odpac@gmail.com'
# application.config['MAIL_PASSWORD'] = 'sbavpcrkkacwvyjr'
application.config['MAIL_USERNAME'] = 'xiajiangw81x@gmail.com'
application.config['MAIL_PASSWORD'] = 'iervpcfsqhydzhnk'
application.config['MAIL_USE_TLS'] = False
application.config['TESTING'] = False
application.config['MAIL_USE_SSL'] = True
application.config['MAIL_SUPPRESS_SEND'] = False
application.config['MAIL_DEBUG'] = True
mail = Mail(application)

#bootstrap = Bootstrap(application)
class_button_json = json.loads(open('training_data/classes_button.json').read())
list_of_classes = class_button_json['classes_button']

'''
connect to database
'''
client = pymongo.MongoClient("mongodb+srv://XiaJiang:12345aBc@cluster0.pm6gt6w.mongodb.net/?retryWrites=true&w=majority")
db = client.test

#name of database
imedbot = client["imedbot"]
#name of collection
survey = imedbot["survey"]


model_15 = load_model('model15.h5')
model_10 = load_model('model10.h5')
model_5 = load_model('model5.h5')

'''
settings for trello board
'''
#trello_api_key="47bb67d57304bdc2c972fcf200e528b1"
#trello_token="ATTA6452d8f257184fffa983050afc9d0369598929be7d9edcf66e1eab10783ea519133BBD92"
trello_api_key="4798d909048c0838ed33d43944c6be5c"
trello_token="ATTA9240ff821b7c8af2ef43de23ef11a7695702f708e5726dbf50b1765956acde3909E08759"
trello_board_url="https://trello.com/b/8Rr6Br2i/imedbot"
trello = trello_wrapper(trello_api_key, trello_token)
board = trello.get_board(trello_board_url)
board_list =trello.get_single_list(board, "Reported")
board_label = trello.get_single_board_labels(board, "")
label_list = []
label_list.append(board_label["id"])

'''
new_card = trello.create_card(board_list, label_list, "","test for api")
'''
@application.before_request
def make_session_permanent():
    session.permanent=True
    application.permanent_session_lifetime = timedelta(minutes=10)

@application.route("/")
def index():

    return render_template("index.html")


@application.route("/get")
def get_bot_response():
    # speaker = tts.init()
    # speaker.say("hello")
    result = {}
    button_group = ""
    instruction = ""
    usertext = request.args.get('msg')
    #response = str(chatbot.get_response(usertext))
    if "can you do" in usertext:
        response = "I can either predict breast cancer metastasis for your patient based on our deep learning models trained using one existing dataset, or I can train a model for you if you can provide your own dataset, so how do you want to proceed? Please enter 1 for the first choice, or 2 for the second choice"
    result["response"] = response
    for item in list_of_classes:
        print(item["responses"])
        if response in item["responses"]:
            button_group = item["patterns"]
            instruction = item["instruction"]
    result["button_group"] = button_group
    result["instruction"] = instruction
    return result


@application.route("/getLoad")
def get_session_username():
    print(session)
    if "username" not in session.keys():
        return {"status": "fail"}
    if session["username"] is not None:
        if "firstname" in session:
            return {"status":"success","username":session["firstname"]}
        else:
            return {"status": "success", "username": session["username"]}
    else:
        return {"status":"fail"}



# def speak(response):
#     speaker = tts.init()
#     speaker.setProperty('rate', 150)
#     print(response)
#     speaker.say(response)
#     speaker.startLoop(False)
#     speaker.runAndWait()
#     if speaker._inLoop:
#         speaker.endLoop()
#     print("speak")
# feature_array = ["DCIS_level", "size", "grade","PR_percent","invasive_tumor_Location","distant_recurrence\r"]
@application.route("/getInput")
def get_model_inputdata():
    # only upload 15 year best model
    input = request.args.get('msg')
    input = input.lstrip("[")
    input = input.lstrip("]")
    input = input.split(',')
    input = list(map(int, input))
    # due to different discrete to digital map,
    # transformation need according .txt in ../docs/informationprovidedfordevelopment/

    if input[0] == 15:
        race=input[1]
        alcohol=input[2]
        age=input[3]
        menopause=input[4]
        er=input[5]
        erp=input[6]
        ttnm=input[7]
        ntnm=input[8]
        stage=input[9]
        lymph=input[10]
        histology=input[11]
        size=input[12]
        grade=input[13]
        histology2=input[14]
        loaction=input[15]
        excision=input[16]
        margins=input[17]
        res = model_15.predict(np.array([[loaction,er,erp,alcohol,histology,size,age,ttnm,lymph,menopause,margins,grade,stage,histology2,race,ntnm,excision]]))
    elif input[0] == 10:
        ethnicity = input[1]
        smoking = input[2]
        alcohol = input[3]
        family = input[4]
        age = input[5]
        tneg = input[6]
        er = input[7]
        erp = input[8]
        pr = input[9]
        prp = input[10]
        her2 = input[11]
        ntnm = input[12]
        stage = input[13]
        lymph = input[14]
        histology = input[15]
        grade = input[16]
        dcis = input[17]
        margins=input[18]
        res = model_10.predict(np.array([[lymph,er,prp,smoking,erp,family,alcohol,histology,age,dcis,tneg,margins,grade,stage,her2,ethnicity,ntnm,pr]]))
    elif input[0] == 5:
        race = input[1]
        smoking = input[2]
        family = input[3]
        age = input[4]
        tneg = input[5]
        er = input[6]
        erp = input[7]
        pr = input[8]
        prp = input[9]
        p53 = input[10]
        her2 = input[11]
        ttnm = input[12]
        ntnm = input[13]
        stage = input[14]
        lymph = input[15]
        histology = input[16]
        size = input[17]
        location = input[18]
        dcis =input[19]
        margins=input[20]
        res = model_5.predict(np.array([[race,smoking,family,age,tneg,er,erp,pr,prp,p53,her2,ttnm,ntnm,stage,lymph,histology,size,location,dcis,margins]]))
    else:
        res = "Sorry we only have 15 year model so far"
    return str(res)


@application.route("/getTestPatient")
def get_test_patient_list():
    data = request.args.get('dataset_name')
    print(data)
    dataset_name_str = json.loads(data)
    filename = os.path.join("dataset/", dataset_name_str)
    print(filename[-3:])
    if filename[-3:]=="txt":
        with open(filename) as f:
            contents = f.readlines()

        for i in range(len(contents)):
            contents[i] = contents[i].split()
        labellist = contents[0]
        res = {}

        for i in range(len(labellist)):
            res[labellist[i]] = []
            for j in range(1, len(contents)):

                if len(contents[j])==len(labellist) and contents[j][i] not in res[labellist[i]]:
                    res[labellist[i]].append(contents[j][i])
        print("res is ",res)
    else:
        contents=pandas.read_csv(filename)
        print("contents",contents)
        labellist=contents.columns.values.tolist()
        print(labellist)
        contents=contents.values.tolist()
        res={}
        print(len(labellist), len(contents))
        for i in range(len(labellist)):
            res[labellist[i]] = []
            for j in range(1, len(contents)):
                if contents[j][i] not in res[labellist[i]]:
                    res[labellist[i]].append(contents[j][i])
        print("res is ",res)
    table_result=[]
    for key,value in res.items():
        value.sort()
        table_result.append(value)
    return {"labellist": labellist, "tableresult": table_result}


@application.route("/logout", methods=['POST','GET'])
def logout():
    if request.method == 'POST':

        print("session",session)
        username=session["username"]
        if "firstname" in session:
            name=session["firstname"]
        session["username"]=None
        if "firstname" in session:
            session["firstname"] = None
        if "firstname" in session:
            return {"status":"success","username":username,"name":name}
        else:
            return {"status": "success", "username": username}


@application.route("/resetPassword", methods=['POST','GET'])
def resetpassword():
    if request.method == 'POST':
        username=request.form.get('username')
        password = request.form.get('password')
        verification_ques = request.form.get('verification_ques')
        answer = request.form.get('answer')
        code = request.form.get('code')
        print(answer,code)

        user = imedbot["user"]
        verification=imedbot["verification"]
        if answer is not None:
            finding_result = user.find_one({"username": username,"verification question":verification_ques,"answer":answer})

            if finding_result is None:
                return {"status": "fail", "username": username, "fail type": "answer not correct"}
            else:
                hashed_password = generate_password_hash(password)
                myquery = {"username": username}
                newvalues = {"$set": {"password": hashed_password}}

                user.update_one(myquery, newvalues)
                return {"status": "success", "username": username}
        if code is not None:
            finding_code = verification.find_one({"username": username})
            if finding_code is None:
                return {"status": "no user", "username": username}
            if finding_code["code"] == code:
                hashed_password = generate_password_hash(password)
                myquery = {"username": username}
                newvalues = {"$set": {"password": hashed_password}}

                user.update_one(myquery, newvalues)
                return {"status": "success", "username": username}
            else:
                return {"status": "wrong code", "username": username}

    if request.method == 'GET':
        username = request.args.get('username')
        user = imedbot["user"]
        finding_result = user.find_one({"username": username})
        if finding_result is None:
            return {"status":"fail","username":username,"fail type":"no username"}
        else:
            if "verification question" not in finding_result.keys():
                return {"status": "success", "username": username,"verification question":"none"}
            else:
                return {"status": "success", "username": username,"verification question":finding_result["verification question"]}

@application.route("/login", methods=['POST','GET'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        print("session",session)
        user = imedbot["user"]
        finding_result=user.find_one({"username": username})
        if finding_result is None:
            return {"status":"fail","username":username,"fail type":"no username"}
        if check_password_hash(finding_result["password"],password):
            session["username"]=username
            if "first name" in finding_result.keys():
                session["firstname"]=finding_result["first name"]
                print(session)
                if "verification question" in finding_result.keys():
                    return {"status":"success","username":username,"name":finding_result["first name"],"question":finding_result["verification question"]}
                else:
                    return {"status":"success","username":username,"name":finding_result["first name"]}
            else:
                print(session)
                if "verification question" in finding_result.keys():
                    return {"status":"success","username":username,"question":finding_result["verification question"]}
                else:
                    return {"status": "success", "username": username}
        else:
            return {"status":"fail","username":username,"fail type":"wrong password"}


@application.route("/updateinfo", methods=['POST','GET'])
def update_information():
    if request.method == 'POST':
        username = request.form.get('username')
        question = request.form.get('question')
        answer = request.form.get('answer')
        first_name = request.form.get('fname')
        last_name = request.form.get('lname')
        original_username = request.form.get('original')
        user = imedbot["user"]
        finding_result = user.find_one({"username": username})
        print(finding_result)
        if finding_result is not None and original_username!=username:
            return {"status": "fail", "username": username,"first name":first_name}

        myquery = {"username": original_username}
        newvalues = {"$set": {"username":username,"first name":first_name,"last name":last_name,"verification question":question,"answer":answer}}

        user.update_one(myquery, newvalues)
        return {"status":"success","username":username,"first name":first_name}




@application.route("/signup", methods=['POST','GET'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        question = request.form.get('question')
        answer = request.form.get('answer')
        first_name = request.form.get('fname')
        last_name = request.form.get('lname')
        hashed_password = generate_password_hash(password)
        print(username, hashed_password)
        user = imedbot["user"]
        finding_result=user.find_one({"username": username})
        print(finding_result)
        if finding_result is not None:
            return {"status":"fail","username":username}
        else:
            return {"status":"success","username":username,"password":password,"question":question,"answer":answer,"fname":first_name,"lname":last_name}

@application.route("/getEmailVerification",methods=['GET'])
def send_email():
    receiver=request.args.get('username')
    msg = Message('Verification code from iMedBot', sender='imedbot.odpac@gmail.com', recipients=[receiver])
    pin=''.join(random.choice(string.digits) for x in range(6))
    msg.body = "This is your 6-digit verification code: "+pin
    try:
        mail.send(msg)
    except Exception as e:
        return "Fail"
    else:
        now = datetime.now()
        code_dict = {"time": now, "username": receiver, "code": pin}
        verification=imedbot['verification']
        myquery = {"username": receiver}
        x = verification.delete_many(myquery)
        verification.insert_one(code_dict)
    return "Sent"

@application.route("/verifyCode",methods=['POST'])
def verify_code():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        question = request.form.get('question')
        answer = request.form.get('answer')
        code = request.form.get('code')
        fname = request.form.get('fname')
        lname = request.form.get('lname')
        hashed_password = generate_password_hash(password)
        print(username, hashed_password,question,answer,code)
        user = imedbot["user"]
        verification = imedbot["verification"]
        finding_result = user.find_one({"username": username})
        print(353,finding_result)
        if finding_result is not None:
            return {"status": "fail", "username": username}
        else:
            finding_code=verification.find_one({"username": username})
            print(358, finding_code)
            if finding_code is None:
                return {"status": "no user", "username": username}
            if finding_code["code"]==code:
                user_dict = {"username": username, "password": hashed_password, "verification question": question,
                             "answer": answer,"first name":fname,"last name":lname}
                user.insert_one(user_dict)
                return {"status": "success", "username": username}
            else:
                return {"status": "codeerror", "username": username}

@application.route("/errorreport", methods=['POST','GET'])
def get_user_error():
    if request.method == 'POST':
        error = request.form.get('error')
        location = request.form.get('location')

        if error != "":
            if "firstname" in session and session["firstname"] is not None:
                print(session["firstname"])
                name=" reported by "+session["firstname"]
                error = "User: " + session["firstname"] + "\n" + "Time: " + str(
                    datetime.now()) + "\n" + "Error module: " + location + "\n" + "Error content: " + error
            else:
                name=""
                error = "Time: " + str(
                    datetime.now()) + "\n" + "Error module: " + location + "\n" + "Error content: " + error
            print(error)
            new_card = trello.create_card(board_list, label_list, "Error"+name+" at "+str(datetime.now()), error)

    return "success"
@application.route("/submitsurvey", methods=['POST','GET'])
def get_user_survey():
    if request.method == 'POST':
        star = request.form.get('star')
        text = request.form.get('text')

        print(star, text)
        now = datetime.now()
        print("Current Time =", now)
        survey_dict={"time":now,"username":session["username"],"star":star,"suggestion":text}
        print(survey_dict)
        survey.insert_one(survey_dict)


    return "success"

@application.route("/checkimg", methods=['POST','GET'])
def check_img_src():
    if request.method == 'POST':

        img_src = request.form.get('img')
        t1=time.time()
        while os.path.exists(img_src) is not True:
            t2=time.time()
            time_diff=t2-t1
            print()
            if time_diff>45:
                break
            else:
                continue

    return "success"

@application.route("/endtask", methods=['POST','GET'])
def delete_temporary_resource():
    if request.method == 'POST':
        folder = 'static/img/roc'
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))
        folder = 'static/img/shap'
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

    return "success"

@application.route("/patientform", methods=['GET', 'POST'])
def get_model_patientform():
    if request.method == "POST":

        try:
            dataset_name = request.form.get('dataset_name')
            dpi = int(request.form.get('dpi'))
            print("dataset_name ", dataset_name)
            dataset_name_str = json.loads(dataset_name)
            print(dataset_name_str)
            filename = os.path.join("dataset/", dataset_name_str)
            predset, target, X_columns = modelTraining.loadandprocess(filename, predtype=1, scaled=False)
            print("232", X_columns)
            print("233", predset[0])
            print("234", target[0])
            # ['race', 'ethnicity', 'smoking', 'alcohol_useage', 'family_history', 'age_at_diagnosis', 'menopause_status',
            #  'side', 'TNEG', 'ER', 'ER_percent', 'PR', 'PR_percent',
            #  'P53', 'HER2', 't_tnm_stage', 'n_tnm_stage', 'stage', 'lymph_node_removed', 'lymph_node_positive',
            #  'lymph_node_status', 'Histology', 'size', 'grade', 'invasive', 'hi
            #  stology2', 'invasive_tumor_Location', 'DCIS_level', 're_excision', 'surgical_margins', 'MRIs_60_surgery']
            strat_shuf = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=123)
            #for CV_index, val_index in strat_shuf.split(predset, target):
            #    X_CV, X_val = predset[CV_index], predset[val_index]
               #Y_CV, Y_val = target[CV_index], target[val_index]

            category_list = []
            patient_dic = request.form.get('patient_dic')
            patient_input_list = json.loads(patient_dic)
            shap_check = patient_input_list[-1]["value"]
            print(557, shap_check)
            patient_input_list = patient_input_list[:-1]
            print(250,patient_input_list)

            for item in patient_input_list:
                category_list.append(int(item['value']))
            print("253", np.array([category_list]))
            # [[2 0 1 1 2 1 1 0 0 1 1 1 1 1 0 1 1 2 1 1 1 1 2 1 1 0 2 3 1 1 1]]
            user_training_model = load_model('user_training_model.h5')
            timestr = time.strftime("%Y%m%d-%H%M%S")
            img_src = 'static/img/shap/shap' + timestr + '.png'
            if shap_check != "0":
                @after_this_request
                def plot_shap(response):
                    @response.call_on_close
                    def process_after_request():
                        print("long_running_task ", img_src)

                        def f(X):
                            # return best_model.predict(X).flatten()
                            # print("++++++++++++++++++++++++")
                            result = []
                            for item in X:
                                prob = user_training_model.predict_proba(item.reshape(1, len(predset[0])))
                                # print(prob)
                                # print(prob[0][0])
                                result.append(prob[0][0])
                            print(np.array(result))
                            # the reason why we have 5 results is because we use kmeans to shrink the x_cv(background dataset) dataset to only 5 samples
                            # [0.4565038  0.3262849  0.3953898  0.23958007 0.3785722]

                            print(type(result))
                            return np.array(result)

                        # shap.kmeans(data, K) to summarize the background as K samples, in our case it transfer
                        for CV_index, val_index in strat_shuf.split(predset, target):
                            X_CV, X_val = predset[CV_index], predset[val_index]
                        X_train_summary = shap.kmeans(X_CV, 1)
                        print(X_train_summary)
                        # < shap.utils._legacy.DenseData object at 0x0000024682E412B0 >
                        print("111111111111111111111111111111111111111")

                        print("222222222222222222222222222222222222222")

                        print("333333333333333333333333333333333333333")

                        plt.clf()
                        # shap.waterfall_plot(shap.Explanation(values=shap_values, base_values=explainer.expected_value, data=np.array([category_list]),feature_names=X_columns))
                        if shap_check == "1":
                            explainer = shap.KernelExplainer(f, X_train_summary)
                            shap_values = explainer.shap_values(np.array([category_list]))
                            shap.waterfall_plot(
                                shap.Explanation(values=shap_values[0], base_values=explainer.expected_value,
                                                 data=np.array([category_list])[0], feature_names=X_columns))
                            plt.title("Waterfall Plot", fontsize=30)

                        if shap_check == "2":


                            explainer = shap.Explainer(user_training_model, X_CV[0:100],feature_names=X_columns)
                            shap_values = explainer(X_CV[0:100])
                            shap.plots.beeswarm(shap_values,color_bar=False,show=False)
                            plt.colorbar()
                            plt.title("Beeswarm Plot", fontsize=30)
                        if shap_check == "3":
                            explainer = shap.Explainer(user_training_model, X_CV[0:100], feature_names=X_columns)
                            shap_values = explainer(X_CV[0:100])
                            shap.plots.heatmap(shap_values,show=False)

                            plt.title("Heatmap Plot",fontsize = 30)


                        if shap_check == "6":
                            explainer = shap.KernelExplainer(f, X_train_summary)
                            shap_values = explainer.shap_values(np.array([category_list]))
                            shap.plots.decision(shap_values=shap_values,base_value=explainer.expected_value,feature_names=X_columns)
                            plt.title("Decision Plot", fontsize=30)
                        if shap_check == "8":
                            explainer = shap.KernelExplainer(f, X_train_summary)
                            shap_values = explainer.shap_values(np.array([category_list]))
                            shap.plots.bar(shap.Explanation(values=shap_values[0], base_values=explainer.expected_value,
                                                            data=np.array([category_list])[0], feature_names=X_columns))

                            plt.title("Bar Plot", fontsize=30)
                        if os.path.exists(img_src):
                            os.remove(img_src)
                        if os.path.exists(img_src):
                            print("png exist")
                        else:
                            print("png does not exist")
                        print(img_src)
                        if shap_check != "3":
                            plt.savefig(img_src ,bbox_inches='tight',pad_inches = 0.5, dpi = dpi)
                        else:
                            print("44444444444444444444444444444")
                            plt.gcf().axes[-1].set_aspect('auto')
                            '''
                            plt.tight_layout()
                            '''
                            plt.gcf().axes[-1].set_box_aspect(70)
                            plt.savefig(img_src,bbox_inches='tight',pad_inches = 0.5, dpi = dpi)


                        plt.clf()
                    return response


            res = user_training_model.predict_proba(np.array([category_list]))
            res = str(res).replace('[', '').replace(']', '')
            print("res is",res)

        except Exception as e:
            print(e)
            res="error"
            img_src=""

    return {"proba":res,"img":img_src,"shap":shap_check}


@application.route("/Examdataset", methods=['GET', 'POST'])
def get_model_Examdataset():
    if request.method == "POST":
        datasetname = request.form.get('name')
        dpi = request.form.get('dpi')
        print("data set name is ", datasetname)
    try:
        validation_auc,img_src = train_mode(datasetname,dpi)
        return {"auc":str(validation_auc),"src":str(img_src)}
    except Exception as e:
        print(e)
        return {"auc":"error","src":str(e)}


@application.route("/dataset", methods=['GET', 'POST'])
def get_model_dataset():
    if request.method == "POST":
        dataset = request.form.get('dataset')
        datasetname = request.form.get('name')
        dpi = request.form.get('dpi')
    try:
        upload_path = "dataset/" + str(datasetname)
        dataset = dataset.split('\n')
        with open(upload_path, 'wb') as file:
            print("hello")
            for l in dataset:
                file.write(l.strip().encode("utf-8"))
                file.write('\n'.encode("utf-8"))
        validation_auc,img_src = train_mode(datasetname,dpi)
        return {"auc":str(validation_auc),"src":str(img_src)}
    except Exception as e:
        print(e)
        return {"auc":"error","src":str(e)}

@application.route("/parameterExam", methods=['GET', 'POST'])
def get_model_parameter_exam():
    if request.method == "POST":
        datasetname = request.form.get('datasetname')
        learningrate = request.form.get('learningrate')
        batchsize = request.form.get('batchsize')
        epochs = request.form.get('epochs')
        decay = request.form.get('decay')
        dropoutrate = request.form.get('dropoutrate')
        momentum=request.form.get('momentum')
        l1 = request.form.get('l1')
        l2 = request.form.get('l2')
        dpi = request.form.get('dpi')
    try:
        print(340,datasetname)
        validation_auc,img_src = train_mode_parameter(datasetname, learningrate, batchsize, epochs, decay, dropoutrate,momentum,l1,l2,dpi)
        return {"auc":str(validation_auc),"src":str(img_src)}
    except Exception as e:
        print(e)
        return {"auc":"error","src":str(e)}


@application.route("/parameter", methods=['GET', 'POST'])
def get_model_parameter():
    if request.method == "POST":
        datasetname = request.form.get('datasetname')
        learningrate = request.form.get('learningrate')
        batchsize = request.form.get('batchsize')
        epochs = request.form.get('epochs')
        decay = request.form.get('decay')
        dropoutrate = request.form.get('dropoutrate')
        dataset = request.form.get('dataset')
        momentum = request.form.get('momentum')
        l1 = request.form.get('l1')
        l2 = request.form.get('l2')
        dpi = request.form.get('dpi')
    try:
        upload_path = "dataset/" + str(datasetname)
        dataset = dataset.split('\n')
        with open(upload_path, 'wb') as file:
            for l in dataset:
                file.write(l.strip().encode("utf-8"))
                file.write('\n'.encode("utf-8"))

        validation_auc,img_src = train_mode_parameter(datasetname, learningrate, batchsize, epochs, decay, dropoutrate,momentum,l1,l2,dpi)
        return {"auc":str(validation_auc),"src":str(img_src)}
    except Exception as e:
        print(e)
        return {"auc":"error","src":str(e)}

@application.route('/staticpdf')
def show_static_pdf():
    with open('./static/pdf/file.pdf', 'rb') as static_file:
        return send_file(static_file, attachment_filename='file.pdf')

def train_mode_parameter(datasetname, learningrate, batchsize, epochs, decay, dropoutrate,momentum,l1,l2,dpi):
    seed = 123
    nsplits = 5
    scores = "roc_auc"
    filename = os.path.join("dataset/", datasetname)
    if datasetname[-3:] == "txt":
        predset, target, X_columns = modelTraining.loadandprocess(filename, predtype=1, scaled=False)
    elif datasetname[-3:] == "csv":
        predset, target, X_columns = modelTraining.loadandprocess(filename, sep=',', predtype=1, scaled=False)
    cur_params = {
        'mstruct': [(50, 1)],
        'idim': [len(predset[0])],
        'drate': [float(dropoutrate)],
        'kinit': ['glorot_normal'],
        'iacti': ['relu'],
        'hacti': ['relu'],
        'oacti': ['sigmoid'],
        'opti': ['Adagrad'],
        'lrate': [float(learningrate)],
        'momen': [float(momentum)],
        'dec': [float(decay)],
        'ls': ['binary_crossentropy'],
        'batch_size': [int(batchsize)],
        'epochs': [int(epochs)],
        'L1': [float(l1)],
        'L2': [float(l2)],
        'ltype': [3]
    }
    results, score_val,img_src = modelTraining.model_gsearch_val(predset, target, cur_params, nsplits, seed, scores,dpi)
    return score_val,img_src


def train_mode(datasetname,dpi):
    seed = 123
    nsplits = 5
    scores = "roc_auc"
    filename = os.path.join("dataset/", datasetname)
    if datasetname[-3:] == "txt":
        predset, target, X_columns = modelTraining.loadandprocess(filename, predtype=1, scaled=False)
    elif datasetname[-3:] == "csv":
        predset, target, X_columns = modelTraining.loadandprocess(filename, sep=',', predtype=1, scaled=False)
    print(target)
    cur_params = {
        'mstruct': [(50, 1)],
        'idim': [len(predset[0])],
        'drate': [0.2],
        'kinit': ['glorot_normal'],
        'iacti': ['relu'],
        'hacti': ['relu'],
        'oacti': ['sigmoid'],
        'opti': ['Adagrad'],
        'lrate': [0.01],
        'momen': [0.4],
        'dec': [0.0005],
        'ls': ['binary_crossentropy'],
        'batch_size': [40],
        'epochs': [85],
        'L1': [0.005],
        'L2': [0.005],
        'ltype': [3]
    }
    results, score_val,img_src = modelTraining.model_gsearch_val(predset, target, cur_params, nsplits, seed, scores,dpi)
    return score_val,img_src


if __name__ == "__main__":
    application.run(debug=True)


