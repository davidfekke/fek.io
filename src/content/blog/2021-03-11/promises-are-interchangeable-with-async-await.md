---
title: "Promises are interchangeable with Async/Await"
description: ""
category: 
date: 2021-03-11
cover_image: "./malvestida-magazine.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/nRP0UuUBzOM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

One of the things that has always made JavaScript powerful was the way it handles asynchronous behavior. JavaScript from the very beginning has used callbacks as a way of handling a response that may take a while to complete without preventing your program from continuing to process other logic.

Retrieving or writing something to a database, filesystem or network are all examples of something that can block your program. The example below is an example of read request to a filesystem where the result is handled with a callback;

```javascript
const fs = require('fs');
fs.readFile('/file.txt', function(err, data) {
  if (err) throw err;
});
```

## Promises

Promises were introduced in EcmaScript 2015 as another way of being able to handle asynchronous behavior using a more structured pattern. The basic problem with callbacks is if you have to handle more than one at a time your code can start to look like a tree of callbacks. Promises have `then` and `catch` functions tht can be called to handle asynchronous requests. If your promise resolves anther promise, you can just follow that with another `then`.

The `fetch` API in chrome is an axample of a promise library that can return multiple promises inside of a single request. Here is an example of fetch request handling a rest API with a JSON response;

```javascript
import fetch from 'node-fetch';

const apiurl = 'https://sampleapi.me/api/messages/10/';

fetch(apiurl).then(resp => {
    return resp.json();
}).then(json => {
    console.log(json.message);
    // Output: "My message"
}).catch(err => {
    console.error(err);
});
```

## Async and Await

The promise API is more elegant than the traditional error first callback, but the syntax can still be terse because the `then` and `catch` functions both are higher order functions that require another function be passed into them in order to handle the completion of the promise.

By adopting the `async` and `await` keywords, we can write our code so that it looks synchronous, but we can continue to use promises;

```JavaScript
import fetch from 'node-fetch';

const apiurl = 'https://sampleapi.me/api/messages/10/';

(async function() {
    const result = await fetch(apiurl);
    const json = await result.json();
    console.log(json.message);
    // Output: "My message"
})();
```

As we can see in the example above we have replaced the `then` higher order functions with the `await` keyword.  The `await` keyword has to be used inside of a function that is annotated with the `async` keyword. If you are using Deno or Nodejs 15 or greater, you can use the `await` keyword at the top level of your progra without having to run it inside of a `async` function.

```JavaScript
import fetch from 'node-fetch';

const apiurl = 'https://sampleapi.me/api/messages/10/';

const result = await fetch(apiurl);
const json = await result.json();
console.log(json.message);
// Output: "My message"

```

# Defining a new Promise

We can define a promise by creating a new Promise. The constructor for the Promise simply takes a higher-order function with two parameters for resolving and rejecting. Here is an example of a promise that returns a string after a delay of 1000 miliseconds;

```JavaScript
function createWorker() {
    return new Promise((resolve, reject) => {
        try {
            let timer = setTimeout(() => {
                resolve('Work completed.');
            }, 1000);
        } catch (err) {
            reject(err);
        }
    });
};

const doWork = createWorker();
doWork.then((result) => {
    console.log(result);
    // Output: "Work Completed."
}).catch(err => {
    console.error(err);
});
```

We can also rewrite this to use `async` and `await` with a Promise for handling the `setTimeout`.

```JavaScript
function oneSecondDelay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function doWork() {
    await oneSecondDelay();
    return 'Work completed'
}

(async function() {
    console.log(await doWork());
    // Output: "Work Completed."
})();
```

# Summary

As we can see from our previous examples, Promises and `async` and `await` are interchangeable with each other.
