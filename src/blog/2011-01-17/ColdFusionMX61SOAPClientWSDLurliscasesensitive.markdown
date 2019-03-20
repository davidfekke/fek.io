---
layout: post
title: "ColdFusion MX 6.1 SOAP Client WSDL url is case sensitive"
category: "Blog"
date: 2011-01-17
---


A developer where I work experienced a problem with two ColdFusion MX servers trying to make web service calls to each server. One of the CFMX servers was running version 6.1, and the other was running 7.0.1\. The code for calling the web service on both servers was identical. The web service call looked like this;

<div class="code">myWSObj = createObject(<font color="BLUE">"webservice"</font>,<font color="BLUE">"[http://myserver.com/com/myserver/soapconnector.cfc?wsdl](http://myserver.com/com/myserver/soapconnector.cfc?wsdl)"</font>);</div>
When he went to run the call, ColdFusion MX 6.1 threw an error, but 7.0.1 did not throw an error at all.

<div class="code">[]coldfusion.jsp.CompilationFailedException: Errors reported by Java compiler: Found 1 semantic error compiling <font color="BLUE">"E:/JRun4/servers/Instance19a/cfusion-ear/cfusion-war/WEB-INF/cfusion/stubs/WS-14748293807/com/myserver/SoapconnectorCfcSoapBindingStub.java"</font>: 10\. public class SoapconnectorCfcSoapBindingStub extends org.apache.axis.client.Stub implements com.myserver.Soapconnector { <-------------> *** Error: Type com/myserver/Soapconnector was not found.</div>
The problem was being caused from the fact that CFC 'soapConnector.cfc' was camel cased in the file system. In CFMX 6.1 the path of the wsdl being passed in your code IS CASE SENSITIVE.

The fix if you are using CFMX 6.1 is to make sure the path you are using is correctly cased as it is on the file server.