import os
from .database import DatabaseEngine

from langchain.llms import LlamaCpp

from langchain.chains import LLMChain, ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_experimental.chat_models import Llama2Chat

from langchain.prompts.chat import (
    ChatPromptTemplate, 
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)

from langchain.schema import SystemMessage

current_dir = os.getcwd()
dir_path = os.path.dirname(os.path.realpath(current_dir))
model_file = dir_path + "/models/llama-2-7b-chat.Q4_0.gguf"

class LLama2:
    def __init__(self) -> None:
        self.llm = LlamaCpp(model_path=model_file, n_ctx=8000, seed=1, f16_kv=True, streaming=False)
        self.template_message = [
            SystemMessage(content="You are a helpful assistant."),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{text}"),
        ]
        self.prompt_template = ChatPromptTemplate.from_messages(self.template_message)
        self.model = Llama2Chat(llm=self.llm)
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.vector_store = DatabaseEngine()

    def chat(self, prompt):
        chain = LLMChain(llm=self.model, prompt=self.prompt_template, memory=self.memory)
        output = chain.run(text=prompt)
        return output

    def qa(self, prompt):
        vectorstore = self.vector_store.get_vectorstore()
        retriever = vectorstore.as_retriever()
        qa_ = ConversationalRetrievalChain.from_llm(self.model, retriever=retriever, memory=self.memory)
        result = qa_(prompt)

        return result
