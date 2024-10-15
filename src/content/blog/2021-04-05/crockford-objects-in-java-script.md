---
title: "Crockford Objects in JavaScript"
description: ""
category: 
date: 2021-04-05
cover_image: "./markus-spiske-code-unsplash.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/CeZyDDsrQWk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I was watching a video from JSFest 2018 where [Douglas Crockford](https://www.crockford.com/about.html) gave a presentation on the Power of the Paradigm. It is an excellent presentation if you have a spare hour to [watch](https://www.youtube.com/watch?v=X3ExqafLgwk). Doug also wrote a book that every JavaScript developer should read called [JavaScript: The Good Parts](https://www.amazon.com/dp/0596517742/wrrrldwideweb). The whole presentation was great, but I really liked the part where he talked about object creation in JavaScript.

![Douglas Crockford](./douglas.crockford.jpg  "Douglas Crockford holding a punch card")

JavaScript is not a traditional Object-Oriented language like Java or C#, it is considered a Prototype based language with object-oriented features. After watching Doug's presentation, I have come up with my own term that I will call 'Crockford Objects'.

When I first started learning JavaScript, the way I learned for defining a new object was by using a function that returned 'this'. You can create a new object by using the 'new' keyword. Here is a simple example;

```JavaScript
function Thing(name) {
    this.thingName = name;
    return this;
}

const myThing = new Thing('My Thing');
```

You can add functions to this object by using its 'prototype' property. You can add properties and functions by using the prototype property.

```JavaScript
Thing.prototype.getName = function() {
    return this.name;
}

const currentName = myThing.getName();
// returns 'My Thing';
```

# ES2015 classes

With the current versions of JavaScript in modern browsers and Node.js, there was a 'class' keyword that was added to the language. This was done mainly as way to make the language more familiar to the developers who use more general purpose languages like Java and C#. The 'class' keyword in Java and C# lets the developer create template for an object. It is not the same thing as a 'class' in JavaScript. In the example below we can see how the 'class' definition looks similar to a 'class' in C# or Java.

```JavaScript
class Thing {
    construtor(name) {
        this.thingName = name;
    }

    getName() {
        return this.thingName;
    }
}

const myThing = new Thing('My Thing');
// returns 'My Thing';
```

A key difference here is how we have to reference the 'this' keyword to access properties on the object. If you really want to use syntax like this I would suggest using [TypeScript](https://www.typescriptlang.org/). TypeScript offers a superset of JavaScript with well defined types and classes.

# Crockford Objects

The example that Crockford gave in his presentation on how to create objects is the way developers should use for creating objects. It does not require the 'class' keyword or the 'prototype' property for defining an object. It also does not require using the 'new' keyword for instantiating a new object.

```JavaScript
function createThing(name) {
    function getName() {
        return name;
    }

    return Object.freeze({
        name,
        getName
    });
}

const myThing = createThing('My Thing');
// returns 'My Thing';
```

In the example above we have a function with an inner function. The 'getName' function is a closure. Closures in JavaScript have access to all of the parameters of the parent function, so we have access to the 'name' property. We return a new object with just the properties and functions that we want from inside that 'createThing' function. 

We also are using the 'Object.freeze' function to lock in just the parameters and functions that we want in our object. This method prevents properties and functions being added to the prototype of this object after defining the function.

# Summary

The Crockford way of defining and creating objects looks to be the preferable way in JavaScript. These Crockford objects are defined with a factory function. In traditional object-oriented languages factories a common pattern for instantiating new objects.

It should be noted that there is some additional overhead for creating objects this way in JavaScript, but in most cases this should not prevent you from using this pattern.