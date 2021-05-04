---
layout: post
title: "Use Dependency Injection with Express"
description: ""
category: 
date: 2021-05-04
cover_image: "./unnamed.jpg"
---

I recently did a blog post on using [Dependency Injection](https://fek.io/blog/should-you-use-dependency-injection-in-java-script) in JavaScript. This technique comes in to be really useful when using web application frameworks like [Express.js](https://expressjs.com).

Express makes it very easy to inject dependencies into you web application through middleware or into individual routes. In my Express applications when I need a dependency, I inject directly into a route by injecting it as a service. Lets take the following route that might need some data from a service.

```javascript
const api = require('./services/apidata.js');
const servicefactory = require('./services/servicefactory.js');
const service = servicefactory(api);
const routes = require('./routes/index');

const exposeService = function (req, resp, next) {
    req.service = service;
    next();
};

app.use('/', exposeService, routes);
```