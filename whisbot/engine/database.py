from langchain.vectorstores.chroma import Chroma
from langchain.document_loaders import TextLoader, CSVLoader, JSONLoader, PyPDFLoader
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.text_splitter import CharacterTextSplitter

from .config import DATABASE_PATH

class DatabaseEngine:
    def __init__(self) -> None:
        self.embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        
    def append(self, file):
        if file.endswith(".txt"):
            loader = TextLoader(file)
            documents = loader.load()
            text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
            docs = text_splitter.split_documents(documents)
        elif file.endswith(".pdf"):
            loader = PyPDFLoader(file)
            docs = loader.load_and_split()
        elif file.endswith(".csv"):
            loader = CSVLoader(file)
        elif file.endswith(".json"):
            loader = JSONLoader(file)

        ids = [str(i) for i in range(1, len(docs) + 1)]
        Chroma.from_documents(docs, self.embedding_function, persist_directory=DATABASE_PATH, ids=ids)

    def get_vectorstore(self):
        db = Chroma(persist_directory=DATABASE_PATH, embedding_function=self.embedding_function)
        return db