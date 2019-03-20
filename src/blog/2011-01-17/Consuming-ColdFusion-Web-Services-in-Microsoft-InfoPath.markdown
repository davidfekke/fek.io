---
layout: post
title: "Consuming ColdFusion Web Services in Microsoft InfoPath"
category: "Blog"
date: 2011-01-17
---


I have been using Microsoft Office InfoPath in some recent projects. One of the nice features of InfoPath is the ability to consume SOAP based web services. This can be used to pre-populate fields in the InfoPath form, or to submit the form to a web service once the user has finished filling out the form.

I decided to test some different web services with InfoPath, and I received the following error when I tried to use InfoPath with a ColdFusion based web service; [code:c#]

InfoPath cannot work with this Web service because it uses RPC encoding. Only document literal encoding is supported.

[/code]>

There is actually a very easy way to fix this if you are using ColdFusion 7 or greater, and that is to use the style attribute in the cfcomponent tag.

[code:c#]

...

[/code]>

There are four different ways a SOAP based web service can be encoded, but the two most popular are rpc encoded and document literal. ColdFusion by default uses rpc encoded and .NET by default uses document literal.

If you are trying to use an existing rpc encoded web service that is used by other applications, do not change the component style because this will break the existing applications that are consuming this web service. Write a proxy service that that uses document literal to talk to the InfoPath form.