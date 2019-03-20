---
layout: post
title: "Enterprise Library Oracle and SQL Server Parameter Tokens"
category: "Blog"
date: 2011-01-17
---


I have been using the DAAB part of the Enterprise Library at my current job. One of the advantages of using this library is that you can write ANSI standard SQL, and it should work with any Relational Database.

The problem with this is that if you want to use parametrized queries, T-SQL and PL-SQL use different prefixes in front of the parameters. SQL Server uses '@' symbols in front of the parameter names, and Oracle uses ':' in front of their parameters. So how can you write Ad hoc queries that will run on both SQL Server and Oracle. I have written a class that will set the parameter tokens automatically based on your database context.

[code:c#]

using System;

using System.Collections.Generic;

using System.Linq;

using System.Text;

using Microsoft.Practices.EnterpriseLibrary.Data; 

namespace MyDataAccessNamespace

{

public class DAABDbTokenSetter

{

public static string CreateParam(Database db, string parameterName)

{

string TokenPrefix = "";

string DatabaseType = db.DbProviderFactory.ToString();

if (DatabaseType == "System.Data.SqlClient.SqlClientFactory")

{

TokenPrefix = "@";

}

else if (DatabaseType == "System.Data.OracleClient.OracleClientFactory")

{

TokenPrefix = ":";

}

else

{

TokenPrefix = "";

}

return TokenPrefix + parameterName;

}

}

}

[/code]>

This class can be used in your ad hoc queries in the following way to set the tokens;

[code:c#]

string myquery = "select firstname, lastname " +

"from customertable " + 

"where customerid = " + DAABDbTokenSetter.CreateParam(db,"customerid")

[/code]>