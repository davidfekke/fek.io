---
layout: post
title: "Crockford Constructors"
description: ""
category: 
date: 2021-04-14
cover_image: "./ivan-henao-construction.jpg"
---

In a previous post I discussed how we can create objects from a function using a closure. I based this on a presentation Douglas Crockford made at JS Fest 2018.

One of the things that Crockford discussed in this presentation was how we define the constructor parameters to the defining function. He suggested to just pass one single object into the function.

JavaScript allows us to pass as many parameters as we want to a function. The issue that he runs into is what happens when you add a parameter to your function, you have to refactor very place in your code that is calling that function.

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

A more elegant approach would be to pass a parameters object into the constructor function.

```javascript
function createEmployee(params) {
    
    const {firstname, lastname, department, empNo } = params;
    
    function getFullname() {
        return `${firstname} ${lastname}`;
    }

    function getEmployeeNumber() {
        const { empNo } = params;
        return empNo ?? 0;
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

This technique is very handy when you have parameters that may not be required or optional. 

# Summary

By using function objects instead of separate parameters we have made our constructors more flexible. We also are taking advantage of new JavaScript features for optional checking and destructuring the parameters object to get just the values we need. 