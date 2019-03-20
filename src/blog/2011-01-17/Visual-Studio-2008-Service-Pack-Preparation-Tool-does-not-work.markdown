---
layout: post
title: "Visual Studio 2008 Service Pack Preparation Tool does not work"
category: "Blog"
date: 2011-01-17
---


I tried to install the Visual Studio 2008 SP1 update, and the install failed. I did some searching, but I was not able to find anyone else who is having this problem.

I have been running the SP1 beta for Visual Studio 2008\. When I went to run the actual SP1 installer yesterday, I got prompted to run the [Visual Studio 2008 Service Pack Preparation Tool](http://www.microsoft.com/downloads/details.aspx?FamilyId=A494B0E0-EB07-4FF1-A21C-A4663E456D9D&displaylang=en).

I tried running the tool, and was prompted to locate "x64/Setup/vs_shell.msi" file on the Visual Studio installer disks. No such file exists on my original installer. The Visual Studio uninstaller does completely remove the IDE, so I am dead in the water until Microsoft Fixes this issue.

Update:

I uninstalled the Visual Studio 2008 shell, and I was able to run the visual studio patch tool.