---
layout: post
title: "Fixing 'unstable indexes' on Oracle 10g database servers"
category: "Blog"
date: 2011-01-17
---


I work with an application that can update the database schema of on Oracle database. Sometimes when the application updates the database with a DDL script I will get an unstable indexes error.

Rebuilding indexes in Oracle can be done by using a PL-SQL script like the following;

[code:c#]

ALTER INDEX SCHEMA_NAME.INDEX_NAME REBUILD;

[/code]> If you need to rebuild every index at the same time, that can be accomplished by using a cursor such as the following

[code:c#]

DECLARE sql_str varchar2(1000);

cursor c1 is

select index_name

from user_indexes

WHERE index_name NOT LIKE 'SYS%';

BEGIN

FOR index_rec in c1

LOOP

sql_str := 'ALTER INDEX ' || index_rec.index_name || ' REBUILD';

EXECUTE IMMEDIATE sql_str;

END LOOP;

COMMIT;

END;

[/code]>