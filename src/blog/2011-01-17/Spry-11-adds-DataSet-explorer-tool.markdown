---
layout: post
title: "Spry 1.1 adds DataSet explorer tool"
category: "Blog"
date: 2011-01-17
---


Adobe released a new prerelease of the Spry Ajax framework today. One of the things included in this release is a DataSet Explorer. Spry uses the xpath to flatten XML into JSON array structures that are used by the framework to display the data in a HTML format, such as tables.

This Explorer tool makes it easier to introspect the XML, and how nodes are named by the framework. It is like having a CFDUMP tag for Ajax. The DataSetExplorer file is in the "samples/DataSetExplorer.html" path in the zip file. 

Here is an example of a XML file I passed into the tool;

<div class="code"><font color="NAVY"><font color="MAROON"><wddxPacket version='1.0'></font></font>  
 <font color="NAVY"><header/></font>  
 <font color="NAVY"><data></font>  
 <font color="NAVY"><struct type='coldfusion.runtime.TemplateProxy'></font>  
 <font color="NAVY"><var name='EPISODE'></font>  
 <font color="NAVY"><string></font>Obsession<font color="NAVY"></string></font>  
 <font color="NAVY"></var></font>  
 <font color="NAVY"><var name='QUOTE'></font>  
 <font color="NAVY"><string></font>...hesitation ... is an hereditary trait of your species, and suddenly faced by the unknown, or imminent danger, a human will invariably experience a split second of indecision. He hesitates.<font color="NAVY"></string></font>  
 <font color="NAVY"></var></font>  
 <font color="NAVY"><var name='STARDATE'></font>  
 <font color="NAVY"><string></font>3620.7.<font color="NAVY"></string></font>  
 <font color="NAVY"></var></font>  
 <font color="NAVY"></struct></font>  
 <font color="NAVY"></data></font>  
 <font color="NAVY"><font color="MAROON"></wddxPacket></font></font></div>
It will show the structure of the XML in a format like this;

<div class="code">wddxPacket  

@version  

header  

data  

struct  

@type  

var (REPEATING NODE)  

@name  

string

</div>
You can click on any of the nodes and it will show you the data in that structure.