---
title: "Running Next.js on Azure App Services"
description: ""
category: 
date: 2019-05-20
cover_image: "./nextjs-azure.png"
---

## How to run your Next.js app on Azure

I recently gave a presentation on building universal apps using [Next.js](https://nextjs.org) and 
[Express.js](https://expressjs.com). Next.js is a framework from the great people at [Zeit.co](https://zeit.co).

Zeit is a great hosting platform, but I am working on a project that is already using resources on the Azure platform, so I decided to host it there instead of at Zeit or another platform as a service.

I ran into a problem when I tried to deploy my Next.js app on Azure App Services. Azure already provides a several ways of deploying apps using continuous integration through git repos. You can configure your app service to pull from your repo every time a change is pushed. 
The problem is that you have to specify a `port`. Here is how you can configure a `port` in your code and package.json.

The express part of your express app needs to be able use port provided Azure. Make the following change to your Express app;

```javascript
// server.js

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Your app will get the Azure port from the process.enc.PORT
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
```

In your `package.json` will need to have the following script changes to build and host your Next.js app on Azure;

```javascript
"scripts": {
      "dev": "next",
      "build": "next build",
      "start": "next start -p $PORT",
      "postinstall": "next build"
  },
```

The two important scripts are the `start` and `postinstall` parts. The `start` will need to have the `-p $PORT`. I also added a `postinstall` script. Many hosts now use the `npm run postinstall` when you deploy your app.

I hope this helps you if you are trying to host your Next.js app on Azure app services.