---
title: "I moved my Website and Blog to Gatsby"
description: "I recently moved my Website from Jekyll to GatsbyJS"
category: 
date: 2019-03-24
cover_image: "./movingtogatsby.jpg"
---

### I recently moved my Website to a new static site generator called Gatsby JS

[Gatsby JS](https://gatsbyjs.org) is a site generator based on the [React](https://reactjs.org/) framework. I have been using [Jekyll](https://jekyllrb.com) for the last couple of years, but I have had real problems with some of the Ruby system not installing ruby gems properly. Another thing that is nice about Jekyll is that itis natively supported on Github pages. All you have to do with any github probject is make sure your jekyll site is checked into the gh-pages branch, and Github will auto-publish your site everytime you check into that branch.

I help run a user group on Node.js called [JaxNode](https://www.jaxnode.com) here in Jacksonville, Fl. Since we are heavily node focused, I decided to use one of the many site generators available on Node. There are many including [Hugo](https://gohugo.io/), [Hexo](https://hexo.io) and [Metalsmith](https://www.metalsmith.io). I opted to go with [Gatsby JS](https://gatsbyjs.org).

![Gatsby Logo](./gatsby-icon.png  "Gatsby Logo")

## Gatsby JS

So why did I choose Gatsby? One reason is that it is based on [React](https://reactjs.org/) JS. Another reason is that it uses GraphQL for pulling in data into the site for things like markdown files, and I have been wanting to learn more about GraphQL. There is also a large ecosystem of plugins for everything from Wordpress support to image manipulation. I have decided to write my first post on some of the challenges I encountered in porting my site and blog over to Gatsby.

### Learning the basics

Gatsby is actually very well documented. They have their main documentation site [here](https://www.gatsbyjs.org/docs/), and they have a great set of tutorials [here](https://www.gatsbyjs.org/tutorial/). If you are starting from scratch they have great set of [starter](https://www.gatsbyjs.org/starters/?v=2) sites. I initially tried to use a couple of there starter sites, but I was not happy with any of the layouts they used, so I decided to create mine from scratch. This turned out to be a worthwhile thing to do because it gave me a chance to get caught up on some of the trends with styling and web design. It is a lot easier to build good looking responsive website just using the built in tools that come with modern browsers now.

Gatsby has a set of CLI tools you can use for developing, building and browsing your site. Here are some of the basic commands;

```bash
// Generate a new site
> gatsby new my-new-site-name

// Develop a site, and see you changes in real-time at localhost:8000
> gatsby develop

// Build your site html
> gatsby build

// Serve the site you just built using localhost:9000
> gatsby serve
```

### Styling

There is a neverending list of options for applying styles to your content. You use plain old CSS, or use styled components, emotion or styling in JS. You can also use SASS or SCSS to compile your CSS. Gatsby also allows you to use something called [CSS Modules](https://www.gatsbyjs.org/starters/?v=2). These are nice because it allows you to create styles that are scoped locally to a single component.

```css
/* src/components/container.module.css */
.container {
  margin: 3rem auto;
  max-width: 600px;
}
```

And then in your component you can import the style as a class onto your component. Here is an example of a component consuming the previous CSS file.

```jsx
// src/components/container.js
import React from "react"
import containerStyles from "./container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
```

I tried to use inline styles where ever I could, but CSS modules are nice when you have to add media queries to make you components responsive. Here is a module I used on one of my headers so it would work on a desktop, tablet or smartphone.

```css

h1.about {
    padding: 200px 0px 200px 0px;
    text-align: center;
    font-size: 4rem;
    font-weight: 1000;
    text-shadow: 2px 2px 5px black;
    margin: 0px 200px 0px 200px;
    color: #fff;
}

@media (max-width: 768px) {
    h1.about {
        padding: 150px 0px 150px 0px;
        text-align: center;
        font-size: 2rem;
        font-weight: 1000;
        text-shadow: 2px 2px 5px black;
        margin: 0px 100px 0px 100px;
        color: #fff;
    }
}

```

### Pages

Creating pages in Gatsby is fairly easy. All you have to do is create a functional component in the `src/pages` directory in your project. If you name your page `about.js`, Gatsby will automatically create a route to that page as `/about/`. Here is what my about page looks like in React syntax;

```jsx
import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="About FEK.IO" />
            <Article>
                <div>
                    <h2>Need a iOS, Android or Node.js application</h2>
                    ...
                    <p>This Web site is built using Gatsby JS. </p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

```

### Linking to other pages

Gatsby does not require the use of the React router. If you want to link to another page, they have a component you can use to create hyperlinks to other pages. This is the `<Link />` component. If you want to use it in your page or component, all you have to do is import it from the gatsby module.

```jsx
import React from "react"
import { Link } from "gatsby"

export default ({props}) => {
    return (
        <div>
            <Link to={props.page}>{props.name}<Link>
        </div>
    )
}
```

## Conclusion

I have not finished making changes to my site yet, but I should be making some more changes soon. I will have some posts on how to add a blog to your site, how to use markdown and how to use the image manipulation features in Gatsby plugins.