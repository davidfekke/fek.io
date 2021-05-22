---
layout: post
title: "Should I use Monkey Patching in JavaScript?"
description: ""
category: 
date: 2021-05-21
cover_image: "./unnamed.jpg"
---

Monkey Patching is the capability in JavaScript to swap out a function in a JavaScript object with your own function. This can come in handy, but also be dangerous. One of JavaScript's strengths is its ability to easily make changes to objects and modules. It also make it fairly easy to introduce new bugs.

This kind of functionality can also be found in languages like Objective-C and Swift where developers can swap out the functionality of methods in their classes using a runtime feature called 'Method Swizzling'.

To illustrate this functionality, we can create a object that has a simple add function.

```javascript
function SimpleMathObject() {
    if (!new.target) {
        throw `This function can only be called with the 'new' keyword`;
    }
    return this;
}

SimpleMathObject.prototype.add = function(a, b) {
    return a + b;
}
```

We can then instantiate this object and call the `add` function.

```javascript
const MathObject = new SimpleMathObject();
const result = MathObject.add(1, 2);
console.log(`Result of 1 + 2 = ${result}`);
```

# Adding a Monkey Patch

We can now add our own version of the `add` function without having to change the original version of the `SimpleMathObject`. This can be useful if we need to inject some new functionality into this object.

```javascript
const MathObject = new SimpleMathObject();

// Make a copy of the original add function 
const origAdd = MathObject.add;

// Making Monkey Patch
MathObject.add = function(a, b) {
    console.log(`Adding the result of ${a} and ${b}`);
    return origAdd(a, b);
}

const result = MathObject.add(1, 2);
console.log(`Result of 1 + 2 = ${result}`);

```




```javascript
function createAddObject() {
    if (new.target) {
        throw `This function is a factory function, and does not allow the 'new' keyword`;
    }
    function add(a, b) {
        return a + b;
    }
    return {
        add
    };
}

//var AddObject = createAddObject();
var MyObject = new createAddObject(); //new AddObject();

const origAdd = MyObject.add; 

MyObject.add = function(a, b) {
    console.log(`First param ${a} and second param is ${b}`)
    return origAdd(a, b);
}

const num = MyObject.add(1, 2);

console.log(`num: ${num}`);

```