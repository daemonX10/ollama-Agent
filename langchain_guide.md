# LangChain Learning and Reference Guide

Welcome to your comprehensive guide to LangChain! This document aims to provide all the information you need to learn and effectively use LangChain for building LLM-powered applications.

## Core Concepts

LangChain is built around several core concepts that enable developers to create sophisticated applications by composing modular components.

### 1. Chains
Chains are sequences of calls, either to an LLM or a different utility. They represent the most basic building block for combining LLM calls with other steps.
- **Concept**: A chain is a series of actions executed in a defined order.
- **Use**: Simplifies the management of sequential operations, like taking user input, formatting it, sending it to an LLM, and then processing the output.
- **Key Idea**: "Chain" calls together.

### 2. Agents
Agents use an LLM to decide which actions to take. Unlike chains where the sequence of actions is hardcoded, agents use the LLM's reasoning capabilities to determine the steps dynamically.
- **Concept**: An LLM acting as a "reasoning engine" to choose operations.
- **Components**:
    - **Agent**: The core logic that uses an LLM to make decisions.
    - **Tools**: Functions or services that the agent can use (e.g., Google Search, database lookup, Python REPL).
    - **AgentExecutor**: The runtime environment that executes the agent's chosen actions.
- **Use**: For complex tasks where the exact steps are not known beforehand and require dynamic decision-making based on input and intermediate results.

### 3. Tools
Tools are functions or services that an agent can use to interact with the world or perform specific tasks.
- **Concept**: Interfaces that an agent can use to get information or perform actions outside the LLM's direct knowledge.
- **Examples**: Search engines, APIs, databases, code execution environments.
- **Use**: Extend the capabilities of an agent beyond what the LLM itself can do.

### 4. Prompts
Prompts are the inputs to LLMs. Crafting effective prompts is crucial for getting desired outputs. LangChain provides utilities for constructing and managing prompts.
- **Concept**: Structured instructions or queries given to an LLM.
- **Components**:
    - **PromptTemplate**: A reproducible way to generate a prompt. It can include instructions, few-shot examples, and user-specific input.
    - **ChatPromptTemplate**: Specifically for chat models, allowing for messages with roles (System, Human, AI).
- **Use**: To guide the LLM's response and ensure consistency.

### 5. Callbacks
Callbacks are functions that can be invoked at various stages of a LangChain operation (e.g., on LLM start/end, on chain start/end, on tool start/end).
- **Concept**: Hooks into the LangChain execution lifecycle.
- **Use**: For logging, monitoring, streaming, error handling, or any custom logic you want to execute at specific points.
- **Key Idea**: Provides visibility and control over the execution flow.

### 6. Memory
Memory allows chains and agents to remember previous interactions. This is essential for building conversational applications.
- **Concept**: Storing and retrieving information from past interactions.
- **Types**:
    - **Short-term memory**: Remembering recent parts of a conversation (e.g., `ConversationBufferMemory`).
    - **Long-term memory**: Storing information over extended periods, often involving summarization or vector stores (e.g., `ConversationSummaryMemory`, vector store-backed memory).
- **Use**: To maintain context in conversations, personalize responses, and enable more coherent interactions.

### 7. Document Loaders, Text Splitters, Vector Stores, Embeddings, and Retrievers (The RAG Stack)
These components are fundamental for Retrieval Augmented Generation (RAG), where an LLM's knowledge is augmented with external data.

#### a. Document Loaders
Load data from various sources into a list of `Document` objects (containing `page_content` and `metadata`).
-   **Common Loaders (from `langchain_community.document_loaders`)**:
    -   `TextLoader`: Loads text from a `.txt` file.
    -   `PyPDFLoader`: Loads text from a PDF file (requires `pypdf` package).
    -   `WebBaseLoader`: Loads content from URLs (requires `beautifulsoup4`).
    -   `CSVLoader`: Loads data from CSV files.
    -   `JSONLoader`: Loads data from JSON files (using `jq` schema).
    -   `DirectoryLoader`: Loads all files from a directory using another loader.
    -   Many more for Notion, YouTube, Figma, ArXiv, etc.

```python
from langchain_community.document_loaders import TextLoader, PyPDFLoader, WebBaseLoader
import os

# Create dummy files for demonstration
# with open("sample.txt", "w") as f:
#     f.write("This is a sample text file.\nIt has multiple lines.")
# # For PDF, you'd need a sample PDF. Let's assume one exists: "sample.pdf"
# # For WebBaseLoader, we'll use a placeholder URL.

# TextLoader
# text_loader = TextLoader("sample.txt")
# text_documents = text_loader.load()
# print(f"TextLoader loaded: {len(text_documents)} document(s)")
# if text_documents:
#     print(f"Content: {text_documents[0].page_content[:50]}...")
#     print(f"Metadata: {text_documents[0].metadata}")

# PyPDFLoader (requires pip install pypdf)
# try:
#     # Create a dummy PDF if one doesn't exist for the example to run
#     # This requires reportlab. In a real scenario, you'd have an actual PDF.
#     from reportlab.pdfgen import canvas
#     if not os.path.exists("sample.pdf"):
#         c = canvas.Canvas("sample.pdf")
#         c.drawString(100, 750, "This is a sample PDF document.")
#         c.drawString(100, 730, "It contains some text for LangChain to load.")
#         c.save()
#         print("Created dummy sample.pdf")

#     pdf_loader = PyPDFLoader("sample.pdf")
#     pdf_documents = pdf_loader.load()
#     print(f"\nPyPDFLoader loaded: {len(pdf_documents)} document(s) (pages)")
#     if pdf_documents:
#         print(f"Content (page 1): {pdf_documents[0].page_content[:50]}...")
#         print(f"Metadata (page 1): {pdf_documents[0].metadata}")
# except ImportError:
#     print("\npypdf not installed, skipping PyPDFLoader example.")
# except Exception as e:
#     print(f"\nError with PyPDFLoader: {e}")

# WebBaseLoader (requires pip install beautifulsoup4)
# try:
#     # Using a well-known, stable page for the example
#     web_loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/") # A good blog post on agents
#     web_documents = web_loader.load()
#     print(f"\nWebBaseLoader loaded: {len(web_documents)} document(s)")
#     if web_documents:
#         print(f"Content (first doc): {web_documents[0].page_content[:100]}...")
#         print(f"Metadata (first doc): {web_documents[0].metadata}")
# except ImportError:
#     print("\nbeautifulsoup4 not installed, skipping WebBaseLoader example.")
# except Exception as e:
#     print(f"\nError with WebBaseLoader: {e}")

# Clean up dummy files
# if os.path.exists("sample.txt"): os.remove("sample.txt")
# if os.path.exists("sample.pdf"): os.remove("sample.pdf")
```

#### b. Text Splitters
Divide large `Document`s into smaller, semantically meaningful chunks. This is crucial for fitting within LLM context windows and for effective retrieval.

-   **Common Splitters (from `langchain.text_splitter` or `langchain_text_splitters`)**:
    -   `CharacterTextSplitter`: Splits by a specific character (e.g., `\n\n`).
    -   `RecursiveCharacterTextSplitter`: Recommended default. Tries to split on a list of separators recursively (e.g., `["\n\n", "\n", " ", ""]`).
    -   `TokenTextSplitter`: Splits based on token count (requires a tokenizer like `tiktoken`).
    -   `MarkdownHeaderTextSplitter`: Splits Markdown files based on headers.
    -   `HTMLHeaderTextSplitter`: Splits HTML files based on headers.

-   **Key Parameters**: `chunk_size`, `chunk_overlap`.

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_core.documents import Document

long_text = "This is a very long string. It needs to be split into smaller chunks. LangChain provides several text splitters. The RecursiveCharacterTextSplitter is often a good choice. It tries to keep paragraphs together. Chunk size and overlap are important parameters. This helps in maintaining context during retrieval for RAG applications."

docs_to_split = [Document(page_content=long_text, metadata={"source": "example"})]

# RecursiveCharacterTextSplitter
# recursive_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=100, 
#     chunk_overlap=20, 
#     length_function=len # How to measure chunk size (default is len)
# )
# chunks_recursive = recursive_splitter.split_documents(docs_to_split)
# print(f"Recursive Splitter produced {len(chunks_recursive)} chunks:")
# for i, chunk in enumerate(chunks_recursive):
#     print(f"  Chunk {i+1}: '{chunk.page_content}' (Overlap: {chunk.page_content[:20]}...)")

