---
layout: post
title: "JQuery :empty vs :blank filters"
category: "Blog"
date: 2011-01-17
---


I ran into an issue this morning using a JQuery selector filter. One of the things I like about JQuery is that they have some pretty cool filters that you can use to specify different parts of your DOM.

[code:c#]

jQuery("table tr:first"); // This will select the first row.

jQuery("table tr:last"); // this will select the last row.

[/code]>

I was trying to select all cells that were blank or empty so I used the following;

[code:c#]

$("#myIDName td:blank"); //Find all in table.

[/code]>

This worked fine in Firefox, but created all kinds of Havoc. I do not believe this is officially supported by the JQuery group.

I was able to solve the problem using the following change to my selector.

[code:c#]

$("#myIDName td:empty");

[/code]>

I am assuming that blank has been deprecated or was never fully supported, either way you should just use the :empty filter.