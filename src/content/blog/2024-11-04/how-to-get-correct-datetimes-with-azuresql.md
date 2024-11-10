---
title: "How to Get Correct Datetimes with Azure SQL"
tags: ["Azure SQL", "Azure", "T-SQL"]
description: "How to Get Correct Datetimes with Azure SQL"
category: 
date: 2024-11-04
cover_image: "./azure-sql-datetime.png"
---

I recently ran into an issue with trying to return the correct datetime for comparison using Azure SQL Database. I have used Microsoft SQL Server for most of my career, but until this year I had never used Azure SQL Database.

Azure SQL Database has a lot of similarities with the on premise version of SQL Server, but since this service is hosted on Azure there are some differences. The issue I ran across recently had to do with the `GETDATE()` and `GETUTCDATE()` functions.

In the Azure version of SQL both functions will return the same value, which is UTC time. The time zone I am working in is the US Eastcoast time zone, which runs five hours behind UTC time, and four hours during daylight saving time.

I needed to be able to return records for upcoming events that will occur after the current time, but I was having to apply a `DATEADD()` function to get the correct time. I had this query in a stored procedure, 
so I needed have this work no matter if it was daylight saving time or not.

It turns out that SQL has a nice feature for getting the datetime for the correct time zone.

Let us say we have a query that returns events from a table called `MyEvents`, and there is a column for storing the `ScheduledEvent` as a DATETIME. Normally we could return future records with a query like the following:

```sql
SELECT Title, ScheduledEvent
FROM MyEvents
WHERE ScheduledEvent > GETDATE();
```

The problem with this query is it will always return records for five or four hours off of the currect time because `GETDATE()` returns the same date as `GETUTCDATE()`. The reason for this is that the cloud servers may be in a specific time zone, but Azure will always set the time on their servers to UTC time. 

We can adjust our query by using `AT TIME ZONE` and the actual time zone after the function in our SQL query. Here is an example of the same query, but using these time adjustment keywords:

```sql
SELECT Title, ScheduledEvent
FROM MyEvents
WHERE ScheduledEvent AT TIME ZONE 'Eastern Standard Time' > GETUTCDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'Eastern Standard Time';
```

If we look at the previous query we can see we are using `AT TIME ZONE` syntax after both DATETIME values. GETUTCDATE() AT TIME ZONE 'UTC': Converts the current UTC time to a datetimeoffset value.
The AT TIME ZONE 'Eastern Standard Time' Converts the UTC datetimeoffset value to Eastern Time (either EST or EDT, depending on the date).

## Conclusion

SQL Server and Azure SQL Database are both modern and conveinent database products. Using these time zone features in our queries will make it easier to know we are getting the correct time results.
