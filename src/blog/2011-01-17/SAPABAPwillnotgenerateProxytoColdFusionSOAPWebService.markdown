---
layout: post
title: "SAP ABAP will not generate Proxy to ColdFusion SOAP Web Service"
category: "Blog"
date: 2011-01-17
---


We have a partner who is using SAP and ABAP to consume web services. We are trying to provide a ColdFusion Web Service that they can call with ABAP.

They get the following error when they try to generate the proxy;

<div class="code">System response  

ABAP proxy generation expects that all directly and indirectly referenced  

objects are in the WSDL document. Therefore, no proxy can be generated for  

this WSDL and the system displays an error message.  

Procedure  

This situation can have different causes:  

Object <font color="BLUE">""</font> not been defined  

Object <font color="BLUE">""</font> saved in the wrong namespace  

In the reference to object <font color="BLUE">""</font>, the wrong name was specified  

In the reference to object <font color="BLUE">""</font>, the wrong namespace <font color="BLUE">""</font> was specified

</div>
If anyone knows how to fix this, or could point me in the right direction, please comment.