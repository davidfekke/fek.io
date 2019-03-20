---
layout: post
title: "Dealing with a rejection from the Apple App Store"
description: "A post I made to hashnode a couple of days ago about dealing with rejection from the iTunes Connect process"
category: 
tags: iOS Apple App Submission
date: 2016-09-06
---


![Image of Jekyll Logo](/assets/images/rejectionkitten.png)

*This article is reprinted from a post I made to [Hashnode](https://hashnode.com/post/dealing-with-a-rejection-from-the-apple-app-store-cisp16zu001284g53iqp3lu9d).*

I have been writing software for iOS since before it was the iOS, back when it was still called iPhone OS 2.0. Navigating the App Store approval process can be tricky, specifically when dealing with a rejected app.

Apple can reject an App for a lot of different reasons. After having gone through this process dozens of times, I thought I would share some insights about what to do when your app is rejected by Apple. I had an app I was working on rejected a couple of days ago, and I was able to get the App approved through Apple's "Appeal Board". 

The app I was trying to submit was rejected because Apple said it did not work on IPv6 WiFi networks. Apple began requiring that apps submitted to Apple back in July should run on IPv6 networks because a lot of cellular networks are switching IPv6 only. This makes sense because ICANN ran out of IPv4 IP addresses some time ago. If your app does not run on a IPv6 network, Apple will reject the app.

Our app did work on IPv6 networks, but Apple still rejected our app. How did this happen? It is because their is a flaw in Apple's WiFi testing network. You can read about it in this link [https://forums.developer.apple.com/thread/48314](https://forums.developer.apple.com/thread/48314). There is reference to an article on Apple's dev site on how to turn your Mac into a IPv6 WiFi router with NAT64 support. I used this to prove that our app ran on IPv6 networks.

## How to win an Appeal

Don't just re-submit your app! Apple provides a "resolution center" on iTunes Connect. In the resolution center you can reply to messages from Apple. Provide as much information to Apple as you can in your reply. You can even upload attachments. Apple also provides a link to "Appeal" the rejection for your app to Apple's review board. That sounds pretty bureaucratic, but Apple usually repsonds to your appeal within 24 hours. 

In our case, they requested that we add some additional information to the notes section in the metadata, which included a link to a video of our app working on an IPv6 network, and that we push the "Submit for Review" button in iTunes Connect. 

## The Basics of Submitting an App

The first thing I would recommend any developer do before submitting an App to Apple's App Store is read their [App Store review guidelines](https://developer.apple.com/app-store/review/guidelines/). Apple even released a comic book explaining the rules for Apple excepting an app. After reviewing our video, they accepted our app.

There are many different ways to create an App now. You can even pick your favorite programming language in a lot of cases. Some of these frameworks include PhoneGap, Cordova, Xamarin, Unity 3D, React Native, NativeScript and of course Apple's CocoaTouch framework. Apple used to be restrictive on anything outside of their own tools, but they have opened up the App Store to most of these different frameworks. That being said, make sure that if you do use one of these non-Apple frameworks that you still follow their guidelines. Apple does not want anyone running compilers on the iPhone or iPad. Even if you do build your application with CocoaTouch, that does not guarantee that Apple will not reject your app.

## App Completeness

Another reason Apple may reject your app is because of something they call "Completeness". This means they do not want you publishing an app that is buggy or crashes on startup. Other things you may also want to consider is if your app requires a login, make sure your provide Apple with a login and password they can use when they are reviewing your app. If you app requires a backend service, make sure that service is turned on. Most of this is common sense, but this a common gotcha that catches some developers.

## Content

Apple is sensitive to content you put on your app. Make sure you respect the copyright and IP laws of the country you plan on releasing your app. It is also important to make sure that your app is age appropriate for the age group your are targeting for your app. They want to make sure that parental controls will work correctly. It is also important that you select the correct category for your app. If your app targets business, make sure you select that as your category.

## Privacy

Respect your users privacy. Don't send data back about the users personal information without getting consent from that user. The scrutiny is amplified here if you are dealing with medical information or with children. There are also general privacy and HIPAA laws to take into account.

## Location

Using the GPS and other location based APIs on the phone can be expensive as far as battery use goes. I have had Apple reject an app update I made because they did not like the way I was using location in the background. In my situation, Apple recommended that we use geo-fencing, which is part of their location API.

## Metadata

This may sound trivial, but this is a common reason why Apple rejects a lot of apps, and that is because of incomplete or erroneous information supplied in the app's metadata. I had an update rejected because we mentioned a companion app in our description that ran on a competitor's operating system. I won't say which OS that is now, but I can tell you it is the most common mobile operating system in the world, and it is put out by a company whose name rhymes with "foogle".

## To Summarize

The app submission process to Apple can seem onerous at times, but Apple has gotten a lot better at this now. Phil Schiller took over the part of Apple that runs the App Stores, and the review times have dropped dramatically since he took over. It used to take two weeks for Apple to approve an app. That time is now down to about a day. 

Apple is about to release iOS 10 soon, so I am sure that these review times will go up again as developers race to get their apps ready for iOS 10, but the overall process seems to be a lot less painful now.

I love developing for iOS despite some of the hurdles that you have to jump through in dealing with the App Store. This should not prevent anyone who wants to develop an app for iOS from publishing on the App Store.