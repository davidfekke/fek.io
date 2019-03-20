---
layout: post
title: "How to Start a Node.js User Group"
description: ""
category: 
tags: node.js javascript community
date: 2017-03-09
---


### I started a Node.js User Group here in Jacksonville back in 2013, and I wanted to share my experiences about starting a Node.js User Group…

![Picture of JaxNode meeting from Feb. 2017](https://cdn-images-1.medium.com/max/2000/1*UaqHI0lPvnbcdnMuN5-C7A.jpeg)
##### February 2017’s JaxNode meeting with Brady Merkel speaking on Node 101 and mentoring

I started a Node.js User Group here in Jacksonville back in 2013, and I wanted to share my experiences about starting a Node.js User Group for anyone who has ever wanted to get one started in their community! FYI, the user group that was started is called [JaxNode](https://www.jaxnode.com). Come join us next time you are in the area!

## A Little Bit of My Background
Back in the summer of 2013, I became interested in learning more about Node.js. I had a side business where I was building native mobile applications for iOS and Android smartphones. My day job had been building ASP.NET web applications and web services. I was looking for a way I could build restful services for my mobile apps without having to run a Windows emulator since I was doing my mobile development on a Mac. This was pre .NET Core.

So I looked at the alternatives for doing backend service development that could be done on a Mac. I looked at Java, PHP, Python, Ruby and Node.js. I had some server experience with Java, but I was looking for something that did not require the overhead of using a compiler.

Node.js turned out to be a perfect fit for my needs. With Node’s evented IO, it had very quick startup times. My http requests took a few milliseconds to process as opposed to several hundred milliseconds with ASP.NET. There was also a huge open source community with tools and frameworks for building the applications and an amazing module ecosystem through npm (Node Package Manager).

Jacksonville has a great community of software engineers, and many programming User Groups, but none that were dedicated to Node.js or JavaScript. I had seen a few presentations on Node.js in Jacksonville, but no one had started a User Group just for Node.js.

The people were there, now we just needed to come together to learn more from each other around Node.js and JavaScript. If you find yourself in my same predicament and there is not a Node.js user group or JavaScript User Group in your community, then you should consider starting one. Here’s why and some suggestions on the how!

## Why Start a Node.js User Group?
User Groups are great not just for learning about new subjects and trends in software, but they are also a great place to network with other developers and companies with similar interests.

Node.js has a non-profit organization that supports, i.e.. The Node.js Foundation and companies that support it, but almost everything in Node.js is driven by the community. User Groups are a great way to help foster and support that community.

## Organizing your Node.js User Group
```javascript
const startNodejsGroup = () => {
    findPlaceToMeet();
    findSpeakers();
    reachOutToCommunity();
    scheduleMeeting();
    learnMoreAboutNodejs();
};
```

Ok, so now you have started your Node.js group, now what? How do you let the local community know about it, find a place to meet, and provide food and drinks for those meetings? The best suggestion is to use a site like [Meetup](https://meetup.com) or [Eventbrite](https://www.eventbrite.com) to organize your meetings and invite people to those meetings. Meetup does have a subscription cost, but if that is an issue, there are free alternatives like Facebook.

I used Meetup to start and advertise JaxNode. You also might want to create a website for your user group. It can be as simple as creating a GitHub pages site. GitHub provides free web hosting. I created an [open source web application](https://github.com/davidfekke/jaxnode) based on express that ties into Meetup’s API. It can also use the Twitter API. This site automatically displays the next meeting.

Once I started our Meetup group, a few companies here in town offered to provide a meeting room for free. Other companies also offered to provide food and refreshments at those meetings. Everything started to fall into place very quickly. If you cannot find a company or organization that will host your meetings, take a look at your local public library. Many libraries have meeting spaces that can be reserved.

Try to communicate with your users on a regular basis. Let them know about upcoming meetings, but don’t spam them. I try have future meetings topics posted at least a month out. I will send an email to my members the week of the meeting, and the day before the meeting as a reminder. Posting on you social media accounts is also important for getting the word out.

It is also important to meet on a regular basis, during the same time of the month, each month. JaxNode meets the third Thursday of the month.

Try to find volunteers to help run the group. Sharing responsibilities will help prevent you from burning out. Managing a User Group usually involves booking speakers, finding meeting locations and emceeing the meetings.

One of the challenges in running a user group is finding speakers and topics that can be discussed that will draw users to your meetup. Fortunately for us in the JavaScript community, there is no shortage of topics that can be discussed. npm now holds over 250,000 modules. That is a source of 250,000 topics that can be discussed. We have many speakers who have volunteered to speak at JaxNode, but I try to actively encourage members who have not spoken before to create presentations for our group.

Try to have some variety in your presentations as well. At JaxNode we have presentations on server-side web application frameworks, such as Express and Hapi; client-side frameworks like Angular and Ember. But, we have also have presentations on quirkier subjects like robots, and even how to write plugins to Photoshop using Node.js.

Soft skills are increasingly mentioned as an important skill for developers to have, and presenting a subject to a user group is a great way to develop those soft skills.

## Marketing your User Group
Besides getting setup on Meetup or creating a website, it is a good idea to create social media accounts on Facebook, Twitter and Linkedin. We also use our @jaxnode [Twitter](https://twitter.com/jaxnode) account to repost interesting articles and posts around the web on Node.js.

![JaxNode Logo based on the JS logo](https://cdn-images-1.medium.com/max/800/1*yHP35z-S7SrZcbkbV3HnhQ.png)

If you need a Logo, there is a great [repository](https://github.com/voodootikigod/logo.js) created by Chris Williams featuring the ‘JS’ against a yellow background. We took that original Logo, and created our own version with the JaxNode logo. There is a company called [Sticker Mule](https://stickermule.com) that makes stickers of your Logos. Those can be given away as swag at user group meetings. They help drive buzz about your group when people see your sticker emblazoned upon someone’s Laptop.

I also created a GitHub group just for our group so the members could fork their repos on presentations they have done at the group. I also put the source for our site [https://github.com/Jaxnode-UG/jaxnode](https://github.com/Jaxnode-UG/jaxnode) on our GitHub site as well.

The Node.js github site also has a repo for evangelism. You can list your group in the [Current Initiatives](https://github.com/nodejs/evangelism/blob/master/documents/local_initiatives/current-initiatives.md) by making a pull request to this repo for adding your group to the list of meetups. They have a good [article](https://github.com/nodejs/evangelism/tree/master/documents/local_initiatives) on this site explaining the format of the submission.

Make friends with the other User Group managers in your area. It is a great way to market your group and possibly find new members and speakers for your group.

## Planting the Seed
Just in the last month here in Jacksonville, a React](https://www.meetup.com/React-JAX) and [React Native](https://www.meetup.com/React-Native-Jax) user group was started by members who have attended our meetings. This is one of the things that I have been happiest about in starting JaxNode. We had several meetings on React, and now we have two new user groups in Jacksonville dedicated to React.

I have to admit, the main reason I started a Node.js User Group was a selfish reason. I wanted to see other companies here in Jacksonville start to adopt Node and other JavaScript technologies. I knew that creating new opportunities for Node.js in Jacksonville would also help me in my career. The side benefit is that it has also helped other people get the opportunities that they wanted as well.

So what are you waiting for? Start that Node.js and JavaScript user group in your area. And if you need any help on the way, feel free to contact me at @jaxnode or @davidfekke on Twitter.
