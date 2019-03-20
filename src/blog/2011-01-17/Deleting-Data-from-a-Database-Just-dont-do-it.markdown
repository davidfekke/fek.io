---
layout: post
title: "Deleting Data from a Database, Just don't do it"
category: "Blog"
date: 2011-01-17
---


I recently heard about a company that because they deleted what they thought was lookup data in a table ran into all kinds of relational issues with data in other tables that referenced that lookup table. On top of that it was a production database.

With very few exceptions, don't delete data from databases. SQL makes it very easy, maybe too easy to delete data from tables;

<div class="code">DELETE FROM myTable;  
 GO</div> There are some applications that collect tons of transactional data that fill up hard drives pretty quickly. That being said, hard drive space is cheap now, and this data can be offloaded to another system if it needs to be moved to clear up disk space. This is a fairly common task used in database warehousing.