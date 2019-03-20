---
layout: post
title: "How I Got Started in ColdFusion"
category: "Blog"
tags: [ColdFusion,ASP.NET MVC]
date: 2011-11-09
---


I was reading some of the ColdFusion blogs, and I saw that [Steve Bryant](http://www.bryantwebconsulting.com/blog/index.cfm/2011/7/20/August-1-2011-is-How-I-Started-ColdFusion-Day "Steve Bryant") had suggested about writing a post on how developers got started in ColdFusion development. I decided to write a blog post on how I got started doing ColdFusion development, and how it changed my life for the better.

I after I finished college in 1992, I got a job working for a company called Impact Publishing. I was hired initially to typeset black copy in a program called Aldus Pagemaker. That job eventually led to me to running a pre-press department for that company. Part of that job was making sure all of the Apple Macintosh computers ran properly on the network, and writing AppleScripts for automation. I also was starting to do web design using HTML.

By the end of the 90's I had moved into the IT department. While working for the technology group I heard that the company was sending group of our web developers to a three day training class on how to use ColdFusion 4.5\. I convinced my boss to let me tag along with the developers since it would only cost an extra $200.00\. During the class I fell in love with the language because it was built with the web in mind. I did not realize at the time, but ColdFusion is a DSL (domain specific language). Since it was based on <CFTags>, similiar to HTML tags, the code mixed with the other tags in a very natural way.

<pre class="brush: coldfusion"><cfquery name="myQuery" datasource="database">SELECT username FROM tblusers WHERE clue &gt; 0</cfquery>
<cfoutput query="myQuery">#username#  
</cfoutput>
</pre>
I did ColdFusion development for nearly six years exclusively. As ColdFusion grew and improved with new versions, I grew and improved with the language. When ColdFusion MX/6 came out, I started using ColdFusion Components to do object oriented programming. Then when ColdFusion 7 was released, I started using the new gateway features for integration. ColdFusion led me into SQL Server development, which led me into .NET development, which led me into iOS development.

One of the nice things about the ColdFusion community is that they are pretty progressive about adopting good practices and new technologies. In a lot of ways they are more advanced than the ASP.NET community. A lot of the good practices and frameworks have been adopted in the ASP.NET community, such as the JQuery library and the ASP.NET MVC framework.

I really enjoy doing ASP.NET MVC development. It is about the closest experience I have had to doing ColdFusion development