# CharacterTextSplitter
# char_splitter = CharacterTextSplitter(
#     separator = ".", # Split by sentences in this case
#     chunk_size=50, # Approximate, as it splits by separator
#     chunk_overlap=10,
#     length_function=len
# )
# chunks_char = char_splitter.split_documents(docs_to_split)
# print(f"\nCharacter Splitter produced {len(chunks_char)} chunks:")
# for i, chunk in enumerate(chunks_char):
#     print(f"  Chunk {i+1}: '{chunk.page_content}'")
```

#### c. Embeddings
Convert text chunks into numerical vectors that capture their semantic meaning.

-   **Providers (often in `langchain_openai`, `langchain_huggingface`, `langchain_community.embeddings`)**:
    -   `OpenAIEmbeddings`: Uses OpenAI's embedding models (e.g., `text-embedding-ada-002`, `text-embedding-3-small`).
    -   `HuggingFaceEmbeddings`: Uses models from Hugging Face Hub (e.g., `sentence-transformers/all-MiniLM-L6-v2`). Runs locally or via API.
    -   `CohereEmbeddings`, `GoogleGenerativeAIEmbeddings`, etc.

```python
from langchain_openai import OpenAIEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings

# OpenAI Embeddings (requires OPENAI_API_KEY)
# try:
#     openai_ef = OpenAIEmbeddings(model="text-embedding-3-small")
#     vector_openai = openai_ef.embed_query("Hello, world!")
#     # print(f"OpenAI Embedding (first 5 dims): {vector_openai[:5]}")
#     # print(f"OpenAI Embedding length: {len(vector_openai)}")

#     # Embed multiple documents
#     # doc_vectors_openai = openai_ef.embed_documents(["First document", "Second document about AI"])
#     # print(f"Embedded {len(doc_vectors_openai)} documents using OpenAI.")
# except Exception as e:
#     print(f"OpenAI Embeddings error: {e}. Ensure API key is set.")

# Hugging Face Embeddings (runs locally, downloads model on first run)
# try:
#     # Using a popular sentence transformer model
#     hf_ef = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
#     vector_hf = hf_ef.embed_query("Hello, world!")
#     # print(f"\nHuggingFace Embedding (first 5 dims): {vector_hf[:5]}")
#     # print(f"HuggingFace Embedding length: {len(vector_hf)}")
# except Exception as e:
#     print(f"HuggingFace Embeddings error: {e}")
```

#### d. Vector Stores
Databases designed to store and efficiently search text embeddings based on semantic similarity.

-   **Common Vector Stores (many in `langchain_community.vectorstores`)**:
    -   `FAISS`: Local, in-memory or on-disk (requires `faiss-cpu` or `faiss-gpu`).
    -   `Chroma`: Local or client-server (requires `chromadb`).
    -   `Pinecone`: Cloud-based managed vector database (requires `pinecone-client`).
    -   `Weaviate`: Open-source vector search engine (requires `weaviate-client`).

## Use Cases

This section demonstrates how to apply LangChain modules to build common LLM applications. Each use case includes a full working code sample and explanation.

### 1. Chatbots
Chatbots are a primary application of LLMs, capable of engaging in conversations, answering questions, and performing tasks.

**Core Components Used**: Chat Models, Prompts (ChatPromptTemplate), Memory, LCEL.

**Explanation**:
1.  **LLM**: We use a chat model (e.g., `ChatOpenAI`).
2.  **Prompt**: `ChatPromptTemplate` is used to structure the conversation, including system messages (to define bot behavior), placeholders for chat history, and the current user input.
3.  **Memory**: `ConversationBufferMemory` (or `RunnableWithMessageHistory` for more robust session management) stores the conversation history. The `MessagesPlaceholder` in the prompt is where this history is injected.
4.  **Chain (LCEL)**: We construct a chain that:
    a.  Loads the current chat history.
    b.  Formats the prompt with the history and new user input.
    c.  Sends the formatted prompt to the LLM.
    d.  Gets the LLM's response.
    e.  Saves the new user input and AI response to memory.

**Full Working Code Sample**:

```python
import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.memory import ConversationBufferMemory # For simpler memory management in this example
from langchain_core.runnables import RunnablePassthrough, RunnableLambda

# --- Setup (ensure OPENAI_API_KEY is set in your environment) ---
# load_dotenv() # Uncomment if you use a .env file for API keys
# if not os.getenv("OPENAI_API_KEY"):
#     print("Error: OPENAI_API_KEY not found. Please set it in your environment.")
#     exit()

# --- 1. Initialize LLM and Memory ---
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# memory_key="chat_history" is how we'll refer to it in the prompt and when loading/saving
# return_messages=True is important for ChatModels as they expect a list of Message objects
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# --- 2. Define the Prompt Template ---
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly and helpful conversational AI. Your name is ChatterBox."),
    MessagesPlaceholder(variable_name="chat_history"), # Where past messages will be inserted
    HumanMessagePromptTemplate.from_template("{user_input}") # The current user's message
])

# --- 3. Construct the Conversational Chain using LCEL ---

# This chain will:
# 1. Take "user_input" as initial input.
# 2. Use RunnablePassthrough.assign to add "chat_history" from memory to the input dictionary.
#    - RunnableLambda is used to correctly call memory.load_memory_variables.
# 3. Pipe this combined dictionary into the prompt.
# 4. Pipe the formatted prompt into the LLM.
# 5. Pipe the LLM's output into StrOutputParser.

conversational_chain = (
    RunnablePassthrough.assign(
        chat_history=RunnableLambda(lambda x: memory.load_memory_variables(x).get("chat_history"))
    )
    | prompt
    | llm
    | StrOutputParser()
)

# --- 4. Function to interact with the chatbot ---
def chat(user_message):
    """Sends a message to the chatbot and updates memory."""
    # print(f"User: {user_message}")
    
    # Invoke the chain with the user's input
    # The `load_memory_variables` in the chain will use the current state of `memory`
    ai_response = conversational_chain.invoke({"user_input": user_message})
    
    # Save the current interaction (user input and AI response) to memory
    memory.save_context({"user_input": user_message}, {"output": ai_response})
    
    # print(f"ChatterBox: {ai_response}")
    return ai_response

# --- 5. Example Conversation ---
# print("Starting chat with ChatterBox (type 'exit' to end)...")
# # Initial greeting
# chat("Hello there!")

# # Follow-up question that requires memory
# chat("My name is Alex. What is your name?")

# # Question that tests memory of user's name
# chat("Do you remember my name?")

# # Another interaction
# chat("What are some interesting facts about Large Language Models?")

# # To see the current memory state:
# # print("\n--- Current Memory State ---")
# # print(memory.load_memory_variables({}))

# # Interactive loop (optional)
# # while True:
# #     user_inp = input("You: ")
# #     if user_inp.lower() == 'exit':
# #         print("ChatterBox: Goodbye!")
# #         break
# #     chat(user_inp)

# --- RunnableWithMessageHistory (Alternative and often preferred for robust session management) ---
# This approach is more idiomatic for LCEL and handles session IDs for multi-user scenarios.

from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# Store for chat histories (in a real app, this could be Redis, DB, etc.)
# chat_history_store = {}

# def get_session_history(session_id: str):
#     if session_id not in chat_history_store:
#         chat_history_store[session_id] = InMemoryChatMessageHistory()
#     return chat_history_store[session_id]

# # Core chain (prompt | llm | parser) - memory is handled by RunnableWithMessageHistory
# core_rag_prompt = ChatPromptTemplate.from_messages([
#     ("system", "You are a helpful AI assistant named Sparky."),
#     MessagesPlaceholder(variable_name="history"), # Note: variable_name matches history_messages_key
#     HumanMessagePromptTemplate.from_template("{input}") # Note: variable_name matches input_messages_key
# ])

# core_chain = core_rag_prompt | llm | StrOutputParser()

# chain_with_message_history = RunnableWithMessageHistory(
#     core_chain,
#     get_session_history,
#     input_messages_key="input", # Key for user input in the invoke dict
#     history_messages_key="history", # Key for history in the prompt and memory
# )

# print("\n--- Chatting with Sparky (using RunnableWithMessageHistory) ---")
# session_id_1 = "user_abc"
# config_user_abc = {"configurable": {"session_id": session_id_1}}

# response1 = chain_with_message_history.invoke({"input": "Hi, I'm Bob from accounting."}, config=config_user_abc)
# print(f"User ABC - Sparky: {response1}")

# response2 = chain_with_message_history.invoke({"input": "What department am I from?"}, config=config_user_abc)
# print(f"User ABC - Sparky: {response2}")

# # New user session
# session_id_2 = "user_xyz"
# config_user_xyz = {"configurable": {"session_id": session_id_2}}
# response3 = chain_with_message_history.invoke({"input": "Hello! I'm Clara."}, config=config_user_xyz)
# print(f"User XYZ - Sparky: {response3}")

# response4 = chain_with_message_history.invoke({"input": "What is my name?"}, config=config_user_xyz)
# print(f"User XYZ - Sparky: {response4}")

