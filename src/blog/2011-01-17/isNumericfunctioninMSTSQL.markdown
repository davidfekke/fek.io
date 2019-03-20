---
layout: post
title: "isNumeric function in MS T-SQL"
category: "Blog"
date: 2011-01-17
---


I do a lot of data conversions with my current job. I use a lot string and date function that are provided in Microsoft SQL Server 2000 in order to validate column when doing my bulk inserts and updates. I came across one today that is in the books online, but I did not realize it was there.

I use ColdFusion functions all the time like isDate and isNumeric to check variables for proper type. Here is an example of where these functions can be used in bulk inserts.

<div class="code">USE myFakeDB;  
 GO  

 INSERT INTO myTable (oldCustomerID)  
 SELECT CASE isNumeric(CustomerNumber)  
 WHEN 1 THEN CustomerNumber  
 ELSE 0  
 END   
 FROM myTempTable   
 LEFT JOIN myTable  
 ON myTempTable.CustomerNumber = myTable.oldCustomerID  
 WHERE myTable.myPrimaryKey IS NULL;  
 GO</div>
This will also work on bulk updates as well.