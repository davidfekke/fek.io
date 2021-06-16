---
layout: post
title: "Using Postgres and TimescaleDB with Node.js series: Part 3"
description: ""
category: 
date: 2021-06-16
cover_image: "../2021-06-09/wolfgang-hasselmann.jpg"
---

This is part three of a series of posts I am doing on using Postgres and TimescaleDB with Node.js.

In the previous posts I discussed how setup a dev instance of Postgres or TimescaleDB with Docker, and connect and query data from Node.js.

In this post we discuss TimescaleDB, and how to use it as an extension of Postgres.

## TimescaleDB

TimescaleDB extends the functionality of Postgres by allowing a high volume of inserts and queries across a horizontally scalable version of Postgres. It does this with a new table type called a 'Hypertable'.

Hypertables are partitioned into 'chunks'. Chunks are created by partitioning the hypertable based on values belonging to time column. Chunks are created automatically as data is added to the hypertable. TimescaleDB automatically determines the size of the chunk based on data being inserted over time.

Hypertables can also be partitioned by an additional column. These are called 'time and space' partitions. 'Time and space' partitioning are known as distributed hypertables. In this two dimensional partitioning hypertables are partitioned over separate nodes.

Each chunk uses a standard database table, but these tables are child tables of one parent table. 

## Conclusion

Both TimescaleDB and Postgres solve many of the issues that prevented application developers from using relational databases in their solutions. Relational databases can scale and perform in modern scalable cloud based architectures.