# # Check Bob's history
# # print(f"\nHistory for {session_id_1}: {get_session_history(session_id_1).messages}")
# # Check Clara's history
# # print(f"History for {session_id_2}: {get_session_history(session_id_2).messages}")
```

**Key Takeaways for Chatbots**:
-   Memory is essential for context.
-   `MessagesPlaceholder` is used in prompts to inject this history.
-   LCEL provides a flexible way to manage the flow of loading history, calling the LLM, and saving history.
-   `RunnableWithMessageHistory` is a powerful abstraction for managing conversational history per session, making it easier to build multi-user chatbots or chatbots where history needs to be persisted more robustly.

---

### 2. Question Answering over Documents (Retrieval Augmented Generation - RAG)
This is one of the most powerful use cases: enabling an LLM to answer questions based on a custom set of documents.

**Core Components Used**: Document Loaders, Text Splitters, Embeddings, Vector Stores, Retrievers, LLMs, Prompts (PromptTemplate/ChatPromptTemplate), LCEL.

**Explanation (The RAG Pipeline)**:
1.  **Load Data**: Use Document Loaders to ingest your documents (PDFs, text files, web pages, etc.).
2.  **Split**: Use Text Splitters to break down large documents into smaller, manageable chunks. This is important for context window limits and effective retrieval.
3.  **Embed & Store**: For each chunk, generate a numerical embedding using an Embedding model (e.g., OpenAI, Hugging Face). Store these embeddings and their corresponding text chunks in a Vector Store (e.g., FAISS, Chroma).
4.  **Retrieve**: When a user asks a question:
    a.  Embed the user's question using the same embedding model.
    b.  Use the question embedding to query the Vector Store, which returns the most semantically similar document chunks (the "context").
5.  **Generate**: Pass the original question and the retrieved context to an LLM via a carefully crafted prompt. The prompt instructs the LLM to answer the question *based only on the provided context*.

**Full Working Code Sample**:

```python
import os
from dotenv import load_dotenv

# --- Core LangChain Components ---
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader, PyPDFLoader # PyPDFLoader needs `pip install pypdf`
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS # Needs `pip install faiss-cpu` or `faiss-gpu`
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.documents import Document

# --- Setup (ensure OPENAI_API_KEY is set) ---
# load_dotenv() # Uncomment if you use a .env file
# if not os.getenv("OPENAI_API_KEY"):
#     print("Error: OPENAI_API_KEY not found. Please set it.")
#     # exit() # Or handle gracefully

# --- 0. Create Dummy Data for Demonstration ---
dummy_data_path = "rag_data"
# os.makedirs(dummy_data_path, exist_ok=True)

# file_content_txt = """
# LangChain: A Framework for LLM Applications

# LangChain is an open-source framework designed to simplify the creation of applications 
# using large language models (LLMs). It provides a standard interface for chains, 
# integrations with a plethora of tools, and end-to-end chains for common applications.
# Key components include Models, Prompts, Chains, Agents, Memory, and Callbacks.
# LangChain supports various LLMs like those from OpenAI, Hugging Face, and Cohere.
# It also facilitates Retrieval Augmented Generation (RAG) by integrating with 
# document loaders, text splitters, embedding models, and vector stores like FAISS and Chroma.
# """
# with open(os.path.join(dummy_data_path, "langchain_overview.txt"), "w") as f:
#     f.write(file_content_txt)

# # For PDF, we'll create a simple one if PyPDF and reportlab are available
# try:
#     from reportlab.pdfgen import canvas
#     from reportlab.lib.pagesizes import letter
#     pdf_path = os.path.join(dummy_data_path, "langchain_details.pdf")
#     # if not os.path.exists(pdf_path):
#     #     c = canvas.Canvas(pdf_path, pagesize=letter)
#     #     c.drawString(72, 750, "Advanced LangChain Features")
#     #     c.drawString(72, 730, "LangChain also offers LangGraph for building stateful, multi-actor applications,")
#     #     c.drawString(72, 710, "and LangServe for easily deploying LangChain chains as REST APIs.")
#     #     c.drawString(72, 690, "Toolkits provide collections of tools for specific domains like SQL or CSV analysis.")
#     #     c.save()
#     #     print(f"Created dummy PDF: {pdf_path}")
# except ImportError:
#     print("reportlab not installed, cannot create dummy PDF. PyPDFLoader might fail if file doesn't exist.")
#     pdf_path = None # Ensure it's defined

# --- 1. Initialize Models ---
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)
# Using a specific, recommended OpenAI embedding model
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# --- 2. Load Documents ---
# For this example, we'll load from the dummy text file and potentially the PDF.
# documents = []
# try:
#     txt_loader = TextLoader(os.path.join(dummy_data_path, "langchain_overview.txt"))
#     documents.extend(txt_loader.load())
# except Exception as e:
#     print(f"Error loading text file: {e}")

# if pdf_path and os.path.exists(pdf_path):
#     try:
#         pdf_loader = PyPDFLoader(pdf_path)
#         documents.extend(pdf_loader.load())
#     except ImportError:
#         print("pypdf not installed, skipping PDF loading.")
#     except Exception as e:
#         print(f"Error loading PDF file: {e}")
# else:
#     print("PDF file not found or path not set, skipping PDF loading.")

# # Fallback if no documents loaded
# if not documents:
#     print("No documents were loaded. Using fallback content for RAG.")
#     documents = [
#         Document(page_content="LangChain is a framework for building LLM applications. It helps with RAG."),
#         Document(page_content="RAG means Retrieval Augmented Generation. It uses external documents.")
#     ]
# print(f"Loaded {len(documents)} document(s) in total.")

# --- 3. Split Documents into Chunks ---
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,  # Max characters per chunk
    chunk_overlap=50 # Characters to overlap between chunks
)
# chunks = text_splitter.split_documents(documents)
# print(f"Split into {len(chunks)} chunks.")
# # for i, chunk in enumerate(chunks[:2]): # Print first 2 chunks
# #     print(f"Chunk {i+1}: {chunk.page_content[:150]}...")

# --- 4. Embed Chunks and Store in Vector Store (FAISS in this case) ---
# vector_store = None
# if chunks:
#     try:
#         vector_store = FAISS.from_documents(chunks, embeddings)
#         print("Vector store (FAISS) created successfully.")
#     except Exception as e:
#         print(f"Error creating FAISS vector store: {e}")
# else:
#     print("No chunks to create vector store from.")

# --- 5. Create a Retriever from the Vector Store ---
# retriever = None
# if vector_store:
#     retriever = vector_store.as_retriever(
#         search_type="similarity", # Other options: "mmr", "similarity_score_threshold"
#         search_kwargs={"k": 3}    # Retrieve top 3 most similar chunks
#     )
#     print("Retriever created from vector store.")
# else:
#     # Fallback retriever if vector_store creation failed
#     print("Vector store not available. RAG will not function correctly.")
    # As a dummy, it won't retrieve anything useful
    # class DummyRetriever:
    #     def invoke(self, input_str):
    #         return [Document(page_content="No context available due to earlier error.")]
    # retriever = DummyRetriever()

# --- 6. Define the RAG Prompt Template ---
rag_prompt_template = """
Answer the following question based *only* on the provided context. 
If the context does not contain the answer, say "I don't have enough information from the provided documents to answer that."
Do not use any prior knowledge.

Context:
{context}

Question: {question}

Answer:
"""
rag_prompt = ChatPromptTemplate.from_template(rag_prompt_template)

# --- 7. Construct the RAG Chain using LCEL ---

# Helper function to format retrieved documents into a single string
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# The RAG chain:
# 1. Input: a dictionary with a "question" key.
# 2. `RunnablePassthrough.assign(context=...)`: 
#    - Takes the input "question".
#    - Passes it to the `retriever` to get relevant documents.
#    - Passes these documents to `format_docs` to create a context string.
#    - Adds this "context" string to the dictionary that's passed to the next step.
# 3. The dictionary (now with "question" and "context") is passed to `rag_prompt`.
# 4. The formatted prompt goes to the `llm`.
# 5. The LLM's output is parsed by `StrOutputParser`.

# rag_chain = None
# if retriever:
#     rag_chain = (
#         {"context": RunnableLambda(lambda x: retriever.invoke(x["question"])) | format_docs, 
#          "question": RunnablePassthrough()} 
#         | rag_prompt
#         | llm
#         | StrOutputParser()
#     )
#     print("RAG chain constructed.")
# else:
#     print("Retriever not available, RAG chain cannot be fully constructed.")

# --- 8. Ask Questions! ---
# questions = [
#     "What is LangChain?",
#     "How does LangChain help with RAG?",
#     "What is LangGraph used for according to the documents?",
#     "What is the capital of France?" # Should ideally say it doesn't know from context
# ]

