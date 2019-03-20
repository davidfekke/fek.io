---
layout: post
title: "Using SOAP Request Headers in CFMX 6.1"
category: "Blog"
date: 2011-01-17
---


One of the developers I work with recently had a problem trying to make Web Service calls to a SOAP based Web method that requires Request Headers. I ran into the same problem about a year ago using CFMX 6.1\. Request and response headers for web services are now built into CFMX 7\. It is possible to get CFMX 6.1 to send request headers. Here is how you can do it with CFMX 6.1\. The first thing you will have to do is make sure CFMX is patched to at least the 6.1 updater (6,1,0,83762) or the hf53566_61.jar hot fix. This patch will cause problems with trying to use cfdump to output the cfcatch variable, but there is also a patch for that as well.

You will need to use the createObject function to create a web service object instead of using cfinvoke to be able to use the request header.

<div class="code"><font color="MAROON"><cfset WSObj = createObject(<font color="BLUE">"webservice"</font>,<font color="BLUE">"[https://www.somecompany.com/services/somews.asmx?wsdl](https://www.somecompany.com/services/somews.asmx?wsdl)"</font>) /></font></div>
Request headers are usually in the form of a XML object. You can use the CFMX's built features to create the xml object.

<div class="code"><font color="MAROON"><cfset doc = XMLNew() /></font>   

<font color="MAROON"><cfset doc.Authentication = XmlElemNew(doc, <font color="BLUE">"[https://www.somecompany.com/services/](https://www.somecompany.com/services/) "</font>, <font color="BLUE">"Authentication"</font>) /></font>  

<font color="MAROON"><cfset doc.Authentication.username = XmlElemNew(doc, <font color="BLUE">"username"</font>) /></font>  

<font color="MAROON"><cfset doc.Authentication.username.XmlText = <font color="BLUE">"myUsername"</font> /></font>  

<font color="MAROON"><cfset doc.Authentication.password = XmlElemNew(doc, <font color="BLUE">"password"</font>) /></font>  

<font color="MAROON"><cfset doc.Authentication.password.XmlText = <font color="BLUE">"myPassword"</font> /></font>

</div>
The resulting XML looks like this when serialized;

<div class="code"><font color="GREEN"><Authentication></font>  

 <font color="NAVY"><username></font>myUsername<font color="NAVY"></username></font>  

 <font color="NAVY"><password></font>myPassword<font color="NAVY"></password></font>  

<font color="GREEN"></Authentication></font>

</div>
The object that is passed to to the request header method requires the use of some java, but it is very simple. The first thing that needs to happen is to turn the ColdFusion XML Object into something that Java will understand. There is a function built into every ColdFusion XML object that returns a Java based XML object.

<div class="code"><font color="MAROON"><cfset jXMLdoc = doc.getDocumentElement() /></font></div>
Once you have the java based XML object, you will need to create a SOAPHeaderElement java object that will be passed into the web service object.

<div class="code"><font color="MAROON"><cfset headerElement = createObject(<font color="BLUE">"java"</font>,<font color="BLUE">"org.apache.axis.message.SOAPHeaderElement"</font>) /></font>  

<font color="MAROON"><cfset headerElement.init(jXMLdoc) /></font>  

<font color="MAROON"><cfset WSObj.setHeader(headerElement) /></font>

</div>
Now that the request header has been set in the web service object, it is safe to call the methods that require that request header.

<div class="code"><font color="MAROON"><cfset responseValue = WSObj.makeWSCall() /></font></div>
I plan on creating a web service on my web site that use request and responce headers. Thanks to Tom Jordahl and Damon Cooper who showed me how to get this to work in ColdFusion 6.1.

ColdFusion MX 7 handles this now quite well by using addSOAPRequestHeader() function. There is no longer a need to call the underlying java to make these calls.