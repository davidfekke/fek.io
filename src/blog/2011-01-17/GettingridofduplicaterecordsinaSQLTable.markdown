---
layout: post
title: "Getting rid of duplicate records in a SQL Table"
category: "Blog"
date: 2011-01-17
---


Here is a simple way of getting rid of duplicate records in a SQL Server table. This comes up frequently when a customer gives you bad data. You can clean this up in temp tables before adding it to the actual database.

<div class="code">DELETE temp_Table  

WHERE SOME_UNIQUE_CODE IN (SELECT SOME_UNIQUE_CODE  

FROM temp_Table  

GROUP BY SOME_UNIQUE_CODE  

HAVING COUNT(SOME_UNIQUE_CODE) > 1)  

AND tempPrimaryKeyID NOT IN (SELECT MIN(tempPrimaryKeyID)  

FROM temp_Table  

GROUP BY SOME_UNIQUE_CODE  

HAVING COUNT(SOME_UNIQUE_CODE) > 1);  

GO

</div>
So by using the HAVING clause, you can check for a count greater than one on the column that has been duplicated using the COUNT() aggregate function. You can then filter out the records you want to keep by using the MIN() aggregate function on the column that is truly unique.