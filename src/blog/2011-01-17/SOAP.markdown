---
layout: post
title: "Quote Service not working on BlueDragon.NET"
category: "Blog"
date: 2011-01-17
---


I have a SOAP based web service that I wrote when ColdFusion MX 6 first came out, and it does not work in BlueDragon.NET.

The web service is called a quote from Mr. Spock. (Yes, I am a GEEK.) It has a one method called getQuote which returns a coldFusion structure or a HashMap object if you are using Java. When I test my client for the web service in BlueDragon, it retuned an empty object. So I decided to rewrite my web service code to return a simple object instead. My current cfc for the web service looks like this;

<div class="code"><font color="MAROON"><cfcomponent displayName=<font color="BLUE">"spock"</font>></font>  

 <font color="MAROON"><cffunction access=<font color="BLUE">"private"</font> name=<font color="BLUE">"getRand"</font> returntype=<font color="BLUE">"numeric"</font>></font>  

 <font color="MAROON"><cfset randNum = randrange(<font color="BLUE">1</font>,<font color="BLUE">85</font>)></font>  

 <font color="MAROON"><cfreturn randNum /></font>  

 <font color="MAROON"></cffunction></font>  

 <font color="MAROON"><cffunction access=<font color="BLUE">"Remote"</font> name=<font color="BLUE">"getQuote"</font> returntype=<font color="BLUE">"struct"</font> hint=<font color="BLUE">"Get Quote from Mr. Spock"</font>></font>  

 <font color="MAROON"><cfquery name=<font color="BLUE">"myQuoteQuery"</font> datasource=<font color="BLUE">"#application.davidsDSN#"</font>></font>  

 Select * From SpockQuotes  

 WHere QuoteNum = #getRand()#;  

 <font color="MAROON"></cfquery></font>  

 <font color="MAROON"><cfset spock = structnew()></font>  

 <font color="MAROON"><cfset spock.quote = trim(myQuoteQuery.quote)></font>  

 <font color="MAROON"><cfset spock.Episode = myQuoteQuery.episode></font>  

 <font color="MAROON"><cfset spock.stardate = myQuoteQuery.stardate></font>  

 <font color="MAROON"><cfreturn spock /></font>  

 <font color="MAROON"></cffunction></font>  

<font color="MAROON"></cfcomponent></font>

</div>
ColdFusion MX has a built in way to describe simple objects in the WSDL file. If you create another cfc using the cfproperty tag, you can return that type in the web service.

My structure has three name/value pairs for the quote, stardate and episode. The values are all of type string. So the following cfc that describes the simple object looks like this;

<div class="code"><font color="MAROON"><cfcomponent displayname=<font color="BLUE">"SpockQuoteModel"</font>></font>  

 <font color="MAROON"><cfproperty name=<font color="BLUE">"quote"</font> type=<font color="BLUE">"string"</font> /></font>  
 <font color="MAROON"><cfproperty name=<font color="BLUE">"episode"</font> type=<font color="BLUE">"string"</font> /></font>  
 <font color="MAROON"><cfproperty name=<font color="BLUE">"stardate"</font> type=<font color="BLUE">"string"</font> /></font>  

 <font color="MAROON"></cfcomponent></font></div>
Then I wrote a new web service code that uses this cfc;

<div class="code"><font color="MAROON"><cfcomponent displayName=<font color="BLUE">"SpockWS"</font>></font>  

 <font color="MAROON"><cffunction access=<font color="BLUE">"private"</font> name=<font color="BLUE">"getRand"</font> returntype=<font color="BLUE">"numeric"</font>></font>  
 <font color="MAROON"><cfset randNum = randrange(<font color="BLUE">1</font>,<font color="BLUE">85</font>)></font>  
 <font color="MAROON"><cfreturn randNum /></font>  
 <font color="MAROON"></cffunction></font>  

 <font color="MAROON"><cffunction access=<font color="BLUE">"Remote"</font> name=<font color="BLUE">"getQuote"</font> returntype=<font color="BLUE">"SpockQuoteModel"</font> hint=<font color="BLUE">"Get Quote from Mr. Spock"</font>></font>  
 <font color="MAROON"><cfquery name=<font color="BLUE">"myQuoteQuery"</font> datasource=<font color="BLUE">"#application.davidsDSN#"</font>></font>  
 SELECT quote, episode, stardate   
 FROM SpockQuotes  
 WHERE QuoteNum = <font color="MAROON"><cfqueryparam cfsqltype=<font color="BLUE">"cf_sql_integer"</font> value=<font color="BLUE">"#getRand()#"</font> /></font>;  
 <font color="MAROON"></cfquery></font>  
 <font color="MAROON"><cfset spock = createObject(<font color="BLUE">"component"</font>,<font color="BLUE">"SpockQuoteModel"</font>) /></font>  
 <font color="MAROON"><cfset spock.quote = trim(myQuoteQuery.quote) /></font>  
 <font color="MAROON"><cfset spock.Episode = myQuoteQuery.episode /></font>  
 <font color="MAROON"><cfset spock.stardate = myQuoteQuery.stardate /></font>  
 <font color="MAROON"><cfreturn spock /></font>  
 <font color="MAROON"></cffunction></font>  

 <font color="MAROON"></cfcomponent></font></div>
I tested this in BlueDragon.NET with the following client code;

<div class="code"><font color="MAROON"><cfinvoke   
 webservice=<font color="BLUE">"[http://www.fekke.com/com/SpockWS.cfc?wsdl](http://www.fekke.com/com/SpockWS.cfc?wsdl)"</font>  
 method=<font color="BLUE">"getQuote"</font>  
 returnvariable=<font color="BLUE">"aHashMap"</font>></font>  
 <font color="MAROON"></cfinvoke></font>  

 <font color="MAROON"><cfoutput></font>  
 Quote: <font color="BLUE">"#aHashMap.quote#"</font><font color="NAVY"><br /></font>  
 Episode Name: <font color="NAVY"><strong></font>#aHashMap.episode#<font color="NAVY"></strong></font><font color="NAVY"><br /></font>  
 Stardate: <font color="NAVY"><em></font>#aHashMap.stardate#<font color="NAVY"></em></font><font color="NAVY"><br /></font>  
 <font color="MAROON"></cfoutput></font></div>
It Worked!!! I will copy this sample code to my web site with instructions soon.