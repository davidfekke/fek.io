---
layout: post
title: "Does ColdFusion need 64 bit Support? Short answer: Yes!"
category: "Blog"
date: 2011-01-17
---


Does ColdFusion need 64 bit support? The short answer to this question is yes, but it really depends on the ROI if Adobe charges more for the 64 bit version. My company is currently in the process of upgrading to 64 bit servers, but only where it makes sense.

SQL Server 2005 has a 32 bit and a 64 bit version. The 64 bit version takes advantage of the 64 bit chips, but it also costs a lot more. Factor in the cost of the 64 bit version of Windows 2003 Server OS, and it gets pricey.

From my tests with SSIS on this new hardware, ETLs that used to take hours now take minutes to run. Granted a lot of the speed improvements have come from code optimizations in SQL Server, but there is still a huge improvement from using the 64 bit hardware.

It would be nice to see 64 bit version of ColdFusion. I know it would require having a 64 bit OS and JVM, but it would be nice to see ColdFusion take advantage of this new hardware.