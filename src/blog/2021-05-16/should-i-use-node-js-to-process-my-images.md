---
layout: post
title: "Should I use Node.js to Process my Images?"
description: ""
category: 
date: 2021-05-16
cover_image: "./unnamed.jpg"
---

One of my favorite laws is **Atwood's Law**. **Atwood's Law** states: any application that *can* be written in JavaScript, *will* eventually be written in JavaScript. I have been shocked at the kinds of applications that can be written using JavaScript.

If you are not familiar with Jeff Atwood, he writes the popular blog [Coding Horror](https://codinghorror.com).

# Image Processing

One of the first programming jobs I had in the 90s was writing an AppleScript that could leverage photoshop to create images for a High Resolution library the company I was working for at the time was trying to build. At the time Adobe did not have scripting capability built into Photoshop like they do know. I found a Photoshop plugin that would allow me to write code that could command Photoshop to automate our imaging needs.

Nowadays there are all kinds of tools at our disposal for image processing that can be scripted. But what about Node.js? It turns out there are a lot of tools for image processing in Node.js that are available through [NPM](https://npmjs.com). 

A couple of years ago I built a tool called jimp-appicon for creating icons for iOS/iPadOS and Android apps. Apple and Google both require many different dimensions of these square images in order to create icons for all of the different devices with varying screen sizes.

# Jimp

Jimp, a tool named after the popular GIMP image processing application, is an image processing tools written entirely in JavaScript.