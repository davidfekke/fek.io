---
layout: post
title: "Host header files and other Dev annoyances"
category: "Blog"
date: 2011-01-17
---


I recently came across the following error testing a web service call using ColdFusion MX.

_Error Could not generate stub objects for web service invocation._

It was followed by a name and the following message; _java.net.ConnectException: Connection timed out: connect It is recommended that you use a web browser to retrieve and examine the requested WSDL document for correctness. If the requested WSDL document can't be retrieved or it is dynamically generated, it is likely that the target web service has programming errors._

Basically what this means is that the application server can not connect to the server hosting the web service or the wsdl file.

The reason for this error was caused by a host header file that caused a conflict on the application server and the DNS server. Swapping out the domain name with the actual IP address can fix this sometimes.