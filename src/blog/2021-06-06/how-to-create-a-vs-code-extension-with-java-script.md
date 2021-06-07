---
layout: post
title: "How to create a VSCode Extension with JavaScript"
description: ""
category: 
date: 2021-06-06
cover_image: "./unnamed.jpg"
---

I recently wrote about creating your own tools using Node.js. There are a lot of applications now that are based on Node.js that you can extend using JavaScript. One of those applications is one that I am using right now as I write this post, Visual Studio Code.

## VS Code

If you are not familiar with Visual Studio Code, or VSCode for short, it is Microsoft's open source code editor. It is used for many different types of application development, everything from C++ to Salesforce. From the very beginning VSCode has been extensible, in other words you add functionality to it very easily with extensions. These extensions are written in JavaScript. 

VSCode code is built on top of Electron, a framework from GitHub that is based on Chromium and Node.js. Electron was created to make it easier for web developers to create desktop applications. Web developers can use their existing skillsets to create application based on web technologies like HTML, CSS and JavaScript. These electron apps can run cross platform on Windows, MacOS and Linux.

## Creating a plugin

I created a command line tool for generating new blog posts a couple of years ago called 'blogpostgenerator'. You can find it on NPM. This tool creates a folder named after the current date, and then creates a markdown file with some frontmatter for metadata. 

Microsoft has pretty good documentation on how to create a extension for VSCode, but I was looking at creating an extension that could take some user input for the name of the file I was trying to create. Here is how I created my extension.

You can create a hello world extension using [Yoeman](https://yeoman.io/) and a VSCode generator called 'generator-code'.

```bash
npm install -g yo generator-code
yo code
```

When running this, I chose JavaScript over TypeScript. Choose webpack for the project bundler.

This will generate a new extension project




https://code.visualstudio.com/api/working-with-extensions/bundling-extension