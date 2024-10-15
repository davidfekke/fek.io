---
title: "Why all Developers most know SQL"
tags: ["SQL", "Development"]
description: ""
category: 
date: 2022-05-17
cover_image: "./sqlsaturday.jpg"
---

I spent last Saturday going to the 2022 SQL Saturday event here in Jacksonville, FL. You can think of this event as a conference in a day, where system admins, developers and Devops workers get together to learn more about Microsoft SQL Server.

Microsoft SQL Server was the first enterprise relational database I worked with as a programmer. Sql Server like many other relational database systems share something in common, and that is the Structured Query Language.

Back in 2003 I went to a big box store to buy a laptop that was powerful enough to run SQL Server. This was long before Docker. The salesman at the store asked me what I was planning on using the laptop for, and I told him I was planning on using it to run SQL Server. He told me that he had recently graduated from a college with a degree in computer science, and now he wanted to learn SQL. I was shocked that they did not teach any SQL databases in his course work, but I have heard this from other computer science students since.

No matter what type of development you wind up doing, their is a good chance that you will have to work with some type of database. Data does not have much value if it can not be persisted. The statistic I heard at the time was that over 50% of development jobs required the use of some sort of database.

## Relational Database Drawbacks

As great as relational databases are, they do have some drawbacks. One of the drawbacks is that they can be difficult to scale. Scaling most relational databases used to mean scaling vertically, meaning that because of having data consistency, all data had to be persisted on some sort of disk or volume. There are tricks that some vendors and projects have used to make these databases scale.

One of the methods is to use database mirroring or clustering, where data can be copied from disk to another for the same database. While this method offers failover reliability it still means using a server or service that can be a single point of failure.

Another method that can be used is database sharding. Sharding a database can be as simple as breaking a database over several servers. So for example if you had a database of users, you could break the users up over several database servers where users that had a name that started with the letters A-H where on one server, and users whose name started with letters I-Z where on another server.

## NoSQL Databases

There are a number of non-relational databases that are offered as a service or as a standalone service. They usually belong to one of the following three categories, Big table, Graph and Document databases. These databases tend to be performant, but may not offer ACID compliance that relational databases tend to offer.

ACID compliance usually means that your database server offers the following features - atomicity, consistency, isolation and durability. In a nutshell this means that you data can be relied upon to be consistent even though multiple processed may all be trying to write to the same data at the same time. Having this kind of reliability also makes it hard to scale.

Most NoSQL database servers do not offer all, but may offer a lot of the features available in ACID compliant database servers.

### Document databases

![Mongo](./Mongo1.jpg.d32a8e4498747dacce2209f3798d077f.jpg)

There are a number of different document databases that are available. On of the most popular is one called [MongoDB](https://www.mongodb.com/). Mongo databases store their data as documents in a JSON format. Unlike relational databases where you would store orders and line items in a separate tables, you can store on order in a single document. This allows data to maintain it's original structure without having to break it up into smaller pieces. 

### Graph databases

Graph databases like [Neo4J](https://neo4j.com/) allow object relationships to be stored. If you think of a website like [Facebook](https://meta.com) or [Linkedin](https://linkedin.com) as an example, users have to maintain a relationship with other users, and possibly to users that are connected to those users. 

### Big table

Big table databases like [Cassandra DB](https://cassandra.apache.org/_/index.html) can store large amounts of data and are highly scalable. Many cloud services like AWS and Azure offer some type of database service that is based on this type of database. AWS's DyanamoDB is a key value store like Cassandra that can store lots of data, and is highly scalable.

These databases while be fast and large have the drawback of not being relational. This means if you want to relate data from two different stores, this can be a slow an expensive operation.

## Modern Database servers

While NoSQL databases have attractive features, if you look at most modern SQL database platforms you will find that they offer similar features and capabilities to the NoSQL alternatives. Database servers like Microsoft SQL Server and Postgres offer developers features for storing documents similar to Mongo and graph data like Neo4J.

They also allow developers to index this type of data for fast querying. There are even forks like TimeScaleDB that allow for the creation of large datasets based on time series data.

Another nice feature of SQL database servers is that they share a common language, SQL. Pronounced Sequel, SQL stands for the structured query language, and is based on a standard that vendors adopt when creating their servers. ANSI standard SQL statements can be used that are vendor agnostics, meaning that you can possible reuse the same query on database software from different vendors. While this may be difficult to achieve in practice, if you learn SQL for one vendor, it is pretty easy to write SQL for another vendor.

```sql
SELECT *
FROM users
WHERE clue > 0
```

The following SQL statement would return all columns from a table called `users` where the value in the column `clue` was greater than zero for that row in the table. This query could in theory be run against any database server that can execute ANSI SQL.

## Data persistence in Modern Application Design

In modern scalable applications, it is becoming increasingly unlikely to use one type of database or data persistence. A modern server application may be use a front side key value store like Redis, an event processing store like Kafka, a search server like [Elasticsearch](https://www.elastic.co/) and any number of NoSQL databases in addition to a relational database.

Patterns like CQRS (Command Query Responsibility Separation) also make it easier to scale applications. By separating events into commands (write operations) and queries (query or read operations). Using this pattern we can break an application up into commands which change the state of our data and queries that simply read data. This pattern lends towards event sourcing, where changes to the state of our data can eventually make it into a relational database system.

This is really not that different from how a lot of organizations used to create different databases for transaction systems and reporting systems. A lot of the production databases I used to use would only have three to six months worth of transactional data. We would use ETL (Extract Transform and Load) procedures to create a separate reporting database.

## Conclusion

I used to think that relational databases would be phased out by newer NoSQL databases. It has become clear to me now that a lot of the features that are in NoSQL databases have made their way into relational database systems. It is now possible to have the best of both worlds by using modern relation database servers with the newer NoSQL features like document storage and graph modeling.

It is worth taking the time to learn the structured query language. Once you have learned SQL, this knowledge can be applied to a lot of different software that use some form of SQL.
