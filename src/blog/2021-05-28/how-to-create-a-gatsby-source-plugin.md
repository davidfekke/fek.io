---
layout: post
title: "How to create a Gatsby Source Plugin"
description: ""
category: 
date: 2021-05-28
cover_image: "./gatsbyplugins.png"
---

One of the powerful things about Gatsby is the way you can pull multiple sources of content from completely different areas into your site. Gatsby does this through plugins. 

There are two primary forms of plugins for Gatsby, 'source' and 'transformer'. Source plugins allow you to bring data from out side of your Gatsby site into Gatsby, and Transformer plugins allow you to massage and transform the data from your sources into the specific content you need in your site. 

Once data is configured to be brought into your site through a source plugin, you will be able to use GraphQL queries to query the specific content you need added to your site. 

You can also use Gatsby's built in query editor that can be accessed via the Graph*i*QL `http://localhost:8000/___graphql` url after you run `gatsby develop`.

## Sources

There are an unlimited number of sources for Gatsby that include APIs, content engines, static files and even databases. In this post I am going to create a plugin that pulls in content from an external API.

## Creating the plugin

To create my Gatsby plugin, I am going to create a new Gatsby site and a Gatsby plugin module using the Gatsby CLI. Lets' create the site first using the 'Hello World' starter.

```bash
gatsby new playground-site gatsby-starter-hello-world
```

Now lets' create a source plugin in the same directory we created the playground site.

```bash
gatsby new source-plugin https://github.com/gatsbyjs/gatsby-starter-plugin
```

If you want to, you can also create the plugin into the 'plugins' folder in your playground-site folder. For this example we will keep the site and plugin in separate folders.

```
/playground-site
/source-plugin
├── .gitignore
├── gatsby-browser.js
├── gatsby-node.js
├── gatsby-ssr.js
├── index.js
├── package.json
└── README.md
```

## Configuring your plugin

Now lets' configure are 'playground-site' to use the plugin by editing the 'gatsby-config.json' file in the root of our 'playground-site' folder.

```json
module.exports = {
  plugins: [require.resolve(`../source-plugin`)],
}
```

We can test that this is configured properly by run `gatsby develop` on our playground-site. 
