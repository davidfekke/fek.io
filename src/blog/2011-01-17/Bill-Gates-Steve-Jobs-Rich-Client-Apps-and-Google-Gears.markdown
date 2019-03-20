---
layout: post
title: "Bill Gates, Steve Jobs, Rich Client Apps and Google Gears"
category: "Blog"
date: 2011-01-17
---


I was watching some of the interview with Steve Jobs and Bill Gates interview yesterday from the D5 conference. Bill and Steve got a question if Mac OS X and Windows applications are dinosaurs compared to new browser based applications.

Steve Jobs made a point that he thought there is room for these applications that are made to run on the desktop, but can use Internet base services. He gave an example of a Google Maps application that runs on the iPhone. He said it works better than any browser based application. They showed vision about the idea that there is room for hybrid rich client applications that use web services.

At the same time Google has released a browser plugin called 'Gears'. Gears is still in pre-release, but it has a local server, a database and messaging components. This allows developers to write disconnected applications. It is my understanding that some of these components are being included in Adobe Apollo. The database component is based on SQLite, which is the same engine used by Mac OS X for searching. It is an extremely lite weight database engine, and can be accessed with JavaScript.

[code:c#]

resultSet = db.execute (

'INSERT INTO MYTABLE VALUES (?, ?, ?) WHERE id=?',

[1, 2, 'three four', 5]

);

[/code]>

Apollo, Silverlight and Gears all important parts of building these types of applications that use Internet based web services.