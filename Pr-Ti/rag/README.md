# Document Assistant (RAG Streamlit App)

This project is a simple Retrieval-Augmented Generation (RAG) application built with Streamlit and LangChain. It lets you ask questions about a PDF document and get AI-generated answers based on the content of the PDF.

## Features

- Load and process PDF documents
- Split documents into smaller chunks for efficient embedding
- Build and persist a Chroma vector database using Ollama embeddings
- Generate multiple query variants for robust retrieval
- Chat-based answer generation with Ollama LLM
- Interactive web interface powered by Streamlit

## Prerequisites

- Python 3.10 or higher
- [Streamlit](https://streamlit.io)
- [LangChain](https://github.com/langchain-ai/langchain)
- [LangChain Community Extensions](https://github.com/langchain-community)
- [LangChain Ollama](https://github.com/langchain-ollama)
- [Ollama CLI](https://ollama.com/)
- `unstructured`, `PyPDF2` or `pdfminer.six` for PDF parsing
- [Chroma DB](https://github.com/chroma-core/chroma)

Dependencies are listed in `pyproject.toml` under the `[project.dependencies]` section.

## Installation

1. Clone the repository and navigate to the project folder:

   ```bash
   git clone <repository-url>
   cd Pr-Ti/rag
   ```

2. (Optional) Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   # On Linux/Mac:
   source .venv/bin/activate
   # On Windows:
   .venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install --upgrade pip
   pip install streamlit langchain langchain-community langchain-ollama ollama unstructured pdfminer.six chromadb
   ```

## Usage

1. Place your PDF file in the `data/` directory (default path is `data/BOI.pdf`).
2. Run the Streamlit app:

   ```bash
   streamlit run rag.py
   ```

3. Open your browser and go to `http://localhost:8502`.
4. Enter your question in the input field and view the AI-generated response.

## Configuration

You can adjust the following constants at the top of `rag.py` to customize the app:

- `DOC_PATH`: Path to the PDF file (default: `./data/BOI.pdf`)
- `MODEL_NAME`: Ollama model name (default: `deepseek-r1:7b`)
- `EMBEDDING_MODEL`: Ollama embeddings model (default: `mxbai-embed-large:latest`)
- `VECTOR_STORE_NAME`: Name for the Chroma collection (default: `simple-rag`)
- `PERSIST_DIRECTORY`: Directory where the vector DB is stored (default: `./chroma_db`)

## License

This project is open source under the MIT License.
