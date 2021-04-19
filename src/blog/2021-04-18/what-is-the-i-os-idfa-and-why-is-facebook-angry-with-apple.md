---
layout: post
title: "What is the iOS IDFA, and Why is Facebook angry with Apple?"
description: ""
category: 
date: 2021-04-18
cover_image: "./unnamed.jpg"
---

Apple will be releasing OS updates for most of their mobile devices pretty soon. There is a change that has ruffled the features of a lot of people in the online Advertising industry.

The issue revolves around an API that Apple has for iOS called the Advertising Identifier, or IDFA for short.

The IDFA is used by advertisiers to tie advertising campaigns back to a specific device. This is very similar to how they track users with cookies on certain browsers. I say certain browsers because Apple's Safari and Brave have blocked this type of tracking. This is why when you are searching for a certain product or service on one page, and then you browse to another website you will sometimes see ads for what you were just searching. Advertisers are doing this mainly so they can tie campaigns and their success to the users viewing the ads.

For mobile app developers like Facebook, they sell advertising campaigns for other mobile apps. If a user installs a mobile app based on an ad campaign they saw on Facebook, the aThey use the IDFA to tie the device back to the camp

```swift
let idfa = ASIdentifierManager.shared().advertisingIdentifier
```