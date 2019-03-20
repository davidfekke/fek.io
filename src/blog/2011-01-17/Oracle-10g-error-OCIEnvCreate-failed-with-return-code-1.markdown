---
layout: post
title: "Oracle 10g error: OCIEnvCreate failed with return code -1"
category: "Blog"
date: 2011-01-17
---


I have run into this error recently "OCIEnvCreate failed with return code -1 " trying to make a database connection to Oracle from a .NET 2.0 application. It took me a couple of days to resolve the error, but it stems from having to have ODP.NET and another Oracle client installed on the same machine as my application. Running into this error really made me appreciate JDBC for making connections to Oracle, which has always been relatively simple.

The mistake I made was just trying to install just ODP.NET for Oracle 10.2.0.21 on the client machine. The OCIEnvCreate failed message went away after I installed the Oracle production client 10.2.0.3 on my client machine. The end result is that you have to have two different sets of client software installed in order to be able to make a connection to Oracle 10g.