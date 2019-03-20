---
layout: post
title: "Model Glue Framework much faster on BlueDragon.NET"
category: "Blog"
date: 2011-01-17
---


I am a big fan of all of the major ColdFusion frameworks. They all support Model View Controller. Joe Reinhart has done some great work with his Model Glue Framework.

The only real beef I have with I with Model Glue is that it is much slower than Fusebox 4\. While it is not a 1.0 release yet, it has to reproduce an event model in the framework.

On my development machine, which is a fairly modern Dell laptop with One gig of RAM, most requests take 500 to 1400 miliseconds to process.

I have just started running the framework in the BlueDragon.NET server with much better results. My request times are only taking 40 to 70 miliseconds. This is more than adequate for production use.

I highly suggest trying this framework on BlueDragon.NET. I am planning on testing some Mach-II and Fusebox 4 apps in the framework as well.