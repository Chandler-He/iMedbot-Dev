# iMedBot System Development

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
Install Dependencies
~~~bash
python.exe -m pip install --upgrade pip  
pip install flask  
pip install pymongo  
pip install -r .\requirements.txt  
pip install numpy=1.19.5 (exact version)  
pip install tensorflow=2.5.0 (exact version)  
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
