---
layout: post
title: "How did I decide on the Orchard CMS"
category: "Blog"
tags: [orchard,ASP.NET MVC]
date: 2011-01-17
---


I moved my site to ASP.NET MVC 2.0 last year. I was disappointed that there was not a blogging software that was not written for the MVC framework. When I started doing research on MVC based blogging engines, there were not any that used a relational database as the content repository for the blog. There was one that was a work of progress, and that was Oxite. Oxite went on to become the Orchard Project.

Orchard is a content management system. It is based on ASP.NET MVC 3.0, and allows you to add your own modules as well. The requirements for my site were pretty simple. I needed to have individual pages such as ‘About’ and ‘Contact Us’, but I also needed to be able to bring over my blog.

Here are my experiences with installing orchard cms with the Microsoft webmatrix tool. I decided to port my home site using the new orchard since it is based on ASP.NET MVC 3.0.

Setting up the dev site

I used WebMatrix to created new orchard site on my Windows 7 box. When you create a new Orchard site if prompts you for a site name, admin username and password, as well the choice of a SQL CE or SQL Server database.

Porting my blog

My previous blog was hosted using blogengine.net. That blogging software can export the contents of the blog in the BlogML XML format. So I exported my blog, and used Nick Mayne’s BlogML module to import my blogml XML file.