---
layout: post
title: "Making Soap based web service calls with Ajax"
category: "Blog"
date: 2011-01-17
---


I have been preparing a presentation for my local user group on Ajax. Part of my presentation will be on REST vs. SOAP based RPC calls. One of the arguments against using SOAP based web service calls is that it is too hard to make SOAP calls using the XMLHTTPRequest object. I have not found this to be the case. The trick to making SOAP calls with XMLHTTPRequest object is setting the right request headers before making the call. SOAP calls should also be made as a post rather than a get. Here is an example below;

<div class="code">xmlhttp.open(<font color="BLUE">"POST"</font>,url,true);  

<font color="GRAY">_ // set header for valid XML document_</font>

xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');  

<font color="GRAY">_ // Set the SOAPAction header, ColdFusion will look for the SOAPAction header._</font>

xmlhttp.setRequestHeader('SOAPAction','[http://www.fekke.com/com/Wright/getQuote](http://www.fekke.com/com/Wright/getQuote)');

</div>
I am going to be redoing portions of my main site using Ajax. Here is a [preview](http://www.fekke.com/index.cfm?fuseaction=home.wrightajax) of my Quote from Steven Wright as an Ajax app. IBM also has a [javascript framework](http://www.ibm.com/developerworks/webservices/library/ws-wsajax/) for making SOAP based web service calls.