# if rag_chain:
#     print("\n--- Answering Questions using RAG ---")
#     for q in questions:
#         print(f"\nQuestion: {q}")
#         try:
#             answer = rag_chain.invoke({"question": q}) # Pass as dict
#             print(f"Answer: {answer}")
            
#             # Optional: See the retrieved context for a specific question
#             # relevant_context = retriever.invoke(q)
#             # print("Retrieved context for this question:")
#             # for i, doc_ctx in enumerate(relevant_context):
#             #     print(f"  Context Doc {i+1}: {doc_ctx.page_content[:100]}...")

#         except Exception as e:
#             print(f"Error invoking RAG chain for question '{q}': {e}")
# else:
#     print("\nRAG chain is not available. Cannot answer questions.")

# --- Cleanup dummy data (optional) ---
# import shutil
# if os.path.exists(dummy_data_path):
#     shutil.rmtree(dummy_data_path)
#     print(f"\nCleaned up dummy data directory: {dummy_data_path}")
```

**Key Takeaways for RAG**:
-   The quality of loaded documents, splitting strategy, embedding model, and vector store significantly impact RAG performance.
-   The prompt is crucial for instructing the LLM to stick to the provided context and avoid hallucination.
-   LCEL makes it straightforward to define the entire RAG pipeline declaratively.
-   Error handling and fallbacks (e.g., if documents don't load or vector store fails) are important in production.

---

### 3. Code Assistants
LangChain can be used to build AI-powered code assistants that can help with code generation, explanation, debugging, and refactoring.

**Core Components Used**: LLMs (especially code-proficient models), Prompts, Tools (potentially for code execution or file system access), Agents (for more complex tasks).

**Explanation**:
1.  **LLM Choice**: Use an LLM that is fine-tuned for code-related tasks (e.g., OpenAI's `gpt-3.5-turbo`, `gpt-4`, or specialized open-source code models like CodeLlama, DeepSeek Coder, etc., accessible via Hugging Face or Ollama).
2.  **Prompt Engineering**: Craft prompts that clearly define the coding task:
    *   **Code Generation**: "Write a Python function that [does X] given [inputs] and returns [outputs]."
    *   **Code Explanation**: "Explain this Python code snippet: [code]."
    *   **Debugging**: "Find the bug in this Python code: [code]. The error message is: [error]."
    *   **Refactoring**: "Refactor this Python code to be more [efficient/readable/Pythonic]: [code]."
    *   **Language Translation**: "Translate this Python code to JavaScript: [code]."
3.  **Simple Chain (for direct tasks)**: For straightforward tasks like generating or explaining a piece of code based on a prompt, a simple LLMChain (or LCEL equivalent: `prompt | llm | parser`) is often sufficient.
4.  **Agents and Tools (for interactive tasks)**: For more complex scenarios like iterative debugging, running code, or interacting with a project's file system, an Agent with custom Tools would be necessary.
    *   **Tools could include**: A Python REPL, a file reader/writer, a linter, a test runner.

**Full Working Code Sample (Simple Code Generation and Explanation Chain)**:

```python
import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser

# --- Setup (ensure OPENAI_API_KEY is set) ---
# load_dotenv()
# if not os.getenv("OPENAI_API_KEY"):
#     print("Error: OPENAI_API_KEY not found. Please set it.")
#     # exit()

# --- 1. Initialize LLM (Choose a model good at coding) ---
# Using gpt-3.5-turbo as a general-purpose model. For serious code tasks, gpt-4 or specialized code models are better.
llm_coder = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.2) # Low temperature for more deterministic code

# --- 2. Code Generation Chain ---
code_gen_system_message = SystemMessagePromptTemplate.from_template(
    "You are an expert Python programmer. Generate clean, efficient, and well-commented Python code based on the user's request. Only output the code block itself, without any surrounding text or explanations unless specifically asked."
)
code_gen_human_message = HumanMessagePromptTemplate.from_template(
    "Please write a Python function that {task_description}."
)
code_gen_prompt = ChatPromptTemplate.from_messages([code_gen_system_message, code_gen_human_message])

code_generation_chain = code_gen_prompt | llm_coder | StrOutputParser()

# --- 3. Code Explanation Chain ---
code_explain_system_message = SystemMessagePromptTemplate.from_template(
    "You are an expert Python programmer. Explain the given Python code snippet clearly and concisely. Describe its functionality, inputs, outputs, and any important logic or algorithms used."
)
code_explain_human_message = HumanMessagePromptTemplate.from_template(
    "Please explain the following Python code:\n\n```python\n{code_snippet}\n```"
)
code_explain_prompt = ChatPromptTemplate.from_messages([code_explain_system_message, code_explain_human_message])

code_explanation_chain = code_explain_prompt | llm_coder | StrOutputParser()

# --- 4. Example Usage ---

# Example 1: Generate a function
# task = "takes a list of integers and returns a new list containing only the even numbers"
# print(f"--- Generating Python function for: {task} ---")
# generated_code = code_generation_chain.invoke({"task_description": task})
# print(generated_code)

# Example 2: Explain the generated code (or any other code)
# if generated_code:
#     print(f"\n--- Explaining the generated code --- ")
#     explanation = code_explanation_chain.invoke({"code_snippet": generated_code.strip("`python\n`").strip("`")})
#     print(explanation)

