# iMedBot System Development
Copyright © 2023 Xia Jiang, University of Pittsburgh. All rights reserved.
## 1. About iMedBot:
iMedBot is a web application that we  developed  using the python Flask web framework and deployed on Amazon Web Services. It contains a frontend and a backend. The backend is supported by a python program we developed using the python Keras and scikit-learn packages, which can be used to learn deep feedforward neural network (DFNN) models

## 2. Tech Stack:
#### 2.1 Frontend:
JS, HTML, CSS
#### 2.2 Backend: 
Python, Flask
#### 2.3 Machine Learning: 
Python Machine Learning Packages, Tensorflow, Keras, NLTK, Scikit-learn
#### 2.4 Database: 
MongoDB

#### 2.5 Run Locally:
Clone the project
~~~bash
git clone https://github.com/ProjectW81XWH1910495/iMedbot-Dev.git
~~~
Install Dependencies, please be sure you have python v3.8.*
~~~bash
python.exe -m pip install --upgrade pip  
pip install -r .\requirements.txt   
~~~
Run project:
~~~bash
1. Run backend: python.exe .\application.py (windows)
2. python application.py (intel/AMD chip mac)
3. python application.py (linux)
~~~

2.5.1   
Note that tensorflow 2.5.0 is not compatible with python 3.9.5, so please use python 3.8.10 instead, then, tensorflow 2.5.0 will not be supported since september 2021, there is no release package currently, you need to copy the source code from github and install it manually, or copy the site-packages from previews programmer's computer. Please refer to 

## 3. Create Conda Environment:
3.1  
Inorder to run the backend, I highly recommend that use anaconda to create a virtual environment, then install all the dependencies in the virtual environment, then run the backend in the virtual environment.

3.2  
To create a virtual environment in anaconda:
~~~bash
conda create -n tf python=3.8.10
~~~
3.3   
To activate the virtual environment:
~~~bash
conda activate tf
~~~
3.4  
To deactivate the virtual environment:
~~~bash
conda deactivate
~~~

## 4. Cuda GPU version installation:
4.1  
~~~bash
Download cuda corresponding with tensorflow v2.5.0 from https://developer.nvidia.com/cuda-11.2.2-download-archive?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exelocal
~~~
#### Note that if cuda version is incorrect, the project will not run.

## 5. Error Tracking:
5.1  
If you did all the steps above, you still cannot run the project however, please carefully read the following steps:
~~~bash
1. Download the site-packages from https://drive.google.com/drive/folders/1XuYZEoiOI_4Z6o8IO6ovm5Z47F-KiOy_?usp=share_link, decompress it.
2. Copy the site-packages to the virtual environment's site-packages, for example, if you create a virtual environment named tf, then the site-packages is located at C:\Users\your_user_name\anaconda3\envs\tf\Lib\site-packages, copy the site-packages from the decompressed folder to the site-packages of the virtual environment.
3. Open powershell, enter the virtual environment, uninstall tensorflow by using pip uninstall tensorflow, then reinstall tensorflow by using pip install -r .\requirements.txt
4. Then run the backend by using python .\application.py, it should work now.
~~~

