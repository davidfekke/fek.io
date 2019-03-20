---
layout: post
title: "SQL Server 2005 Integration Services training"
category: "Blog"
date: 2011-01-17
---


I have been at SQL Server 2005 Integration Services training for the last two days, and I have to say it has been an eye opener. The class is being taught by [Brian Knight](http://www.whiteknighttechnology.com/cs/blogs/brian_knight/)

of Idea Integration. Brian runs the local SQL Server users group, and has co-authored a book on SSIS. Integration Services is the replacement for Sql Server’s DTS (Data Transformation Services) packages. It provides a graphical tool for programming data integrations into and out of SQL Server. DTS was already fast before SSIS for importing and exporting data, but it was limited in what you could do without doing a lot of activex scripting. At my current job, we use ColdFusion to do our file moving, ftp and encryption. We presently reserve DTS for bulk transformations on the database server.

All of the things that we could not do in DTS can be done now with Integration Services. SSIS can also iterate through files in a directory though containers. XML support in SQL Server 2000 was non-existent, but the support is much better in SSIS. If you do not have an XSD file for your XML file, SSIS will generate one for you.

SSIS also has improved scripting capability, and comes with a new expression language for evaluating system and user variables.

<div class="code">@[User::varConfigString] == @[System::PackageName]</div>
If you use SQL Server 2005 and have to integrate with different data sources, SSIS is comes included with SQL Server. It is a cheap alternative to other ETL solutions such as CastIron, WebMethods and EAI.