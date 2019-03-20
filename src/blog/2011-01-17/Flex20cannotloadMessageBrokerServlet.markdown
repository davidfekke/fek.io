---
layout: post
title: "Flex 2.0 can not load MessageBrokerServlet"
category: "Blog"
date: 2011-01-17
---


I have been playing around with some of the Flex 2.0 examples for ColdFusion. I am trying to get the cfcontact example working and I get the following error when I try to edit the flex-data-service.xml file.

<div class="code">error Could not pre-load servlet: MessageBrokerServlet</div> I made the following two changes to this file;<div class="code"><font color="GREEN"><adapters></font>  
 <font color="GREEN"><adapter-definition id=<font color="BLUE">"actionscript"</font> class=<font color="BLUE">"flex.data.adapters.ASObjectAdapter"</font> default=<font color="BLUE">"true"</font>/></font>  
 <font color="GREEN"><adapter-definition id=<font color="BLUE">"java-dao"</font> class=<font color="BLUE">"flex.data.adapters.JavaAdapter"</font>/></font>  
 <font color="GREEN"><adapter-definition id=<font color="BLUE">"hibernate"</font> class=<font color="BLUE">"flex.data.adapters.HibernateAdapter"</font>/></font>  
 <font color="GRAY">_<!-- Uncomment this if you want to use the ColdFusion Data Services Adapter -->_</font>  
 <font color="GREEN"><adapter-definition id=<font color="BLUE">"coldfusion-dao"</font> class=<font color="BLUE">"coldfusion.flex.CFDataServicesAdapter"</font>/></font>  

 <font color="GREEN"></adapters></font></div>
I also added the destination for the cfcontact;

<div class="code"><font color="NAVY"><destination id=<font color="BLUE">"cfcontact"</font>></font>   
 <font color="GREEN"><adapter ref=<font color="BLUE">"coldfusion-dao"</font>/></font>   
 <channels>   
 <channel ref=<font color="BLUE">"cf-dataservice-rtmp"</font> />   
 </channels>   
 <font color="NAVY"><properties></font>   
 <font color="NAVY"><metadata></font>   
 <font color="NAVY"><identity property=<font color="BLUE">"contactId"</font>/></font>   
 <font color="NAVY"></metadata></font>   
 <font color="NAVY"><network></font>   
 <font color="NAVY"><font color="FF8000"><session-timeout></font></font>0<font color="NAVY"><font color="FF8000"></session-timeout></font></font>   
 <font color="NAVY"><paging enabled=<font color="BLUE">"false"</font> size=<font color="BLUE">"10"</font>/></font>   
 <font color="TEAL"><throttle-inbound policy=<font color="BLUE">"ERROR"</font> max-frequency=<font color="BLUE">"500"</font>/></font>   
 <font color="TEAL"><throttle-outbound policy=<font color="BLUE">"REPLACE"</font> max-frequency=<font color="BLUE">"500"</font>/></font>   
 <font color="NAVY"></network></font>   
 <font color="NAVY"><font color="FF8000"><server></font></font>   
 <font color="GREEN"><assembler></font>   

 <font color="NAVY"><component></font>samples.contact.ContactAssembler<font color="NAVY"></component></font>   

 <font color="NAVY"><hostname></font>localhost<font color="NAVY"></hostname></font>   

 <font color="GREEN"><access></font>   

 <font color="NAVY"><method-access-level></font>remote<font color="NAVY"></method-access-level></font>   
 <font color="GREEN"></access></font>   

 <font color="NAVY"><property-case></font>   

 <font color="NAVY"><font color="FF8000"><force-cfc-lowercase></font></font>false<font color="NAVY"><font color="FF8000"></force-cfc-lowercase></font></font>   

 <font color="NAVY"><font color="FF8000"><force-query-lowercase></font></font>false<font color="NAVY"><font color="FF8000"></force-query-lowercase></font></font>   

 <font color="NAVY"><font color="FF8000"><force-struct-lowercase></font></font>false<font color="NAVY"><font color="FF8000"></force-struct-lowercase></font></font>   
 <font color="NAVY"></property-case></font>   
 <font color="GREEN"></assembler></font>   

 <font color="FF8000"><fill-method></font>   
 <font color="NAVY"><name></font>fill<font color="NAVY"></name></font>   
 <font color="FF8000"></fill-method></font>   

 <font color="NAVY"><sync-method></font>   
 <font color="NAVY"><name></font>sync<font color="NAVY"></name></font>   
 <font color="NAVY"></sync-method></font>   

 <get-method>   
 <font color="NAVY"><name></font>get<font color="NAVY"></name></font>   
 </get-method>   

 <count-method>   
 <font color="NAVY"><name></font>count<font color="NAVY"></name></font>   
 </count-method>   
 <font color="NAVY"><font color="FF8000"></server></font></font>   
 <font color="NAVY"></properties></font>   
 <font color="NAVY"></destination></font></div>
The only thing I can think of that might be causing a problem is that I am running CF mystic under IIS and Jrun. I have standalone version of jrun Flex data services running on port 8700.

Has anyone found a fix for this yet?