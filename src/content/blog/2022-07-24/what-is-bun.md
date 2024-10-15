---
title: "What is BUN?"
tags: ["Node.js", "JavaScript", "JavaScriptCore"]
description: ""
category: 
date: 2022-07-27
cover_image: "./bun.jpg"
---

When running JavaScript applications outside of browser, there used to be essentially one choice, [Node.js](https://nodejs.org/en/). Now we have a few different options. [Deno](https://deno.land) was introduced a couple of years ago from Ryan Dahl, the creator of Node.js. Both JavaScript engines are based on V8, the same JavaScript engine that is used by Chrome.

Now we have a new contender, Bun! But Bun does a few more things than just execute JavaScript, it is also a bundler and transpiler.  

## JavaScript Engine

Bun uses JavaScriptCore for it's engine. JavaScriptCore is part of the WebKit Safari source code. JavaScriptCore is also used with React Native, but is being phased out for a new engine called Hermes.

JavaScriptCore is also extremely fast, one of the reasons that it is used in Bun.

## Transpiler

Transpilers are usually added on with modules in Node.js, but both Bun and Deno can transpile or run TypeScript automatically. Running TypeScript in Node usually requires using tools like WebPack, but these features are built into Bun natively. 