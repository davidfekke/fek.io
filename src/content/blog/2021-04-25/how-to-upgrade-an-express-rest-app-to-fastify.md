---
title: "How to upgrade an Express REST app to Fastify"
description: ""
category: 
date: 2021-04-25
cover_image: "./expressjs-to-fastify.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/RDxTlkzrnN8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

A while back I wrote a quick and dirty aviation weather proxy for the FAA's weather service. The existing weather service returns the data in an XML format. So I created an express app that proxies two of the web methods from that service so they will return JSON instead of XML.

The original proxy service I wrote is a simple [express](https://expressjs.com/) app. Last year during the start of the pandemic I started looking at alternate frameworks. [Fastify](https://fastify.io) has become increasingly popular of the last couple of years. 

![Fastify Logo](./fastify-olive-logo.png)

Fastify is also a more modern framework for writing web apps. It has some unigue features like JSON schemas for the request and response. It also has its own JSON parser. The one used by express is the default parser used in V8.

Here is what the original express app looks like for hosting those two methods;

```javascript
const express = require('express');
const axios = require('axios');
const parser = require('fast-xml-parser');
const cors = require('cors');

const port = process.env.PORT || '3000';
const app = express();

app.use(cors())

app.get('/metar/:icaoidentifier', (req, res) => {
    axios.get(`https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${req.params.icaoidentifier}&hoursBeforeNow=2`).then(xml => {
        const jsonObj = parser.parse(xml.data);
        if (jsonObj.response.data.METAR.length > 0) {
            res.json(jsonObj.response.data.METAR);    
        } else {
            res.json(jsonObj.response);
        }
    }).catch(err => {
        res.json(err);
    });
});

app.get('/taf/:icaoidentifier', (req, res) => {
    axios.get(`https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=${req.params.icaoidentifier}&hoursBeforeNow=4`).then(xml => {
        const jsonObj = parser.parse(xml.data);
        res.json(jsonObj.response.data);
    }).catch(err => {
        res.json(err);
    });
});

app.use(function (req, res) {
    res.status(404).send('404');
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
```

As you can see from this example, I am using `axios` as my HTTP client. I prefer axios over node-fetch because of some of the options available to axios, and that it does not require resolving two promises.

# Upgrading to Fastify

The first change I wanted to make was to use the new module import syntax over the commonjs `require` nethods for importing in my modules. You can turn this on by default in version of node.js 14 and later by adding the following key to your `package.json`.

```json
"type": "module"
```

Node.js still defaults to 'commonjs' if you do not specify a type in the `package.json`.

## Adding Fastify Module

Now you can use NPM or YARN to add the Fastify module. I am also using CORS, so we can add this and update our package.json file for these dependencies at the same time by running the following command;

```bash
> npm i fastify fastify-cors --save
```

Here I am using the shortcut of `i` for `install`, and I am using NPM's `--save` flag to save both modules to the `package.json` file. Your `package.json` file should have the following module in the `dependency` section.

```json
    "axios": "^0.18.0",
    "cors": "^2.8.5",
    "express": "^4.16.3",
    "fast-xml-parser": "^3.12.5",
    "fastify": "^3.15.0",
    "fastify-cors": "^5.2.0"
```

## Adding the Import statements to our App

Add the following import statements to the beginning of our app.

```javascript
import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import axios from 'axios';
import * as parser from 'fast-xml-parser';
```

At this point we can create our `Fastify` object and register any plugins that we will need in our app. Previously I was using CORS, so I will register that plugin once the object has been instantiated for `Fastify`.

```javascript
const fastify = Fastify({ logger: true });

const port = process.env.PORT || '3000';

fastify.register(fastifyCors, { 
    // put your options here
});
```

Typically in most Node.js web apps, the routes are configured separate from the main application file, in their own module or plugin. This will make the application more loosely coupled and easier to test. For this example I am just going to configure the two methods in the same file as the main application.

```javascript
fastify.get('/metar/:icaoidentifier', async function(request, reply) {
    const path = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${request.params.icaoidentifier}&hoursBeforeNow=2`;
    const xml =  await axios.get(path);
    const jsonObj = parser.parse(xml.data);
    if (jsonObj.response.data.METAR.length > 0) {
        return jsonObj.response.data.METAR;    
    } else {
        return jsonObj.response;
    }
});

fastify.get('/taf/:icaoidentifier', async function(request, reply) {
    const path = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=${request.params.icaoidentifier}&hoursBeforeNow=4`;
    const xml = await axios.get(path);
    const jsonObj = parser.parse(xml.data);
    return jsonObj.response.data;
});
```

These two routes are now using `async` function handlers, so I can use the async/await syntax. I can also use `return` instead of having to use `reply.send(response)`.

## Starting the App

A common example for starting up fastify for hosting the application, we set up a start method that is also asynchronous. Fastify has this in their docs as well.

```javascript

const start = async () => {
    try {
        await fastify.listen(port);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
```

The final application should look like this when you finish updating your express app.

```javascript
import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import axios from 'axios';
import * as parser from 'fast-xml-parser';

const fastify = Fastify({ logger: true });

const port = process.env.PORT || '3000';

fastify.register(fastifyCors, { 
    // put your options here
});

fastify.get('/metar/:icaoidentifier', async function(request, reply) {
    const path = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=${request.params.icaoidentifier}&hoursBeforeNow=2`;
    const xml =  await axios.get(path);
    const jsonObj = parser.parse(xml.data);
    if (jsonObj.response.data.METAR.length > 0) {
        return jsonObj.response.data.METAR;    
    } else {
        return jsonObj.response;
    }
});

fastify.get('/taf/:icaoidentifier', async function(request, reply) {
    const path = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&stationString=${request.params.icaoidentifier}&hoursBeforeNow=4`;
    const xml = await axios.get(path);
    const jsonObj = parser.parse(xml.data);
    return jsonObj.response.data;
});

const start = async () => {
    try {
        await fastify.listen(port);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();
```

# Conclusion

As you can see from this example, the structure of a Fastify app is not that dissimilar to an Express app. For a simple application like this, this is a good example of an app that can be upgraded to Fastify.