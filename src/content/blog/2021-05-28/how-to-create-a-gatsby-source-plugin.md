---
title: "How to create a Gatsby Source Plugin"
description: ""
category: 
date: 2021-05-28
cover_image: "./gatsbyplugins.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/250oBun_wRs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

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

```bash
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

We can test that this is configured properly by run `gatsby develop` on our playground-site. You should see 'Loaded gatsby-starter-plugin' from the terminal when you go to run the playground-site.

## Adding data to our Plugin

Now that we have our sample plugin, lets' modify it so that it will pull in a source from an API. For this example I am going to use the Star Wars API. I want to be able to use GraphQL to query ship data from the Star Wars API. 

Gatsby provides an API you can use to create GraphQL nodes through a function called `createNode`. We can use this inside of a function in the gatsby-node.js file that exports an async function called `sourceNodes`.

For this example I am going to get the data from the Star Wars API using the 'axios' module. In your plugin module you can add this with the following npm command;

```bash
source-plugin> npm i axios --save
```

This will add 'axios' to the project.json dependencies. Now that we have added 'axios' we can modify the gatsby-node.js file so that the sourceNodes function looks like the following;

```javascript
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const axios = require('axios');

exports.onPreInit = () => console.log("Loaded ships");

// constants for your GraphQL Post and Author types
const SHIP_NODE_TYPE = `Ship`;

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

    let shipsleft = true;
    let currentpage = 1;
    let ships = [];

    while (shipsleft) {
        let shippages = await getShipsPage(currentpage); 
        ships.push(...shippages.results);
        if (!shippages?.next) {
            shipsleft = false;
        } else {
            currentpage++;
        }
    }
    
  // loop through data and create Gatsby nodes
  ships.forEach(ship =>
    createNode({
      ...ship,
      id: createNodeId(`${SHIP_NODE_TYPE}-${ship.name}`),
      parent: null,
      children: [],
      internal: {
        type: SHIP_NODE_TYPE,
        content: JSON.stringify(ship),
        contentDigest: createContentDigest(ship),
      },
    })
  )

  return
}

async function getShipsPage(page = 1) {
    const ships = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
    return ships.data;
}
```

We have modified the 'gatsby-node.js' file in the plugin so that it queries all of the ships in the Star Wars API, and adds nodes for each ship. We now test that the plugin is adding the nodes by using the GraphQL by running `gatsby develop` command and doing a query against the Graph*i*QL tool at [http://localhost:8000/___graphql].

Try making the following query in graph*i*ql;

```graphql
query MyQuery {
  allShip {
    edges {
      node {
        id
        name
        model
      }
    }
  }
}
```

## Using this data in our Site

Now that we have the plugin querying data, we can use it to query data and display it on our Homepage. Lets' modify the 'index.js' file so that it uses GraphQL to query the data from our plugin;

```jsx
import React from "react"
import { graphql } from "gatsby"

const HomePage = ({ data }) => {
  console.log(data);
  return (
    <>
      <h1>Ships</h1>
      {data.allShip.edges.map(ship => (
        <div id={ship.node.id}>
          <h3>{ship.node.name}</h3>
          <p>Model: {ship.node.model}</p>
          <p>hyperdrive_rating: {ship.node.hyperdrive_rating}</p>
        </div>
      ))}
    </>)
};

export const query = graphql`
  query {
    allShip {
      edges {
        node {
          id
          name
          model
          passengers
          crew
          hyperdrive_rating
          manufacturer
          starship_class
          url
        }
      }
    }
  }
`

export default HomePage;
```

As you can see from the above example we are importing in 'graphql', creating a query to get our ship data, then outputting through the 'data' de-constructor in the HomePage function.

# Conclusion

Gatsby makes it very easy to extend the built in functionality to import data through the use of source plugins. Combined with the power of GraphQL, we can now easily add new data sources to our Gatsby sites.