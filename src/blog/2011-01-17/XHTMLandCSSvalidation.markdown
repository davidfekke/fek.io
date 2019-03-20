---
layout: post
title: "XHTML and CSS validation"
category: "Blog"
date: 2011-01-17
---


I just went through the process of making sure my site is XHTML 1.1 and CSS compliant. The W3C.org site has several validators that will inspect your code to make sure it is compliant. They will show line by line where there are problems in your code.

Bottom line is that my site had a lot of compliance issues. I got them fixed, but here are some of the gotchas I ran into cleaning up my design.

<div class="code"><font color="NAVY"><br></font></div>
Since XHTML is a subset of XML, it follows all of the rules of having proper XML formating. I had a lot of breaking returns. Single tags require that you have a slash at the end, or a closing tag. Breaking returns should look like this;

<div class="code"><font color="NAVY"><br /></font></div>
It is also common to have paragraph returns in a single tag, but this is not proper either. Your paragraphs should be enclosed in beginning and end tags.

<div class="code"><font color="NAVY"><p></font>  
 Your paragraph here.  
 <font color="NAVY"></p></font></div>
For the 1.1 compliance you need to adhere to strict XHTML. Targets attributes are not allowed in href anchor tags. I have used target="_blank" to open up new windows, but I have had to replace them with the following syntax;

<div class="code"><font color="GREEN"><a href=<font color="BLUE">"javascript:window.open('[http://www.JaxFusion.org/](http://www.JaxFusion.org/)','JaxFusion');"</font> title=<font color="BLUE">"Home of the Jacksonville, FL ColdFusion User Group"</font>></font>JaxFusion<font color="GREEN"></a></font><font color="NAVY"><br /></font></div>