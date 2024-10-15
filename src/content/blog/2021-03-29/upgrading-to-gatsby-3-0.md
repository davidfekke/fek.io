---
title: "Upgrading to Gatsby 3.0"
description: ""
category: 
tags: ["JavaScript", "Gatsby", "Graphql", "React", "Node.js", "npm"]
date: 2021-03-29
cover_image: "./lucas-benjamin.jpg"
---

I upgraded my website to the newest version of [Gatsby JS](https://www.gatsbyjs.com). If you are not familiar with [Gatsby](https://www.gatsbyjs.com) or the [jamstack](https://jamstack.org/), it is a framework for creating static websites using the [React](https://reactjs.org/) framework. Last month Gatsby 3.0 was released, the first major upgrade since 2.0 in 2018.

They have included a [Gatsby 3.0 Migration Guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/) in their docs, but I wanted to cover the changes I had to make in order to upgrade the site to 3.0.

The first step I did was create a git branch for the upgrade that I could blow away if the upgrade failed. Once I created the new branch, I followed the instructions in the migration guide. The first step was upgrading the dependencies in the Node package.json file. I ran the following command;

```bash
npm install gatsby@latest --save
```

After I upgraded the gatsby module, I then checked which dependencies needed to be upgraded by running the following command;

```bash
npm outdated
```

This command will give you a report of which dependencies in your project need to be upgraded;

```bash
> npm outdated

Package                  Current   Wanted  Latest  Location
gatsby-plugin-sharp      2.14.1    2.14.1  3.1.2   test
```

## Breaking changes

There were a number of breaking changes that required code upgrades. One example was the `navigateTo` function has been renamed to just `navigate`. Here is an example;

```javascript
import React from "react"
- import { navigateTo, push, replace } from "gatsby"
+ import { navigate } from "gatsby"
const Form = () => (
  <form
    onSubmit={event => {
      event.preventDefault()
-     navigateTo("/form-submitted/") // or push() or replace()
+     navigate("/form-submitted/")
    }}
  >
)
```

One of the issues I came across that I did not find in their guide was how to import css styles modules. When writing components in Gatsby, you can write style modules just for an indiviual module. So for example if you have a header component named `header.js`, you can have a set of styles just for that component named `header.module.css`. Previously you would import that style in the module like this;

```javascript
import React from "react"
import headerStyles from "./header.module.css"
```

Now this has to be imported using the `*` wildcard;

```javascript
import React from "react"
import * as headerStyles from "./header.module.css"
```

# Graphql upgrade

Graphql in earlier versions of Gatsby did not require being imported in order to use the graphql function. I had not been importing it in my `gatsby_node.js` file. I did have to add this import in order for me to use the graphql function;

```javascript
const graphql = require('gatsby').graphql;
```

I am also using an extra frontmatter variable for specifying an extra variable for the `cover_image`. This allows me to specifiy a unique cover graphic in my header for each post. I was able to add this by adding the following schema addition in the `gatsby_node.js` file;

```javascript
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type frontmatter implements Node {
        cover_image: String!
      }
    `
    createTypes(typeDefs)
}
```

# Node.js version requirements

I am currently using Netlify to host my site. Netlify defaults to Node v10, but Gatsby 3.0 now requires that you at least have version a minimal Node.js version of no less than 12.13.0. You can specify a newer version of Node on Netlify by using a `.nvmrc` file. I created one that looks like the following;

```bash
-- .nvmrc
14.16.0
```

# Summary

This upgrade was not entirely painless, but I was able to make the upgrade in about an hour by following their guide. There are lots of new additions that have been made to Gatsby that you can now take advantage of by making this upgrade. I hope this post helps you with your upgrade.