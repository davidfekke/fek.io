---
layout: post
title: "How to invoke the ImageWatcher CFC"
category: "Blog"
date: 2011-01-17
---


Leif Wells asked if I would edit my previous [blog post](http://www.fekke.com/blog/index.cfm/2006/4/20/FileWatcherEventgatewayCFCforJpegthumbnailresizing) on how to invoke the ImageWatcher CFC. The CFC is actually invoked by the Event Gateway. A new Gateway instance needs to be created in the ColdFusion Administrator. To create a new instance, click on the "Event Gateways" link, then on the "Gateway Instances". This will the ability to add or edit a new Gateway Instance. A new Instance requires a Gateway ID, Gateway type (DirectoryWatcher), CFC path (path to my ImageWatcher CFC), and a reference to the Configuration File.

The configuration file tells ColdFusion which folder to watch, the interval, and which functions to call for the directory watcher. Here is an example of a config file;

<div class="code">directory=c:[\\images](\\images)  
 interval=10000  
 extensions=jpg,jpeg  
 addFunction=onAdd</div>
You can also use functions for onChange and onDelete.