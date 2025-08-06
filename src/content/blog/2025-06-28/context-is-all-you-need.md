---
title: "Context is all You Need"
tags: ["Model Context Protocol", "Node.js", "AI", "LLM", "MCP"]
description: "How to run the Next.js dev server under https"
category:
date: 2025-06-28
cover_image: "./attention.png"
---

I recently gave a presentation to a user group about how to build and consume Model Context Protocol servers. Model Context Protocol, or MCP for short, is the latest AI buzz word. 
In this post I will try to explain why MCP is so important to AI development. To truly understand why, we need to understand some history of large language models.

ChatGPT probably became the first large language model that the average user became aware of in mass, but it was not the first. 
Google's DeepMind actually came up with the idea and published a paper called [Attention is all you need](https://en.wikipedia.org/wiki/Attention_Is_All_You_Need) back in 2017. 
In the paper, they defined the attention and transformer architecture used in the current large language models.

## Limitations in current LLMs

As capable as most of the modern models are, they all have limitations. One of these limitations is the data that the models were trained on. 
Most of the current frontier models, they try to train them on as much information as they can use from the public internet. 
This training data is not always up date. If you consider posts on software, a lot of those document older frameworks that may not be the current standard.
Another issue is the these models are only trained to a certain point in time, like maybe over a years ago.

Another limitation is hallucinations. Many LLMs will start to hallucinate when they do not have the correct information in the model to answer the prompt. 
This can be exacerbated when you have a high temperature setting. Having a lower number for your temperature will reduce the creativity of the model.

## Tool calling

There are tricks we have been using to get around these limitations like retrieval augmented generation. Over the last year most of the models now support tool calling.
Tool calling is the ability the model has to access other data and APIs that are explicitly registered with the model.

When you register a tool with the model, the model now knows that it can can call an API or look up a resource for additional context when trying to answer a prompt.

Most modern LLMs support tool calling, so you can use this technique with Claude, OpenAI's GPT models, Llama, Gemini and Mistral.

## The advantage of Model Context Protocol

With modern LLMs now supporting tool calling, MCP lets us have a standard way of implementing a tool, and using with all of the different AI models and frameworks that support MCP.

In this post I will show how to implement a simple MCP server that can retrieve aviation weather data for pilots. This is a good example of a MCP server because most LLMs do not have a real time access to this kind of information. I will also show how to implement a MCP client to retrieve information from the MCP server.

## Structure of a MCP Server

For my examples I will use Node.js to create the client and server. Node is great way to create and prototype servers like this, but MCPs can be written in almost any programming language.

The basic structure of a MCP server is definition for the server. The server can have tools, prompts and resources.

The tools are exactly like what they sound like, they are tools that can be consumed by an LLM. Think of these as a way of providing dynamic data to a LLM. Prompts are a way of predefining prompts that can be parameterized and used in your AI applications. Resources provide more static data for your LLM. If you have simple lists of data that are more static, this is a good way of providing that data to a LLM.

## Creating the MCP Server

If you do not have Node.js installed, do that before performing the next step. To start this just need a blank folder:

```sh
$ mkdir avwxmcpstdio
$ cd avwxmcpstdio
$ npm init -y
$ npm install @modelcontextprotocol/sdk zod
```

These commands will create a new directory called `avwxmcpstdio`, and change the directory to that directory. The `npm init -y` will initialize the Node.js program in this folder. The last command will install the MCP sdk and `zod` for validation.

Now that are project is created, we can create our first javascript file. We will call it `index.js`. Add the following imports to the index.js file:

```js
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
```

Now let's add a definition for our MCP server:

```js
// Create an MCP server
const server = new McpServer({
  name: "Aviation Weather",
  description: "A server that provides aviation weather information.",
  version: "1.0.0"
});
```

Now that we have defined the McpServer, we can start adding tools. For the first tool we are going to create a tool that retrieves the current weather at a reporting point.

```js
server.tool("get_aviation_weather",
  "A tool to get aviation weather information in a METAR format",
  { location: z.string().length(4).describe("The ICAO code of the airport") },
  async ({ location }) => {
    // Simulate a weather API call
    const weatherApiResponse = await fetch(`https://avwx.fekke.com/metar/${location}`);
    const weatherData = await weatherApiResponse.json();
    return {
      content: [{
        type: "text",
        text: JSON.stringify(weatherData[0], null, 2)
      }]
    };
  }
);
```

In the example above we can see that their is a signature for the `tool` function that is taking four parameters. The parameters are the tool name, description of the tool, input parameter validated by zod and the actual handling function. 

For the description parameter, the better that you can define this, the better the LLM will perform when deciding to use this function. This provides the LLM the context it needs to be able to call the tool.

The handling function can be asynchronous and returns a content array. In our example above we are specifying an array with one item that returns `text`. For our text, we are taking a JSON result, and stringifying the result.

We are also going to add a tool for getting the weather forecast for a particular reporting point.

```js
server.tool("get_aviation_weather_forecast",
  "A tool to get aviation weather forecast information in a TAR (Terminal Area Forecast) format",
  { location: z.string().length(4).describe("The ICAO code of the airport") },
  async ({ location }) => {
    // Simulate a weather API call
    const weatherApiResponse = await fetch(`https://avwx.fekke.com/taf/${location}`);
    const weatherData = await weatherApiResponse.json();
    return {
      content: [{
        type: "text",
        text: JSON.stringify(weatherData[0], null, 2)
      }]
    };
  }
);
```

## Testing your MCP Server

To test the McpServer, we can use the free MCP Inspector from the framework. We will add the following script to launch the inspector. Open your package.json file, and add the following to your scripts:

```json
"scripts": {
  "start": "node index.js",
  "inspector": "npx @modelcontextprotocol/inspector node index.js"
},
```

We can run the inspector by using the following command:

```sh
$ npm run inspector
```

This will create web server we can open up in our web browser with the inspector. Once the inspector is open, connect to the MCP using the connect button. If it connects successfully, their should be a tab at the top of the page called `tools`. You should see the two tools we defined in the McpServer in our index.js file. 

Select one of the tools, and pass a location. The location should be in the form of a four letter ICAO code. If you live in Orlando, you can pass `KMCO` for the Orlando international airport.

The response should be output in the serialized JSON from the web service.

## Conclusion

You can see from the example above, it is really easy to create an MCP Server. In my next post, I will describe how to use this MCP we just created with Langchain, an AI framework for building AI agents.