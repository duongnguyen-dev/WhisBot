# WhisBot
<p align="center">
  <img src="https://github.com/DuongNg2911/WhisBot/assets/127082369/af66e2d1-b47c-4fdb-85d5-f73e2451b3c0"/>
</p>

<p align="center">Your own AI Voice Assistant</p>

![screenshot](https://github.com/DuongNg2911/WhisBot/assets/127082369/dde98ba9-b777-4c46-82da-85ecf838db99)

- Run on CPU only
- Voice chat with Bot
- Voice Q&A with Bot
- Built with [LLama](https://github.com/facebookresearch/llama), [Fast Whisper](https://github.com/openai/whisper), [Langchain](https://github.com/langchain-ai/langchain), [python-llama-cpp](https://github.com/abetlen/llama-cpp-python)

## I. Installation and Usage (MacOS only)
Strictly follow the below instructions to run the application

1. Clone this Repo:
```
git clone https://github.com/DuongNg2911/WhisBot.git
pip install -r requirements.txt
```
2. Make sure you have installed a version of Python that supports arm64 architecture, otherwise:
```
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh
bash Miniforge3-MacOSX-arm64.sh
```
3. Create conda environment for python v3.9:
```
conda create -n myenv python==3.9
conda activate myenv
```
4. Install python-llama-cpp:
```
!CMAKE_ARGS="-DCMAKE_OSX_ARCHITECTURES=arm64" pip install --upgrade --verbose --force-reinstall --no-cache-dir llama-cpp-python==0.2.11
```
5. Download models:
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
