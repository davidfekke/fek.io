---
title: "Why I use Semicolons to Terminate my Lines in JavaScript"
description: ""
category: 
date: 2021-06-01
tags: ["Semicolons", "JavaScript", "Node.js"]
cover_image: "./semicolons.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/x6_lFh1WgA8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

In a lot of the C based languages such as C#, Java and C++, a semicolon is required to end the line.

```csharp
String foo = "Hello World!";
```

JavaScript does not require the developer to use a semicolon to terminate their lines of code. This leaves the developer with the option of whether they want to use a semicolon or not.

The JavaScript interpreter/compiler will automatically add a semicolon to the end of your line if you do not have one at the end of your line. This is called Automatic Semicolon Insertion or ASI.

```javascript
// So
const foo = 'Hello World!'

// will become
const foo = 'Hello World!';
```

I run across a lot of JavaScript developers who do not use semicolons because of this feature. I always try to semicolons at the end of my lines for a couple of different reasons.

## Uglifiers and Transpilers

Transpilers are a kind of compiler that takes JavaScript or another language like TypeScript or JSX, and recompiles it into vanilla JavaScript. Most of the transpilers like Babel do a pretty good job of converting the code into something that will run without errors. 

Uglifiers are another type of transpiler that renames variables and obfuscates the JavaScript, making it difficult to read the source. Some of them will rewrite the JavaScript so all of it fits on one line. These are the types of tools where I have seen problems with the newly outputted code not running correctly.

If you are using good tooling, this may not ever be an issue.

## Declaring variables

JavaScript allows for multiple variables to be declared on the same line, but those variables have to be separated with commas.

```javascript
let
foo, bar= 
9;

console.log(bar);
// Outputs: 9
```

This will become the following with ASI;

```javascript
let foo; 
let bar = 9

console.log(foo);
console.log(bar);
// Outputs: 
// Outputs: 9
```

## Code to be aware of

There are a number of different situations in your JavaScript code where a semicolon might be inferred where you do not want one inferred. An example of this might be were you are returning an object in a function.

```javascript
function getUser() {
    return
    {
        username: 'bobsmith',
        id: 'jklj9786dsa990ad#',
        nick: 'bob'
    }
}
```

ASI will cause this function to return nothing because the beginning curly brace is on a line below the `return`. ASI will make it look like the following;

```javascript
function getUser() {
    return;
    {
        username: 'bobsmith',
        id: 'jklj9786dsa990ad#',
        nick: 'bob'
    }
}
```

This can be corrected by moving the curly brace to the same line as the `return` keyword.

```javascript
function getUser() {
    return {
        username: 'bobsmith',
        id: 'jklj9786dsa990ad#',
        nick: 'bob'
    }
}
```

## Keywords

There are certain keywords in JavaScript that are commands. You will want to add a semicolon after those commands.

```javascript
continue;
break;
debugger;
```

## Objects and Arrow Functions

Functions and code blocks do not require a semicolon, but if you are setting a variable to an object or arrow function, stylistically it looks better to end those lines with a semicolon.

```javascript
const myCoolObj = { name: 'cool' };

const printCount = (arr) => console.log(`Array len: ${arr.length}`);
```

## Linters

It is very common for JavaScript developers to use linters like 'JSLint' or 'ESLint'. These linters allow JavaScript developers to set up rules on how your code is written, and can warn the developer if their code is not formatted the way they want.

```json
// ESLint
{
    "semi-style": ["error", "always"],
}
```

The previous rule will force the developer to end every line with a semicolon.

# Conclusion

Semicolons are not required in JavaScript, but stylistically it is probably better to use them. If you are using other languages in combination with JavaScript like C# or Go, it is probably better to continue using the semicolon because it is less of a contextual shift going back and forth between those languages. 