---
layout: post
title: "Things you did not think you could do with JavaScript"
description: ""
category: 
date: 2021-07-20
cover_image: "./unnamed.jpg"
---

I am often amazed at some of the software that people write using JavaScript as the language. When JavaScript was first introduced in 1995 it was considered by many as a 'Toy' language. At that time Java was considered to be the serious language with 'Java Applets' that could be run in web pages.

JavaScript since then has been implemented into a number of different places including micro-controllers, server applications and even desktop applications. There are also a number of different engines that can be used that portable so JavaScript can basically be run anywhere.

One of my favorite laws is **Atwood's Law** from blogger and software engineer Jeff Atwood. **Atwood's Law** states: any application that *can* be written in JavaScript, *will* eventually be written in JavaScript. I have been shocked at the kinds of applications that can be written using JavaScript. In my mind this means an application that you thought would have to be written in C or another low level language can be written in JavaScript.

## Image Processing

Believe it or not you can do image processing with JavaScript. There are a number of libraries and tools you can use, but there is one in particular that is written in pure JavaScript, and it is called 'Jimp'. Named similar to the 'Gimp' open source application, Jimp allows you to do simple transformations like resizing, applying filters and converting to other file formats. Check out this example below;

```javascript
import jimp from 'jimp';

jimp.read("lenna.png").then(function (lenna) {
    lenna.resize(256, 256)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write("lena-small-bw.jpg"); // save
}).catch(function (err) {
    console.error(err);
});
```

## Programming Robots

Yes, robots. Not only are there micro-controllers that run JavaScript, there are also a number of different NPM modules that you can use to control traditional micro-controllers like the Raspberry Pi and the Arduino.

### Johnny Five

Johnny-five has been ported to almost every micro-controller board. Simply connect your Arduino to your computer, and you can run JavaScript code to control your hardware projects. The equivalent to a 'Hello-World!' program for a micro-controller is to blink a LED bulb. Here is an example of how you would do that with Johnny-five;

```javascript
const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {

  // Create a standard `led` component instance
  const led = new Led(13);

  // "blink" the led in 500ms
  // on-off phase periods
  led.blink(500);
});
```

## System Scripting

While many write all of their system scripts with languages like Bash or Python, you can do system level scripting with Node.js.

## Machine Learning and Artificial Intelligence

* Brain.js
* TensorFlow.js

## Write Native Mobile Apps

## Write Video Games

## Connect to Musical Instruments

## Conclusion





