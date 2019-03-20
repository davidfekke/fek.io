---
layout: post
title: "Dependency injection in Javascript without objects"
description: ""
category: 
tags: expressjs Javascript node node.js DI Dependencey Injection
date: 2016-01-13
---


After programming in an object oriented way for 15 years, I am started to make the transition of programming in a more functional way 
with languages like Javascript and Swift. Javascript has always treated functions as first class citizens, and their is a movement in 
the Javascript community from developers such as Eric Elliot to never use the `new` keyword again.

I recently upgraded an express site from 3 to version 4. As part of that process I decided to refactor the code that called external 
services so they would be more testable and more loosely coupled. In languages such as Java and C# this can be achieved by using 
[dependency injection](https://en.wikipedia.org/wiki/Dependency_injection). 

In express it is actually very easy to inject functionality into a route. This can be done by either using middleware or 
injecting another function into a route.

~~~ javascript
var routes = require('./routes/index');

var exposeService = function(req, resp, next){
    req.service = require('./myservice');
    next();
};

app.use('/', exposeService, routes);
~~~

For one of the routes I needed to be able to inject two services that could be used by the route. In an earlier version of the 
combined service I created an object that had two properties that held references to other objects that had functions for 
returning the data I needed in my route. Here is how I intially wrote the service as an object.

~~~ javascript
"use strict";

// Creating function object
var Service = function Service(meetupdata, twitterdata) {
	this.Meetup = meetupdata;
	this.Twitter = twitterdata;
}

// Prototype function for getting the next meeting
Service.prototype.getNextMeetup = function getNextMeetup(cb) {
	this.Meetup.getNextMeetup(cb);
};

// Prototype function for getting the tweets
Service.prototype.getTweets = function getTweets(cb) {
	this.Twitter.getFeed(cb);
};

// factory function for creating a new version of the object
function create(meetupdata, twitterdata) {
	return new Service(meetupdata, twitterdata); 
}

module.exports = create;
~~~

While this worked, it turns out there is a much simpler and more elegant way of creating this service.

~~~ Javascript
"use strict";

function Service(meetupDataFN, twitterDataFN) {
	return {
        getNextMeetup: meetupDataFN,
        getTweets: twitterDataFN
    }
}

module.exports = Service;
~~~

In the current version of my service I am returning an object with two functions. Not only is this approach cleaner, 
it is also more functional. I am also just passing in functions instead of whole objects.