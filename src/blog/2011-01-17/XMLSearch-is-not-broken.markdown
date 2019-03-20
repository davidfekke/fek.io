---
layout: post
title: "XMLSearch is not broken"
category: "Blog"
date: 2011-01-17
---


I was wrong. XMLSearch is not broken. Steven Erat at Talking Tree made a post about this issue on his [blog](http://www.talkingtree.com/blog/).

The issue has to do with setting a namespace without using a prefix qualifier. Here is an example from Steven's blog;

<div class="code"><font color="NAVY"><BackgroundReports xmlns=<font color="BLUE">"[http://ns.r-xml.org/2004-08-02](http://ns.r-xml.org/2004-08-02)"</font> ....></font></div>
Since the xml sets a namespace without the qualifier, no namespace gets set at all. Because of this, the xPath has to be explicit;

<div class="code">/:BackgroundReports/:ProviderReferenceId/:IdValue</div>
By placing the colons after the forward slashes, you are telling the search that the elements are in a no-name namespace. This should return the results you are looking for in your xml.

Thank you Steven Erat for pointing out what was actually happening.