---
layout: post
title: "T-SQL is case insensitive, XQuery is Case Sensitive"
category: "Blog"
date: 2011-01-17
---


One of the nice new features in SQL Server 2005 is the inclusion of an XML data type. Microsoft added the ability to use XQuery searches to pull values from this type. [code:c#]

DECLARE @filterData xml;

DECLARE @PersonID int;

SET @filterData = '';

SET @PersonID = @filterData.value('(/XMLDATA/REC/@PersonID)[1]','int');

--This will show the XQuery value in the PersonID

PRINT @PersonID

[/code]>

One of the problems I am seeing with developers using this code is that because Transact SQL is case insensitive, they forget that XQuery is not case insensive. The following example will return a NULL value

[code:c#]

DECLARE @filterData xml;

DECLARE @PersonID int;

SET @filterData = '';

SET @PersonID = @filterData.value('(/XMLDATA/REC/@PersonID)[1]','int');

--This will show the XQuery value in the PersonID

SELECT @PersonID AS PersonID

[/code]>

Make sure you use the proper casing when using XQuery in your Transact SQL.