# Example 3: Explain a different piece of code
# sample_code_to_explain = """
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
"""
# print(f"\n--- Explaining sample code: Factorial function ---")
# factorial_explanation = code_explanation_chain.invoke({"code_snippet": sample_code_to_explain})
# print(factorial_explanation)

# Example 4: Generate code with specific requirements
# task_pandas = "reads a CSV file named 'data.csv' into a pandas DataFrame, and then returns the first 5 rows of the DataFrame. Assume pandas is imported as pd."
# print(f"\n--- Generating Python/Pandas function for: {task_pandas} ---")
# generated_pandas_code = code_generation_chain.invoke({"task_description": task_pandas})
# print(generated_pandas_code)

# --- Considerations for a more advanced Code Assistant ---
# - **Using an Agent**: For tasks like "debug this code and run it to see if it works", an agent with tools would be needed.
#   - Tools: Python REPL (e.g., `PythonREPLTool` from `langchain_experimental.tools` but use with extreme caution due to security risks of executing arbitrary code), file system tools.
# - **Context Awareness**: For project-level assistance, the agent/chain would need context about other files in the project (potentially using RAG techniques on the codebase).
# - **Error Handling and Iteration**: A robust assistant would parse error messages from code execution and feed them back to the LLM for iterative debugging.
# - **Security**: Executing LLM-generated code is inherently risky. Always sandbox execution and be cautious, especially with tools that can modify files or run commands.

# Conceptual sketch of an Agent-based Code Assistant (not runnable without more setup):
# from langchain.agents import AgentExecutor, create_openai_functions_agent
# from langchain_experimental.tools import PythonREPLTool # CAUTION: Security risk!
# from langchain_core.prompts import MessagesPlaceholder

# # WARNING: PythonREPLTool can execute arbitrary code and is a security risk.
# # Only use in controlled environments and if you understand the implications.
# # python_repl_tool = PythonREPLTool() 
# # code_agent_tools = [python_repl_tool]

# # code_agent_prompt_template = ChatPromptTemplate.from_messages([
# #     ("system", "You are a Python coding assistant. You can write, explain, and debug Python code. You can also execute Python code to test it. Be cautious with code execution."),
# #     MessagesPlaceholder(variable_name="chat_history", optional=True),
# #     ("human", "{input}"),
# #     MessagesPlaceholder(variable_name="agent_scratchpad")
# # ])

# # if 'python_repl_tool' in locals(): # Check if tool was initialized
# #     code_agent = create_openai_functions_agent(llm_coder, code_agent_tools, code_agent_prompt_template)
# #     code_agent_executor = AgentExecutor(agent=code_agent, tools=code_agent_tools, verbose=True, handle_parsing_errors=True)

#     # print("\n--- Code Agent Example (Conceptual) ---")
#     # agent_task = "Write a Python function to add two numbers. Then, test it by adding 5 and 7 and tell me the result."
#     # try:
#     #     # agent_response = code_agent_executor.invoke({"input": agent_task})
#     #     # print(f"Agent Response: {agent_response['output']}")
#     # except Exception as e:
#     #     print(f"Agent execution error: {e}")
# # else:
# #     print("\nPythonREPLTool not initialized, skipping agent example.")

```

**Key Takeaways for Code Assistants**:
-   The choice of LLM is critical; models trained on code perform significantly better.
-   Clear, specific prompts are essential for getting the desired code or explanation.
-   For simple, stateless tasks (generate X, explain Y), basic chains are effective.
-   For interactive or stateful tasks (debug, refactor based on errors, project-wide changes), agents with appropriate tools (like code interpreters or file system access) are more suitable, but introduce security considerations.
-   Always prioritize security when building tools that can execute code or modify files.

---

### 4. Summarization
LangChain can be used to summarize long documents or conversations. There are different strategies for summarization, depending on the length of the text and the desired output.

**Core Components Used**: LLMs, Document Loaders, Text Splitters (for long documents), Prompts, Chains (especially `load_summarize_chain`).

**Summarization Strategies (Chains available via `load_summarize_chain`)**:
1.  **`stuff`**: Simplest method. Stuffs all documents into a single prompt. Works well for a small number of short documents. Fails if the total text exceeds the LLM's context window.
2.  **`map_reduce`**: More scalable. Applies an initial prompt to each document chunk individually (map step). Then, the summaries of each chunk are combined and summarized using a different prompt (reduce step).
3.  **`refine`**: Iterative. Processes the first document, then iteratively updates the summary with information from subsequent documents. Can be good for building more detailed summaries but involves more LLM calls.
4.  **`map_rerank`** (less common for summarization, more for QA): Runs an initial prompt on each document, scores the result, and returns the highest-scoring summary. Not typically the primary choice for general summarization.

**Explanation**:
1.  **Load Data**: If summarizing external documents, use Document Loaders.
2.  **Split Data (if needed)**: For `map_reduce` or `refine` strategies on long documents, split them into manageable chunks using Text Splitters.
3.  **Choose Strategy**: Select a summarization chain type (`stuff`, `map_reduce`, `refine`).
4.  **Prompting**: The `load_summarize_chain` often uses default prompts, but custom prompts can be provided for both the initial processing (e.g., map step) and the combining/refining step.
5.  **Execute Chain**: Run the summarization chain with the documents (or chunks).

**Full Working Code Sample**:

```python
import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.documents import Document
from langchain.chains.summarize import load_summarize_chain # Helper to load pre-configured chains
from langchain_text_splitters import RecursiveCharacterTextSplitter

# --- Setup (ensure OPENAI_API_KEY is set) ---
# load_dotenv()
# if not os.getenv("OPENAI_API_KEY"):
#     print("Error: OPENAI_API_KEY not found. Please set it.")
#     # exit()

# --- 1. Initialize LLM ---
llm_summarizer = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.1)

# --- 2. Prepare Sample Documents ---
# Short documents (suitable for 'stuff' or as chunks for other methods)
doc1_content = "LangChain is a powerful framework for developing applications powered by large language models. It provides modular components like chains, agents, and memory. LangChain simplifies complex LLM workflows."
doc2_content = "Key features of LangChain include its extensive integrations with various LLMs, vector stores, and other tools. It supports Python and JavaScript. Developers appreciate its flexibility and the speed at which they can prototype."
doc3_content = "Use cases for LangChain range from chatbots and question-answering systems to summarization, data extraction, and code generation. The community around LangChain is active and growing, contributing to its rapid evolution."

short_documents = [
    Document(page_content=doc1_content, metadata={"source": "doc1"}),
    Document(page_content=doc2_content, metadata={"source": "doc2"}),
    Document(page_content=doc3_content, metadata={"source": "doc3"})
]

# A longer document that would likely require splitting for map_reduce or refine
long_document_content = f"{doc1_content} {doc2_content} {doc3_content} " * 3 # Make it longer
long_document = Document(page_content=long_document_content, metadata={"source": "long_doc"})

# --- 3. Summarization using different chain types ---

# Strategy 1: `stuff` (for short texts or few documents)
# print("\n--- Summarizing with 'stuff' method ---")
# try:
#     stuff_chain = load_summarize_chain(llm_summarizer, chain_type="stuff", verbose=True)
#     summary_stuff = stuff_chain.invoke(short_documents) # LangChain v0.1.0+ uses .invoke
#     print(f"Stuff Summary: {summary_stuff['output_text']}")
# except Exception as e:
#     print(f"Error with stuff chain: {e}. Input might be too long for context window.")

# To use 'stuff' with a single long document, it must fit the context window.
# If long_document is too long, the above would fail. For demonstration, let's try with a shorter version.
# short_version_of_long_doc = Document(page_content=doc1_content + " " + doc2_content, metadata={"source": "short_long"})
# try:
#     summary_stuff_single_long = stuff_chain.invoke([short_version_of_long_doc])
#     print(f"Stuff Summary (single shorter doc): {summary_stuff_single_long['output_text']}")
# except Exception as e:
#     print(f"Error with stuff chain on single doc: {e}")


# Strategy 2: `map_reduce` (for longer texts / many documents)
# print("\n--- Summarizing with 'map_reduce' method ---")
# # First, split the long document if using it directly
# text_splitter_for_summary = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
# chunks_for_map_reduce = text_splitter_for_summary.split_documents([long_document])
# print(f"Split long document into {len(chunks_for_map_reduce)} chunks for map_reduce.")

# try:
#     map_reduce_chain = load_summarize_chain(llm_summarizer, chain_type="map_reduce", verbose=True)
#     # We can use the pre-split chunks or the list of short_documents
#     summary_map_reduce = map_reduce_chain.invoke(chunks_for_map_reduce) # Using chunks of the long doc
#     # summary_map_reduce = map_reduce_chain.invoke(short_documents) # Or using the list of short docs
#     print(f"Map_Reduce Summary: {summary_map_reduce['output_text']}")
# except Exception as e:
#     print(f"Error with map_reduce chain: {e}")

# Strategy 3: `refine` (for longer texts / many documents, iterative refinement)
# print("\n--- Summarizing with 'refine' method ---")
# # Using the same chunks as map_reduce for consistency in this example
# # chunks_for_refine = chunks_for_map_reduce 
# # Or use the short_documents list directly if they represent sequential information
# chunks_for_refine = short_documents # Let's use short_documents for a clearer refine example

# try:
#     refine_chain = load_summarize_chain(llm_summarizer, chain_type="refine", verbose=True)
#     summary_refine = refine_chain.invoke(chunks_for_refine)
#     print(f"Refine Summary: {summary_refine['output_text']}")
# except Exception as e:
#     print(f"Error with refine chain: {e}")

# --- Customizing Prompts for Summarization Chains (Example for map_reduce) ---
# from langchain_core.prompts import PromptTemplate

# print("\n--- Summarizing with 'map_reduce' and custom prompts ---")
# map_template = """
# Summarize the following text concisely:
# Text: "{text}"
# Concise Summary:
# """
# map_prompt = PromptTemplate.from_template(map_template)

# combine_template = """
# Take the following summaries and synthesize them into a final, coherent summary.
# Make sure the final summary is well-structured and captures the main points from all individual summaries.
# Individual Summaries:
# "{text}"
# Final Synthesized Summary:
# """
# combine_prompt = PromptTemplate.from_template(combine_template)

# try:
#     map_reduce_custom_chain = load_summarize_chain(
#         llm_summarizer,
#         chain_type="map_reduce",
#         map_prompt=map_prompt,
#         combine_prompt=combine_prompt,
#         verbose=True
#     )
#     # Using chunks_for_map_reduce from before
#     if 'chunks_for_map_reduce' in locals() and chunks_for_map_reduce:
#       summary_map_reduce_custom = map_reduce_custom_chain.invoke(chunks_for_map_reduce)
#       print(f"Map_Reduce Summary (Custom Prompts): {summary_map_reduce_custom['output_text']}")
#     else:
#       print("Skipping custom map_reduce, chunks not available.")
# except Exception as e:
#     print(f"Error with custom map_reduce chain: {e}")

