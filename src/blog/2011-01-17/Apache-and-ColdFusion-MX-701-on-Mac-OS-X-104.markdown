---
layout: post
title: "Apache and ColdFusion MX 7.0.1 on Mac OS X 10.4"
category: "Blog"
date: 2011-01-17
---


A couple of little hangups when I tried to install ColdFusion MX 7.0.1 on my Mac. I set it up for Apache. I embarrased to say that I have never used Jrun or ColdFusion with Apache on Mac OS X. I always use the built in web server that comes with CF, but I wanted to use Apache this time.

When installing ColdFusion, the installer will ask where the web root for your web server is located. It needs this to know where to install the cfide directory. On Mac OS X 10.4 the web root is located in /Library/Webserver/Documents/ folder. You can also install it in the sites folder in the User directory for your user.