## 6. Structures and Functions of the program:
### 6.1 Main Functions
~~~bash
application.py; audio.py; chatbot.py; tryModel.py; trello_wrapper.py; js; training datasets; model5.h5; model10.h5, model15.h5
~~~
### 6.1.1 application.py
application.py is a web application file that contains functions and endpoints for a variety of tasks such as login authentication, creating users, training models, and sending emails. It uses the Flask framework to create routes, request and response cycles, and decorators to handle requests and interact with databases and file systems.
### 6.1.2 audio.py
The audio.py file enables speech recognition and text-to-speech capabilities by using the speech recognition and text-to-speech libraries to capture audio and convert it into text. It then utilizes conditionals and functions to detect speech patterns and print the text.
### 6.1.3 chatbot.py
chatbot.py is a file that sets up and trains a chatbot by importing libraries and dependencies, creating a ChatBot instance with custom settings, connecting it to a SQL database, setting the input type, output type, and two logical adapters to provide responses.
### 6.1.4 static/assets/input_model.js
The file static/assets/input_model.js creates a model to ask a series of questions to a user and receive responses, using an array of objects that defines the data structure and determines the questions asked.
### 6.1.5 static/assets/input_question.js
This file static/assets/input_question.js contains JavaScript code snippets that define objects with questions, instructions, patterns, and responses related to conversation bots, cancer staging, breast cancer diagnosis, and model training. The code is used to create a structure for a program to ask questions and interpret user responses, with each question having a set of possible responses associated with different outcomes.
### 6.1.6 static/assets/input_question10.js
This code file contains a snippet of Javascript code that provides instructions and questions related to predicting the probability of breast cancer recurrence. It contains tags with instructions, questions, and patterns and responses associated with the questions, which are used to calculate the probability of recurrence. The code works by prompting the user for answers to the questions and then using the answers to calculate the probability.
### 6.1.7 static/assets/input_question5.js
The code file static/assets/input_question5.js contains JavaScript objects that represent a conversation bot designed to ask questions related to breast cancer diagnosis. The code includes tags, instructions, next questions, patterns, and responses to interpret the user's input and provide the correct response. The code works by providing a set of questions to the user and then allowing them to answer with the corresponding values.
### 6.1.8 static/assets/predict.js
The predict.js file is a JavaScript file used to predict the recurrence probability of breast cancer. It contains a series of objects with the "tag", "instruction", "nextques", "patterns" and "responses" properties which map user responses to the patterns and determine the next question to ask. It works by asking the questions defined by the objects, then scanning for the pattern that matches the user's answer.
### 6.1.9 static/js/iMedbot.js
The static/js/iMedbot.js file contains code that sets up a session timeout warning, validates user input when resetting a password, checks for valid data when creating an account, and updates a user's information. Additionally, it enables the user to adjust parameters when training models, and to view ROC, SHAP, and patient explanation plots. It works by comparing user inputs to predetermined criteria and displaying a validation message if an input does not match, as well as by generating HTML buttons based on a provided list of strings and creating an HTML element with the corresponding item value from the array.
### 6.1.10 testSHAP.py
The file testSHAP.py imports necessary Python libraries and dependencies to perform a SHAP (SHapley Additive exPlanations) analysis, which is then used to train an SVM model and generate a heatmap of the SHAP values. This code forms part of a pipeline to visualize the outputs of machine learning models.
### 6.1.11 trello_wrapper.py
The file trello_wrapper.py contains a class which wraps around the Trello API to handle authentication and make API calls, and imports the Requests library to interact with the API. It has methods to get boards, lists, labels, and create cards.
### 6.1.12 tryModel.py
tryModel.py is a file that handles model training and validation, importing necessary libraries, classes, and functions from the sklearn library. It also performs input/output operations, reads and processes datasets, and runs predictions, all within the context of a machine learning workflow.
### 6.1.13 trySpeak.py
The file trySpeak.py is a standalone Python script that contains application code for a text-to-speech program. It uses the pyttsx3 library to instantiate a text-to-speech engine instance, which is then used to convert text to audio. The script also sets up a text-to-speech engine, passes in a command for it to read, and waits for a response.
### 6.1.14 utils/generateTableHtml.js
The file utils/generateTableHtml.js generates a table HTML from a dataset in the form of a CSV string by slicing the string into headers and rows, mapping the rows into objects with properties derived from the headers, and looping through the array of objects to generate the HTML.
### 6.1.15 utils/modelTraining.py
utils/modelTraining.py is a code file which provides functions for loading and processing data, creating a model, validating a model, and conducting grid search with cross validation for model parameters. The file imports libraries and modules for preprocessing, model training, and model evaluation, and sets up the environment for training a model in the application.
### 6.2 
6.2.1  
Get model example:
~~~bash
def get_model_inputdata():
    # only upload 15 year best model
    input = request.args.get('msg')
    input = input.lstrip("[")
    input = input.lstrip("]")
    input = input.split(',')
    input = list(map(int, input))
    # due to different discrete to digital map,
    # transformation need according .txt in ../docs/informationprovidedfordevelopment/
~~~

6.2.2
Human interactive function example:
~~~bash
chatbot = ChatBot(
    # we create a ChatBot object called Breast Cancer ImedBot
    'Breast Cancer ImedBot',
    #Storage Adapters allows you to connect to a particular storage unit or network
    #Conceptually, the wal-index file is a shared memory to store log as the backup of real database,it will not cause
    # any problems with sqlite database
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    input_adapter="chatterbot.input.VariableInputTypeAdapter",
    output_adapter="chatterbot.output.OutputAdapter",
    #storage_adapter='chatterbot.storage.MongoDatabaseAdapter',
    #You can also position the logical adapter with a chatbot object.
    # As the name implies, Logical Adapter regulates the logic behind the chatterbot, i.e.,
    # it picks responses for any input provided to it. This parameter contains a list of logical operators.
    # Chatterbot allows us to use a number of logical Adapters. When more than one logical adapter is put to use,
    # the chatbot will calculate the confidence level, and the response with the highest calculated confidence will be returned as output.
    # Here we have used two logical adapters: BestMatch and TimeLogicAdapter
    logic_adapters=[
        # 'chatterbot.logic.MathematicalEvaluation',#the robot can answer 4+6 ?
        # 'chatterbot.logic.TimeLogicAdapter',#the robot can answer current time
        'chatterbot.logic.BestMatch',
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'threshold': 0.97,
            'default_response': 'I am sorry, but I do not understand. I am still learning.',
            'maximum_similarity_threshold': 0.97
        }
    ],
    database_uri='sqlite:///database.sqlite3'
    # database_uri='mongodb://localhost:27017/chatterbot-database'
)
~~~
## 7. References:
~~~bash
1. https://github.com/ProjectW81XWH1910495/iMedbot-Dev/tree/main/docs
2. https://github.com/tensorflow/tensorflow/tree/r2.5
3. https://www.tensorflow.org/install/pip#macos
4. https://github.com/tensorflow/tensorflow/issues/25597
~~~
