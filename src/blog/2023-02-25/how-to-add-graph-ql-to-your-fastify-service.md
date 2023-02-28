---
layout: post
title: "How to add GraphQL to your Fastify service"
description: ""
category: 
date: 2023-02-25
cover_image: "./fastify-mercurius.png"
---

I recently needed to add a GraphQL endpoint to an existing [Fastify](https://www.fastify.io/) service. I have worked with Apollo before which has a way of hosting on top of an Express service. 
There may be a way of hosting Apollo on top of Fastify service, but I have not found a way to do this with the existing version of Fastify.

There is a Fastify plugin for apollo, but it works with older versions of Fastify. In fact if you follow the link to the plugin, it takes you to a [404 page](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-fastify).

It turns out that Fastify has a pretty good solution for hosting a GraphQL service through a tool called [Mercurius](https://mercurius.dev/#/).

In this post I will show how you can take an existing Fastify service, and add a GraphQL endpoint.
