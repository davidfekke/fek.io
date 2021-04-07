---
layout: post
title: "You do not need Cordova"
description: ""
category: 
date: 2021-04-07
cover_image: "./alex-bracken-unsplash.jpg"
---

You you use a WebView or have a native mobile app using Cordova or Ionic, you may not need it for your app. If you are not familiar with Cordova, it is a open source framework for building native mobile apps using HTML, CSS and JavaScript.

![We don't need no Stinking Cordova](../../../static/stinking.cordova.jpg "Stinking Cordova")

Some Cordova apps just use local content in the app, while some point to a remote endpoint. Either way the same thing can be accomplised fairly simply in a native mobile app using the native WebView components. Both iOS and Android have native components that can be used for displaying Web content. For this post I will show how to do this with Swift on iOS using the WKWebView.

# iOS WebViews
iOS actually has three different WebViews you can use, but one of these is deprecated. The original framework for displaying web content was the 'UIWebView'. This WebView was slow, and not optimized like the browser built into Safari. Apple introduced the 'WKWebView' in iOS 8, and has made substantial improvements every year.  