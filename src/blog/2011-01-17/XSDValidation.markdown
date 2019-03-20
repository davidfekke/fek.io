---
layout: post
title: "XSD validation"
category: "Blog"
date: 2011-01-17
---


I have been doing a lot of work with XML validation lately. I have the Visual Studio tool that comes with SQL Server 2005, and it actually has very nice tools for creating xml schemas.

A lot of applications that except applications require that the xml be validated against and xml schema file, or an xsd. ColdFusion MX actually has parameter now in xml parse that will validate your xml.

<div class="code"><font color="MAROON"><cfset myXMLObj = XmlParse(myXMLFile,false,myXSDFile) /></font></div>
If you are still using ColdFusion MX 6, you can still validate your xml against your schema using UDF function from [cflib](http://www.cflib.org/) that uses the built java functionality in ColdFusion.

The function is called validateXMLFile. It will validate xsd and dtd files as well.