---
layout: post
title: "DOM vs. SAX XML parsers"
category: "Blog"
date: 2011-01-17
---


I was recently told by a co-worker that you should never use DOM based XML parsers to load XML data into a application or database.

DOM is extremely bad in JAVA for processing large XML documents, mainly because it has to load the entire document into memory. We use JRun which by default has a maximum of 512 megabytes of memory. If you have a XML file that is several hundred megabytes in size, JRun will not be able to load the whole document into memory. SAX or the Simple API for XML processing does a much better job at processing large XML files. The reason for this is you can load portions of the XML file into a buffer, extract the information you need, and process the rest of the file. Since you are you are only loading a portion of the file at a time, it does not require as much memory.

So why would anyone ever use DOM based parsers for processing XML. While it is true that DOM does poor job at handling large XML documents, it is much easier to develop for DOM than SAX. DOM based parsers are more elegant and have an easier learning curve than SAX. Most XML files that developers run into are small enough that they can be handled with a DOM based parser.

SAX is based on an event model that raises events when tags are recognized in the buffer. It is nowhere as elegant as a real XML API.

ColdFusion MX uses a DOM based parser for processing XML. It allows the developer to treat the XML as tree structure and to use xpath for searching for specific nodes.