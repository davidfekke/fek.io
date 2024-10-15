---
title: "XMLSearch bug fixed with this UDF"
category: "Blog"
date: 2011-01-17
---


I got tired of waiting for Macromedia to fix the bug in XMLSearch, so I wrote this User Defined Function that will bypass the problem with xpath searching when the xmlns attribute is set in the XMLDoc.

The code below uses a regular expression to strip the xmlns attribute out of the XMLDoc before performing the xpath search. 

```xml
<cffunction name="fixedXMLSearchOld" access="public" returntype="array">  
 <cfargument name="XMLString" type="Any" />  
 <cfargument name="xPathString" type="string"  
 <cfset var myRegEx = 'xmlns[ ]*=[ ]*"[[:graph:]]+"' />  
 <cfset var currentXMLString = "" />  
 <cfset var currentXMLDoc = xmlNew() />  
 <cfset var myArray = arrayNew(1) />  
 <cfif isXMLDoc(arguments.XMLString)>  
 <cfset currentXMLString = rereplaceNoCase(toString(arguments.XMLString),myRegEx,"","all") />  
 <cfelse> 
 <cfset currentXMLString = rereplaceNoCase(arguments.XMLString,myRegEx,"","all") />  
 </cfif>
 <cfset currentXMLDoc = XMLParse(currentXMLString) />  
 <cfset myArray = XMLSearch(currentXMLDoc,xPathString) />  
 <cfreturn myArray />
</cffunction>
```

I also wrote a version in cfscript.

```javascript
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
```