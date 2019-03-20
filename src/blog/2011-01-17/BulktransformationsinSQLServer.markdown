---
layout: post
title: "Bulk transformations in SQL Server"
category: "Blog"
date: 2011-01-17
---


One of the mistakes I have seen developers make is not using bulk transaformations in SQL. It does not matter if you use MS SQL Server, Oracle, DB2 or MySQL, all of the RDBMS's provide developers a way to perform bulk transformations of data.

One of the powerful things about SQL is that you can update or insert thousands or millions of records with one SQl Statement. Here is a simple example. Lets say I have a thousand records in a table that have a bit column to determine if a record is active. I can set every record of that table to inactive with two lines of SQL.

<div class="code">UPDATE myTable  

SET Active = 0;  

GO

</div>
If I only want to set records in my table that have a certain value in another column to inactive, I can do that as well with a few lines of SQL.

<div class="code">UPDATE myTable  

SET active = 0  

WHERE State = 'CA';  

GO

</div>
If I need to populate all of the records of one table from another table, I can do that with one SQL statement as well;

<div class="code">INSERT INTO myTable (firstName, Lastname, addressLine, City, State, Zip)  

SELECT fName, lName, Address1, City, StateProvince, ZipCode  

FROM impTempTable;  

GO

</div>