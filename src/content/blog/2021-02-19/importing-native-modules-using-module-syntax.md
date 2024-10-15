---
title: "How to Import Native Modules using the new ES6 Module Syntax"
description: "How to use native modules using import syntax"
category: 
date: 2021-02-19
cover_image: "../2019-04-20/cowloff.jpg"
---

I came across an use case of using the newer `import/export` syntax in JavaScript where I was not able to import a native module in Node.js. Node.js recently enabled the ability to have your project use `import/export` syntax rather than the Common.js `require` method. Unfortunately the `import/export` will not work with native modules, but there is a workaround if you look closely enough in the docs.

## Native modules
Node.js has always allowed developers to write code or use libraries that are written in C/C++. This allows developers to take advantage of libraries and code that are already optimized to run natively, like the `talib` stock analysis library. Here is an example of this library being imported into a node application using the older Common.js syntax;

```javascript
const talib = require('talib');
console.log("TALib Version: " + talib.version);
```

## ES6/ES2015 import/export Syntax
The newer `import\export` syntax is turned off by default in Node, but you can use these newer style modules by either giving your files a .ejs file extention, or by setting the `type` setting in your project.json file to 'module'. If you do not set the `type` setting it defaults to 'commonjs'.

Normally you would be able to import the module using the following syntax in Node.js;

```javascript
import axios from 'axios';
```

In order to use the native module you will have to import the `createRequire` function from the 'module' module. Here is an example of how to use the `createRequire` method to import the TAlib modile;

```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const talib = require('talib');
console.log("TALib Version: " + talib.version);
```

As you can see from the previous example once you import the `createRequire` function it will work like the older Common.js syntax. Hopefully this will solve your problems with using native modules.
