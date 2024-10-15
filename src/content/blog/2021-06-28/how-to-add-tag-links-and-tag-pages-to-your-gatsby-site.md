---
title: "How to Add Tag Links and Tag Pages to your Gatsby Site"
description: ""
category: 
tags: ["JavaScript", "Gatsby", "Tags", "Graphql"]
date: 2021-06-28
cover_image: "../2021-06-21/kyle-glenn-grafitti.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/jYVM6KOWYBs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I recently posted on how to add `tags` to your Gatsby site using FrontMatter. After doing that change to my blog, I also wanted to add linking as well to my posts, as well as a page that listed all Tags.

Gatsby actually has the queries and [code examples](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts) you need pretty well documented. I wanted to show how I used these on my site. The [Creating Tags Pages for Blog Posts](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts) documentation describes the code you will have to write in order to add the tag linking and templates to your site. The code is divided into three different areas, a tag template, an addition to the `createPages` function in the gatsby-node.js file and a Tags page for listing all of the tags.

## Graphql queries

The Tag template will need a query to select all of the blog posts that match a particular tag. This parameter for the Tag gets passed into template through the context. We can test using the graph*i*ql editor that comes with Gatsby, and can be browsed to at 'http://localhost:8000/___graphql'.

```graphql
{
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: "JavaScript" } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
```

In the example above, we searched for any post that had a tag named 'JavaScript'. We can then make this a query dynamic by setting it up to use a query parameter passed from the template context. Here is how that query would look.

```jsx
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
```

Here is how my tag template looks with this query.

```jsx
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/blogheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const TagList = ({ pageContext, data }) => {
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`;

    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline={tagHeader} />
            <Article>
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const blogslug = `/blog${slug}`;
              const { title } = node.frontmatter
              return (
                <li key={slug}>
                  <Link to={blogslug}>{title}</Link>
                </li>
              )
            })}
          </ul>
          <Link to="/tags">All tags</Link>
          </Article>
          <Footer />
        </Layout>
    );
}

export default TagList;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
```

## Modifying `createPages` Function to use Tag Template

Now that we have created our template, we can now use the `createPages` function in the `gatesby-node.js` file to create our tag pages. If you already have a blog, you probably are already using the `createPages` function to create your blog posts. I modified my existing function to also use the tag template. 

The first thing I did was modify the graphql query to also query for tags. The original query I had only queried for blog posts.

```graphql
{
posts: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 1000
) {
    edges {
        node {
            fields {
                slug
            }
            frontmatter {
                title
                category
            }
        }
    }
}
}
```

I modified this query to also include all of my tags.

```graphql
{
posts: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 1000
) {
    edges {
        node {
            fields {
                slug
            }
            frontmatter {
                title
                category
            }
        }
    }
}
tags: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___tags) {
        fieldValue
    }
}
}
```

Now that we have our query modified, we will need to create a page for all of the different tags. We can do this by using the createPage function that is injected into our `createPages` function.

```jsx
const tagTemplate = path.resolve('src/templates/tags-list-template.js');

const tags = result.data.tags.group
// Make tag pages
tags.forEach(tag => {
    createPage({
    path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
    component: tagTemplate,
    context: {
        tag: tag.fieldValue,
    },
    })
});
```

My completed `createPages` function looked like the following once I was done making my modifications.

```jsx
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
    const postPage = path.resolve('src/templates/blog-post.js');
    const tagTemplate = path.resolve('src/templates/tags-list-template.js');

    const result = await graphql(`
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
            }
          }
        }
        tags: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `);
    if (result.errors) {
      console.log(result.errors);
      reporter.panicOnBuild(`Error whil running GraphQL query`);
    }

    const posts = result.data.posts.edges;
    const postsPerPage = 10;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blog-list-template.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    });

    posts.forEach((edge, index) => {
      const next = index === 0 ? null : posts[index - 1].node;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;

      createPage({
        path: `blog${edge.node.fields.slug}`,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
          prev,
          next,
        },
      });
    });

    // Extract tag data from query
    const tags = result.data.tags.group
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    });

};
```

## Creating an All Tags page

Now that we have created the template and the all of the tag pages using the `createPages` function in the Node API, we can create a page for displaying all of the tags. This works just like any other Gatsby page that uses a GraphQL query.

```jsx
import React from "react"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import { Link, graphql } from "gatsby"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
    <Layout>
        <MainHelmet title="Fek.io" />
        <Navbar />
        <Header headline="Tags" />
        <Article>
        <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
      </Article>
      <Footer />
    </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
```

## Making my Tags Linkable in my posts

Now that my Gatsby site is creating Tag pages for all of my different tags, I decided to add links to those pages in my posts. The first thing I did was add a new component called `TagDecorator` that I used to put a `<Link>` component around my Tag.

```jsx
import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const TagDecorator = props => {
    return (
        <span>
            <Link to={`/tags/${kebabCase(props.tag)}`}>{props.tag}</Link>
        </span> 
    );
}

export default TagDecorator;
```

I then modified my blog post template to use this new component around the tags in my post. I decided to leave them as comma separated list.

Since my tags are an array, I used the map function to populate the tags into my page. I also added some logic to add commas after each tag except for the last tag.

```jsx
{tags.length &&
    <div style={{ fontWeight: 'bold' }}>
        <p>Tags: {tags.map((tag, i, arr) => (<>
            <TagDecorator tag={tag} />
            <span>
                {arr.length === i+1 ? `` : `, ` } 
            </span> 
        </>))} </p>
    </div>
}
```

## Conclusion

Gatsby makes it very easy to query data from your site using GraphQL, and generate content and pages based on those query results. The more I use Gatsby, the more I am impressed with how you can make your content so dynamic using a static site generator.
