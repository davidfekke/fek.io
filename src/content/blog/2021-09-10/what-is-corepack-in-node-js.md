---
title: "What is Corepack in Node.js"
description: ""
tags: ["Node.js", "yarn", "pnpm", "corepack"]
category: 
date: 2021-09-10
cover_image: "./corepack.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/sEI03as_aYQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

With the release of Node.js 16.9.0 comes a new tool called [Corepack](https://github.com/nodejs/corepack). `Corepack` is described as a zero-runtime-dependency Node script that acts a bridge between Node projects and package managers like [Yarn](https://yarnpkg.com/) and [Pnpm](https://pnpm.io/). Node.js comes with a package manager called `NPM` that gets installed with Node.js every time that Node.js is installed on a computer or server. 

So essentially Corepack allows us to use third party package managers without having to install them globally on our development computers or our build servers.

While NPM is most likely the largest package managers, there are some considerations that many organizations have to make when choosing the package manager for their needs. Many organizations can not use NPM because when Node.js developers have dependencies for their application, they are copied into a subdirectory called `node_modules`. Most CI/CD servers and processes do not allow for a build server to access or pull down modules from outside their network. This was one of the reasons that Yarn was invented. Yarn and PNPM can both archive and cache modules on the developers computer as well as in packages that can be stored in the source of the application.

## Introducing Corepack

Corepack is a script that is included with Node.js that can be accessed with the command line. It has commands the specifically for enabling, disabling, preparing and hydrating package managers. Since it is still considered an experimental feature, it comes disabled by default. To enable Corepack, just type the following command into your terminal;

```bash
> corepack enable
```

You can also enable a specific package manager shim by including it's name after the `enable`. In the following example we will enable just the shim for `yarn`.

```bash
> corepack enable yarn
```

If you want to disable corepack, you can turn it off by simple using the following command;

```bash
> corepack disable
```

## Activating a package manager

In this example I am going to activate the `yarn` package manager. With Corepack you can activate one package manager, all package managers or a specific version of a package manager. We will install a specific version of the `yarn` package manager;

```bash
> corepack prepare yarn@1.22.11 --activate
```

This will install yarn version 1.22.11 and activate for our project. Once we have activated our package manager we can run existing package manger commands using Corepack. If we want to add a module using a specific package manager, we simply append those commands to the `corepack` command;

```bash
> corepack yarn add axios
```

If we had yarn installed globally, this would work the same if just ran `yarn add axios`. If we look at the `package.json` file, it will have a dependency for `axios`. We also have a `packageManager` setting in our package.json file that lists which package managers we want to use with our project.

```json
{
  "name": "sampleproject",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "start": "node index.js"
  },
  "packageManager": "yarn@1.22.11",
  "dependencies": {
    "axios": "^0.21.4"
  }
}
```

## Archiving and Distributing our Package Managers

Corepack also allows us to archive up our package managers into our project. These archives can then be hydrated back when our project is deployed into our build environment.

To archive our package manager, we can add an `-o` output flag when we use the `prepare` command.

```bash
> corepack prepare yarn@1.22.11 --activate -o
```

This will add a `corepack.tgz` file to out project that includes our package manager. If we copy the source for our project to another machine, we can unarchive the package manager by using the hydrate command as follows;

```bash
> corepack hydrate --activate corepack.tgz
```

## Conclusion

Corepack is another example of how the Node.js community is making Node a better tool incrementally. By providing support for the different package managers, this is another way the tooling is making our lives easier.

Right now Corepack is preview only, but by installing and using the latest version of Node.js, you can start to get the feel of this new tooling before it becomes part of the default release. 