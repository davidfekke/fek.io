---
layout: post
title: "CFC function calls in pound signs"
category: "Blog"
date: 2011-01-17
---


I try to write as little code as I can get away with. Because of this, I make functions calls like this in my cfoutput tags.

<div class="code"><font color="MAROON"><cfoutput></font>  

 #myObj.getString()#  

 <font color="MAROON"></cfoutput></font></div>
This is a lot easier to write than the following;

<div class="code"><font color="MAROON"><cfset myString = myObj.getString() /></font>  

 <font color="MAROON"><cfoutput></font>  

 #myString#  

 <font color="MAROON"></cfoutput></font></div>
The problem I ran into is I was putting quotes around my function call, and it was adding a space inbetween the quotes and the beginning of the string.

<div class="code"><font color="MAROON"><cfoutput></font>  

 <font color="BLUE">"#myString#"</font>  

 <font color="MAROON"></cfoutput></font></div>
" Actual String value"

What happens is if the function does not have output="no" it defaults to true. So just like in a regular cfm page, the white space is added to the function. If you set the output="no", no white space will appear. The result will look like this;

"Actual String value"