---
title: "Adding MDX to your Gatsby Blog"
description: ""
category: 
tags: ["Gatsby", "MDX", "JavaScript", "React"]
date: 2021-07-03
cover_image: "../2021-05-28/gatsbyplugins.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/9B8i_CAON_0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

[MDX](https://github.com/mdx-js/mdx) is a hybrid of [Markdown](https://www.markdownguide.org/) syntax and [React](https://reactjs.org/) JSX syntax. Authors who are writing posts in Markdown can use React components in their posts. 

Currently Markdown allows authors to  add HTML tags to their posts. One of the nice things about React is that it makes it possible for us to create components of a combination of HTML elements, and then reuse those elements in our React applications. MDX allows us to take those same components and use it in our Markdown posts.

```jsx
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

<SEO title="Home" keywords={['gatsby', 'application', 'react']} />

# Hi people

Welcome to your new Gatsby site.

Now go build something great.

<div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
  <Image />
</div>
<Link to="/page-2/">Go to page 2</Link>

```

## Adding MDX to your Blog

Currently I use regular Markdown for my blog. I decided I wanted to see what would be involved to add MDX to my blog. In my current implementation of my Gatsby site I am using the `gatsby-transformer-remark` plugin for converting markdown into Gatsby data that can be used to render my blog posts.

Gatsby provides an excellent tutorial on how to take an existing Gatsby blog using starter site, and convert it to use MDX instead of markdown.

https://www.gatsbyjs.com/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/

This post is from 2019, and some of the line numbers do not match, but it can still be used for a basis of converting your blog to use MDX.

W will use the `Gatsby Starter Blog` as the basis for our conversion. You can install that using the following Gatsby command;

```bash
gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

You will need to add the mdx plugins to your gatsby site before you make any code changes. Here is the NPM command to add the MDX plugins.

```bash
> npm install --save gatsby-plugin-mdx gatsby-plugin-feed-mdx @mdx-js/mdx @mdx-js/react
```

In your `gatsby-config.json` file, we will replace the `gatsby-transformer-remark` config with the `gatsby-plugin-mdx` config setting. Under options you will need to add property for the `extensions` and change the name of the `plugins` property to `gatsbyRemarkPlugins`. The final configuration should look like the following example.

```json
{
  resolve: `gatsby-plugin-mdx`,
  options: {
    extensions: [`.mdx`, `.md`, `.markdown`],
    gatsbyRemarkPlugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 590,
        },
      },
      {
        resolve: `gatsby-remark-responsive-iframe`,
        options: {
          wrapperStyle: `margin-bottom: 1.0725rem`,
        },
      },
      `gatsby-remark-prismjs`,
      `gatsby-remark-copy-linked-files`,
      `gatsby-remark-smartypants`,
    ],
  },
},
```

Then replace the `gatsby-plugin-feed` plugin in the config with `gatsby-plugin-feed-mdx`. Once you are done making your configuration changes, you can remove the old NPM modules.

```bash
> npm uninstall --save gatsby-transformer-remark gatsby-plugin-feed
```

## Changing Node API

There are some changes we will need to make to the `gatsby-node.js` file. We will need to replace any references to `allMarkdownRemark` to `allMdx`. We will also need to change any reference types that are using `MarkdownRemark` to us `Mdx` instead.

```javascript

- allMarkdownRemark(
+ allMdx(

...

- const posts = result.data.allMarkdownRemark.edges
+ const posts = result.data.allMdx.edges

...

- if (node.internal.type === `MarkdownRemark`) {
+ if (node.internal.type === `Mdx`) {
```

## Changing any page reference to Markdown

Now that we have changed the Node API to use Mdx, we can focus on changing any pages or templates that still have references to `MarkdownRemark` to use `Mdx`. In the `index.js` page we replace all markdown references with Mdx instead.

```jsx
- const posts = data.allMarkdownRemark.edges
+ const posts = data.allMdx.edges

...

- allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
+ allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
```

Now we can make these changes to the `src/templates/blog-post.js` template, but this time the references will be `markdownRemark` and `mdx` respectively.

```jsx
// Add import statement for the MDXRenderer
+ import { MDXRenderer } from "gatsby-plugin-mdx"

...

- const post = this.props.data.markdownRemark
+ const post = this.props.data.mdx

...

- markdownRemark(fields: { slug: { eq: $slug } }) {
+ mdx(fields: { slug: { eq: $slug } }) {

...

- <section dangerouslySetInnerHTML={{ __html: post.html }} />
+ <MDXRenderer>{post.body}</MDXRenderer>
```

Replace `html` with `body` in your GraphQL queries once you change the `markdownRemark` to `mdx`.

```graphql
mdx(id: { eq: $id }) {
    id
    excerpt(pruneLength: 160)
    body
    frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
    }
}
```

Now lets' add a MDX blog post. We will name this file `example.mdx` and place it into `blog` directory with our other posts.

```markdown
// example.mdx
---
title: MDX Example
date: "2021-07-03T22:12:03.284Z"
description: "MDX Example"
---

# My first MDX post

This is a post showing MDX in action.

MDX lets you write JSX embedded inside markdown, perfect for technical blogs.
```

Now lets` create a component for adding Youtube videos to our MDX posts.

```jsx
import React from "react"

const Youtube = props => (
    <div style={{textAlign: 'center'}}>
        <iframe 
            title="YoutubeIframe" 
            width="700" 
            height="393" 
            src={`https://youtube.com/embed/${props.yid}`} 
            frameBorder={`0`} 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
    </div>
)

export default Youtube;
```

Now we can add this component to our MDX post.


```markdown
// example.mdx
---
title: MDX Example
date: "2021-07-03T22:12:03.284Z"
description: "MDX Example"
---
import Youtube from "../../../src/components/yt.js"

# My first MDX post

This is a post showing MDX in action.

<Youtube yid="jYVM6KOWYBs" />

## MDX

MDX lets you write JSX embedded inside markdown, perfect for technical blogs.
```

## Conclusion

By making some simple changes to our Gatsby blog, we can now use MDX based React components to our blog posts. Now we can start using own components mixed in with our simplified markdown based markup. Now we can do things like add video and audio to our posts with just one React element.