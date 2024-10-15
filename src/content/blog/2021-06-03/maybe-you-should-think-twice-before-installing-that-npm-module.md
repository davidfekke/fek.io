---
title: "Maybe you should think twice before installing that NPM module?"
description: ""
category: 
date: 2021-06-03
tags: ["JavaScript", "NPM", "Node.js"]
cover_image: "./marcus-kauffman-apocolapse.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/0p8B3c1qZ4o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

It has been just over five years since the event known as 'LeftPad Apocalypse'. In March of 2016 an NPM user removed their module 'Left-pad' from the NPM repository, resulting in the breaking of any Node.js application which had that dependency.

It was a wake up call for the Node.js community, and some changes where implemented to NPM after this incident to prevent this from happening again.

## What exactly happened

A company called Kik with a messenger app wanted to use the same module named 'kik' as another user, Azer Koçulu, on NPM. They sent Mr. Koçulu an e-mail from a patent attorney asking him to relinquish the module named 'kik'. Mr. Koçulu declined to give up the module name. Kik then went to NPM with a trademark request to give them access to the module, which they eventually did.

Mr. Koçulu after loosing the module name decided to un-publish all 250 of his other modules from NPM. One of those modules was a module that was used in thousands of projects including Babel.js. When he un-published 'left-pad', it essentially broke the internet. This is because so many projects rely on NPM, not to mention that modules also have their dependencies. You wind up with these giant tree structures of dependencies sometimes 10 levels deep. If you want to visualize this, simply run `npm list` in your modules directory. 

This was caused by a module at the time that was only 11 lines long.

```javascript
module.exports = leftpad;

function leftpad (str, len, ch) {
  str = String(str);

  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (++i < len) {
    str = ch + str;
  }

  return str;
}
```

Laurie Voss, who was the CTO of NPM at the time took the unprecedented step of un-un-publishing a module. NPM as a company was still fairly young, and had not run into this scenario before. They made a change to their system that would prevent users from un-publishing a module if there were dependencies on that module to prevent a repeat of this incident.

Here are some posts on the actual incident;

[Kik: A discussion about the breaking of the Internet](https://medium.com/@mproberts/a-discussion-about-the-breaking-of-the-internet-3d4d2a83aa4d#.ld8o5zqz7)

[Azer Koçulu: I've just liberated my modules](https://kodfabrik.com/journal/i-ve-just-liberated-my-modules)

[David Haney: Have we forgotten how to program?](https://www.davidhaney.io/npm-left-pad-have-we-forgotten-how-to-program/)

[NPM Blog: kik, left-pad, and npm](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)

## Rethinking NPM modules

One of the great things about Node can also be a weakness, the ability to `npm i` any functionality at a whim. 

![Great Power comes with Great Responsibility](./great-power.jpg)

Before installing any NPM module you should first ask yourself, do I really need to include this module? A great example of this is moment.js. Moment is primarily used for working with date objects in JavaScript. It can also format dates and get date parts.

```javascript
const year = moment().format('YYYY'); 
```

You can also accomplish the same thing by calling the `getYear()` function on the date object in JavaScript.

```javascript
const year = new Date().getYear();
```

## Local repos

A lot of larger organizations now pre-approve which NPM modules can be used in a project. Some use local repos so that their developers only use pre-approved modules in their applications. 

NPM also offers a local version of NPM so you can run just run it for your organization.

## Deno's Approach

If you are not familiar with [Deno](https://deno.land/), it is an alternative JavaScript runtime from Ryan Dahl, the inventor of Node.js. One of the things that Ryan did when he created Deno was rethink how he did certain things in Node. 

Node.js does not have a standard library. When Ryan created Deno, he also made sure that it included a standard library of modules you can use without having to install third party modules.

Deno also allows developers to import modules directly from the source, so there is no need for a package manager. You can simply `import 'https://github.com/someuser/mymodule/main/src.js'` in your app, and Deno will cache the module locally on your system.

Deno also has a dependency inspector you can use to evaluate your dependencies. Simply run `deno info`, and Deno will run it's inspector.

## Researching your modules

Before you npm install any module you have not worked with before, take a look at the source. Most of the modules on NPM are open source or have a license where you can look at the source code. **LOOK AT THE SOURCE!!!**

Another thing to look at is the dependencies used by that module. One of the things you should look at is how old are those dependencies, and are there any security concerns. NPM provides a security audit you can perform on your modules.

```bash
npm audit
```

`nome audit` will generate a report with any vulnerabilities. You can also use `npm audit fix` to address any vulnerabilities in the module.

# Conclusion

NPM can add a ton of extra functionality to your Node applications, but you should only use it when you need a specific functionality not already provided. Consider writing your own modules when possible.

Most modules on NPM are open source projects, and most are also on Github. If you find a problem with an existing module, consider making a pull request to give back to this awesome community.
