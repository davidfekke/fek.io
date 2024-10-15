---
title: "How to add Unit Testing to Express using Jest"
description: ""
category: 
tags: ["JavaScript", "Node.js", "Jest", "Unit Testing"]
date: 2021-09-01
cover_image: "./expressjest.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/pwOh-lOIyEc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Whether you are doing test driven development (TDD) or are just looking for a way to add automated testing to your [express](https://expressjs.com) app, this can be accomplished fairly easily using many different unit testing frameworks. With Node.js, I have used a number of different testing frameworks. One of the nice things about Node is that there are no shortage of options when it comes to testing.

The testing framework I prefer to use is [Jest](https://jestjs.io/), but it is not a requirement for unit testing an express application. Jest is extremely popular with React developers, but it can be used with just about any JavaScript application.

I like to use Jest because on top of having all of the tools needed to run unit tests, it also can check code coverage.

## Writing Testable Code

One of the good things about TDD is that helps developers write code that is more loosely coupled, which not only makes the code more easy to test, but makes the code more reusable. 

Express follows a basic structure for responding to requests based on a route signature, i.e.;

```javascript
app.get('/users/report', function(req, res) {
    res.render('userreport', { title: 'Users Report' });
});
```

It is a good practice to break the handler code into its own function, and then use that handler in the route.

```javascript
function userReportHandler(req, res) {
    res.render('userreport', { title: 'Users Report' });
}

app.get('/users/report', userReportHandler);
```

Not only does this make the express code more organized, now we test just the handlers without having to run express.

## Adding Jest

To add Jest to your application, we can do this by running the following command in the root of our application directory;

```bash
> npm i jest --save-dev
```

This will install Jest tooling into our node_modules folder. Now that Jest is installed, lets' change the `scripts` section of our `package.json` file to run jest in the `test` property. It should look like the following in our `scripts` section;

```json
"scripts": {
    "test": "node --experimental-vm-modules node_modules/.bin/jest --coverage",
    "start": "node <name_of_mainjs_file>"
},
```

Lets' take a quick look at what this command is doing. We are telling `Node` to run the jest command in the `node_modules/.bin/jest` location. This in turn runs the jest-cli. We are also running a flag `--experimental-vm-modules` to allow us to run ESModule import/export syntax. We are also using jest's `--coverage` flag to get a code coverage report to let us know what percentage of our code is covered by unit tests.

## Express App Example

For the purposes of this example, I am going to create a simple Express app that has two routes. One that will operate as a home page with a route of `/`, and one that has a route called `/hello` that takes one input parameter called `:name`.

```javascript
// routes/default.js
function index(req, res) {
    res.send('hello world!');
}

function hello(req, res) {
    const name = req.params.name ?? "world";
    res.send(`hello ${name}!`);
}

export { index, hello };

// routes/main.js
import { Router } from 'express';
import { index, hello } from './default.js';

const router = Router();

router.get('/', index);
router.get('/hello/:name', hello);

export default router;

// app.js
import express from 'express';
import http from 'http';
import router from './routes/main.js';

const app = new express();

app.use('/', router);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
```

Now we can add a folder called `__tests__` to our project. Jest automatically looks for any JavaScript or TypeScript files inside of this directory.

Before we create our first test, lets add `supertest` to our project using the following command;

```bash
npm i supertest --save-dev
```

Supertest is used to mock out our express server so we do not have to run a http server in order to test our routes.

## Unit Tests

Lets' create a unit test just to test our route handlers.

```javascript
import { index, hello } from '../routes/default.js';

describe('Test Handlers', function () {

    test('responds to /', () => {
        const req = {  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        index(req, res);
        
        expect(res.text).toEqual('hello world!');
    });

    test('responds to /hello/:name', () => {
        const req = { params: { name: 'Bob' }  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        hello(req, res);
        
        expect(res.text).toEqual('hello Bob!');
    });

});
```

Both of our route handlers both use the send function on the `res` object, so I created a simple mock response object that duplicates what the Express response object would do if we used this in a real application. In this case `send` just echos out whatever we pass in onto the `text` property.

In both of my unit tests I am using jest's `expect` function to compare our expected results in the `toEqual` function. If they match, both tests will pass.

Now lets' add another test suite with `supertest` to test the routes. We will create a new file called `routes.t.js` to test the actual routes.

```javascript
import request from 'supertest';
import express from 'express';
import router from '../routes/main.js';

const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello world!');
  });
  
  test('responds to /hello/:name', async () => {
    const res = await request(app).get('/hello/jaxnode'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello jaxnode!');
  });

  test('responds to /hello/Annie', async () => {
    const res = await request(app).get('/hello/Annie'); 
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('hello Annie!');
  });

});
```

Using `supertest` we can see these tests our more thorough and accurate of what our express app is doing. In the test suite above we use supertest to run the specific routes. We can also look at specific express properties to make sure the application is returning the expected results.

In all three unit tests we use `expect` to check that we have the correct header results, statusCode and text.

## Running our tests

To test our unit tests, all we have to do is run `npm test` in out command line.

```bash
> npm test

> expresstest@1.0.0 test
> node --experimental-vm-modules node_modules/.bin/jest --coverage

(node:56591) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  __tests__/routes.t.js
 PASS  __tests__/handlers.t.js
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files   |     100 |       50 |     100 |     100 |
 default.js |     100 |       50 |     100 |     100 | 7
 main.js    |     100 |      100 |     100 |     100 |
------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.782 s, estimated 1 s
```

## Conclusion

As you can see from the example above it is actually quite easy to add unit testing to your express app.

I had a former co-worker who had the following slogan in his cubicle; "Test, test, test, and once you think you are done, test again". Unit testing is just one small aspect to the quality assurance of your code, but if used correctly with CI/CD it will help you discover bugs well before they even make it to a staging or test environment.

[Example on Github](https://github.com/davidfekke/expresstest)