```

**Key Takeaways for Summarization**:
-   Choose the summarization `chain_type` based on the length and number of your documents relative to the LLM's context window.
-   `stuff` is fast and simple for short texts.
-   `map_reduce` is robust for long texts by dividing the task.
-   `refine` can produce detailed summaries iteratively but may be slower and more expensive due to more LLM calls.
-   Customizing prompts within `load_summarize_chain` can give you more control over the style and content of the summaries at each step.
-   For very large-scale summarization, consider the cost and token limits associated with the chosen LLM and strategy.

---

## Advanced Topics

Once you're comfortable with the core modules, you can explore these advanced topics to build even more sophisticated and robust applications.

### 1. LangGraph
LangGraph is an extension of LangChain specifically designed for building stateful, multi-actor applications with LLMs. It allows you to define cyclical graphs, which are essential for agent-like behaviors where the flow is not strictly linear but can loop and branch based on decisions.

-   **Core Idea**: Represent your LLM application as a graph where nodes are functions (often performing some computation or calling an LLM/tool) and edges define the transitions between these functions based on the state.
-   **Key Concepts**:
    -   **StateGraph**: The primary class for defining your graph. It manages the application's state.
    -   **State**: A Pydantic `BaseModel` or a `TypedDict` that defines the structure of the data that flows through the graph and is updated by nodes.
    -   **Nodes**: Python functions or `Runnable`s that take the current state as input and return a dictionary to update the state.
    -   **Edges**: Define how to transition from one node to another.
        -   **Conditional Edges**: Decide the next node based on the output of the current node (e.g., if a tool was called, go to a tool execution node; if finished, go to an end node).
        -   **Normal Edges**: Always transition to a specific next node.
    -   **Entry Point**: The starting node of the graph.
    -   **Finish Point(s)**: Nodes that signify the end of a graph execution path.

-   **Why LangGraph for Agents?**
    -   Traditional `AgentExecutor` in LangChain can sometimes be a bit of a "black box" and harder to customize for complex looping or branching logic.
    -   LangGraph provides more explicit control over the agent's decision-making loop, state management, and transitions.
    -   It's excellent for building robust agents that might need to retry, re-plan, or involve multiple LLM calls in a structured way.

-   **Example: A Simple Agent-like Graph**
    This example will sketch out a graph that can decide to use a tool or respond directly.

    ```python
    from typing import TypedDict, Annotated, Sequence, Literal
    import operator
    from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage
    from langchain_openai import ChatOpenAI
    from langchain_core.tools import tool
    from langgraph.graph import StateGraph, END
    from langgraph.prebuilt import ToolInvocation, ToolExecutor # ToolExecutor helps run tools

    # --- 1. Define Tools ---
    @tool
    def get_weather(city: str) -> str:
        """Get the current weather for a given city."""
        if "paris" in city.lower():
            return "It's sunny in Paris!"
        elif "london" in city.lower():
            return "It's rainy in London."
        else:
            return f"Sorry, I don't have weather data for {city}."

    # --- 2. Define State --- 
    # The state will be passed around and updated by nodes.
    class AgentState(TypedDict):
        input: str # User's initial input
        messages: Annotated[Sequence[BaseMessage], operator.add] # Conversation history, new messages are added
        # `sender` will be used to route to the correct node after the LLM call
        sender: str 

    # --- 3. Define Nodes --- 
    # Nodes are functions that modify the state.

    llm_lg = ChatOpenAI(model="gpt-3.5-turbo")
    # Bind tools to the LLM for function calling (if using OpenAI functions agent style)
    llm_with_tools = llm_lg.bind_tools([get_weather])
    tool_executor = ToolExecutor([get_weather])

    # Node 1: The Agent (LLM call)
    def agent_node(state: AgentState):
        """Calls the LLM. Output can be a direct response or a tool call."""
        # print("--- AGENT NODE ---")
        # The LLM's response will be an AIMessage. 
        # If it contains tool_calls, it means the LLM wants to use a tool.
        response = llm_with_tools.invoke(state["messages"])
        # We clear the sender here to avoid issues if the LLM directly responds
        return {"messages": [response], "sender": "agent"}

    # Node 2: Tool Executor
    def tool_node(state: AgentState):
        """Executes tools called by the LLM and returns their output."""
        # print("--- TOOL NODE ---")
        # The last message should be an AIMessage with tool_calls
        ai_message = state["messages"][-1]
        tool_invocations = []
        if not isinstance(ai_message, AIMessage) or not ai_message.tool_calls:
            # print("No tool calls found in the last AI message.")
            # This case should ideally be handled by routing or a different state update
            # For simplicity, we'll just pass through, but a real agent might loop or error.
            return {"sender": "tool_direct_response_unexpected"} 

        for tool_call in ai_message.tool_calls:
            action = ToolInvocation(tool=tool_call["name"], tool_input=tool_call["args"])
            tool_invocations.append(action)
        
        responses = tool_executor.batch(tool_invocations, return_exceptions=True)
        tool_messages = [
            ToolMessage(content=str(response), name=tc["name"], tool_call_id=tc["id"])
            for tc, response in zip(ai_message.tool_calls, responses)
        ]
        return {"messages": tool_messages, "sender": "tool"}

    # --- 4. Define Edges (Conditional Logic) ---
    def should_continue(state: AgentState) -> Literal["tool_node", "__end__"]:
        """Determines the next step after the LLM call."""
        # print("--- ROUTER (should_continue) ---")
        last_message = state["messages"][-1]
        if isinstance(last_message, AIMessage) and last_message.tool_calls:
            # print("Decision: Route to TOOL_NODE")
            return "tool_node" # If LLM made a tool call, go to tool_node
        # print("Decision: Route to END")
        return "__end__" # Otherwise, end the process (LLM provided a direct answer)

    # --- 5. Construct the Graph ---
    # graph = StateGraph(AgentState)

    # Add nodes
    # graph.add_node("agent", agent_node)
    # graph.add_node("tool_node", tool_node)

    # Set entry point
    # graph.set_entry_point("agent")

    # Add conditional edges
    # graph.add_conditional_edges(
    #     "agent",         # Source node
    #     should_continue, # Function to decide the route
    #     {
    #         "tool_node": "tool_node", # If should_continue returns "tool_node", go to tool_node
    #         "__end__": END          # If it returns "__end__", finish.
    #     }
    # )

    # Add normal edge: After tool execution, always go back to the agent to process tool results
    # graph.add_edge("tool_node", "agent")

    # Compile the graph into a runnable LangChain object
    # app = graph.compile()

    # --- 6. Run the Graph ---
    # initial_input = "What is the weather like in Paris?"
    # print(f"\nInvoking LangGraph for: '{initial_input}'")
    # # The input to app.invoke must match the AgentState structure for the initial message
    # # We typically start with a HumanMessage
    # initial_state = {"messages": [HumanMessage(content=initial_input)], "input": initial_input}
    # final_state = app.invoke(initial_state, config={"recursion_limit": 10})
    # print("\n--- Final State ---")
    # print(final_state)
    # final_response = final_state["messages"][-1]
    # if isinstance(final_response, AIMessage):
    #     print(f"Final AI Response: {final_response.content}")
    # elif isinstance(final_response, ToolMessage):
    #      print(f"Final Tool Message (unexpected end): {final_response.content}")

    # print("\nInvoking LangGraph for: 'Hello!'")
    # initial_state_hello = {"messages": [HumanMessage(content="Hello!")], "input": "Hello!"}
    # final_state_hello = app.invoke(initial_state_hello, config={"recursion_limit": 10})
    # print("\n--- Final State (Hello) ---")
    # print(final_state_hello)
    # final_response_hello = final_state_hello["messages"][-1]
    # if isinstance(final_response_hello, AIMessage):
    #     print(f"Final AI Response: {final_response_hello.content}")

    # # To see the graph structure (requires matplotlib and pygraphviz or pydot)
    # # try:
    # #     from PIL import Image
    # #     import io
    # #     img_bytes = app.get_graph().draw_mermaid_png()
    # #     img = Image.open(io.BytesIO(img_bytes))
    # #     img.show() # This will open the image in your default image viewer
    # #     # img.save("langgraph_agent_structure.png")
    # # except Exception as e:
    # #     print(f"Could not draw graph: {e}. Ensure pygraphviz or pydot and matplotlib are installed.")
    ```

-   **Benefits of LangGraph**:
    -   **Explicit State Management**: Clear control over what information is passed between steps.
    -   **Cyclical Computations**: Naturally handles loops required by agents (e.g., LLM -> Tool -> LLM -> ...).
    -   **Modularity**: Nodes can be complex chains or simple functions.
    -   **Debugging**: Easier to trace the flow and inspect the state at each step.
    -   **Persistence**: Graph state can be more easily saved and loaded.
    -   **Human-in-the-loop**: Can explicitly define points where human input is required to proceed.

LangGraph is a powerful tool for building complex, agentic systems and is becoming the standard way to implement sophisticated agent runtimes in LangChain.

---

### 2. LangServe
LangServe helps you deploy LangChain runnables (chains, agents, etc.) as robust REST APIs. It makes it easy to expose your LangChain applications to be consumed by web frontends, mobile apps, or other backend services.

-   **Core Idea**: Take any LangChain `Runnable` and easily serve it with FastAPI.
-   **Features**:
    -   Automatically generates input and output schemas from your Runnable's Pydantic models or type hints.
    -   Provides endpoints for `invoke`, `batch`, and `stream` operations.
    -   Includes a built-in playground UI (similar to FastAPI's Swagger/OpenAPI docs) for interacting with your deployed chain.
    -   Supports streaming responses (e.g., token by token for LLMs).
    -   Can be deployed using standard Python web server tools like Uvicorn.

-   **Installation**:
    ```bash
    pip install langchain-cli # For the langserve command-line interface
    # or just add langserve to your project
    pip install langserve uvicorn # uvicorn for serving
    ```

-   **How to Use (`langchain app new` and `add_routes`)**:

    **Method 1: Using `langchain app new` (Recommended for new projects)**
    1.  **Create a new LangServe project structure**:
        ```bash
        # Ensure you have langchain-cli installed
        # pip install langchain-cli
        langchain app new my-langserve-app
        cd my-langserve-app
        ```
        This creates a directory with a `pyproject.toml`, an `app` folder containing `server.py`, and a `packages` folder.

    2.  **Define your chain in `packages/my_runnable/chain.py`** (or any runnable you create):
        ```python
        # In packages/my_runnable/chain.py (example)
        from langchain_openai import ChatOpenAI
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_core.output_parsers import StrOutputParser
        from pydantic import BaseModel

        # Define input schema for the chain (optional but good practice)
        class MyChainInput(BaseModel):
            topic: str

        prompt = ChatPromptTemplate.from_template("Tell me a short joke about {topic}.")
        model = ChatOpenAI()
        chain = prompt | model | StrOutputParser()
        
        # If you want to use the input schema, you can structure your chain like this:
        # chain = (
        #     RunnablePassthrough.assign(topic=lambda x: x["topic"]) # Assuming input is MyChainInput model
        #     | prompt 
        #     | model 
        #     | StrOutputParser()
        # ).with_types(input_type=MyChainInput)
        ```

    3.  **Expose your chain in `app/server.py`**:
        The `langchain app new` command usually sets up a default runnable. You'd modify `app/server.py` to import and serve *your* specific chain.
        ```python
        # In app/server.py
        from fastapi import FastAPI
        from langserve import add_routes
        from packages.my_runnable.chain import chain as my_joke_chain # Import your chain
        # from packages.my_runnable.chain import MyChainInput # Import your input schema if defined

        app = FastAPI(
            title="My LangServe App",
            version="1.0",
            description="A simple API server using LangServe",
        )

        # Add routes for your specific chain
        # The path will be /my-joke-chain/*
        add_routes(
            app,
            my_joke_chain, # Your runnable
            path="/my-joke-chain",
            # input_type=MyChainInput, # Specify if you have a Pydantic model for input
            # enable_feedback_endpoint=True, # To enable LangSmith feedback endpoint
            # enable_public_trace_link_endpoint=True # To share trace links
        )

        # You can add more chains/routes here
        # from langserve.pydantic_v1 import BaseModel # Use this for Pydantic v1 compatibility if needed
        # class PoemInput(BaseModel):
        #    subject: str
        # from langchain_core.runnables import RunnableLambda
        # def poem_func(inputs: PoemInput):
        #    return f"A poem about {inputs.subject} would be lovely."
        # poem_chain = RunnableLambda(poem_func).with_types(input_type=PoemInput)
        # add_routes(app, poem_chain, path="/poem-generator")

        if __name__ == "__main__":
            import uvicorn
            uvicorn.run(app, host="0.0.0.0", port=8000)
        ```

    4.  **Run the LangServe server**:
        From the `my-langserve-app` directory (where `pyproject.toml` is):
        ```bash
        # Install dependencies (if you added new ones or first time)
        # pip install -e .
        # pip install -e ./packages/my_runnable # If your runnable is a local package
        
        # Run using the LangChain CLI (recommended)
        langchain serve
        
        # Or directly with uvicorn if server.py is runnable
        # python app/server.py 
        ```
        This will typically start the server on `http://localhost:8000`.
        You can access:
        -   Playground: `http://localhost:8000/my-joke-chain/playground/`
        -   API docs: `http://localhost:8000/docs`
        -   Invoke endpoint: `POST http://localhost:8000/my-joke-chain/invoke`

    **Method 2: Manually adding routes to an existing FastAPI app**

    If you have an existing FastAPI application, you can integrate LangServe directly.

    ```python
    # In your existing main.py or a new server.py file
    from fastapi import FastAPI
    from langserve import add_routes
    from langchain_openai import ChatOpenAI
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser
    from pydantic import BaseModel # LangServe uses Pydantic v1 by default for FastAPI compatibility
                                  # If your FastAPI uses Pydantic v2, ensure compatibility or use
                                  # from langserve.pydantic_v1 import BaseModel as LangServeBaseModel

    # 1. Define your LangChain runnable
    prompt = ChatPromptTemplate.from_template("Generate a tagline for a company that makes {product}.")
    model = ChatOpenAI()
    tagline_chain = prompt | model | StrOutputParser()

    # 2. Define an input schema (optional, but good for typed endpoints)
    class TaglineRequest(BaseModel):
        product: str

    # 3. Create FastAPI app
    app = FastAPI(
        title="LangChain Tagline Server",
        version="1.0",
    )

    # 4. Add LangServe routes for your chain
    add_routes(
        app,
        tagline_chain.with_types(input_type=TaglineRequest), # Attach input type to the runnable
        path="/tagline",
        # You can also specify output_type if needed
    )

    # Example of another route with a different input type
    class EchoInput(BaseModel):
        text_to_echo: str
    
    from langchain_core.runnables import RunnableLambda
    def echo_func(inputs: EchoInput) -> str:
        return inputs.text_to_echo
    echo_runnable = RunnableLambda(echo_func)

    add_routes(
        app,
        echo_runnable.with_types(input_type=EchoInput),
        path="/echo"
    )

    # 5. Run with Uvicorn
    # if __name__ == "__main__":
    #     import uvicorn
    #     # Make sure OPENAI_API_KEY is in the environment where uvicorn runs
    #     uvicorn.run(app, host="0.0.0.0", port=8000)
    ```
    Save this as `my_manual_server.py` and run:
    ```bash
    uvicorn my_manual_server:app --reload
    ```
    Access playground at `http://localhost:8000/tagline/playground/` or `http://localhost:8000/echo/playground/`.

