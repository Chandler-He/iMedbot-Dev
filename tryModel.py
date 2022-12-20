import numpy as np
from tensorflow.keras.models import load_model
import os
from utils import modelTraining
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV, StratifiedKFold, StratifiedShuffleSplit

filename = os.path.join("dataset/", "Book1.csv")
if filename[-3:] == "txt":
    predset, target, X_columns = modelTraining.loadandprocess(filename, predtype=1, scaled=False)
elif filename[-3:] == "csv":
    predset, target, X_columns = modelTraining.loadandprocess(filename, sep=',', predtype=1, scaled=False)
print(1111111111111111)
print(predset)
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

results, score_val, img_src = modelTraining.model_gsearch_val(predset, target, cur_params, 5, 123, "roc_auc")


model = load_model('user_training_model.h5')
res=model.predict_proba(predset)
print("res",res)


'''
model_15 = load_model('user_training_model.h5')
print(model_15)
input = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]  # why we need to use [[0,0,0,0,0]] not [0,0,0,0,0]
input = np.array(input)
print(input)
res = model_15.predict_proba(input)
print(res)
'''

