---
layout: post
title: "iPhone Development First Observations"
category: "Blog"
date: 2011-01-17
---


I recently started developing some iPhone applications and registered in the iPhone SDK program at Apple. As Apple typically does, they have sworn me to secrecy about their new iPhone APIs. It has been fun planing around with Apple's development tools. If you use a Mac, the development tools are are free. On the Mac there are already a lot of options for developing application. I have used the Mac for years for doing my ColdFusion, Flex/Air and Java server development. Up until a couple of months ago I have never bothered to actually use Apple's tools such as xcode and Interface builder. Xcode will allow you to build applications using many different languages including AppleScript, Ruby, Python, Java and C++. The iPhone is a different animal. You can only develop using Objective C or C++. By default Objective C is Apple's language of choice. One of the key reasons Apple has given for this limited choice are the limited resources of the iPhone. As advanced as the iPhone is, it is using an Arm processor with 128 MB of RAM. On the Mac you can use a garbage collector when developing Obj-C applications, but this is not an option on the iPhone. You are required to do your own memory management. Obj-C uses pointers for non-primitive objects, but Apple has actually implemented a nice framework that helps you manage your memory. Obj-C, like C++ uses header files. Your header files typically contain your interface, while you code file contains the implementation. This is one of the things that has kept me from ever doing any C++ development. I always have felt writing a header file is like having to write the same code twice. So far I am finding Objective C to be a language that is somewhere in between C++ and Java in its ease of use. Another thing that C developers will find weird is the SmallTalk like syntax. A typical call to create a new object might look like the following example;

[code:c#]

NSObject *myObject = [[NSObject alloc] init];

[/code]

The same call in Java would look like this;

[code:c#]

[code:c#]NSObject myObject = new NSObject(); [/code]>

[code:c#][/code][/code]>

I intend on blogging about my experiences with the Cocoa Framework. I am also trying to start a Cocoa user group here in Jacksonville. I am giving a presentation on iPhone development at this years [Jacksonville Code Camp](http://www.jaxcodecamp.com). If you are interested in joining this group, please send me a buzz.