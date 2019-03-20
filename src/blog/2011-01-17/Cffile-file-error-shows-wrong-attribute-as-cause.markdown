---
layout: post
title: "Cffile file error shows wrong attribute as cause"
category: "Blog"
date: 2011-01-17
---


One of the developers I work with ran into a problem yesterday with the cffile tag that seems to be too common with ColdFusion MX 6.1\. The tag threw an error saying that the source attribute did not have a valid path. We double checked the source, and it actually had a valid path.

We then checked the destination attribute, and it did have an incorrect path assigned. We fixed the path for the destination, and the page is working fine again. The is one of my main beefs with ColdFusion MX. As descriptive as the errors usually are, many times the wrong kind of error is displayed, or the wrong template is listed as the source of the error along with the wrong line number.

I love ColdFusion MX, but I wish Adobe would fix these problems because these were not problems in ColdFusion 5 and earlier.