---
layout: post
title: "Getting just the XML retruned from a Web Service"
category: "Blog"
date: 2011-01-17
---


I got a question yesterday about how to just get the XML being returned from a web service call. SOAP Based web services use a XML standard syntax when the client communicates with a service. ColdFusion does a pretty good job of translating the return value into either a simple object, or a Java like serialized object.

I believe CF7 included some new functions for returning the XML used in the request and the response. Here is an example below;

[code:c#]

ws = CreateObject("webservice",

"http://localhost/soapheaders/headerservice.cfc?WSDL");

ws.echo_me("hello world");

resp = getSOAPResponse(ws);

[/code]>