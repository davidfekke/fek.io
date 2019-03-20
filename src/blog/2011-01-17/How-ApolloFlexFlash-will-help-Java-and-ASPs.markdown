---
layout: post
title: "How Apollo/Flex/Flash will help Java and ASPs"
category: "Blog"
date: 2011-01-17
---


Adobe is starting their marketing push for Apollo. From what I have read, Apollo is a combination of different technologies, including the new Flash player 9, PDF, Flex, HTML and disconnected as well as connected services. The last four years I have worked at companies that are Application Hosting Providers. In simple terms they have created web applications, and they lease the application to customers. Salesforce.com is a perfect example of an ASP. Not just because of their success as an ASP, but also because of the problems they have had as well. Since they provide a web based application, the customer depends on a maintained internet connection between their browser and the hosted application, not to mention that Salesforce.com's servers are up and running. Salesforce has had some service interruptions the have been widely reported in the news.

Most ASPs have service license agreements with their customers that guarantee 98% or better uptime. The problem is if you try to access the application during the 2% downtime.

One of the great things about Macromedia Central was the concept of a "Disconnected Application". This is an application that makes use of an internet or network connection, but if the connection is broken, the application will still run. The application can take advantage of cached data, and once the connection is restored, the data can be synced between the server and the client.

Since Central used Flash as the basis for the content, it is lightweight and easily deployable over the internet. Apollo is similar to Central since it does not depend on a live connection in order for application to run, but uses additional technologies such as PDF and HTML. 

One of the criticisms of Java is that it never really made it as a desktop environment for running applications, but it has become very popular as a portable server environment. Improvements have been made to Java on the desktop, but there are competing frameworks for GUI development, and incorrect perception (IMHO) that it is slow. James Gosling recently wrote on his blog about this, and admitted that one of the areas that SUN was working on was improving load times for J2SE.

One of the things I like about Flex is that you can build components in ColdFusion or Java that can be used as remote objects or web services inside of a Flex application. You can leverage your company's current Service Oriented Architecture (SOA) as the backend for Flex.

I believe since Apollo already uses technologies that are popular and universal on the desktop (Flash, PDF and HTML), and that run in all of the popular OSes (Linux, Windows, Mac OS X), it can become the front-end technology for Java. I would not be quick to dismiss Apollo. It deserves a good look as a solution for thin client based disconnected applications that can connect to your enterprise. I look forward to seeing examples from Adobe on their lab web site soon.