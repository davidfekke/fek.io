---
layout: post
title: "XMLSearch() function still broken in ColdFusion 7.0.1"
category: "Blog"
date: 2011-01-17
---


I really wish Macromedia and the ColdFusion team would fix their bugs! I was a beta tester for Blackstone, and I hoped that Macromedia would have fixed the XMLSearch() before CFMX 7 was released.

I just tested CFMX 7.0.1 to see if this was fixed, and it is still broken. I am happy that there is a Macintosh installer now, but this has been an issue all the way back in CFMX 6.

XMLSearch() works fine until you set a XmlNsURI anywhere in the XML document. You can test this by adding a xmlns="anyURLHere" name attribute in any tag in your XML file. Once this is set, XMLSearch() breaks.