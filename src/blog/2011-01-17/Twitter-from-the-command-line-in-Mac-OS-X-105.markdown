---
layout: post
title: "Twitter from the command line in Mac OS X 10.5"
category: "Blog"
date: 2011-01-17
---


I am a big fan of public APIs that are provided by web sites such as Google, Microsoft and Facebook. I think one of the reasons that twitter has been successful is that their service can be accessed through their [API's](http://apiwiki.twitter.com/).

One of the jokes I heard at the Miami Flex Camp was that [Adobe Air](http://www.adobe.com/products/air/) was a framework for building twitter applications. The truth is that Air is simply taking advantage of the public API's.

Here is a Shell script that I wrote to send twitter updates from the BASH shell in Mac OS X 10.5;

[code:c#]

#!/bin/bash

curl -u username:password -d status="$1" http://twitter.com/statuses/update.xml

echo "Sent twitter a status update"

[/code]>

You will need to replace the username and password with your own username and password. I named my script "twitter". Once you create the script, you will need to change the permissions on the file to execute using a command like the following;

[code:c#]

sudo chmod +x twitter

[/code]>

Once you have set the permissions on the file, you can use it in the following way;

[code:c#]

./twitter "I am updating my twitter status"

[/code]>