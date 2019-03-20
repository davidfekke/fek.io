---
layout: post
title: "cfcomponent style attribute"
category: "Blog"
date: 2011-01-17
---


I recently ran into a situation where someone needed to call one of my web services, but they could only generate a proxy class if my wsdl file and service were rpc encoded. It turns out that there several different wsdl and SOAP message styles. The most common are rpc/encoded and document/literal. There is a very good IBM [article](http://www-128.ibm.com/developerworks/websphere/library/techarticles/0505_flurry/0505_flurry.html) about the differences between the different styles.

ColdFusion MX 7.0.1 supports the two most common styles now. Macromedia's livedocs has [examples](http://livedocs.macromedia.com/coldfusion/7/htmldocs/wwhelp/wwhimpl/common/html/wwhelp.htm?context=ColdFusion_Documentation&file=00001550.htm) of how to change styles using the style attribute.

If you need to change the style to document/literal, all you have to do is change the style attribute in the cfcomponent tag to document.

<div class="code"><font color="MAROON"><cfcomponent style=<font color="BLUE">"document"</font> ></font></div>