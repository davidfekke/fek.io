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

## Example Fastify Rest Endpoint

Let us take a look at existing Fastify server.

```javascript
// Require the framework and instantiate it
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Declare a route
fastify.get('/books', (req, reply) => {
    reply.send([
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 3, title: '1984', author: 'George Orwell' },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
      { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
      { id: 6, title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez' },
      { id: 7, title: 'Moby-Dick', author: 'Herman Melville' },
      { id: 8, title: 'War and Peace', author: 'Leo Tolstoy' },
      { id: 9, title: 'The Odyssey', author: 'Homer' },
      { id: 10, title: 'The Divine Comedy', author: 'Dante Alighieri' },
    ])
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};
start();
```

# Adding Mercurius to Fastify

The next step is to use NPM or Yarn to add Mercurius.

```bash
> npm i mercurius
```

Now add the following code to your Fastify server.

```javascript
const mercurius = require('mercurius')

fastify.register(mercurius, {
  schema: `
    type Book {
      id: ID!
      title: String!
      author: String!
    }

    type Query {
      books: [Book!]!
    }
  `,
  resolvers: {
    Query: {
      books: async () => {
        const res = await fastify.inject({
          method: 'GET',
          url: '/books'
        })
        return res.json()
      }
    }
  }
})
```