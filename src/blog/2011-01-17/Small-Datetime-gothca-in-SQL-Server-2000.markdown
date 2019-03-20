---
layout: post
title: "Small Datetime gothca in SQL Server 2000"
category: "Blog"
date: 2011-01-17
---


I have been working on a lot of data coversions lately. One of the problems I run into is parsing dates from one RDBMS to SQL Server. 2000 has several different date formats. The one I have been running into problems with is the SMALLDATETIME data type.

I was able to parse out the different parts of the date using the datepart() function. The next problem I ran into was the date range. The date range for the SMALLDATETIME is from January 1, 1900 through June 6, 2079\. I found a date that had a year set to 3003\.