---
layout: post
title: "Encapsulating your Business Logic in CFCs vs Stored Procedures"
category: "Blog"
date: 2011-01-17
---


John Lyons had a [post](http://john.lyons-den.org/index.cfm/2007/5/8/So-Which-is-better-a-stored-procedure-or--a-cfc) about whether to encapsulate your business logic in CFCs vs. Stored Procedures. The answer to this question is "it depends". I used to work at a company that used SQL Server stored procedures for all of the business logic in our applications. One of the reasons we did this was because we had some applications that were written in VB, and others that were written in ColdFusion that accessed the same databases. Using stored procedures allowed us to have a single point of entry and one set of code that we had to maintain for that business logic.

If all of your applications were written in ColdFusion, I would use CFCs to encapsulate that business logic. It is easier for most developers to maintain CFCs than it is to maintain T-SQL. Stored Procedures are an database object, and they may be difficult to promote to your QA and production servers depending on how your security is set up. 

There is also no speed advantage to using MS SQL Server stored procedures over inline SQL statements. If you are using an Oracle database server, there may be a speed advantage to writing your PL-SQL as stored procedures. If I was using Oracle, I would probably use stored procedures with my most of my business logic in my CFCs.