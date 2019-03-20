---
layout: post
title: "New design for my Blog"
category: "Blog"
date: 2011-01-17
---


I decided to redesign my blog last night. I am using Aura from Leorex and the Aura skin that Joe Rinehart created for Aura. The nice thing about Aura is that they provide a Photoshop template to redesign the skin very easily. I personally feel it looks better than my last design, and it uses CSS positioning for the layout.

I did run into some problems initially with the Javascript popup window functionality for the blog editor. I think it has to do with the version of BlogCFC I am using and the version of the Aura skin that Joe provided. I am using BlogCFC 3.5.

Joe javascript command looked like this;

<div class="code"><font color="GREEN"><a href=<font color="BLUE">"javaScript:launchBlogEditor('#id#')"</font>></font>#application.resourceBundle.getResource(<font color="BLUE">"edit"</font>)#<font color="GREEN"></a></font></div>
I changed it to look like this;

<div class="code"><font color="GREEN"><a href=<font color="BLUE">"javaScript:launchEditor('#id#')"</font>></font>#application.resourceBundle.getResource(<font color="BLUE">"edit"</font>)#<font color="GREEN"></a></font></div>
That seems to have done the trick.