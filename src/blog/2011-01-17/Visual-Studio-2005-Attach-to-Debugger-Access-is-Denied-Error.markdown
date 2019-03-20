---
layout: post
title: "Visual Studio 2005 Attach to Debugger Access is Denied Error"
category: "Blog"
date: 2011-01-17
---


A client of mine ran into an interesting problem trying to debug a Sharepoint 2007 workflow. Whenever they try to attach the debugger to the w3wp.exe process that is running the workflow, they get a dialog that says "Access is Denied".

What is weird about this is they are logged in as administrator, and this is on the same box as the Sharepoint Server. The only thing that I see that is different is that the box has a x64 processor. I am curius if anyone else has run into this problem with Visual Studio 2005?