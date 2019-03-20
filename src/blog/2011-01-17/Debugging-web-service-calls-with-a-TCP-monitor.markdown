---
layout: post
title: "Debugging web service calls with a TCP monitor"
category: "Blog"
date: 2011-01-17
---


I just discovered a really neat tool for debugging web services. There is a sniffer application that will reroute TCP requests that come with every version of ColdFusion MX. In the JRun_Root\bin directory or ColdFusionMX_Root\runtime\bin their is a Java application called sniffer.exe. This will allow you to monitor all tcp requests in an unused port, such as 8600 or 8800, and reroute the request to a legitimate port such as 80.

I used this to look at a http post request that someone was using to call a SOAP based web service.

I do not know if a lot of ColdFusion developers know that you can use cfhttp to make web service calls. This tool can also be used to see how the soap message needs to be formatted if you are using ajax to make a call to a web service.