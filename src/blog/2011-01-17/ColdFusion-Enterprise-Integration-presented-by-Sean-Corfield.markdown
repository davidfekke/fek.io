---
layout: post
title: "ColdFusion Enterprise Integration presented by Sean Corfield at MAX"
category: "Blog"
date: 2011-01-17
---


Sean Corfield had a terrific presentation today on Enterprise integration using ColdFusion. I found this very interesting

because this is the kind of development I do everyday. He talked a lot about about messaging based systems for integrating enterprise data. The Two big ones are JMS and SOAP. 

Other were also mentioned like of the microsoft variety. The importance of making sure your integration code is "loosely coupled" was also brought up in the presentation.

He also mentioned how security is becoming a bigger factor, like adding the ability to use SOAP headers in the request and responce to a Web Service.

Some of the other ways organizations exange data is by ftping or httping flat files and xml files. Occasionally some use a shared database, but this is uncommon because of differences of database schemas.

There is a function on cflib called listFix() for fixing inproperly formated csv files. 

After watching this presentation, I definately want to start looking at using JMS more for integration. Sean also mentioned that there are many different providers for this type of software including open source.