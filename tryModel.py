import numpy as np
from tensorflow.keras.models import load_model

model_15 = load_model('user_training_model.h5')
print(model_15)
input = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]  # why we need to use [[0,0,0,0,0]] not [0,0,0,0,0]
input = np.array(input)
print(input)
res = model_15.predict_proba(input)
print(res)


