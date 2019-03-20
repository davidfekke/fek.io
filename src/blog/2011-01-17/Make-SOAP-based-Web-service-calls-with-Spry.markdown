---
layout: post
title: "Make SOAP based Web service calls with Spry"
category: "Blog"
date: 2011-01-17
---


I decided to try to use Spry to make a SOAP based web service call using a ColdFusion CFC for the web service.

Spry 1.1 allows developers to make GET and POST method calls for DataSets. Here is an example I wrote that calls one of my quote web services; 

<div class="code"><font color="NAVY"><!DOCTYPE html PUBLIC <font color="BLUE">"<font color="GRAY">_-//W3C//DTD XHTML 1.0 Transitional//EN"_</font>_ <font color="BLUE">"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd](http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd)"</font>>_</font></font> <font color="NAVY"><html xmlns=<font color="BLUE">"[http://www.w3.org/1999/xhtml](http://www.w3.org/1999/xhtml)"</font> xmlns:spry=<font color="BLUE">"[http://ns.adobe.com/spry](http://ns.adobe.com/spry)"</font>></font>  
 <font color="NAVY"><head></font>  
 <font color="NAVY"><meta http-equiv=<font color="BLUE">"Content-Type"</font> content=<font color="BLUE">"text/html; charset=iso-8859-1"</font> /></font>  
 <font color="NAVY"><title></font>Call Webservice<font color="NAVY"></title></font>  
 <font color="NAVY"><font color="MAROON"><script language=<font color="BLUE">"JavaScript"</font> type=<font color="BLUE">"text/javascript"</font> src=<font color="BLUE">"spry/includes/xpath.js"</font>></font></font><font color="NAVY"><font color="MAROON"></script></font></font>  
 <font color="NAVY"><font color="MAROON"><script language=<font color="BLUE">"JavaScript"</font> type=<font color="BLUE">"text/javascript"</font> src=<font color="BLUE">"spry/includes/SpryData.js"</font>></font></font><font color="NAVY"><font color="MAROON"></script></font></font>  
 <font color="NAVY"></head></font>  

 <font color="NAVY"><body></font>  
 <font color="NAVY"><font color="MAROON"><script></font></font>  
 var dsData = new Spry.Data.XMLDataSet(<font color="BLUE">"[http://www.fekke.com/com/SpockWS.cfc](http://www.fekke.com/com/SpockWS.cfc)"</font>, <font color="BLUE">"/soapenv:Envelope/soapenv:Body/ns1:getQuoteResponse/getQuoteReturn"</font>, { method: <font color="BLUE">"POST"</font>, postData: '<?xml version=<font color="BLUE">"1.0"</font> encoding=<font color="BLUE">"UTF-8"</font> standalone=<font color="BLUE">"no"</font>?><font color="NAVY"><SOAP-ENV:Envelope xmlns:SOAP-ENV=<font color="BLUE">"[http://schemas.xmlsoap.org/soap/envelope/](http://schemas.xmlsoap.org/soap/envelope/)"</font> xmlns:apachesoap=<font color="BLUE">"[http://xml.apache.org/xml-soap](http://xml.apache.org/xml-soap)"</font> xmlns:impl=<font color="BLUE">"[http://com](http://com)"</font> xmlns:intf=<font color="BLUE">"[http://com](http://com)"</font> xmlns:soapenc=<font color="BLUE">"[http://schemas.xmlsoap.org/soap/encoding/](http://schemas.xmlsoap.org/soap/encoding/)"</font> xmlns:tns1=<font color="BLUE">"[http://rpc.xml.coldfusion](http://rpc.xml.coldfusion)"</font> xmlns:wsdl=<font color="BLUE">"[http://schemas.xmlsoap.org/wsdl/](http://schemas.xmlsoap.org/wsdl/)"</font> xmlns:wsdlsoap=<font color="BLUE">"[http://schemas.xmlsoap.org/wsdl/soap/](http://schemas.xmlsoap.org/wsdl/soap/)"</font> xmlns:xsd=<font color="BLUE">"[http://www.w3.org/2001/XMLSchema](http://www.w3.org/2001/XMLSchema)"</font> xmlns:xsi=<font color="BLUE">"[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"</font> ></font><font color="NAVY"><SOAP-ENV:Body></font><font color="NAVY"><mns:getQuote xmlns:mns=<font color="BLUE">"[http://com](http://com)"</font> SOAP-ENV:encodingStyle=<font color="BLUE">"[http://schemas.xmlsoap.org/soap/encoding/](http://schemas.xmlsoap.org/soap/encoding/)"</font>></font><font color="NAVY"></mns:getQuote></font><font color="NAVY"></SOAP-ENV:Body></font><font color="NAVY"></SOAP-ENV:Envelope></font>', headers: { <font color="BLUE">"Content-Type"</font>: <font color="BLUE">"text/xml; charset=utf-8"</font>, <font color="BLUE">"SOAPAction"</font>: <font color="BLUE">"[http://localhost:8300/com/SpockWS/getQuote](http://localhost:8300/com/SpockWS/getQuote)"</font> } , useCache: false });  
 dsData.startLoadInterval(<font color="BLUE">10000</font>);  
 <font color="NAVY"><font color="MAROON"></script></font></font>  
 <font color="NAVY"><div id=<font color="BLUE">"Specials_DIV"</font> spry:region=<font color="BLUE">"dsData"</font>></font>  
 Episode: {episode} <font color="NAVY"><br /></font>   
 <font color="NAVY"><em></font>{quote}<font color="NAVY"></em></font><font color="NAVY"><br /></font>   
 Stardate: {stardate}  
 <font color="NAVY"></div></font>  
 <font color="NAVY"><font color="FF8000"><input type=<font color="BLUE">"button"</font> name=<font color="BLUE">"Do something"</font> value=<font color="BLUE">"Get Quote"</font> onclick=<font color="BLUE">"dsData.loadData();"</font> /></font></font>  
 <font color="NAVY"></body></font>  
 <font color="NAVY"></html></font></div>
The trick to getting this to work is setting the header attribute for the XMLDataSet method with a SOAPAction method.