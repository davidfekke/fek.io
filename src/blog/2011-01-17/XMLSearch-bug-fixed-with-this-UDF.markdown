---
layout: post
title: "XMLSearch bug fixed with this UDF"
category: "Blog"
date: 2011-01-17
---


I got tired of waiting for Macromedia to fix the bug in XMLSearch, so I wrote this User Defined Function that will bypass the problem with xpath searching when the xmlns attribute is set in the XMLDoc.

The code below uses a regular expression to strip the xmlns attribute out of the XMLDoc before performing the xpath search. 

<div class="code"><font color="MAROON"><cffunction name=<font color="BLUE">"fixedXMLSearchOld"</font> access=<font color="BLUE">"public"</font> returntype=<font color="BLUE">"array"</font>></font>  
 <font color="MAROON"><cfargument name=<font color="BLUE">"XMLString"</font> type=<font color="BLUE">"Any"</font> /></font>  
 <font color="MAROON"><cfargument name=<font color="BLUE">"xPathString"</font> type=<font color="BLUE">"string"</font> /></font>  
 <font color="MAROON"><cfset var myRegEx = 'xmlns[ ]*=[ ]*<font color="BLUE">"[[:graph:]]+"</font>' /></font>  
 <font color="MAROON"><cfset var currentXMLString = <font color="BLUE">""</font> /></font>  
 <font color="MAROON"><cfset var currentXMLDoc = xmlNew() /></font>  
 <font color="MAROON"><cfset var myArray = arrayNew(<font color="BLUE">1</font>) /></font>  
 <font color="MAROON"><cfif isXMLDoc(arguments.XMLString)></font>  
 <font color="MAROON"><cfset currentXMLString = rereplaceNoCase(toString(arguments.XMLString),myRegEx,<font color="BLUE">""</font>,<font color="BLUE">"all"</font>) /></font>  
 <font color="MAROON"><cfelse></font>   
 <font color="MAROON"><cfset currentXMLString = rereplaceNoCase(arguments.XMLString,myRegEx,<font color="BLUE">""</font>,<font color="BLUE">"all"</font>) /></font>  
 <font color="MAROON"></cfif></font>  
 <font color="MAROON"><cfset currentXMLDoc = XMLParse(currentXMLString) /></font>  
 <font color="MAROON"><cfset myArray = XMLSearch(currentXMLDoc,xPathString) /></font>  
 <font color="MAROON"><cfreturn myArray /></font>  
 <font color="MAROON"></cffunction></font></div>
I also wrote a version in cfscript.

<div class="code"><font color="MAROON"><cfscript></font>  
 function fixedXMLSearch(XMLString, xPathString) {  
 var myRegEx = 'xmlns[ ]*=[ ]*<font color="BLUE">"[[:graph:]]+"</font>';  
 var currentXMLString = <font color="BLUE">""</font>;  
 var currentXMLDoc = xmlNew();  
 var myArray = arrayNew(<font color="BLUE">1</font>);  
 if (isXMLDoc(arguments.XMLString)) {  
 currentXMLString = rereplaceNoCase(toString(arguments.XMLString),myRegEx,<font color="BLUE">""</font>,<font color="BLUE">"all"</font>);  
 } else {  
 currentXMLString = rereplaceNoCase(arguments.XMLString,myRegEx,<font color="BLUE">""</font>,<font color="BLUE">"all"</font>);  
 }  
 currentXMLDoc = XMLParse(currentXMLString);  
 myArray = XMLSearch(currentXMLDoc,xPathString);  
 return myArray;  
 }  
 <font color="MAROON"></cfscript></font></div>