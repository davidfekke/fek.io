---
title: "How to add slides.com Reveal Slides to your Gatsby site"
description: ""
category: 
date: 2021-06-13
tags: ["Slides", "HTML", "Reveal.js"]
cover_image: "../2021-05-28/gatsbyplugins.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/Ylj1Uq2sDb0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I was getting ready to create a set of slides for my next presentation. I usually use [slides.com](https://slides.com) to create and host my slides. If you have not looked at slide.com before, it is a great example of the power of web applications. Slides.com has a presentation editor that is based on Reveal.js, a JavaScript library for making animated slide shows. I am a firm believer that you do not need Powerpoint to make slide shows. This can be done as a web app.

As I was getting ready to start my next set of slides I found out I had exceeded my limit of free slides. So I have decided to move my slides over to my Gatsby site.

The first thing I had to do was export all of my slides. Slides.com gives you the ability to import and export slides into and out of their application. It will allow you to export your slides as a self contained HTML application in a single HTML file.

Gatsby allows you to host static content in your site so that if you need to serve static css or images, this can be easily configured. You will need to install the 'gatsby-source-filesystem' plugin in order to serve these files.

```bash
> npm i gatsby-source-filesystem --save
```

The above command will install the plugin into your Gatsby site. After it has been installed, you will need to configure the plugin in your 'gatsby-config.json' file. Add the following configuration into the plugins export.

```json
plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `static`,
          path: `${__dirname}/static`
        },
      }
];
```

This will look into a 'static' folder for any static files you need to serve. I added another folder underneath my static folder called 'slides', and placed my HTML files in that folder.

To retrieve a list of slides from our static folder, we will need to write a graphql query to get that list of files. You can test this by using the Graph*i*ql editor hosted in the development server. You can access this by going to [http://localhost:8000/___graphql](http://localhost:8000/___graphql).

```graphql
{
    myslides: allFile(filter: { relativeDirectory: {eq: "slides" }}) {
      edges {
        node {
          name
          relativePath
        }
      }
    }
}
```

The next need you will need to do is create a Gatsby page to list the slides in your 'slides' folder. I created one underneath the root of my '/src/pages' called 'slides.js'. Here is what my react code looked like in my 'slides.js' file.

```jsx
import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const Slides = ({ data }) => (
    <Layout>
        <MainHelmet title="Fek.io" />
        <Navbar />
        <Header headline="About FEK.IO" />
        <Article>
        <div>
            <h1>Slides</h1>
            <p>Here are copies of my slides from my presentations.</p>
            {data.myslides.edges.map( ({node}) => {
                const link_path = `/${node.relativePath}`;
                return (<div key={node.name}>
                        <a href={link_path}>{node.name}</a>
                    </div>)
                })
            }
        </div>
        </Article>
        <Footer />
    </Layout>
)

export const query = graphql`{
    myslides: allFile(filter: { relativeDirectory: {eq: "slides" }}) {
      edges {
        node {
          name
          relativePath
        }
      }
    }
}`;

export default Slides;
```

If you look at the section on line 22 that has a map on the edges of the result `data.myslides.edges.map`, I am returning an anchor tag instead of a `Link` tag for displaying the link. This is because the `Link` tag is only used for gatsby pages. Since this is static HTML content we want to use a normal anchor tag.

## Conclusion

Gatsby is great at doing many different things. On top rendering react content and Gatsby content, you can also use it to serve up static content as well as long as you configure your site correctly. 

There are also a number of plugins you can use for creating slides from markdown that I plan on looking at as well.

You can view my slides page at [here](/slides).