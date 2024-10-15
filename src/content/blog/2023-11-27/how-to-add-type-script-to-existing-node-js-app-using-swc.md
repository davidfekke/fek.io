---
title: "How to add TypeScript to existing Node.js app using SWC"
description: ""
tags: ["Node.js", "TypeScript", "SWC", "JavaScript"]
category: 
date: 2023-11-27
cover_image: "./nerdcat.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/XosDBsxgb7U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I recently started using some [TypeScript](https://www.typescriptlang.org/) in some of the applications I have been working on over the past year or so. A lot of JavaScript frameworks have generators that give the developer the option of whether they want to use TypeScript or JavaScript.

What if you want to add TypeScript to an existing JavaScript application. The nice thing about TypeScript is that it is a superset of JavaScript. In theory any JavaScript file should work in a TypeScript application. 

## Adding TypeScript to your project

It is actually pretty easy to add TypeScript to an existing [Node.js](https://nodejs.org/en) app, and there are a number of different ways to do it as well. Some of the options include the TypeScript module from Microsoft, [Babel](https://babeljs.io/) and a newer tool called [SWC](https://swc.rs/). TypeScript and Babel both run in the Node.js runtime, but SWC is actually written Rust.

## SWC

SWC is a project from Vercel, the hosting company. Vercel sponsors a lot of different open source projects, including [Next.js](https://nextjs.org/) and [Svelte](https://svelte.dev/). As part of their development, they have been looking at ways to improve the speed of their tools, and one of the ways they have been doing that is by re-writing some of the modules in Rust.

SWC stands for the [Speedy Web Compiler](https://swc.rs/). It compiles and bundles for JavaScript, TypeScript, JSX and TSX. It also has an extensible plugin architecture.

To install the SWC, you need to install the core and cli modules.

```shell
> npm i -D @swc/core @swc/cli
```

The next step will be to move your existing code into a source folder. For my project I will call the folder `src`. Then we can add a build step to the `scripts` section of our `package.json` file.

```json
"scripts": {
    "build": "swc build ./src -d dist",
    ...
```

Now if we run the `npm run build` script, SWC will transpile our app into JavaScript into a folder called `dist`. With this set up, you can go through and start progressively adding or rewriting your JavaScript into TypeScript code.

## Conclusion

Many tools in the Node/JavaScript ecosystem are being rewritten in Rust for speed improvements. Much of this software is open source. It is worth taking a look at some of the tools that have been built for other projects. There is a good chance those tools can also be used in your projects as well.