-   **Benefits of LangServe**:
    -   **Rapid Deployment**: Quickly turn any LangChain runnable into an API.
    -   **Standardization**: Provides consistent API structure (`invoke`, `batch`, `stream`).
    -   **Interactive Playground**: Easy testing and demonstration.
    -   **Streaming Support**: Handles streaming LLM outputs efficiently.
    -   **Async Support**: Leverages FastAPI's async capabilities.
    -   **LangSmith Integration**: Can easily enable feedback and public trace link endpoints for monitoring with LangSmith.

LangServe is the go-to solution for productionizing LangChain applications by exposing them as scalable web services.

---

## Tips & Best Practices

Here are some tips and best practices to help you build more effective, efficient, and robust LangChain applications.

### 1. Performance Optimization
-   **Choose the Right LLM**: Smaller, faster models can be sufficient for simpler tasks. Don't always default to the largest model if not needed, as it impacts latency and cost.
-   **Batching**: Use batch processing for LLM calls (`llm.generate()` or `chain.batch()`) when you have multiple independent inputs. This can significantly reduce overhead from network requests.
    ```python
    # from langchain_openai import ChatOpenAI
    # llm = ChatOpenAI(model="gpt-3.5-turbo")
    # prompts = ["Tell me a joke about cats.", "Tell me a joke about dogs."]
    # # results = llm.generate(prompts) # For multiple prompt inputs
    # # for i, generation_list in enumerate(results.generations):
    # #     print(f"Prompt {i+1}: {prompts[i]}")
    # #     print(f"Response: {generation_list[0].text}")
    ```
-   **Asynchronous Operations**: For I/O-bound tasks (like multiple API calls to LLMs or tools), use asynchronous methods (`chain.ainvoke()`, `chain.abatch()`, `llm.agenerate()`). This requires an async Python environment (e.g., using `asyncio`).
    ```python
    # import asyncio
    # from langchain_openai import ChatOpenAI
    # from langchain_core.prompts import ChatPromptTemplate
    # from langchain_core.output_parsers import StrOutputParser

    # async def run_async_chain():
    #     llm_async = ChatOpenAI(model="gpt-3.5-turbo")
    #     prompt_async = ChatPromptTemplate.from_template("Write a short story about a {animal}.")
    #     chain_async = prompt_async | llm_async | StrOutputParser()
        
    #     # Single async invocation
    #     # story = await chain_async.ainvoke({"animal": "brave squirrel"})
    #     # print(f"Async story: {story[:100]}...")

    #     # Batch async invocation
    #     inputs = [{"animal": "clever fox"}, {"animal": "wise owl"}]
    #     # batch_results = await chain_async.abatch(inputs)
    #     # for i, result in enumerate(batch_results):
    #     #     print(f"Async Batch Result {i+1} for {inputs[i]['animal']}: {result[:100]}...")

    # # To run the async function:
    # # asyncio.run(run_async_chain())
    ```
