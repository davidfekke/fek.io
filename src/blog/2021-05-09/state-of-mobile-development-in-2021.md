---
layout: post
title: "State of Mobile Development in 2021"
description: ""
category: 
date: 2021-05-09
cover_image: "./PhotoCollage.jpg"
---

Building apps for the iOS/iPadOS and Android platforms may seem daunting if you are new to mobile development, but there are many different options for developing thse apps that may suit your needs. In this post I will cover some of the options for developing mobile applications and the discuss the pros and cons for each of the different options.

# Cross Platform Frameworks

There are a number of different options for building mobile apps that are multi-platform that share code. One of the wishes of software engineers is the ability to build applications that are WORA, or Write Once/Run Anywhere. The Java platform was originally supposed to be a language and a system for writing your application once and running anywhere.

# Cordova

Cordova is a framework that sprang out of building applications using web technologies like HTML/CSS and JavaScript, and embeding the HTML app in a native container. This has been a huge boost to existing web front-end devlopers who where already knowledgable in web technologies. The native applications can be submitted to the individual app stores just like regular native applications.

### Pros
* Easy to transition if you are a existing web developer
* Many HTML and JavaScript frameworks built for mobile applications
* Easily add Plugins to utilize native functionality like Push Notifications

### Cons
* At the end of the day this is an Encapsulated WebView
* Because UI is built with Web Frameworks instead of native users make get a sense of uncanny valley
* Extending functionality requires knowledge of Objective-C and Java

## PhoneGap

Cordova is the open source project the sprung out of PhoneGap. PhoneGap was a commercial project that eventually was purchased by Adobe. Adobe has discontinued their investment in PhoneGap and Cordova. Cordova continues as a open source project.

## Ionic

Ionic is a framework built around Angular and Cordova. If you are familiar with the Angular ecosystem and like Cordova, this may a framework you may be interested in learning.

# Alternative WebView Development

I have some blog posts I have done on how to create your own webviews on the specific platform native. In this [post](https://fek.io/blog/you-do-not-need-cordova/) I describe how to use the WKWebView in iOS in a native iOS application without having to use Cordova. In a follow up [post](https://fek.io/blog/using-a-web-view-on-android-still-no-need-for-cordova) I show how to do the same thing in an Android application.

# Flutter

Flutter is another cross platform framework from Google. Unlike Cordova, Flutter does not use a WebView, but uses a common language for developing applications called Dart. Dart originally was targeted as an alternative to JavaScript. 

### Pros
* Build cross platform apps for not just Android and iOS, but many other operating systems
* Good tools for animation
* You can build applications with 'Widgets'
* Will be Fuscha compatibile

### Cons
* The main development language is Dart
* Some performance problems
* Not all natuve features available to Flutter developers
* Not many plugins for extendig functionality
* Difficult to make platform specific UI
* Not a muture technology

# Xamarin

Xamarin, now officially part of Microsoft and Visual Studio, this framework is based off of .NET and C#. If you are a .NET developer and unfamiliar with Java/Kotlin on Android and Swift/Objective-C on iOS, this may be the framework for you. You can build and structure your applications using Visual Studio solutions. In your solutions, you can divide your project into shared code projects, and individual projects for iOS and Android. This allows the developer to custom tailer their app to the specific UI of the platform they are targeting. It also allows the developer to share business logic for both platforms.

### Pros

### Cons

## Xamarin Forms
# React Native
# NativeScript
# Native
## CocoaTouch
### Objective-C
### Swift
## SwiftUI
## Android
### Java
### Kotlin
### Combine
# Game Development
## Unity
## MonoGame
# Conclusion