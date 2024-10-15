---
title: "LangChain for JavaScript part 2"
tags: ["LangChain", "Node.js", "LLM", "JavaScript"]
description: ""
category: 
date: 2024-02-26
cover_image: "./2a8fc31f-5d43-4088-95c6-0bf84e20b407.png"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/kX9CxSRB2T0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

In a previous [post](../lang-chain-for-java-script-part-1), I wrote about LangChain for JavaScript, and gave a simple example of how to send a prompt to OpenAI's GPT Chat model using LangChain for JavaScript. In this post I plan on showing how you can parse a document, 
and pass the document as context into a prompt to get a more relevant answer from the chat model.

LangChain comes with a series of classes you can used to read, process and split a document into chunks of data that can then be stored in a vector database or memory, and passed as context in a prompt that will be sent to a chat model.
The reason why you would want to read a document and pass the relevant information into a chat model has to do with making sure the LLM model has the most accurate information.

If you have used LLMs like ChatGpt, one of the things you might see in an answer is the model was only updated to a certain date and time. Even if the data you are working with occurred before the cutoff date, the LLM might not have been trained on that data.

Applications that work with private data and a LLM like this are referred to as a RAG application. RAG stands for Retrieval Augmented Generation. Most Language models like GPT and open source models can be pre-trained or fine tuned on private data, but this is a time consuming, and expensive process.

## Reading a Text document

LangChain can read many different documents types including, PDF, Text, JSON and CSV files. You can also create custom loaders for other document formats. 

Once a document is loaded, it can be split using a TextSplitter. TextSplitters are used to split the document up into more manageable chunks. These chunks can then be converted into a vector or embedding that can be stored in a vector database or memory. There are different kinds of TextSplitters, including ones for code like Python or JavaScript, as well as recursive and character TextSplitters.

For this example, we are going to import a text document which contains a collection of all of the contents from a blog. We will use a recursive TextSplitter to break the single text file into multiple documents.

```javascript
import { Document } from "@langchain/core/documents";
import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const outputText = await fsp.readFile('./blogcontent.txt', 'utf8');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: outputText }),
]);

console.log(docOutput);
```

Our `docOutput` result will contain an array of documents. The result might look like the following if viewing from the `console.log`.

```shell
[
  Document {
    pageContent: 'I normally do not use my posts to rant about anything because I find that boring in most cases, but I have decided to speak up about something I have noticed about the way companies are treating applicants for technical roles.',
    metadata: { loc: [Object] }
  },
  ...
]
```

The `RecursiveCharacterTextSplitter` takes an object as a parameter that has two properties, `chunkSize` and `chunkOverlap`. The chunk size will be the character length for each chunk. The chunk overlap can set a buffer size between the current chuck of text and the next chunk of text. The overlap allows the chunks to maintain some context when splitting the document up. When you eventually use a retriever to lookup these documents and return them, this can be helpful so the LLM has text that might have been cut off in the splitting process.

## Storing documents in a Retriever

LangChain has an API called a Retriever that can be used to store and retrieve documents. Retrievers are usually tied to a database solution, namely a database that can store vector data. More on that later. A retriever does not have to use a database. LangChain has a document store retriever called `HNSWLib` that does not require the use of a third party database.

```javascript
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";

// Load the docs into the vector store
const vectorStore = await HNSWLib.fromDocuments(docOutput, new OpenAIEmbeddings());

// Search for the most similar document
const result = await vectorStore.similaritySearch("Tech Hiring process", 1);
console.log(result);
```

In the example above we are using HNSWLib to store our documents from the previous example into a `VectorStore` using `OpenAIEmbeddings`. The `Embeddings` have an interface that can tie into many different AI systems. [OpenAI](https://openai.com) has their own embedding API for creating vectors that correspond with the OpenAI language model. These embeddings or vectors get stored with the documents. The vectors make it easier to search and retrieve documents based on the numerical data in the vector.

## Vectors

Vectors or embeddings are actually a mathematical representation of the text in a document. If you look at an actual vector, it is simply an array of floating point numbers. OpenAI's embeddings are a floating point array with a length of 1536 values. Llama 2's default embedding is an array of 4096 floating points in length. Each AI vendor can design a model that corresponds to different vectors. Think of the values in the array to approximating similarities to the meanings of certain words. Each token is assigned a numerical value. Certain words or tokens have varying amount of closeness to other tokens. So a token for `bike` may be very close to `bicycle`, but would be further away in closeness to a token for something like `tree`.

A recent tool called [Nomic](https://home.nomic.ai/) was released with their own embedding API based on an array 756 values in length. Check out their description of how it work [here](https://blog.nomic.ai/posts/nomic-embed-matryoshka).

The main point here is that you do not have to use a specific embedding model, you can pick and choose which one you want to use based on performance and cost. There are also open source embedding tools you can use as well. LangChain makes it very easy to swap out different embedding models. If you do decide to switch to a different embedding model, you will have to regenerate new embeddings for any documents that you already have stored.

## Passing context into a chat model

Now that we have our documents in a vector store, we can pass associated documents into our prompt to get context specific answers from the LLM. If you are using a LLM like OpenAI's ChatGPT, you can pass embeddings in their API to get context specific results, but you can also pass the document text in the prompt.

Using this second approach makes it easier to decouple you documents and vectors from a specific vendor avoiding vendor lock in. Here is an example of how we can pass the context into a prompt using LangChain.

```javascript
import { Document } from "@langchain/core/documents";
import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const outputText = await fsp.readFile('./blogcontent.txt', 'utf8');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

const docOutput = await splitter.splitDocuments([
    new Document({ pageContent: outputText }),
]);

// Load the docs into the vector store
const vectorStore = await HNSWLib.fromDocuments(docOutput, new OpenAIEmbeddings());

// Search for the most similar document
const result = await vectorStore.similaritySearch("Tech Hiring process", 1);
const blogSection = result[0].pageContent;

const prompt = ChatPromptTemplate.fromMessages([
    ["human", `What is this blog posts assessment of the current state of tech hiring.  
    
Blog context: {blogContext}?`],
]);
const model = new ChatOpenAI({ temperature: 0 });
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const stream = await chain.stream({
    blogContext: blogSection
});

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
```

This will stream a response based on the context that was retrieved from our vector store. This is probably the most basic example of a `RAG` application, and this is one of the more popular uses of LangChain.

## Conclusion

By utilizing some of the basic features in LangChain, we were able to load a document into a vector store, perform a basic similarity search to return just the data we needed from our documents, and pass that as context into OpenAI's language model. This is a very basic example of how to use LangChain to load, process and retrieve documents. In future posts I intend to show you can load a document or many documents into an actual database for RAG applications.
