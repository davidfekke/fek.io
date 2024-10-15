---
title: "LangChain for JavaScript part 1"
tags: ["LangChain", "Node.js", "LLM", "JavaScript"]
description: ""
category: 
date: 2024-02-22
cover_image: "./c73d2b2e-31cb-4a0d-acab-bf7ed830f50a.png"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/y3VmQVztTeQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

If you are not already familiar with [LangChain](https://js.langchain.com/), it is a framework for chaining large language models, data and functions to create context aware AI software and agents. 
The company behind LangChain has two official frameworks, one in Python, and the other in JavaScript. When you see LangChain examples online, they are usually in Python, 
which has become the defacto standard language for writing machine learning and AI applications.

I have decided to do a series of blog posts on writing LangChain applications using JavaScript and Node.js to show that you can write these AI applications with JavaScript as well as Python.

## Writing a basic LangChain app

The simplest example of a LangChain is simply prompting a Large Language Model for a response. For this example I am going to [OpenAI](https://openai.com). OpenAI's GPT models are the most popular LLMs right now, but you can use LangChain with most LLMs, proprietary and open source.

For this example, we will need create a chat model, a prompt and an output parser. We will ask the model to query OpenAI for a mathematical formula for converting Fahrenheit temperature to Celsius.

## Create an OpenAI token

To use the OpenAI API, you have to have an OpenAI API key. Log into the [openai.com](https://openai.com) website. You will be prompted to select either ChatGPT or API. Select API. Once the API page loads, there will be a side menu on the left with a lock icon. Select the lock icon. This opens the API Keys page. Click on the `Create new secret key` button. Give your key a name and set permissions. 

Once you have created a key, make a copy of it, and do not share it or place it on a public place. OpenAI charges per token. You can also put a rate limit so you do not have to worry about getting overcharged. If your key is exposed, you can always revoke the key if you need to.

## Create a Node.js app

The next thing we need to do is create a new node application. You will need to have a supported version of Node.js installed on your computer. Create a folder for your app, and run the following commands to initialize the app:

```shell
$ npm init -y
$ npm install dotenv @langchain/openai @langchain/community
```

These two commands initialize a new Node.js app in your folder. The second command installs three modules that we will use in our application. The first module, dotenv, we will use for loading our environment variables. The next two are the LangChain OpenAI and community modules.

Now that these modules are installed, lets create two files in your application folder, one will be `.env`, and the other will be called `promptopenai.js`. There is also a file called `package.json` in the folder. We will need to add a key to the json for using type module.

```json
{
  "name": "langchaindemo",
  "version": "1.0.0",
  "description": "",
  "main": "promptopenai.js",
  "type": "module",
  "scripts": {
    "start": "echo promptopenai.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@langchain/community": "^0.0.27",
    "@langchain/openai": "^0.0.14",
    "dotenv": "^16.4.4"
  }
}

```

In our `.env` file, lets create a line for storing the OpenAI API key. We will use the `dotenv` module to load an environment variable called `OPENAI_API_KEY` with our API key value. 

```text
OPENAI_API_KEY=<Your_API_Key_goes_here>
```

Now lets add the code to our `promptopenai.js` file for prompting the GPT model with our question?

```javascript
import * as dotenv from 'dotenv';
dotenv.config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
  ["human", "What is the mathematical formula for converting Fahrenheit temperature to Celsius?"],
]);
const model = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const stream = await chain.stream();

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
```

This program should create a result that looks like the following:

```shell
To convert Fahrenheit temperature to Celsius, you can use the following formula:

Celsius = (Fahrenheit - 32) x 5/9 

So, to convert a temperature from Fahrenheit to Celsius, subtract 32 from the Fahrenheit temperature and then multiply the result by 5/9.
```

To make this program a little more useful, we could modify it answer a question about what the temperature is in Celsius.

```javascript
import * as dotenv from 'dotenv';
dotenv.config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const prompt = ChatPromptTemplate.fromMessages([
  ["human", "What is temperature in Celsius if the Fahrenheit temperature is {fahrenheitTemp}?"],
]);
const model = new ChatOpenAI({ temperature: 0 });
const outputParser = new StringOutputParser();

const chain = prompt.pipe(model).pipe(outputParser);

const stream = await chain.stream({
    fahrenheitTemp: "68"
});

for await (const chunk of stream) {
    process.stdout.write(chunk, 'utf-8');
}
```

This should give us an answer like the following:

```shell
The temperature in Celsius can be calculated using the formula:

Celsius = (Fahrenheit - 32) / 1.8

Plugging in the Fahrenheit temperature of 68:

Celsius = (68 - 32) / 1.8
Celsius = 36 / 1.8
Celsius = 20

Therefore, the temperature in Celsius is 20 degrees.
```

If we look at this program we can see that we create objects for `ChatOpenAI`, one for a prompt template and one for the `StringOutputParser`. The prompt template allows to set up reusable parameters that we can use to pass into the prompt like a function. In the second example I set up a parameter for the temperature in Fahrenheit.

We then create a `chain` object by piping the prompt into the chat model, and then into the output parser.

The chain lets us invoke an answer from the chat model, but in the example above I chose to stream the results. Since it can take a while for the inference of some of these LLMs to return an answer, you can provide a better user experience by using a stream so that user can get immediate feedback while the LLM works on completing the answer.

## Conclusion

This is a very basic example of what we can do with LangChain, but by using LangChain to write this program, we can easily swap out one chat model for another. So if I want to use Gemini or Claude for my chat model, I can replace just that portion of the program.

The JavaScript LangChain framework is written in TypeScript, and uses reusable interfaces for all of these objects, making it easier for us to inject different solutions such as swapping one LLM for another.