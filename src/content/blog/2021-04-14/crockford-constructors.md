---
title: "Crockford Constructors"
description: ""
category: 
date: 2021-04-14
cover_image: "./ivan-henao-construction.jpg"
---

In a previous [post](/blog/crockford-objects-in-java-script) I discussed how we can create objects from a function using a closure. I based this example on a presentation Douglas Crockford made at JS Fest 2018.

# Constructors

Constructors are functions or methods that are used for initializing an object with the values it needs to encapsulate at object creation. If you are using the `class` syntax in JavaScript, there is actually a built in method for constructors called `constructor`.

One of the things that Crockford discussed in this [presentation](https://www.youtube.com/watch?v=XFTOG895C7c) was how we define the constructor parameters to the defining function. He suggested to just pass one single object into the function.

JavaScript allows us to pass as many parameters as we want to a function. The issue that we run into is what happens when you add a parameter to your function, you have to refactor every place in your code that is calling that function.

Lets take the example of a function that defines an employee object. For this example we will use a function that has parameters for each property in the object;

```javascript
function createEmployee(firstname, lastname, department) {
    function getFullname() {
        return `${firstname} ${lastname}`;
    }

    return {
        firstname, 
        lastname, 
        department,
        getFullname
    };
}

const empObj = createEmployee('David', 'Fekke', 'IT');
```

Now lets say we get a requirement to add an employee number to this object. We now have to add that parameter to every place in our code where we use that function.

```javascript
function createEmployee(firstname, lastname, department, empNo) {
    function getFullname() {
        return `${firstname} ${lastname}`;
    }

    function getEmployeeNumber() {
        return empNo;
    }

    return {
        firstname, 
        lastname, 
        department,
        empNo,
        getFullname,
        getEmployeeNumber
    };
}

const empObj = createEmployee('David', 'Fekke', 'IT', 890234);
```

One of the problems of passing each value as a separate parameter is that not all of the parameters may need to be required. There are a lot of use cases where we do not need every possible parameter passed to a construtor. There are use cases where we may want to default to certain values instead.

A more elegant approach would be to pass a parameters object into the constructor function.

```javascript
function createEmployee(params) {
    
    const {firstname, lastname, department } = params;
    
    function getFullname() {
        return `${firstname} ${lastname}`;
    }

    function getEmployeeNumber() {
        const { empNo } = params;
        return isNaN(empNo) ? 0 : empNo;
    }

    return {
        firstname, 
        lastname, 
        department,
        getFullname,
        getEmployeeNumber
    };
}

const params = {
    firstname: 'David',
    lastname: 'Fekke', 
    department: 'IT',
    empNo: 890234
};

const empObj = createEmployee(params);
```

One of things that is nice about this approach is that we can use JavaScript destructuring to get the specific values from out parameters object. In the example above we just put the name of the parameter we need inside of the curly braces, and if that property exists, we can use that in our function body.

This technique is also very handy when you have parameters that may not be required or optional. It also does not matter the order of the parameters. We can put our properties in any order when creating our parameters object literal.

# Summary

By using function objects instead of separate parameters we have made our constructors more flexible. We also are taking advantage of new JavaScript features for optional checking and destructuring the parameters object to get just the values we need. 