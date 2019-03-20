---
layout: post
title: "How to upload legacy DTS Packages into a SQL Server 2005 server"
category: "Blog"
date: 2011-01-17
---


I am working on project to migrate some existing DTS Packages that were created in SQL Server 2000 over to SQL Server 2005\. I have been trying to use SQL SMO, which is the prefered Microsoft way to script and program SQL Server. SMO does have a way to import SSIS packages to SQL Server 2005, but it will not work with the older DTS packages.

Buck Woody at Microsoft pointed me in the right direction on how to get this working. SQL DMO is the old COM library for scripting and programming SQL Server. The SQL DMO library still works with SQL Server 2005\. I created a C# app to import a SQL Server 2000 structured storage file into the 2005 server. 

The first thing I did was add a reference for the Microsoft DTSPackage Object Library in the list of COM objects.

I then used the following code to import the DTS file into the SQL Server;

[code:c#]

string package = @"C:\DTSTest\ImportSample.dts";

object pVarPersistStgOfHost = null;

DTS.Package myPackage = new DTS.Package();

myPackage.LoadFromStorageFile(package, "", null, null, null, ref pVarPersistStgOfHost);

myPackage.SaveToSQLServer("10.25.15.0", null, null, 

DTSSQLServerStorageFlags.DTSSQLStgFlag_UseTrustedConnection, 

null, null, null,

ref pVarPersistStgOfHost, false);

`
You will need to add some additional code to unmarshall DTS.Package object.`