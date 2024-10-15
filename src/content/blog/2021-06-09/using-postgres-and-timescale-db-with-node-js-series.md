---
title: "Using Postgres and TimescaleDB with Node.js series"
description: ""
category: 
date: 2021-06-09
tags: ["Postgres", "SQL", "TimescaleDB", "Node.js", "Docker"]
cover_image: "./wolfgang-hasselmann.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/dr3ILUGwFEA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

This is part one of a three part series on using [Postgres](https://www.postgresql.org/) DB with [Node.js](https://nodejs.org).

### Prerequisites

To use the examples in this post you will need to have the Docker client and Node.js installed on your computer.

## Postgres

I am going to be giving a presentation next week and using Postgres SQL and TimescaleDB with Node.js for the JaxNode user group. If you are not familiar with Postgres, it is a relation database server that is very popular in the open source world, but also used heavily by large organizations. Whether you are large or small, you can use Postgres. There are Postgres services that are available on most of the large cloud providers.

To understand what a relation database is and how we can use it in our applications we need to understand what a relational database does. At the end of the day all a database is a piece of software that lets' us persist data onto non-volatile memory, and query the data back quickly in our applications. Non-volatile memory can be anything from flash memory to a large drive array. 

## NoSQL vs SQL Databases

Postgres is a SQL database, or Structured Query Language database. SQL is an industry standard for a query language. There are many of other types of databases including graph databases, document databases and column stores. There are many reasons why you may want to use a NoSQL database, but the main reason might be scalability. While NoSQL database in many cases might be more scalable, they tend not to be as consistent as a SQL database because of the nature of how they store data. The nice thing about about Postgres is that it offers features that can be found in both types of database systems.

## Developing with Docker

You have to option to install Postgres on whatever machine you are developing on, or even a server, but I like to use Docker. You can install the [Docker client](https://docs.docker.com/get-docker/) by going to [Docker.com](https://docker.com), and downloading the docker installer.

To run this project you will need to have Node.js and Docker installed on your computer. These examples require a TimescaleDB database. TimescaleDB is an extension to the Postgres database.

1) Add a directory to your local file system for storing the data. On my system I created one called `timescale-data`.

```bash
> mkdir ${HOME}/timescale-data
```

2) Run the following command in your terminal to start a local instance of TimescaleDB

```bash
> docker run -d --name dev-timescaledb -e POSTGRES_PASSWORD=password -v ${HOME}/timescale-data/:/var/lib/postgresql/data -p 5432:5432 postgres
```

This will have started a local instance of TimescaleDB. 

3) Now check and see if TimescaleDB is running. Run the following command;

```bash
> docker ps
```

This will list all running instance on your docker machine.

4) Stop the docker instance by using the following command;

```bash
> docker stop dev-timescaledb
```

5) To view your local image of this in docker use the following command;

```bash
> docker ps -a
```

6) Start the instance back up by using the following command;

```bash
> docker start dev-timescaledb
```

7) Enter into the TimescaleDB container by typing in the following command;

```bash
> docker exec -it dev-timescaledb psql -U postgres
```

8) Create a database in postgres that we can use for our data by entering the following command into your container;

```bash
postgres=# create database etfdb;
\c etfdb;
```

You have now created a database called `etfdb`. All of our tables and queries will be using this database. 

Add the following tables to your `etfdb` database;

```sql
CREATE TABLE stock (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    exchange TEXT NOT NULL,
    is_etf BOOLEAN NOT NULL
);

CREATE TABLE mention (
    stock_id INTEGER,
    dt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    message TEXT NOT NULL,
    source TEXT NOT NULL,
    url TEXT NOT NULL,
    PRIMARY KEY (stock_id, dt),
    CONSTRAINT fk_mention_stock FOREIGN KEY (stock_id) REFERENCES stock (id)
);

CREATE INDEX ON mention (stock_id, dt DESC);
```
## Populating the Tables

I have some data that you can use to populate your tables in the following github repo.

https://github.com/davidfekke/wallstreetbets

To create the stock records, run the following nodejs script;

```bash
> git clone https://github.com/davidfekke/wallstreetbets && cd wallstreetbets
> npm install
> node importstocks.js
```

You now have the working data to run the main index.js example.

# Conclusion

From this first post we can see it is very easy to install and get Postgres running on your development machine. Over the course of our next few posts we will write data to the database and query data back.