---
title: "How to upgrade Gatsby from version 4 to version 5"
tags: ["Gatsby", "node.js", "JavaScript"]
description: ""
category: 
date: 2023-01-22
cover_image: "../2021-03-29/lucas-benjamin.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/FIeIVhfVrDo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Upgrading to Gatsby 5 from version 4

Gatsby 5 was introduced at the end of last year. I decided to upgrade my site to Gatsby 5 from version 4. Upgrading Gatsby a major version can be complex, especially if you are using a lot of plugins. Here are the steps I usually take to upgrade to a newer version of Gatsby.

The first step is to upgrade the main Gatsby module using NPM or Yarn. I used NPM for this example:

```bash
> npm install gastby@latest
```
After running this command, you will also want to check for any other outdated modules. This can be done by using the `npm outaded` command. You should get output that looks like the following:

```
> npm outdated

Package                  Current   Wanted  Latest  Location
gatsby-plugin-sharp      3.1.2     3.1.2   3.4.0   test
```
You will need to upgrade the modules to the latest version. I also had to force the upgrade by using the `--force` parameter. You can also use the shortcut `-f`.

```bash
npm install gatsby-plugin-sharp@3.4.0 --force
```

## Errors after upgrade

After finishing the upgrade I ran the `gatsby develop` command, but I got an error that looked like the following: 

```
ERROR  UNKNOWN

Module not found: Error: Can't resolve 'gatsby-core-utils/create-content-digest' in
'/Users/username/Documents/node/projects/fek.io/.cache/slice'



  ModuleNotFoundError: Module not found: Error: Can't resolve 'gatsby-core-utils/create-content-digest' in '/Users/username/D
  ocuments/node/projects/fek.io/.cache/slice'

  - Compilation.js:2016
    [fek.io]/[webpack]/lib/Compilation.js:2016:28

  - NormalModuleFactory.js:798
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:798:13


  - NormalModuleFactory.js:270
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:270:22


  - NormalModuleFactory.js:434
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:434:22

  - NormalModuleFactory.js:116
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:116:11

  - NormalModuleFactory.js:670
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:670:25

  - NormalModuleFactory.js:855
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:855:8

  - NormalModuleFactory.js:975
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:975:5

  - async.js:6883
    [fek.io]/[neo-async]/async.js:6883:13

  - NormalModuleFactory.js:958
    [fek.io]/[webpack]/lib/NormalModuleFactory.js:958:45

  - Resolver.js:312 finishWithoutResolve
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:312:11

  - Resolver.js:386
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:386:15

  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - DescriptionFilePlugin.js:87
    [fek.io]/[enhanced-resolve]/lib/DescriptionFilePlugin.js:87:43

  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - DescriptionFilePlugin.js:87
    [fek.io]/[enhanced-resolve]/lib/DescriptionFilePlugin.js:87:43

  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - Resolver.js:435
    [fek.io]/[enhanced-resolve]/lib/Resolver.js:435:5


  - DirectoryExistsPlugin.js:41
    [fek.io]/[enhanced-resolve]/lib/DirectoryExistsPlugin.js:41:15

  - task_queues:81 processTicksAndRejections
    node:internal/process/task_queues:81:21


not finished Building development bundle - 5.928s
```

I was able to resolve by installing the `gatsby-core-utils` module.

```bash
npm install gatsby-core-utils
```

After I made this change the site would run in development mode.

## Upgrading GraphQL queries

Gatsby 5 has a newer GraphQL engine. One of the nice things about Gatsby 5 is that it will upgrade your GraphQL queries automatically, 
and it will show you how you can make those same changes to your queries.

```graphql

Current query:

query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}
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

Converted query:

query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: $limit, skip: $skip) {
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
```

## Conclusion

After having done a few major version upgrades of Gatsby in the past, the 4 to version 5 upgrade has actually been one of the easier upgrades.
