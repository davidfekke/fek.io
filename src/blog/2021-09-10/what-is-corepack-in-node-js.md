---
layout: post
title: "What is Corepack in Node.js"
description: ""
category: 
date: 2021-09-10
cover_image: "./unnamed.jpg"
---

With the release of Node.js 16.9.0 comes a new tool called [Corepack](https://github.com/nodejs/corepack). `Corepack` is described as a zero-runtime-dependency Node script that acts a bridge between Node projects and package managers like [Yarn](https://yarnpkg.com/) and [Pnpm](https://pnpm.io/). Node.js comes with a package manager called `NPM` that gets installed with Node.js every time that Node.js is installed on a computer or server. 

While NPM is most likely the largest package managers, there are some considerations that many organizations have to make when choosing the package manager for their needs. Many organizations can not use NPM because when Node.js developers typically all of the dependencies for their application, they are copied into a subdirectory called `node_modules`. Most CI/CD servers and processes do not allow for a build server to access or pull down modules from outside their network. This was one of the reasons that Yarn was invented. Yarn and PNPM can both archive and cache modules on the developers computer as well as in packages that can be stored in the source of the application.

## Introducing Corepack

