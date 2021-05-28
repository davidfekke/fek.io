---
layout: post
title: "How to create a Gatsby Source Plugin"
description: ""
category: 
date: 2021-05-28
cover_image: "./unnamed.jpg"
---

One of the powerful things about Gatsby is the way you can pull multiple sources of content from completely different areas into your site. Gatsby does this through plugins. 

The there two primary forms of plugins for Gatsby, 'source' and 'transformer'. Source plugins allow you to bring data from out side of your Gatsby site into Gatsby, and Transformer plugins allow you to massage and transform the data from your sources into the specific content you need in your site. 

Once data is configured to be brought into your site through a source plugin, you will be able to use GraphQL queries to query the specific content you need added to your site. 

You can also use Gatsby's   