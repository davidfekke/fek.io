---
title: "Should you use Dependency Injection in JavaScript?"
description: ""
category: 
date: 2021-05-01
cover_image: "./ultrasound-guided-injections.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/Udfp9ln8naA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I have seen some posts on JavaScript and for other languages that dissuade the use of Dependency Injection. I even had a boss at one company I worked for tell his developers that we should never use Dependency Injection.

Dependency Injection, (DI), sometimes referred to as 'Inversion of Control' is where an object receives other objects or functions it depends on for part of its functionality. This can be achieved by passing an object through object instantiation with a constructor or with a property setting. This is very common in the world of statically typed languages like Java or C#. There are many popular frameworks built specifically for managing dependencies in the statically typed object-oriented world.

DI allows specific functionality to be loaded at runtime. One of the advantages of being able to change the functionality of an object at runtime is to provide greater flexibility and make our applications more loosely coupled. A very common use case is using mocking during testing. The are some great libraries in Node.js like [Sinon](https://sinonjs.org/) that make mocking very easy, but we can accomplish the same task by using DI.

# Testing scenario

It is very common with testing to substitute code that communicates with a database or a network request with a mock or fake. This is because in a lot of CI/CD workflows the build or testing server may not have access to a database server or a network needed for the actual service. This is an excellent use case for DI to substitute an actual service with a mock or fake service.

There are many different reasons to use DI, but testing is one of the most common reasons.

# Poor Mans DI

I have a technique that I have used throughout the years for configuring DI in my applications whether they are statically typed or duct-typed like JavaScript that I like to call 'Poor Mans Dependency Injection'. With this technique I usually create default dependent objects if a required object is not passed in on object instantiation. 

Lets say we have a cart object that needs to calculate a tax rate for a certain location. In a lot of e-commerce systems that kind of data has to be calculated based on the location of the user, with the sales tax being different for every location. We can create a factory function that creates a shopping cart with an injectable function for calculating the tax.

```javascript
function createCart(settings) {

    const { taxrepository } = settings;
    let items = [];    

    function addItemToCart(item) {
        items.push(item);
    }

    function removeItemFromCart(removeThisItem) {
        items = items.filter((item, index, arr) => { return item.sku !== removeThisItem.sku });
    }

    function getSubTotal() {
        return items.map(item => item.price * item.quantity)
                    .reduce((accum, item) => accum + item, 0);
    }

    function getTotal() {
        return taxrepository(getSubTotal()) + getSubTotal();
    }

    function getTaxes() {
        return taxrepository(getSubTotal());
    }

    return Object.freeze({
        addItemToCart,
        removeItemFromCart,
        getSubTotal,
        getTotal,
        getTaxes
    });
}
```

If we look at the following example, we are creating a object with functions for adding items to the cart and calculating the totals and subtotals. We have a function that we can pass into our settings constructor object called `taxrepository`. We will us this function to calculate our taxes.

Lets create a test function for calculating our taxes. We will make this a pure function without any side effects.

```javascript
function calculateMyTax(subtotal) {
    return subtotal * 0.11;
}
```

When we instantiate this object with our factory function, we can just pass it into our settings object;

```javascript
const cart = createCart({ taxrepository: calculateMyTax });
myCart.addItemToCart({ sku: 'DEF456', price: 2.00, quantity: 2 });
myCart.addItemToCart({ sku: 'HIG789', price: 6.00, quantity: 1 });
myCart.addItemToCart({ sku: 'ABC123', price: 12.00, quantity: 1 });
```

We can now get the subtotal and calculate the taxes.

```javascript
console.log(`subtotal:  ${myCart.getSubTotal()}`);
// subtotal:  22
console.log(`taxes:  ${myCart.getTaxes()}`);
// taxes:  2.42
console.log(`total:  ${myCart.getTotal()}`);
// total:  24.42
```

# Defaulting Behavior

All of the objects that I define, I try to create defaults for whenever an injectable behavior is not included in the constructor. That way if someone is using my object without passing in the needed objects, it will either get an error or a default function if it is missing from the constructor. We can modify the factory function to use a default if no `taxrepository` is passed in the settings object. 

```javascript
const defaultTaxRepository = (subtotal) => { return 0; };

const taxrepository = settings.hasOwnProperty('taxrepository') 
    ? settings.taxrepository 
    : defaultTaxRepository;
```

We also might to want to have our factory function fail if the developer calling our function forgets to pass the `taxrepository` into the constructor.

```javascript
if (!settings.hasOwnProperty('taxrepository')) {
    throw Error(`This function requires a 'taxrepository' to be passed into the contructor!`)
}
```

# Dependency Injection Frameworks 

DI frameworks are extremely popular in the statically typed object oriented world of Java and .NET development, but there are DI frameworks you can use for JavaScript. One of the frameworks is called [di4js](https://github.com/gedbac/di4js), and will work with either Node.js or plane old JavaScript in the browser. Here is an example from the di4js readme;

```javascript
var Car = function (engine, year) {
  this.engine = engine;
  this.year = year;
};

Car.prototype.start = function () {
  this.engine.start();
};

var DieselEngine = function () {
  this.hp = 0;
};

DieselEngine.prototype.start = function () {
  console.log("Diesel engine with " + this.hp + " hp has been started...");
};

di
  .autowired(false)
  .register('dieselEngine')
    .as(DieselEngine)
    .withProperties()
      .prop('hp').val(42);
  .register('car')
    .as(Car)
    .withConstructor()
      .param().ref('dieselEngine')
	  .param().val(1976);

var car = di.resolve('car');

car.start(); // Diesel engine with 42 hp has been started...
```

# Conclusion

![With Great Power comes Great Responsibility](./great-responsibility.jpg)
Dependency Injection is a very powerful tool for configuring an application to use certain dependencies when creating objects. Whether you are using 'Poor Mans' Dependency Injection or a full fledged DI framework, it can be a very useful tool for configuring different behavior in application. 