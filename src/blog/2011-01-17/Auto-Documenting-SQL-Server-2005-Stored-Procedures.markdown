---
layout: post
title: "Auto Documenting SQL Server 2005 Stored Procedures"
category: "Blog"
date: 2011-01-17
---


One of the features I like most about ColdFusion 8 is the cfdbinfo tag. The cfdbinfo tag allows developers to view database meta information such as tables, columns and data types. Another nice thing about the cfdbinfo tag is that it will work with most RDBMS servers.

Each database server, whether it is Oracle, MySql or MS SQL Server, all have different ways of getting this meta information. CFDBINFO gives ColdFusion developers a nice level of abstraction from these different ways of accessing meta information. I am currently trying to document all of the stored procedures I wrote for a project I just finished. I decided I wanted to try to automate this task, so I wrote ColdFusion script to list my stored procedures. The following code shows how you can use the cfdbinfo tag to list all of your stored procedures.

[code:c#]

[/code]>

This may be enough information for some users, but I also wanted to display all of the input and output parameters as well as the code in the procedure as well.

I work with SQL Server 2005 as my primary database engine. All of the database meta information can be accessed through system views known as INFORMATION_SCHEMAs. There are two views that I used to get the information about my procedures that I wanted. They are the INFORMATION_SCHEMA.ROUTINES and INFORMATION_SCHEMA.PARAMETERS views.

I used the following query to get the meta information that I needed for my documentation;

[code:c#]

SELECT r.SPECIFIC_SCHEMA, r.SPECIFIC_NAME, r.ROUTINE_DEFINITION,

p.ORDINAL_POSITION, p.PARAMETER_MODE, p.PARAMETER_NAME, p.DATA_TYPE

FROM INFORMATION_SCHEMA.ROUTINES r

JOIN INFORMATION_SCHEMA.PARAMETERS p

ON r.SPECIFIC_SCHEMA = p.SPECIFIC_SCHEMA

AND r.SPECIFIC_NAME = p.SPECIFIC_NAME

WHERE r.ROUTINE_TYPE = 'PROCEDURE'

ORDER BY r.SPECIFIC_SCHEMA, r.SPECIFIC_NAME, p.ORDINAL_POSITION

[/code]>

I then used the following code to display the stored procedures in my database;

[code:c#]

## #SPECIFIC_SCHEMA#.#SPECIFIC_NAME#

The parameters and data types for the #SPECIFIC_SCHEMA#.#SPECIFIC_NAME# procedure are as follows;

4.  #PARAMETER_MODE#, #PARAMETER_NAME#, #DATA_TYPE#

Here is the transact-sql for the #SPECIFIC_SCHEMA#.#SPECIFIC_NAME# procedure.

<div class="solid"><pre>#ROUTINE_DEFINITION#</pre>  

</div>
[/code]>