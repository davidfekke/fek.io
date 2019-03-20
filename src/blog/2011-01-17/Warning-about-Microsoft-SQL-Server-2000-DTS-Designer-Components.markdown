---
layout: post
title: "Warning about Microsoft SQL Server 2000 DTS Designer Components"
category: "Blog"
date: 2011-01-17
---


Beware of installing the [Microsoft SQL Server 2000 DTS Designer Components](http://www.microsoft.com/downloads/details.aspx?FamilyID=D09C1D60-A13C-4479-9B91-9E8B9D835CDC&displaylang=en) for SQL Server 2005\. For a long time, I have been using both SQL Server 2005 and 2000 client tools on the same machine. When I installed the DTS 2000 components, it corrupted my SQL Server 2000 clients tools. I can use the 2005 tools for both 2000 and 2005, but the 2005 tools are definitely slower than the 2000 tools when working with DTS packages. Hopefully Microsoft will address this issue with SP2 for SQL Server 2005.