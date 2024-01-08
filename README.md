# WhisBot
Your own AI Voice Assistant

- Run on CPU only
- Voice chat with Bot
- Voice Q&A with Bot
- Built with [LLama](), [Fast Whisper](), [Langchain](), [python-llama-cpp]()

## I. Installation and Usage (MacOS only)
Strictly follow the below instructions to run the application

1. Make sure you have installed a version of Python that supports arm64 architecture, otherwise:
```
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh
bash Miniforge3-MacOSX-arm64.sh
```
2. Create conda environment for python v3.9:
```
conda create -n myenv python==3.9
conda activate myenv
```
3. Install python-llama-cpp:
```
!CMAKE_ARGS="-DCMAKE_OSX_ARCHITECTURES=arm64" pip install --upgrade --verbose --force-reinstall --no-cache-dir llama-cpp-python==0.2.11
```
4. Download models:
```
bash scripts/download_models.sh
```
## II. Development
To run frontend:
```
cd frontend
npm start
```
To run backend:
```
cd whisbot
uvicorn router:app --reload
```
