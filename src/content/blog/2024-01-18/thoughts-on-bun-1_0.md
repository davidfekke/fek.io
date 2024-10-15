---
title: "Thoughts on Bun 1.0"
description: ""
tags: ["Bun", "Node.js", "Deno", "Elysia", "Hono"]
category: 
date: 2024-01-18
cover_image: "./bunheader.png"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/tsQkt3n2ubM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

Yesterday I gave a presentation on Bun 1.0. If you are not familiar with [Bun](https://bun.sh), it is a JavaScript runtime, bundler, package installer and tester. Not only does it package multiple JavaScript tools into a single tool, it is also really fast. I did a previous [post](/blog/what-is-bun//) on Bun when it was first released, but I was able to do a deep dive on Bun for this presentation I gave at the JaxNode User Group.

There are now multiple JavaScript runtimes that work outside of the browser, including Node.js and Deno, both created by Ryan Dahl. Both Node and Deno use V8, the JavaScript engine that is part of Chrome, Edge and many other browsers. Node.js is written in C++, and Deno is written in Rust, but they both use V8. Currently V8 is being developed so that it not only has to be compatible with Chrome, it also can not break Node.

Bun is actually written in a language called [Zig](https://ziglang.org/) and it uses [WebKit](https://webkit.org/). One of the things that is interesting about webkit is that Apple has made a lot of investments in
webkit to try to make it the fastest browser and the JavaScript engine. 

On top of having a very fast JavaScript engine, another thing that we use
quite a bit in the in this ecosystem is package managers. NPM was the
original package manager that shipped with Node.js, and there were a lot of complaints
about uh NPM over the years, but the the project itself hosts modules.
They have well over two million modules, I think it's approaching 3 million modules on on
NPM.

There are a couple of other competing package
managers that came out over the years. Both [Yarn](https://yarnpkg.com/) and [PNPM](https://pnpm.io/) are our alternative package managers, 
and they did some things that NPM didn't do, like caching.

Over the years there's actually been a lot of improvement to NPM, and so I believe now that if you
did a speed comparison between NPM and Yarn, initially yarn was a faster tool. NPM is
actually now faster than Yarn, and now that whole project is
owned by by [Microsoft](https://microsoft.com), so if you go to npmjs.com, that's all owned by by
Microsoft. 

Now Bun aims to be the fastest package manager.

Bun is written in Zig, and it uses JavaScriptCore for it's runtime, which is the same runtime in WebKit and Safari.
There are some pluses and minuses with that which I'll get into
later, and it's very very fast. It's faster than Deno or Node.js. 

## Who is Jarred Sumner

So who is this Jarred Sumner guy? Sumner was a Thiel fellow. The Thiel fellowship is a program where they pay college students to leave college, and start a company instead.
Sumner has started other companies, but in 2022 he formed a new startup called Oven.sh to be the parent company for the Bun project. At the end of last year Bun went 1.0.

One of the design goals for Bun is speed. Support for Typescript and JSX are also goals with trasnpilation built in into
the into the tool. Bun also supports ESM and Commonjs
module imports in the same file. Compatibility with other web standard APIs is another goal.

## Why is speed so important?

[V8](https://v8.dev/) brought JavaScript out of the 90s performance
realm. This really allowed servers to be written in JavaScript. Previously it really wasn't fast enough to run on the server.
JavaScript is still not as fast or as efficient as native code, and so anything that we can try to do to improve the speed of JavaScript is something that we should take
seriously.

JavaScript is an extremely productive languages, and has a lower barrier to entry than some other languages like [Rust](https://www.rust-lang.org/) or [Go Lang](https://go.dev/). 
The speed that JavaScript can be bundled is also a huge gain for developer experience. Anyone who has tried to bundle a large Gatsby.js project know how important.

Another reason speed is important is the Cloud. Whether you are using AWS, Azure, GCP, Heroku or Vercel, in the cloud you pay for everything. 
You pay for storage, you pay for CPU cycles and you pay for memory.

## Installing Bun

So how do you install Bun? Right now Bun is mostly a Mac and a Linux tool, but they do have a Windows beta. 
If you are using Windows, I would highly suggest using WSL 2 for Windows. WSL is the subsystem for linux. Bun will install very easily using WSL.

On the Mac, you can install it using a curl command, 
NPM, homebrew or even Docker. The easiest way to install is using the curl command. 

```shell
$ curl -fsSL https://bun.sh/install | bash
```

Use the curl command that I'm sharing right here, and it'll install it
right there on your your machine.

## Bun's built in modules

So there are a bunch of really cool built-in features and modules in Bun. They have modules for serving HTTP content, File I/O and even SQLite. They also have mirrored some of the Node APIs, do you can still use the `fs` module and the `http` module.

To create a really simple web server, here is a sample using Bun's `server` API:

```javascript
Bun.serve({
    fetch(req: Request) {
      return new Response(`Echo: ${req.url}`);
    },
});
```

If you want to read the contents of a text file, you can use the `Bun.file` function:

```javascript
// Bun file reader is a simple way to read files from the file system
const airports = Bun.file('airports.dat'); 
console.log(`Size: ${airports.size}, type: ${airports.type}`); // number of bytes and mimetype

// Bun.file returns a promise, so we need to use await
const airporttext = await airports
    .text();

const airportArray = airporttext
    .trim()
    .split('\n')
    .map(line => line.split(','));

const airportObjectArray = airportArray.map(line => {
    const airportObject = {
        id: line[0],
        name: line[1].replace(/"/g, ''),
        city: line[2].replace(/"/g, ''),
        country: line[3].replace(/"/g, ''),
        iata: line[4].replace(/"/g, ''),
        icao: line[5].replace(/"/g, ''),
        latitude: line[6].replace(/"/g, ''),
        longitude: line[7].replace(/"/g, ''),
        altitude: line[8].replace(/"/g, ''),
        timezone: line[9].replace(/"/g, ''),
        dst: line[10].replace(/"/g, ''),
        tzDatabase: line[11].replace(/"/g, ''),
        type: line[12].replace(/"/g, ''),
        source: line[13].replace(/"/g, '')
    };
    return airportObject;
});

const crgAirport = airportObjectArray.find(airport => airport.icao === 'KHBI');
console.log(crgAirport);
```

They also have ffi functionality, that's the foreign function interface. So if you have native code and you need to be able to
interact that code in your JavaScript, you can call that from within your JavaScript application. In the example below, we have a Rust function that adds two numbers together.

```rust
// add.rs
#[no_mangle]
pub extern "C" fn add(a: isize, b: isize) -> isize {
    a + b
}
```

We can can compile this into a dynamic library using following command if you have Cargo installed:

```shell
rustc --crate-type cdylib add.rs
```

This will create a library named `libadd.dylib`. If we want to use this library in Bun, we can use the following example:

```javascript
import { dlopen, FFIType, suffix } from "bun:ffi";

const path = `libadd.${suffix}`;

const lib = dlopen(path, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
});

const result = lib.symbols.add(1, 2);
console.log(`The result would be ${result}`);
```

Bun also supports the `fetch` API and they have an implementation of the Node Crypto libraries, but they do not seem to be 100% compatible with the Crypto library in Node.js

## Node compatibility

While the makers of Bun claim that it is a drop in replacement for Node.js, I did not find that to be the case. You can go to the Bun [documentation](https://bun.sh/docs/runtime/nodejs-apis), and they actually do a pretty good of showing which features are not fully compatible with Node.js.

## Bundling

The bundler that comes with Bun is inspired by the esbuild tool and all you have to
do is simply point to an entry point, and any files that are included in that file
will automatically get rolled up into your into your output directory.

```javascript
await Bun.build({
    entrypoints: ['./index.ts', './server.ts', './honoserver.ts', './filereader.ts'],
    outdir: './dist',
    target: 'node'
});
```

The following script will run through an array of different entry points, and transpile
these TypeScript files into JavaScript vsersion in the folder called `dist`. The build function
can build for different targets including `browser`, `node` and `bun`.

## Test runner

They also have a test runner that's built into Bun as well, and it is a Jest compatible Runner.It looks for files that have a `.test`, `.spec`, `_test` or `_spec`. All you have
to do is run `bun test`, and it will run any test that you have in your in your project.

## Is Bun a drop in replacement for Node.js?

Is Bun a drop in replacement for for node.js. What you're going to find is that
most apis will will work just fine with with node. Modules like like the file system,
the HTTP modules are supported, so while Bun has their own modules that are most likely faster than the node based modules, they do support those modules
because they're trying to make it as compatible as possible with the node ecosystem.

Most of the frameworks will just work. Express, Koa, Svelte Kit, Nest will work. Some of the modules they use may not work, so it is important to test. 

Frameworks that use JSX server components like Next.js and Remix have partial support on Bun. The server components will not work on Bun.

I would test thoroughly for for compatibility. Bun actually does have pretty good documentation under their docs on all the different Node.js apis, and the current level of support.

## Let's talk about V8

Let's talk a little bit about V8 and JavaScriptCore. Node
originally adopted V8, and V8 releases were not initially tied to node releases.
Node was a side project and V8 was tightly
coupled with uh with the Chrome browser, and then at some point, they decided that they were going to release V8 in parallel with Node.js.

Now when V8 does a new release of V8, not only does it have to work with chrome also has to work with Node. They do a pretty thorough
job of making sure that V8 works with both the browser as well as Node.

There is a new release of V8 every four weeks, and that's usually
incorporated into some version of Chrome as well as Nodejs.

Bun uses a JavaScriptCore, which is coming through a webkit fork.
Chrome initially was forked off of the the WebKit project, and Safari is a fork of
the WebKit project. They have diverged, and Apple's made a lot of
investments to make sure that WebKit is really, really fast. It is faster than
V8. 

But Apple releases a lot less frequently for for WebKit open source repo, so that's
something else to keep in mind. If you actually go to the source, you can see how often Apple
releases changes to that repo. Apple will release updates to the source after a
year or two. 

Over at Oven, they have forked the webkit JavaScriptCore, and they are
updating it and making changes to it on a regular basis, I'm not sure how far they've diverged
from what Apple is doing because Apple kind of works in their their own little bubble. That is something to keep in mind when you know that V8 is something that's always actively being worked on and supported by Google.

## Frameworks for Bun 

Bun not only will use existing
Node.js web application frameworks, but Bun also runs new frameworks that have been built with Bun in mind. There is one that is called [Hono](https://hono.dev/), and then there is one called [Elysia.js](https://elysiajs.com/). 
Somebody even has come up with a term called the BETH stack similar to the MERN stack or the MEAN stack. [`BETH`](https://github.com/ethanniser/the-beth-stack) stands for Bun, Elysia.js, [Turso](https://turso.tech/beth) and [HTMx](https://htmx.org/). Elysia.js is a framework similar to Express. 

![Photo of the Edge from U2](./U2_in_Melbourne_(49094944907)_(cropped).jpg)

## The Edge

Whe you hear vendors refer to `The Edge`, they are generally referring to edge services that run on a server close to the client browser. They work very similar to a CDN, but you can also host functions on these Edge servers. [Vercel](https://vercel.com) offers Edge hosting along with a lot of other cloud based hosting providers.

Basically on these Edge servers, the idea is that when somebody hits up your
application and it's deployed on Vercel for example,
there are functions that they can host and run as
close to the user as possible.

Bun and these other edge based services support and complies with the
[WinterCG](https://wintercg.org/) or the Web-interoperable Runtimes Community Group.
Basically what that means is that all these companies are providing hosting Services where they
allow you to run functions on the Edge, and the WinterCG is the governing body that decides what
JavaScript features they're going to support, and what JavaScript features they are not going to support.

## Conclusion

While I think that Bun has lots of promise, I would not recommend using it in production as a server. One of the business goals for Oven.sh, the parent company overseeing Bun is to provide hosting. This would probably be the first place I tried running Bun since they have the most experience in running Bun, and understand all of the limitations.