-   **Streaming**: For applications requiring real-time feedback (like chatbots), stream tokens from the LLM using `chain.stream()` or by setting `streaming=True` on the LLM and using a `StreamingStdOutCallbackHandler` or custom streaming logic.
-   **Caching**: Cache LLM responses to avoid redundant API calls for identical inputs. LangChain supports in-memory caching and integrations with external caches like GPTCache, Redis, or SQL-based caches.
    ```python
    import langchain
    from langchain.cache import InMemoryCache # Simple in-memory cache
    # from langchain.cache import SQLiteCache # Example: pip install langchain-community

    # Set up global caching (can also be set per LLM object)
    # langchain.llm_cache = InMemoryCache()
    # # langchain.llm_cache = SQLiteCache(database_path=".langchain.db")

    # from langchain_openai import ChatOpenAI
    # llm_cached = ChatOpenAI(model="gpt-3.5-turbo")

    # # First call (will hit API and cache the result)
    # # print("First call (should not be cached):")
    # # response1 = llm_cached.invoke("What is the capital of Japan?")
    # # print(response1.content)

    # # Second call with the exact same input (should be served from cache)
    # # print("\nSecond call (should be cached):")
    # # response2 = llm_cached.invoke("What is the capital of Japan?")
    # # print(response2.content)
    
    # # Clear cache if needed
    # # langchain.llm_cache.clear()
    # # print("\nCache cleared.")
    ```
-   **Retriever Optimization**: For RAG, ensure your retriever is efficient.
    -   Choose the right `k` value (number of documents to retrieve).
    -   Use MMR (`search_type="mmr"`) if diversity in retrieved documents is important.
    -   Consider pre-filtering metadata if applicable before vector search.
-   **Selective Tool Use**: In agents, design tools to be lightweight. If a tool is expensive, ensure the agent only calls it when absolutely necessary through good prompt engineering.

### 2. Error Debugging and Handling
-   **Verbose Mode**: Set `verbose=True` in chains, agents, or `AgentExecutor` to print detailed logs of execution steps. This is invaluable for debugging.
    ```python
    # from langchain_openai import ChatOpenAI
    # from langchain.agents import AgentExecutor, create_openai_functions_agent
    # from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
    # from langchain_core.tools import tool

    # @tool 
    # def get_length(s:str) -> int: """Returns length of string""" ; return len(s)
    # llm_debug = ChatOpenAI(model="gpt-3.5-turbo")
    # tools_debug = [get_length]
    # prompt_debug = ChatPromptTemplate.from_messages([
    #     ("system", "You are helpful."), 
    #     ("human", "{input}"), 
    #     MessagesPlaceholder(variable_name="agent_scratchpad")])
    # agent_debug = create_openai_functions_agent(llm_debug, tools_debug, prompt_debug)
    # agent_executor_debug = AgentExecutor(agent=agent_debug, tools=tools_debug, verbose=True)
    # # agent_executor_debug.invoke({"input": "how long is 'banana'?"})
    ```
-   **LangSmith Tracing**: As mentioned in Callbacks, LangSmith is the recommended tool for comprehensive tracing and debugging. It visualizes the entire lifecycle of your requests.
-   **Callbacks**: Implement custom callbacks to log specific information, errors, or intermediate states to your preferred logging system.
-   **`handle_parsing_errors`**: In `AgentExecutor`, set `handle_parsing_errors=True` or provide a custom function. This allows the agent to recover if the LLM output for a tool call is malformed, by sending the error back to the LLM for correction.
    ```python
    # agent_executor_parse_handling = AgentExecutor(
    #     agent=agent_debug, 
    #     tools=tools_debug, 
    #     verbose=True, 
    #     handle_parsing_errors="Sorry, I couldn't parse that action. Please try again." # Can be a string or a function
    # )
    # # This is harder to trigger with OpenAI functions agent as it's more structured,
    # # but crucial for ReAct or other text-completion based agents.
    ```
-   **Try-Except Blocks**: Wrap critical LangChain calls (especially LLM invocations or tool executions that might fail due to external factors) in try-except blocks for graceful error handling in your application code.
-   **Input Validation**: Validate inputs to chains and tools, especially if they come from external users, to prevent unexpected behavior or errors.

### 3. Cost Tracking and Management
-   **`get_openai_callback`**: For OpenAI models, LangChain provides a context manager `get_openai_callback` that tracks token usage and estimated cost for the operations within its scope.
    ```python
    from langchain_community.callbacks import get_openai_callback # Moved to langchain_community
    # from langchain_openai import ChatOpenAI

    # llm_cost = ChatOpenAI(model="gpt-3.5-turbo")
    # with get_openai_callback() as cb:
    #     # response_cost = llm_cost.invoke("Write a haiku about the sky.")
    #     # print(response_cost.content)
    #     # print("\n--- Cost & Token Usage ---")
    #     # print(f"Total Tokens: {cb.total_tokens}")
    #     # print(f"Prompt Tokens: {cb.prompt_tokens}")
    #     # print(f"Completion Tokens: {cb.completion_tokens}")
    #     # print(f"Total Cost (USD): ${cb.total_cost:.6f}")
        
    #     # # Example with a chain
    #     # from langchain_core.prompts import ChatPromptTemplate
    #     # from langchain_core.output_parsers import StrOutputParser
    #     # prompt_cost = ChatPromptTemplate.from_template("What is the main theme of {book_title}?")
    #     # chain_cost = prompt_cost | llm_cost | StrOutputParser()
    #     # chain_cost.invoke({"book_title": "1984"})
    #     # print("\n--- Chain Cost & Token Usage (cumulative in context manager) ---")
    #     # print(f"Total Tokens: {cb.total_tokens}") # Will be sum of both calls
    #     # print(f"Total Cost (USD): ${cb.total_cost:.6f}")
    ```
-   **LangSmith Monitoring**: LangSmith also provides detailed cost and token tracking for each traced run, which is very useful for production monitoring.
-   **Model Choice**: Be mindful of the cost differences between models (e.g., GPT-4 is significantly more expensive than GPT-3.5-Turbo). Use more expensive models judiciously.
-   **Prompt Length**: Shorter prompts use fewer tokens. Optimize your prompts for conciseness while maintaining effectiveness.
-   **Summarization Strategies**: For long documents, `map_reduce` or `refine` can be more cost-effective than trying to `stuff` everything if it requires a model with a very large (and expensive) context window.
-   **Agent Loops**: Be cautious with agents that can enter long loops of tool use, as each step (LLM call + tool call) incurs costs. Implement safeguards like `max_iterations` in `AgentExecutor`.
    ```python
    # agent_executor_max_iter = AgentExecutor(
    #     agent=agent_debug, 
    #     tools=tools_debug, 
    #     verbose=True, 
    #     max_iterations=3 # Stop after 3 iterations to prevent runaway costs/loops
    # )
    ```

### 4. Prompt Engineering Best Practices
-   **Be Specific and Clear**: The more precise your instructions, the better the LLM will understand and respond.
-   **Provide Context**: Give the LLM sufficient background information if the task requires it.
-   **Use Examples (Few-Shot Learning)**: For complex or nuanced tasks, providing a few examples of desired input/output pairs in the prompt (`FewShotPromptTemplate`) can significantly improve performance.
-   **Assign a Role**: Starting a system prompt with "You are a [role/persona]..." (e.g., "You are an expert Python programmer," "You are a helpful travel assistant") can help guide the LLM's tone and response style.
-   **Specify Output Format**: If you need the output in a specific format (e.g., JSON, Markdown, a list), explicitly ask for it. Use Output Parsers to structure the LLM's response.
-   **Iterate and Test**: Prompt engineering is often an iterative process. Test different phrasings, examples, and instructions to see what works best.
-   **Temperature Control**: Adjust the `temperature` parameter of the LLM. Lower values (e.g., 0.0-0.3) produce more deterministic, focused outputs. Higher values (e.g., 0.7-1.0) lead to more creative, diverse, but potentially less accurate responses.
-   **Chain of Thought (CoT) / ReAct Style Prompting**: For reasoning tasks, instruct the LLM to "think step by step" or use a format where it explicitly writes out its thought process before arriving at an answer (like in ReAct agents). This often improves reasoning quality.

### 5. Security Considerations (Especially with Agents and Tools)
-   **Tool Input Validation**: Sanitize and validate any input passed to tools, especially if it originates from user queries or LLM outputs.
-   **Restricted Tool Permissions**: If tools interact with external systems (databases, APIs, file systems), ensure they have the minimum necessary permissions.
-   **Code Execution Risks**: Be extremely cautious with tools that execute code generated by an LLM (e.g., `PythonREPLTool`). This can be a significant security vulnerability if not properly sandboxed and controlled.
-   **Prompt Injection**: Be aware of prompt injection attacks, where users might try to manipulate the agent by crafting inputs that override original instructions. While hard to completely prevent, careful prompt design and input sanitization can help mitigate.
-   **Data Privacy**: If handling sensitive data, ensure that it's not inadvertently leaked through prompts, LLM responses, or tool interactions. Be mindful of what data is sent to third-party LLM APIs.

---

