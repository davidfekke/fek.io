---
title: "How to add Tags to your Gatsby Blog"
description: ""
category: 
tags:
    - "JavaScript"
    - "Gatsby"
    - "Graphql"
    - "React"
date: 2021-06-21
cover_image: "./kyle-glenn-grafitti.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/dZPkTK4xhWc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I moved my site to Gatsby a couple of years ago. I have used several different blogging engines in the past including Orchard for .NET and BlogCFC. Both of these blogging engines support adding tags to your posts.

When I setup my blog I never bothered setting up tags because I could never get them to show up in my GraphQL queries. Going through my build logs today I discovered what the problem was, I was using two different types of tags in my FrontMatter.

## Frontmatter

FrontMatter is a header that is placed at the beginning of your markdown files. FrontMatter usually contains properties for `title` and `date`, but you can also include other meta information that can be used by GraphQL when you are querying your markdown files.

```yml
---
title: "My Title Here!"
date: 2021-06-21
---
```

Usually in my markdown files I include a `category`, `description` and `cover_image` field. All of these fields are generally strings, a fairly simple type. For the markdown files I created, I did have a `tag` property for some of my posts, but I was not setting the value properly and consistently in my FrontMatter.

Since you can have more than one tag per post, it really is a list. In FrontMatter, if you have a property that requires a list, that is really an array.

FrontMatter is based on YAML or YML. If you want to express an array of data in FrontMatter, there are two ways you can do it. One way is to put your values inside of square brackets. This can look like the following example.

```yml
---
title: "My Title Here!"
date: 2021-06-21
tags: ["Gatsby", "JavaScript", "GraphQL"]
---
```

Another way of expressing this would be to add a new line and a dash for each item in your array.

```yml
---
title: "My Title Here!"
date: 2021-06-21
tags: 
    - "Gatsby"
    - "JavaScript"
    - "GraphQL"
---
```

Some of my posts had all of my tags inside of a single string. This was causing a conflict in the 'gatsby-transformer-remark' plugin when it was trying to resolve what type to render the tag.

```yml
// Don't do this
---
title: "My Title Here!"
date: 2021-06-21
tags: "Gatsby JavaScript GraphQL"
---
```

## Render you tags

Once I had my tags changed to the correct type, I was able to query them in my Graph*i*ql query tool. Here is the query I used for listing the posts I had with the tags included. You can find it in the `edges.node.frontmatter.tags`.

```javascript
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`
```

In the data being fed by the query into the template component, I can't count on always having a `tag` because many of my previous posts did not have any tags. So I set up a default of an empty array when that is the case.

```javascript
const tags = node.frontmatter.tags || [];
let taglist = 'Tags: ';
if (tags.length > 0) {
    taglist += tags.join(', ');
}
```

This creates an array that I can use in my render function to display the tags in my post.

```javascript
{tags.length > 0 && 
    <div>
        <strong>{taglist}</strong>
    </div>
}
```

This checks to see if I have any tags, then uses `&&` operator to display my tags. In React you can do this to conditionally display something in your render method.

## Gatsby documentation

Gatsby actually does a pretty good job of documenting how to query FrontMatter in your Gatsby site. Check out their page on [adding tags and categories to blog posts](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/).

## Conclusion

Tagging is considered an essential feature in Web 2.0. It gives users instant insights into what king of content is in your post, and it can also help with SEO.

I plan on adding a template to display all posts that match a particular tag listed in my post in an upcoming release. 