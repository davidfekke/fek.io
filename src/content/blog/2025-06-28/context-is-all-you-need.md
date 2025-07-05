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

