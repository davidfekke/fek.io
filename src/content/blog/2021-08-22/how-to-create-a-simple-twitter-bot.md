---
title: "How to create a Simple Twitter Bot"
description: ""
category: 
tags: ["JavaScript", "Bot", "Twitter", "Node.js"]
date: 2021-08-22
cover_image: "./adam-lukomski-robot.jpg"
---

One of the many popular applications that can be written using JavaScript and Node.js is a Bot. Bots can be thought of simple applications that can be used to advertise or respond to users on chat services, social media platforms and team communication software. 

Some services heavily rely on Bots while others outright ban Bots when they are encountered. But Bots can be used for good as well as evil. Bots can also be used with some sort of AI for interacting with users. You might have encountered this on some websites when a chat window will open asking if it can assist you.

For this post I am going to create a Bot to answer simple questions about a meetup group. This meetup group has a Twitter account which I will use to respond to questions on Twitter.

## Creating the Application

To create this Bot I am going to use Node.js and a node module called `twit`. You can install this into your Node application by using the following NPM command;

```bash
npm install twit --save
```

Twit is a module for using Twitters API. To use Twitter's API you will need to [register](https://dev.twitter.com/apps/new) an app. Twitter needs the following keys in order to be able to interact with their API. Those keys are as follows;

* consumer_key
* consumer_secret
* access_token
* access_token_secret

Once you have these keys, make sure you keep these keys in a safe place, otherwise you will need to regenerate your keys. You can either store these in a dotenv file or add them to your environment variables.

## Configuring our Bot

To create our Bot the first thing we will need to do is configure `twit` to use our keys. 

```javascript
import twit from 'twit';

const config = {  
    consumer_key: process.env.twitter_consumer_key,  
    consumer_secret: process.env.twitter_consumer_secret,
    access_token: process.env.twitter_access_token,  
    access_token_secret: process.env.twitter_access_token_secret
}
  
const Twitter = new twit(config);
```

Now that we have configured our application to use our keys, we are going to use Twitter's stream API. With the stream API we can listen for certain words or hashtags. For our meetup application I am going to listen for the name of my meetup group, JaxNode.

```javascript
const stream = Twitter.stream('statuses/filter', { track: ['jaxnode'] }); 

stream.on('tweet', function (tweet) {
    console.log(tweet);
});
```

The code example above filters the stream to listen for the `jaxnode` keyword. Anytime someone tweets a tweet with that keyword, we can use the `on('tweet')` event to capture those tweets in realtime. For our application we will respond to any tweet that contains one of the following words in tweets in our filtered stream, what, where and when. To do this I will take the text of the tweet, and turn it into an array, and filter for one of those determiners.

```javascript
stream.on('tweet', function (tweet) {    
    const tweetwords = tweet.text.split(' ');
    const hasWhat = tweetwords.filter(w => w.toUpperCase() === 'WHAT');
    if (hasWhat.length > 0) {
        // respond with an answer
    }
});
```

## Using the Meetup API

To answer questions about our next meeting, we will use meetup's API to lookup the latest information about our next meeting. We can use the `axios` http client to retrieve information back from Meetup.

```javascript
async function getNextMeetingInfo() {
    const result = await axios.get('https://api.meetup.com/Jax-Node-js-UG/events?page=2');
    return result.data[0];
}
```

This API returns a JSON array with all of the upcoming events for our meetup group. To answer any tweets with `what` we will assume the user want to know what the next meeting will be about. There is a `name` property in the object that is returned. We will use the name to answer the `what` question. 

To reply with a tweet, we will use another part of the twitter API to send tweets. To do this we will create the following function;

```javascript
function tweetNow(tweetTxt) {  
    const tweet = {
        status: tweetTxt
    }
    Twitter.post('statuses/update', tweet, function(err, data, response) {
        if (err) {
            console.log('Error in Replying');
            console.error(err);
        } else {
            console.log('Tweet sent successfully');
        }
    });
}
```

Now we can complete our bot logic by constructing a reply and tweeting out an update.

```javascript
stream.on('tweet', async function (tweet) {    
    const tweetwords = tweet.text.split(' ');
    const hasWhat = tweetwords.filter(w => w.toUpperCase() === 'WHAT');
    if (hasWhat.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const eventname = nextMeetingInfo.name; 
        const nextMeetingTopic = `@${tweet.user.screen_name} The next meeting is on '${eventname}'`;
        tweetNow(nextMeetingTopic);
    }
});
```

