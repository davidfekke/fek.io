---
title: "Things I have Learned About Gatsby JS"
description: ""
category: 
date: 2019-04-03
cover_image: "./movingtogatsby.jpg"
---

*Check out my first post on [Gatsby JS](/blog/i-moved-my-website-and-blog-to-gatsby)*

# Gatsby is fun to use

I have really enjoyed using Gatsby so far in the process of moving my website to a new site generator. In my previous post I talked about some of the problems I had with Jekyll and ruby. I have used Node.js quite a bit for other applications, so it made the transition much easier.

## Hierarchical paths

It is very common to use a URL pattern that simulates a hierarchical structure. If you have different products that you list on your website, you may have a parent directory called `products`. Then underneath `parents` you may have a page for a particular product for a baseball. That path might look like `/products/baseball`. This can be done very easily in Gatsby by creating a similar folder structure;

```bash
src/
--pages/
----index.js
----contact.js
----about.js
----products/
------index.js
------baseball.js
``` 

## React

Gatsby is built on [React](https://reactjs.org/) JS. React is not exactly JavaScript. It is really JSX. There are certain things you can get away with in JSX that you can't get away with in real JavaScript. The main thing is being able to intermingle your HTML and JavaScript in the same class or function;

```jsx
import React from "react"
import Container from "./container.js"
import headerStyles from "./aboutheader.module.css"

export default props => {
    return (
        <header className={headerStyles.back}>
            <Container>
                <h1 className={headerStyles.about}>{props.headline}</h1>
            </Container>
        </header>
    )
}
```

One of the great things about transitioning to Gatsby is that it has given me a chance to learn a little more about React and GraphQL. There were a lot of times where I would use JQuery or vanilla JavaScript to manipulate the document object model. Moving to React forced me to use React to manipulate the DOM. React uses a shadow DOM behind the scenes to actually manipulate the DOM.

Another nice thing about React is the way it makes it easy to create reusable components. A breadcrumbs section is great example of the kind of thing that can be turned into a reusable component.

```jsx
// breadcrumb.js
import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.css"

export default props => {
    return (
        <div>
            <ul className={breadcrumbStyles.breadcrumb}>
                {props.crumbs.map((crumb, index) => (
                    ((props.crumbs.length - index) > 1) ? <li key={index}><Link to={crumb.toLowerCase()}>{crumb}</Link></li> : <li key={index}>{crumb}</li> 
                ))}
            </ul>
            <div style={{ clear: 'both' }}></div>
        </div>
        
    )
}
```

For this component I created a css module;

```css

ul.breadcrumb {
  display: inline-block;
  padding: 10px 16px;
  list-style: none;
  background-color: #eee;
  border-radius: 6px;
}

ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}

ul.breadcrumb li+li:before {
  padding: 8px;
  color: black;
  content: "/\00a0";
}

ul.breadcrumb li a {
  color: #0275d8;
  text-decoration: none;
}

ul.breadcrumb li a:hover {
  color: #01447e;
  text-decoration: underline;
}
```

This can easily be included into your page and called using the following implementation;

```jsx
import React from "react"
import Layout from "../../components/layout"
import Breadcrumb from "../../components/breadcrumb"

export default () => {
    return (
        <Layout>
            <Breadcrumb crumbs={ [ 'Products', 'iLottNum' ] } />
            ... your content here
        </Layout>
    )
}
```

### Plugins

There is a lot of functionality that can be added to a Gatsby project through the use of plugins. The Gatsby project has a list of them you can search through on their [plugin site](https://www.gatsbyjs.org/plugins/). Gatsby plugins have two basic types, source and transform. Source plugins are used to pull different sources of data that can be used in your Gatsby site. Transformer plugins are used to take data and transform that into something that is more usable for your site. The `gatsby-transformer-remark` plugin will take markdown content and convert it into frontmatter and HTML.

Here are some the plugins I used to help me add things very easily that would have been harder if I did not have the plugin.

#### gatsby-remark-prismjs

`gatsby-remark-prismjs` adds the PrismJS framework to your site making it easier to show code examples in articles and posts.

#### gatsby-plugin-react-helmet

`gatsby-plugin-react-helmet` is based on the Reacth-helmet plugin for adding meta data to your header. This becomes important when you try to add SEO to your site and posts. Here is an example of how I am using on my site;

```jsx
import React from "react"
import { Helmet } from "react-helmet"

export default (props) => {
    return (
        <Helmet
            meta={[ { charSet: 'utf-8'} ]}
            title={props.title}
            link={[
                { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic'},
                { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'},
                { rel: 'icon', sizes: '16x16', type: 'image/png', href: `/favicon16.png` },
                { rel: 'icon', sizes: '32x32', type: 'image/png', href: `/favicon32.png` },
                { rel: 'shortcut icon', type: 'image/png', href: `/favicon64.png` }
            ]} />
    )
}
```

As you can see from the example above I am adding some Google fonts and favicons to my header. The resulting HTML looks like the following;

```html
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Fek.io</title>
    <link data-react-helmet="true" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic">
    <link data-react-helmet="true" rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800">
    <link data-react-helmet="true" rel="icon" sizes="16x16" type="image/png" href="/favicon16.png">
    <link data-react-helmet="true" rel="icon" sizes="32x32" type="image/png" href="/favicon32.png">
    <link data-react-helmet="true" rel="shortcut icon" type="image/png" href="/favicon64.png">
</head>
```

#### gatsby-plugin-sitemap

The `gatsby-plugin-sitemap` plugin lets you add a `sitemap.xml` file to your page header so search engines and robots can pick up the full site layout of your website.

#### Google analytics

The `gatsby-plugin-google-analytics` plugin lets you add Google Analytics to your sites JavaScript. You will need to get a trackingId from your Google Analytics console, and add the following plugin configuration to your gatsby-config.js file.

```json
...
plugins: [{
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "ENTER_YOUR_TRACKINGID",
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is optional
          anonymize: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          cookieDomain: "yourdomain.com"
        },
      }
],
...
``` 

## Summary

This is really just a small set of some of the incredibly useful Gatsby plugins. I will have future posts on how to configure image manipulation as well as markdown content in you Gatsby projects.