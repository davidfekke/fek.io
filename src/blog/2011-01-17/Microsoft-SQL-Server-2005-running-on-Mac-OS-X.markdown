---
layout: post
title: "Microsoft SQL Server 2005 running on Mac OS X"
category: "Blog"
date: 2011-01-17
---


I bought one of the new MacBook Pros last week. I absolutely love it. I have used a couple of different database engines on the Mac in the past such as MySQL, Sybase, Oracle and more recently Derby. Because the processors in my Mac where based on PowerPC processors, I was never able to run SQL Server with out some type of emulation. Anyone who ever ran Virtual PC on the Mac knows what I am talking about. I installed boot camp on the Mac initially with Windows XP. I downloaded the trial of Parallels Desktop 3.0 for the Mac and and it will use the boot camp partition.

I then installed the developer edition of SQL Server 2005 on XP. I have the beta of ColdFusion 8 running on my Mac, and I wanted to be able to access the database I was running on Parallels. Initially I could not get this to work. The default setup of Parallels does not allow the Mac to access servers running on Parallels. I was able to get this to work by changing the networking on Parallels to "Bridged Ethernet". I can now access SQL Server through JDBC on my Mac through parallels.

I am getting ready to work on a project using Oracle 10g. I will most likely run it the same way I am running SQL Server, just with a different operation system.