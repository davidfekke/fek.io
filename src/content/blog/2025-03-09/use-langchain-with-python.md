---
title: "Use Langchain with Python"
tags: ["Lanchain", "Python"]
description: "Use Langchain with Python"
category:
date: 2025-03-09
cover_image: "./langchainpython.png"
---

I recently did a presentation for the local Python user group on how to use [Langchain](https://langchain.com). Langchain is available in TypeScript/JavaScript as well as in Python. 
I did a previous presentation using the TypeScript framework, but I agreed to do a presentation for the Python user group because most ML and AI projects today usually start off as Python projects. 

I personally believe that if you are serious about doing ML or AI, you should use Python as your default language.

## The State of AI in 2025

### Deepseek: A New Contender?
Deepseek, a company that originated as a **hedge fund**, has made waves by introducing an **open-source AI model** on par with OpenAI and Anthropic. Some key facts about Deepseek:

- It **spent $1 billion** on infrastructure to support AI research.
- Used **"distillation"** to train their model efficiently.
- Adopted **Mixture-of-Experts (MoE)** for dynamic load balancing and **optimized inter-GPU communication** without CUDA.
- Their model functions similarly to OpenAI’s **o3**, focusing on reasoning rather than just text generation.

### OpenAI’s Latest Models: o1 and o3



0
OpenAI continues to push the boundaries of AI with its **o1 and o3 models**. Unlike traditional LLMs, these are **reasoning models**, designed to solve problems more logically with fewer hallucinations. However, they may not be as **creative** as earlier models.

### Google’s Gemini 2.0 Flash
Google has released **Gemini 2.0 Flash**, an advanced AI model that supports:

- Over **1 million tokens** of context.
- An **8k token output limit**.
- A dedicated **reasoning mode**.
- Accessible through the **Gemini API**.

## LangChain: Building AI-Powered Applications

LangChain is a powerful framework designed to **combine LLMs with structured data, prompt engineering, and function execution**. It provides an extensive toolkit for building AI applications that can **retrieve relevant data, process text, and interact dynamically with users.**

### Why Use LangChain?

- Supports **multiple LLMs**, including OpenAI’s GPT models, Google’s Gemini, Meta’s Llama, Anthropic’s Claude, and more.
- Helps build **Retrieval-Augmented Generation (RAG) apps**.
- Offers **vector database support** for efficient storage and retrieval of information.
- Provides **text processing** tools for handling large datasets.
- Enables developers to **chain prompts, data, and models** effectively.

## Getting Started with LangChain in Python

To install LangChain, use:

```bash
pip install langchain openai
```

### Basic LangChain Usage

Here’s a simple example of how to use LangChain with OpenAI's GPT model:

```python
from langchain.llms import OpenAI

llm = OpenAI(model_name="gpt-4", openai_api_key="your-api-key")
response = llm("What are the latest trends in AI?")
print(response)
```

## Understanding Retrieval-Augmented Generation (RAG)

Training an LLM from scratch is **prohibitively expensive**, and even fine-tuning pre-existing models can be costly. **RAG (Retrieval-Augmented Generation) is an alternative approach that enhances LLMs without expensive retraining.**

### How RAG Works:

1. **Document Storage:** Text data is pulled from various sources and stored in a **vector database**.
2. **Chunking & Indexing:** Documents are **split into smaller sections** (chunks) for efficient retrieval.
3. **Embedding Creation:** These chunks are converted into **numerical embeddings** using models like OpenAI’s embedding API.
4. **Retrieval:** When a user asks a question, the **most relevant embeddings** are fetched and passed as context to the LLM.
5. **Response Generation:** The LLM uses the retrieved context to generate **accurate and context-aware responses**.

### Implementing RAG in LangChain

```python
from langchain.document_loaders import TextLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# Load document
loader = TextLoader("data.txt")
docs = loader.load()

# Convert to embeddings
embedding_function = OpenAIEmbeddings(openai_api_key="your-api-key")
vector_store = FAISS.from_documents(docs, embedding_function)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(model_name="gpt-4", openai_api_key="your-api-key"),
    retriever=vector_store.as_retriever()
)

# Ask a question
question = "What is LangChain?"
response = qa_chain.run(question)
print(response)
```

## Vector Databases: The Backbone of RAG

Vector databases are critical for implementing **RAG-based AI applications**. Some popular options include:

- **Pinecone**
- **Chroma**
- **Supabase**
- **Weaviate**
- **Azure Cosmos DB with vector search**
- **PGVector (PostgreSQL extension for storing embeddings)**

## Running LLMs Locally with Ollama

For those looking to run models locally, **Ollama** is an excellent option:

```bash
# Install Ollama
yes | brew install ollama

# Run Llama model
ollama run llama2
```

## OpenAI API Compatibility
Ollama provides an **OpenAI-compatible API**, allowing you to interact with models using familiar endpoints:

```python
import requests

response = requests.post("http://localhost:11434/v1/chat/completions", json={
    "model": "llama2",
    "messages": [{"role": "user", "content": "What is LangChain?"}]
})
print(response.json())
```

## Conclusion
LangChain is an incredibly powerful framework for AI application development. By leveraging **chaining mechanisms, vector databases, and retrieval-augmented generation (RAG),** developers can create context-aware and efficient AI applications. Whether you're working with OpenAI, Meta’s Llama, or other open-source models, **LangChain provides the flexibility and tools needed to integrate AI into your projects.**

### Additional Resources
- **Source Code**: [GitHub Repo](https://github.com/davidfekke/langchain-pyjax)
- **LangChain Documentation**: [LangChain.com](https://langchain.com)

🚀 *Ready to build your AI-powered application? Dive into LangChain today!*
