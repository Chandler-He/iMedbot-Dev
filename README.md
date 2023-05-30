# ProjectW81XWH1900495-iMedbot!!!
## Installation Notes
Frontend: JS, HTML, CSS

###Backend: 
Python, Flask
Machine Learning: Python, Tensorflow, Keras, NLTK, Scikit-learn
atabase: MongoDB

###Dependencies:
python.exe -m pip install --upgrade pip
pip install flask
pip install flask_cors
pip install pymongo
pip install -r .\requirements.txt
pip install numpy=1.19.5 (exact version)
pip install tensorflow=2.5.0 (exact version)
# Note that tensorflow 2.5.0 is not compatible with python 3.9.5, so please use python 3.8.10 instead, then, tensorflow 2.5.0 will not be supported since september 2021, there is no release package currently, you need to copy the source code from github and install it manually, or copy the site-packages from previews programmer's computer.

# Waring: Installing tensorflow v2.5.0 is super tricky, you have to try many ways 


# Inorder to run the backend, I highly recommend that use anaconda to create a virtual environment, then install all the dependencies in the virtual environment, then run the backend in the virtual environment.
# To create a virtual environment in anaconda:
conda create -n tf python=3.8.10
# To activate the virtual environment:
conda activate tf
# To deactivate the virtual environment:
conda deactivate

# Cuda GPU version installation:
1. Download cuda corresponding with tensorflow v2.5.0 from https://developer.nvidia.com/cuda-11.2.2-download-archive?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exelocal
# Note that if cuda version is incorrect, the project will not run.

# If you did all the steps above, you still cannot run the project however, please carefully read the following steps:
1. Download the site-packages from https://drive.google.com/drive/folders/1XuYZEoiOI_4Z6o8IO6ovm5Z47F-KiOy_?usp=share_link, decompress it.
2. Copy the site-packages to the virtual environment's site-packages, for example, if you create a virtual environment named tf, then the site-packages is located at C:\Users\your_user_name\anaconda3\envs\tf\Lib\site-packages, copy the site-packages from the decompressed folder to the site-packages of the virtual environment.
3. Open powershell, enter the virtual environment, uninstall tensorflow by using pip uninstall tensorflow, then reinstall tensorflow by using pip install -r .\requirements.txt
4. Then run the backend by using python .\application.py, it should work now.
# Run project:
1. Run backend: python.exe .\application.py (windows)
2. python application.py (intel mac)
3. python application.py (linux)


# References:
1. https://github.com/ProjectW81XWH1910495/iMedbot-Dev/tree/main/docs
2. https://github.com/tensorflow/tensorflow/tree/r2.5
3. https://www.tensorflow.org/install/pip#macos
4. https://github.com/tensorflow/tensorflow/issues/25597
## About IMedbot
## Structures (including components) of the program
## Functions and examplese