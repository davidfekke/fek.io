---
layout: post
title: "Branch target offset too large for short?"
category: "Blog"
date: 2011-01-17
---


I saw this error in the CF_talk list yesterday. I have had this error in ColdFusion before. As far as I can tell this happens when there is a lot of repetitive code in your CFCs.

I was using a meta code generator to create CFCs for a gateway I was writting. There were SQL tables with over 100 columns and structures with over 100 keys. Since ColdFusion MX came out, ColdFusion actually compiles your .cfc and .cfm files into java bytecode. When my CFCs were being executed for the first time, ColdFusion would get this error on the compile.

I was able to fix this by breaking my CFC apart into smaller pieces using the cfinclude tag. Once I broke the code into included sections, ColdFusion was able to compile these files without a problem.