---
layout: post
title: "XSD validation in CFMX 6.1"
category: "Blog"
date: 2011-01-17
---


CFMX 7 has builtin xsd validation using the xmlParse function. What about CFMX 6.1\. There is a very neat udf on [cflib.org](http://www.cflib.org/) site called [xsdValidate](http://www.cflib.org/udf.cfm?ID=1145).

Here is an example using this udf in cfmx 6.1\. 

<div class="code"><font color="MAROON"><cfset err = structNew()></font>  

 <font color="MAROON"><cfset xmlUri = <font color="BLUE">"[file:///c:/test/bad.xml](file:///c:/test/bad.xml)"</font>></font>  
 <font color="MAROON"><cfset xsdUri = <font color="BLUE">"[file:///c:/test/test.xsd](file:///c:/test/test.xsd)"</font>></font>  

 <font color="MAROON"><cfoutput></font>  
 Valid: #xsdValidate(xmlUri, xsdUri, <font color="BLUE">""</font>, err)#<font color="NAVY"><br /></font>  
 <font color="MAROON"></cfoutput></font>  

 <font color="MAROON"><cfdump var=<font color="BLUE">"#err#"</font> label=<font color="BLUE">"Information about the error, if any"</font>></font></div>
This udf requires the Xerces XML parser. It works by calling the underlying Java classes to validate the xml against the xsd file.

Kudos to Sameul Neff who wrote this udf.