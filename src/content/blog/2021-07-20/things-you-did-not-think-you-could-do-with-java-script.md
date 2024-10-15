---
title: "Things you did not think you could do with JavaScript"
description: ""
category: 
tags: ["JavaScript", "IoT", "Image Processing", "ML", "AI", "Gaming"]
date: 2021-07-20
cover_image: "./jacqueline-brandwayn-variety.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/j-fyT9SzjIA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I am often amazed at some of the software that people write using JavaScript as the language. When JavaScript was first introduced in 1995 it was considered by many as a 'Toy' language. At that time Java was considered to be the serious language with 'Java Applets' that could be run in web pages.

JavaScript since then has been implemented into a number of different places including micro-controllers, server applications and even desktop applications. There are also a number of different engines that can be used that portable so JavaScript can basically be run anywhere.

![Coding Horror](../2021-05-16/coding-horror.png)

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

Lets' say you have a task where you need to clear or delete the contents of a folder, this can be accomplished by executing command using the `exec` function. Here is an example of this function deleting a folder;

```javascript
const { exec } = require("child_process");

exec("rm -rf ~/Library/Developer/xcode/DerivedData", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
```

## Machine Learning and Artificial Intelligence

Machine Learning is becoming increasingly important in modern computing tasks. Multi-layered neural networks using advanced models are being used from natural language processing to creating self-driving autopilots for vehicles.

Most of the frameworks for building machine learning applications tend to be focused at the Python community, but there are a number that are available for JavaScript developers.

### Brain.js

Brain.js is a JavaScript framework that works in Node.js as well as the browser and can use GPU acceleration. It uses a native module called `headless-gl` for GPU support. It also has a dependency on Python 2.7.

### TensorFlow.js

TensorFlow.js is based on Google's TensorFlow library. TensorFlow is an end to end open source library for machine learning. 

Like Brain.js TensorFlow.js can run in either the browser or in Node.js. It can run pre-trained models or retrain existing models.

## Write Native Mobile Apps

Yes, native mobile apps. There are a number of frameworks that can be used to create native apps based on JavaScript.

### React Native

Probably the most popular of these native frameworks is `React Native`. Introduced by Facebook, this framework uses the React application framework to build apps, but in combination with a JavaScript bridge to render and control the native components.

This framework is not a wrapper around a WebView like Cordova or PhoneGap, but is an actual native implementation. They have even created their own JavaScript engine that runs on both Android and iOS called [Hermes](https://engineering.fb.com/2019/07/12/android/hermes/).

### NativeScript

NativeScript like React Native allows developers to write native apps, but you can use multiple different frameworks including React, Angular, Vue.js or Svelte.

NativeScript also ships with a command line tool that you can use to create new projects based on templates for the framework of your choice.

### Cordova

Cordova is the open source version of PhoneGap. This framework allows developers to use their skills building HTML/CSS/JavaScript apps to reuse those apps inside of a WebView. The framework simply packages up your HTML based apps inside of a native WebView. It uses the WKWebView in iOS and the WebView control in Android. These packaged apps can be posted to the native app stores just like a native app.  

## Write Video Games

A lot of people used to make the assumption that 3D first person shooters had to be written in languages like C++, but a number of years emscripten showed how these types of games could be ported to run in the browser.

One of the first Emscripten examples that I saw was a 3D first person shooter port from a game that had be written in C++. These types of projects helped inspire the creation of WebAssembly.

WebAssembly gives compiler makers a target that can be used for porting almost any program to the JavaScript runtime using a lower level binary format called `WASM`.

There are also a number of JavaScript frameworks that allow you to build games in pure JavaScript, like [Kaboom.js](https://kaboomjs.com/).

While there are many game frameworks, Kaboom is geared to making games fun and fast. It includes support for sprites, fonts and shaders.

## Connect to Musical Instruments

JavaScript lets' web developers take advantage of a host of [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API). One of the more interesting Web APIs is for connecting and controlling musical instruments with a Web-MIDI interface. 

The Web-MIDI API allows developers to connect and control digital instruments. Check out this article about [making music in the browser](https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/).

## Conclusion

It is difficult to think of an application that can't be written in JavaScript. Especially now with tools like WebAssembly, applications that would have seemed impossible can now run in the JavaScript runtime.



