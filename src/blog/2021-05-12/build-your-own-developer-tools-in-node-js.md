---
layout: post
title: "Build your own Developer tools in Node.js"
description: ""
category: 
date: 2021-05-12
cover_image: "./unnamed.jpg"
---

I did a presentation a couple of years ago to JaxNode User Group about building your own tools. As user it is very common to find yourself repeating the same series of commands over and over again. In software development you often here about the SOLID principles. One of those principles is DRY principle, which stands for Don't Repeat Yourself.

If you don't want to repeat yourself as a developer, why would you want to do it as a user? This is one of the reasons why I build my own tools. Here are some examples of tasks I ran across where I built my own tools.

* I created a command line tool for generating thumbnails for iOS and Android apps
* I also created a tool for generating a markdown folder for new blog posts
* I then created a tool for generating a new Node.js project

# Command Line Tools

I have used a couple of different frameworks creating command line tools with Node.js. You don't have to use Node.js. Python and Shell scripts are also popular for creating command line tools. You can even use C.

When using Node.js for command line tools, there are a couple of popular frameworks. The first one that became popular was Commander by TJ Hollowaychuk. That is still popular.

## Oclif

Lately I have been using Oclif. This was developed out of Heroku for their command line tool. Their parent company Salesforce then used it to build SFDX.

Oclif is feature rich with the ability to create multiple commands, add plugins and use either TypeScript or JavaScript for developing your utilities. I will use Oclif for my examples in this post.