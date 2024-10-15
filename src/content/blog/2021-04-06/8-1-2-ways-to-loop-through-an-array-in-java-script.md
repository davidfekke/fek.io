---
title: "8 1/2 ways to loop through an array in JavaScript"
description: ""
category: 
date: 2021-04-06
cover_image: "./sebastian-klein-loop.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/wShLjgfGtnE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

One of my favorite expressions is "there is more than one way to skin a cat". Don't get me wrong, I love cats, but this will illustrate my point.

JavaScript as a language gives you many different ways of accomplishing the same task. Iterating or looping through an array is an example of something where you have many different ways to accomplish same task.

For this example lets create an array with five elements in it using an array literal. We will also create a simple function for returning the results to a console.

```JavaScript
const arr = ['First', 2, 3.3, 'Foo', 'Bar'];
const prn = item => console.log(item);
```

# Conditional for statement

The original way of looping through an array in JavaScript is using the traditional 'for' loop statement which takes three expressions followed by the statement.

```JavaScript
// 1
for (let i = 0; i < arr.length; i++) {
  prn(arr[i]);
}
```

The first part of the for loop in parenthesis defines an initalizer. This lets the for loop keep a variable to track where it is in the loop. The second part is the condition. Here we are telling the loop we only want to loop through this array until we reach the end. The last part is the final expression where we increment one to our intializer. This will be incremented each time the statement is executed.

This example will return the following values in this order to the console;

```bash
First
2
3.3
Foo
Bar
```

# For-in loop

The next way of looping through an array is the for-in loop.

```JavaScript
// 2
for (let index in arr) {
  prn(arr[index]);
}
```

In this second example we just iterate through the array. The variable before the 'in' keyword will assign an index value for each item in the array. So if there are five items in our array, it will assign the numbers '0, 1, 2, 3, 4' to the 'index'. We can then pass this value in the subscript of the array to get the value for that position in the array.

# For-of loop

The for-of loop is similar to the for-in loop, but it will actually return the value of each item in the array.

```JavaScript
// 3
for (let item of arr) {
  prn(item);
}
```

As we can see in this example above, the 'item' variable is assigned the actual value of the array. This same statement can also be used to iterate through all members of an object as well as an array.

# Do-while loop

The Do-while loop is similar to the original for loop in example 1, but the condition expression is passed at the end of the statement.

```JavaScript
// 4
let i = 0;
do {
  prn(arr[i]);
  i++;
} while (i < arr.length)
```

In the forth example above we define an iterator variable 'i' before our loop. This is not required to use a do-while loop. We just need a condition expression that can be used to exit out of the loop. In this case we incrementing 1 to the 'i' variable everytime the statement is executed in the loop, and in the while condition we check to make sure that the 'i' value is smaller than the array length.

# While loop

The while loop is similar to the do-while loop, jut you set the condition expression at the beginning of the statement.

```JavaScript
// 5
let j = 0;
while (j < arr.length) {
  j++;
  prn(arr[j]);
}
```

In our fifth example we set a variable 'j' to our intial iterator, and increment that value by one in the loop statement. The while condition checks to make sure that the 'j' value is smaller than the length of the array.

# ForEach loop

The 'forEach' method on the array prototype was added in version 5 of JavaScript. This is actually an example of a higher-order function, or a function that takes another function as a parameter. these types of parameters are sometimes referred to as a 'callback'. The callback for the 'forEach' method takes a parameter of the actual item we are iterating on in the array, but also takes optional parameters for the index and the whole array.

Here is the simplest way we can use the 'forEach' method for looping over an array.

```JavaScript
// 6
arr.forEach(item => prn(item));
```

In this sixth example we are passing in array function that prints the current item being iterated over in the array. We can also do it like the following;

```JavaScript
arr.forEach(function(item) {
    console.log(item);
});
```

# Recursion

JavaScript at its heart is a functional programming language. In a lot of functional programming languages the way you loop through an array is by using recursion, or using a function that can call itself.

```JavaScript
// 7
function recursive(array) {
  let item = arr.shift();
  prn(item);
  if (array.length > 0) {
    recursive(array);
  }
}

recursive(arr);
```

In this seventh example we defined a function calld 'recursive' that takes the array as a parameter. Inside the function we 'shift' or remove one item out of the array, then pass this new version of the array into this same function. We have a condition in the function that checks to make sure the array still has any items left in it to process.

If you want to preserve the original array, you can make a copy of the array by using the spread operator '...' like the following example;

```JavaScript

const arr2 = [...arr];
recursive(arr2);
```

# Symbol iterator

Yet another way we can loop through our array is using a Symbol.iterator.

```JavaScript
// 9
let it = arr[Symbol.iterator]();

let item = it.next();
do {
  prn(item.value)
  item = it.next();
} while (item.done === false)
```

In the eighth example we use this Symbol iterator to initialize an iterator object. We can then call the 'next' method on the iterator object. We can continue to call this iterator until it's 'done' property returns false.

We are using a do-while statement to check when the 'done' propety is false to end the execution of this iterator.

# Generators

Generators are similar to the iterator we used before in example nine. Because of this I am only going to call this example 9 1/2. Generators are defined by using an '*' at the beginning of the function name. I personally do not like the way this is used because if you are coming from a 'C' based language this can be confused for a pointer.

```JavaScript
// 8 1/2
function *myGenerator(array) {
  yield *array
}

const gen = myGenerator(arr3);

let item2 = gen.next();
do {
  prn(item2.value)
  item2 = gen.next();
} while (item2.done === false)
```

In this last example we have defined a generator function called 'myGenerator'. Generators can either return or yield a value. In this example we call the 'myGenerator function to create a generator object. The Generator object much like the iterator object has a 'next' method that will yield the next value in the array. The generator also has a 'done' parameter we can use to tell if the generator has completed execution.

Here we used a do-while loop as the expression for processing the generator.

# Summary

As you can see from all of these examples there are multiple ways to skin a cat with JavaScript. Just please don't skin my cat. ;-)