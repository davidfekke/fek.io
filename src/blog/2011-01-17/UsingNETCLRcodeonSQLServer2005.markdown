---
layout: post
title: "Using .NET CLR code on SQL Server 2005"
category: "Blog"
date: 2011-01-17
---


I went to a presentation last night at the Jacksonville SQL Server user group on using .NET CLR code in SQL Server 2005\. One of the neat features in SQL Server 2005 is the ability to write user defined functions, aggregate functions and stored procedures in .NET code. The examples they used included doing triple DES encryption and spherical trigonometry to calculate distances between latitude and longitude in SQL queries.

They accomplised this by writting functions in C# assemblies, and adding those assemblies to the SQL Server.

The bottom line is there are some things that are faster to do in the CLR than in T-SQL, and some things that are faster to do in T-SQL than in the CLR. 

Complex math and string functions would most likely be faster in the CLR, but set based computing would be faster in transact.