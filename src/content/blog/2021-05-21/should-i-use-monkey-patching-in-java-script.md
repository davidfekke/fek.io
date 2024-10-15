---
title: "Should I use Monkey Patching in JavaScript?"
description: ""
category: 
date: 2021-05-21
cover_image: "./MonkeyPatching.jpg"
---


<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/_kOJGek_WbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Monkey Patching is the capability in JavaScript to swap out a function in a JavaScript object with your own function. This can come in handy, but also be dangerous. One of JavaScript's strengths is its ability to easily make changes to objects and modules. It also makes it fairly easy to introduce new bugs.

This kind of functionality can also be found in languages like Objective-C and Swift where developers can swap out the functionality of methods in their classes using a runtime feature called 'Method Swizzling'.

To illustrate this functionality, we can create a object that has a simple add function.

```javascript
class SimpleMathObject {
    
    add(a, b) {
        return a + b;
    }

}
```

We can then instantiate this object and call the `add` function on our object.

```javascript
const MathObject = new SimpleMathObject();
const result = MathObject.add(1, 2);
console.log(`Result of 1 + 2 = ${result}`);
// Output: Result of 1 + 2 = 3
```

# Adding a Monkey Patch

To add a Monkey Patch to our object we simply need to assign a new function to the `add` function on our instantiated object. We will need to get a reference to the original function so we can continue to use it in our new function, or possibly reassign it back to the object once we are done with our patching.

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
// Output: Adding the result of 1 and 2
// Output: Result of 1 + 2 = 3
```

# Preventing Monkey Patching

One of the problems with using the `class` [keyword](https://fek.io/blog/why-you-should-not-use-classes-in-java-script/) or [object prototypes](https://fek.io/blog/crockford-objects-in-java-script/) is that can leave your objects open to this type of manipulation. If you do not want your functions to be Monkey Patched, there are ways of preventing that type of execution from happening in your code. One way of accomplishing this is to use factory function and `Object.freeze` when returning your object.

```javascript
function createAddObject() {
    if (new.target) {
        throw `This function is a factory function, and does not allow the 'new' keyword`;
    }
    function add(a, b) {
        return a + b;
    }
    return Object.freeze({
        add
    });
}
```

Now if you try to replace the `add` function with your own like in the example below, the JavaScript engine will throw a TypeError;

```javascript
const MyObject = new createAddObject();

const origAdd = MyObject.add; 

MyObject.add = function(a, b) {
    console.log(`First param ${a} and second param is ${b}`);
    return origAdd(a, b);
}
```

The error from trying to execute this code should look similar the following error.

```bash
TypeError: Cannot assign to read only property 'add' of object '#<Object>'
    at file:///Users/davidfekke/Documents/monkeypatch/monkey.js:39:23
```

# Conclusion

Monkey Patching is a very powerful concept in JavaScript. You can use to add aspects or inject new functionality into existing libraries or modules. It can also be dangerous. But if you do not want your code to be Monkey Patched, you can use Object.freeze to make your objects read only.

You certainly can use this feature in your JavaScript applications, but beware that when change default functionality of an object that can create unexpected behavior if you forget about that change. Or even worse, that next developer working on your code is not aware of the change.
