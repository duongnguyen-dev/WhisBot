import os
from io import BytesIO
from tempfile import NamedTemporaryFile
from contextlib import closing
from pydantic import BaseModel

from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware

from engine.whisper import Whisper 
from engine.llama2 import LLama2
from engine.database import DatabaseEngine

current_dir = os.getcwd()
dir_path = os.path.dirname(os.path.realpath(current_dir))
final_path = dir_path + "/models/base.pt"

app = FastAPI()

origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    prompt: str

@app.post("/normal_chat")
async def normal_chat(data: TextInput):
    generator = LLama2()
    result = generator.chat(prompt=data.prompt)
    return {"answer" : result}

@app.post("/voice_chat")
async def voice_chat(data: bytes = File(...)):
    generator = LLama2()
    byte_stream = BytesIO(data)
    with closing(NamedTemporaryFile(suffix=".webm", delete=False)) as temp_file:
        temp_file.write(byte_stream.getvalue())
        temp_file.flush()   
        speech_converter = Whisper("cpu", final_path, temp_file.name)
        text_detected = speech_converter.generate_text().text
        result = generator.chat(text_detected)

    return {"answer": result}

@app.post("/qa")
async def qa(data: TextInput):
    generator = LLama2()
    byte_stream = BytesIO(data)
    with closing(NamedTemporaryFile(suffix=".webm", delete=False)) as temp_file:
        temp_file.write(byte_stream.getvalue())
        temp_file.flush()   
        speech_converter = Whisper("cpu", final_path, temp_file.name)
        text_detected = speech_converter.generate_text().text
        result = generator.qa(text_detected)
    
    return result


@app.post("/voice_qa")
async def voice_qa(data: bytes = File(...)):
    generator = LLama2()
    answer = generator.qa(prompt=data.prompt)
    
    return answer

@app.post("/upload_file") 
async def upload_file(filename: str, file: bytes = File(...)):
    db = DatabaseEngine()
    bytes = BytesIO(file)
    with closing(NamedTemporaryFile(suffix=f".{filename.split('.')[-1]}", delete=False)) as temp_file:
        temp_file.write(bytes.getvalue())
        temp_file.flush()
        db.append(temp_file.name)
    return {"answer" : "Success"}

@app.post("/restart_db")
async def restart_db():
    if os.path.isdir(f"{os.path.dirname(os.path.realpath(current_dir))}/whisbot/whisbotdb") == True:
        os.removedirs(f"{os.path.dirname(os.path.realpath(current_dir))}/whisbot/whisbotdb")
    return {"response": "restart database successfully"}