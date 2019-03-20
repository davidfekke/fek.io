---
layout: post
title: "TRUNCATE_ONLY option is being deprecated in SQL Server 2007"
category: "Blog"
date: 2011-01-17
---


If you use the following statement to empty our your transaction log, beware.

<div class="code">BACKUP LOG dbname WITH TRUNCATE_ONLY</div>
When I am doing bulk loads for data conversions, it is not uncommon for me to fill up my transaction log. SQL Server 2000 will allow you to shrink your log file throught enterprise manager or the use of one of the DBCC commands, but you can still use code.

This option has been deprecated, and Microsoft is not planning on having the TRUNCATE_ONLY option in SQL Server 2007.

Another option is detaching the database, and then reattaching without the log file. SQL Server will recreate the LOG file from scratch.