import streamlit as st
import os 
import logging 
from langchain_community.document_loaders import PyPDFLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate,PromptTemplate
from langchain_ollama import OllamaEmbeddings , ChatOllama

from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever
import ollama

logging.basicConfig(level=logging.INFO)

DOC_PATH = "./data/BOI.pdf"
MODEL_NAME = "deepseek-r1:7b"
EMBEDDING_MODEL = "mxbai-embed-large:latest"
VECTOR_STORE_NAME = "simple-rag"
PERSIST_DIRECTORY = "./chroma_db"

def ingest_pdf(doc_path):
    """Load Pdf documents."""
    if os.path.exists(doc_path):
        loader = PyPDFLoader(doc_path)
        data = loader.load()
        logging.info("Pdf loaded sucessFully")
        return data
    else:
        logging.error(f"Pdf file not founded at path: {doc_path}")
        st.error("pdf file not found")
        return None

def split_documents(documents):
    """Split documents into smaller chunks"""
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200,chunk_overlap=300)
    chunks = text_splitter.split_documents(documents)
    logging.info("Documents splits into chunks")
    return chunks
    
@st.cache_resource
def load_vector_db():
    "load or create the vector database"
    ollama.pull(EMBEDDING_MODEL)
    
    embedding = OllamaEmbeddings(model = EMBEDDING_MODEL)
    
    if os.path.exists(PERSIST_DIRECTORY):
        vector_db = Chroma(
            embedding_function=embedding,
            collection_name=VECTOR_STORE_NAME,
            persist_directory=PERSIST_DIRECTORY
        )
        logging.info("Loaded existing vector database")
    else:
        data = ingest_pdf(DOC_PATH)
        if data is None:
            return None
        
        chunks = split_documents(data)
        
        vector_db = Chroma.from_documents(
            documents=chunks,
            embedding= embedding,
            collection_name= VECTOR_STORE_NAME,
            persist_directory=PERSIST_DIRECTORY
        )
        
        vector_db.persist()
        logging.info("vector database created and persisted")
    return vector_db

def create_retriever(vector_db,llm):
    """create a multi query retriever"""
    QUERY_PROMPT = PromptTemplate(
        input_variables=["question"],
        template="""You are an AI language model assistant. Your task is to generate five
different versions of the given user question to retrieve relevant documents from
a vector database. By generating multiple perspectives on the user question, your
goal is to help the user overcome some of the limitations of the distance-based
similarity search. Provide these alternative questions separated by newlines.
Original question: {question}""",
    )
    
    retriever = MultiQueryRetriever.from_llm(
        vector_db.as_retriever(),llm,prompt=QUERY_PROMPT
    )
    logging.info("Retriver created")
    return retriever

def create_chain(retriever,llm):
    template = """Answer the question based ONLY on the following context :
    {context} 
    Question : {question}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    
    chain = (
        {"context" : retriever, "question":RunnablePassthrough()}
        | prompt 
        | llm 
        | StrOutputParser()
    )
    
    logging.info("chain created with Preserved syntax")
    return chain

def main():
    st.title("Document Assistant")
    
    user_input = st.text_input("Enter your question ","")
    
    if user_input:
        with st.spinner("Generating response..."):
            try:
                llm = ChatOllama(model=MODEL_NAME)
                vector_db = load_vector_db()
                if vector_db is None:
                    st.error("Failed to load or create the vector database.")
                retriever = create_retriever(vector_db,llm)
                chain = create_chain(retriever,llm)
                response = chain.invoke(user_input)
                st.markdown("**Assistant : ** ")
                st.write(response)
            except Exception as e:
                st.error(f"An error occurred : {str(e)}")
    else:
        st.info("Please enter a question to get Started.")

if __name__ =="__main__":
    main()