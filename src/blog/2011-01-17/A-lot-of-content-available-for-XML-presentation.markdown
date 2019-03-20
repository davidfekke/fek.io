---
layout: post
title: "A lot of content available for XML presentation"
category: "Blog"
date: 2011-01-17
---


I finished creating my presentation on XML yesterday. One of the things that became obvious was that there is a lot more than an hours worth of content on XML.

Even with all of the XML features in ColdFusion, there are still some shortcomings in the way that ColdFusion handles XML. One of the key parts of the presentation will be StAX, the new Java API for dealing with XML. One of the key features of StAX is that it uses a pull parser when dealing with large XML files.

One of the issues I have run into with using large XML files in ColdFusion is you have to load the whole file into memory in order for the DOM parser to work.

Using a stream based parser is much more effecient when dealing with large XML files because it does not have to load the whole file into memory.

I am plugging the JaxFusion meeting this Tuesday for the JaxFusion user group because this will be covered at the meeting.