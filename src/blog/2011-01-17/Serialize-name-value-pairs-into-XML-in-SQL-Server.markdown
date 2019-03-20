---
layout: post
title: "Serialize name value pairs into XML in SQL Server"
category: "Blog"
date: 2011-01-17
---


I wrote a gateway service that allowed an Oracle database server to talk to a SQL Server database server about two years ago in ColdFusion MX 6.1\. Back then I was able to use a centralized auditing table to store all of the inserts and update values. At my current job I am writing a lot of stored procedures, and I wanted to do the same thing just in Transact SQL. In ColdFusion it is fairly easy to serialize complex data into a string using WDDX.

[code:c#]

[/code]>

You can do something similar to this to serialize name value pairs in SQL.

[code:c#]

DECLARE @myTable TABLE (myString NVARCHAR(128) NULL, myInt INT NULL, myBool BIT)

DECLARE @myXML XML

INSERT INTO @myTable

SELECT 'My string' AS myString, 12 AS myInt, 0 AS myBool

SET @myXML = (SELECT *

FROM @myTable AS myTable

FOR XML AUTO)

[/code]>

If you are using SQL Server 2005, you can store the XML value into a XML column or cast it into a NVARCHAR(MAX) or NTEXT column.

The result will look like the following;

[code:c#]

[/code]>