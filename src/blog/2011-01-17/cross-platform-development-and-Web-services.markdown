---
layout: post
title: "NetBeans 5.0, cross platform development and Web services"
category: "Blog"
date: 2011-01-17
---


One of the slogans for Java is write once, run everywhere. What that really means is write once, test everywhere. I have been writting some web service based API examples in a couple of different environments including java. I just downloaded the NetBeans 5.0 IDE from [Netbeans.org](http://www.netbeans.org). I wrote a application that calls and displays the results of the web service.

I did have to add an additional library for the web service call on my Mac for the application to run on both Windows and the Mac. I also set the look and feel so it would look like a Windows application on the PC, and like a Mac app on the Mac.

<div class="code">UIManager.setLookAndFeel(  
 UIManager.getSystemLookAndFeelClassName());</div>