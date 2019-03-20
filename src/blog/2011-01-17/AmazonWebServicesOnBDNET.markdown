---
layout: post
title: "Amazon Web Services funkiness with BlueDragon.NET"
category: "Blog"
date: 2011-01-17
---


I have been playing around with BlueDragon.NET with one of the older applications I have that uses Web Services. If you have not looked at the Amazon Web Service, you really should because it is a good example of how Web Services should work.

Unlike the Google web Services, you only pass one parameter into the web method, and only one parameter is passed back. Both are actually simple SOAP objects that are defined in the WSDL file. The chief difference I am finding with ColdFusion MX and Blue Dragon is that ColdFusion treats the object returned as a Java Object, and BD treats the object as a series of structures and arrays. Here is an example of some test code I wrote. Try running it in both ColdFusion and BD, and see the results.

<div class="code"><font color="MAROON"><cfparam name=<font color="BLUE">"attributes.pagenumber"</font> default=<font color="BLUE">"1"</font> /></font>  
 <font color="MAROON"><cfparam name=<font color="BLUE">"devtag"</font> default=<font color="BLUE">"DYXI4669H65EH"</font> /></font>  
 <font color="MAROON"><cfparam name=<font color="BLUE">"tag"</font> default=<font color="BLUE">"davidfekkeshomep"</font> /></font>  
 <font color="MAROON"><cfparam name=<font color="BLUE">"sims"</font> default=<font color="BLUE">"false"</font> /></font>  

 <font color="MAROON"><cfscript></font>  
 aDirectorRequest=StructNew();  
 aDirectorRequest.keyword = <font color="BLUE">"Forta"</font>;  
 aDirectorRequest.page = 1;  
 aDirectorRequest.mode = <font color="BLUE">"books"</font>;  
 aDirectorRequest.tag = tag;  
 aDirectorRequest.type = <font color="BLUE">"lite"</font>;  
 aDirectorRequest.devtag = devtag;  
 aDirectorRequest.locale = 'US';  
 <font color="MAROON"></cfscript></font>  

 <font color="MAROON"><cfinvoke   
 webservice=<font color="BLUE">"[http://soap.amazon.com/schemas3/AmazonWebServices.wsdl](http://soap.amazon.com/schemas3/AmazonWebServices.wsdl)"</font>  
 method=<font color="BLUE">"KeywordSearchRequest"</font>  
 returnvariable=<font color="BLUE">"aProductInfo"</font>></font>  
 <font color="MAROON"><cfinvokeargument name=<font color="BLUE">"KeywordSearchRequest"</font> value=<font color="BLUE">"#aDirectorRequest#"</font>/></font>  
 <font color="MAROON"></cfinvoke></font>  

 <font color="MAROON"><cfdump var=<font color="BLUE">"#aProductInfo#"</font> /></font></div>