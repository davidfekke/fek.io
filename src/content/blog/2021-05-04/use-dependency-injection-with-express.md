---
title: "Use Dependency Injection with Express"
description: ""
category: 
date: 2021-05-04
cover_image: "./injectable.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/82LCcsu_QAA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I recently did a blog post on using [Dependency Injection](https://fek.io/blog/should-you-use-dependency-injection-in-java-script) in JavaScript. This technique comes in handy, and can be really useful when using web application frameworks like [Express](https://expressjs.com).

Express makes it very easy to inject dependencies into you web application through middleware or into individual routes. In my Express applications when I need a dependency, I inject it directly into a route by injecting it as a service on the request object. But before we do that, lets' break our app up into different modular components.

# The Service

For the first part of this application, we will create the actual HTTP requests using the [axios](https://github.com/axios/axios) library. We will make these requests asynchronous.

```javascript
// dataservice.js
import axios from 'axios';

async function getVehicles() {
    const results = await axios.get('https://swapi.dev/api/vehicles/');
    return results.data.results;
}

async function getPlanets() {
    const results = await axios.get('https://swapi.dev/api/planets/');
    return results.data.results;
}

async function getStarships() {
    const results = await axios.get('https://swapi.dev/api/starships/');
    return results.data.results;
}

export { getVehicles, getPlanets, getStarships };
```

I am using the [Star Wars API](https://swapi.dev/) for my example. I have created three functions for `getVehicles`,`getPlanets` and `getStarships`. These methods are using the `async/await` syntax, which will allow them to be used asynchronously by the module that imports these functions.

# Routes

For my Express routes, I like to break the handlers up into their own module. We can then use these handlers in the actual routes, and this will make them easier to test.

```javascript
// requesthandlers.js
async function vehicles(req, res) {
    try {
        const results = await req.service.getVehicles();
        res.send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed due to Server error!' });
    }
}

async function planets(req, res) {
    try {
        const results = await req.service.getPlanets();
        res.send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed due to Server error!' });
    }
}

async function starships(req, res) {
    try {
        const results = await req.service.getStarships();
        res.send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed due to Server error!' });
    }
}

export { vehicles, planets, starships };
```

As you can see from the example above, each handler can make service requests from the `req` parameter, and we are not importing the service explicitly into our handlers. Now we can create the routes we will make for our API calls in its own module.

```javascript
// apiroutes.js
import { Router } from 'express';
import { vehicles, planets, starships } from './requesthandlers.js';

const router = Router();

router.get('/vehicles', vehicles);
router.get('/planets', planets);
router.get('/starships', starships);

export default router;
```

The example above shows boiler plate Express route setup in this module.  We can now reference this in our main express app module.

# Injecting the Service

For injecting our service, we will need to create a service object that we can attach to the `req` object, and create a middleware component that actually injects the service into our API route.

```javascript
import { getVehicles, getPlanets, getStarships } from './dataservices.js';

const service = () => {
    return Object.freeze({
        getVehicles, 
        getPlanets, 
        getStarships
    });
};

const exposeService = async (req, res, next) => {
    req.service = service();
    next();
};
```

As we can see from the example above we are now importing the individual API functions that we created using `axios` and creating a service factory that combines all three functions into a single service object. We then create the `exposeService` middleware that will actually inject this service into our route.

Our completed application should look like the following example;

```javascript
// app.js
import express from 'express';
import { getVehicles, getPlanets, getStarships } from './dataservices.js';
import routes from './apiroutes.js';

const service = () => {
    return Object.freeze({
        getVehicles, 
        getPlanets, 
        getStarships
    });
};

const exposeService = async (req, res, next) => {
    req.service = service();
    next();
};

const app = express();

app.get('/', (req, res) => {
    res.send('My index route.');
});

app.use('/api', exposeService, routes);

app.listen(3000, () => {
    console.log('Server is started');
});
```

In the example application we have injected the service into our `api` routes so it will have access to the Star Wars API on the `service` property of the `req` parameter. We also have a default route for the index which point to the '/' route. This 'index' route does not have access to the service because we did not pass the middleware globally, we only passed it into the 'api' route.

# Conclusion

Dependency Injection is a very powerful tool that allows us to decouple our application. By breaking these services into their own modules we have also made our application more easily testable using one of the many testing frameworks available to JavaScript. May the 4th be with You!