Now we can add the logic to answer all three of our questions for our `what`, `where` and `when` questions.

```javascript
stream.on('tweet', async function (tweet) {    
    const tweetwords = tweet.text.split(' ');
    const hasWhat = tweetwords.filter(w => w.toUpperCase() === 'WHAT');
    if (hasWhat.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const eventname = nextMeetingInfo.name; 
        const nextMeetingTopic = `@${tweet.user.screen_name} The next meeting is on '${eventname}'`;
        tweetNow(nextMeetingTopic);
    }

    const hasWhen = tweetwords.filter(w => w.toUpperCase() === 'WHEN');
    if (hasWhen.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const time = nextMeetingInfo.time;
        const date = new Date(time);
        const eventDateAndTime = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"});
        const neetMeetingTime = `@${tweet.user.screen_name} Our next meeting will be on ${eventDateAndTime}`;
        try {
            tweetNow(neetMeetingTime); 
        } catch (err) {
            console.error(err);
        }
    }

    const hasWhere = tweetwords.filter(w => w.toUpperCase() === 'WHERE');
    if (hasWhere.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const venue = nextMeetingInfo.venue;
        const maplink = `We meet at ${venue.name} https://www.google.com/maps/place/${venue.name}/@${venue.lat},${venue.lon},15z`;
        try {
            tweetNow(`@${tweet.user.screen_name} ${maplink}`);  
        } catch (err) {
            console.error(err);
        }
    }
});
```

## Hosting your Bot

There are a couple of options for hosting your Bot. If you have an existing Node.js server, you can run your b=Bot there, but you can also host using a service like Zeit or Heroku. These cloud application servers generally require an http listener in order to host your Bot. We can accomplish this by adding the following line to the end of our Bot;

```javascript
require('http').createServer().listen(3000);
```

Our final Bot should look like the following when we our completed;

```javascript
import twit from 'twit';
import axios from 'axios';
import http from 'http';

const config = {  
    consumer_key: process.env.twitter_consumer_key,  
    consumer_secret: process.env.twitter_consumer_secret,
    access_token: process.env.twitter_access_token,  
    access_token_secret: process.env.twitter_access_token_secret
}
  
const Twitter = new twit(config);

async function getNextMeetingInfo() {
    const result = await axios.get('https://api.meetup.com/Jax-Node-js-UG/events?page=2');
    return result.data[0];
}

function tweetNow(tweetTxt) {  
    const tweet = {
        status: tweetTxt
    }
    Twitter.post('statuses/update', tweet, function(err, data, response) {
        if (err) {
            console.log('Error in Replying');
            console.error(err);
        } else {
            console.log('Tweet sent successfully');
        }
    });
}

const stream = Twitter.stream('statuses/filter', { track: ['jaxnode'] }); 

stream.on('tweet', async function (tweet) {    
    const tweetwords = tweet.text.split(' ');
    const hasWhat = tweetwords.filter(w => w.toUpperCase() === 'WHAT');
    if (hasWhat.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const eventname = nextMeetingInfo.name; 
        const nextMeetingTopic = `@${tweet.user.screen_name} The next meeting is on '${eventname}'`;
        tweetNow(nextMeetingTopic);
    }

    const hasWhen = tweetwords.filter(w => w.toUpperCase() === 'WHEN');
    if (hasWhen.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const time = nextMeetingInfo.time;
        const date = new Date(time);
        const eventDateAndTime = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"});
        const neetMeetingTime = `@${tweet.user.screen_name} Our next meeting will be on ${eventDateAndTime}`;
        try {
            tweetNow(neetMeetingTime); 
        } catch (err) {
            console.error(err);
        }
    }

    const hasWhere = tweetwords.filter(w => w.toUpperCase() === 'WHERE');
    if (hasWhere.length > 0) {
        const nextMeetingInfo = await getNextMeetingInfo();
        const venue = nextMeetingInfo.venue;
        const maplink = `We meet at ${venue.name} https://www.google.com/maps/place/${venue.name}/@${venue.lat},${venue.lon},15z`;
        try {
            tweetNow(`@${tweet.user.screen_name} ${maplink}`);  
        } catch (err) {
            console.error(err);
        }
    }
});

http.createServer().listen(3000);
```

## Conclusion

I think it is important to remember that these Bots should be used for good purposes. Most online services will try to prevent you from spamming their users. Try to be respectful of the other users that share your platforms.

These Bots can be extremely useful, and when coupled with AI can be very powerful.