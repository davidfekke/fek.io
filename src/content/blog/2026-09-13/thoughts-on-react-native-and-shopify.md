---
title: "Thoughts on React Native and Shopify"
tags: ["Node.js"]
description: "Thoughts on React Native and Shopify"
category:
date: 2026-09-13
cover_image: "./thoughts-on-react-native-and-shopify.png"
---

If you have been living under a rock for the last week, you might have missed a blog [post](https://shopify.engineering/shop-app-migration) from Shopify announcing that they were moving their apps from React Native to native. These types of posts get lots of attention because they tend to be very controversial.

The gist of the post is that Shopify is using AI coding agents to help them move from React Native apps to native apps on iOS and Android.

Before I dive too deep into this, it might help to know a little about my background as a mobile developer. In 2016, I was working as a .NET developer. I had been building iOS apps outside of my day job and was offered a job as an iOS architect at a small software company in Florida. Back then, we developed our applications natively as Objective-C apps on iOS and Java apps on Android. At that time, we took a look at React Native and decided that it was not mature enough as a cross-platform framework for our apps.

Not too long after this, in 2017, Airbnb published a series of blog posts on why they were switching from React Native to native apps. Airbnb had been one of the largest sponsors of React Native, and these posts created huge blowback that caused the React Native community to re-architect React Native. Over the next five years, they introduced the `new architecture`, the Hermes JS runtime, and Fabric. Without getting into details, these were huge improvements to React Native that improved the performance of apps using the framework.

Around 2022, the company I was working at started looking at React Native as a way of writing certain portions of our application cross-platform while leaving most of our apps purely native in Swift and Kotlin. While researching how to get this working, I made a [video](https://fek.io/blog/how-to-add-react-native-to-an-existing-i-os-app-in-2022/) on how to add React Native to native apps.

After publishing this video, I was offered a job at a Silicon Valley company to help them integrate native apps with React Native. Even though I had spent most of my career as a mobile developer building purely native apps, I became labeled a `React Native` developer.

In most larger organizations that do mobile development, you usually have teams of developers who work on mobile apps. When I was working on mobile, I generally worked with either an iOS or Android team. At one company, we had a React Native team that worked on a cross-platform app, but everyone else worked on a team for a specific operating system.

After 2022, when recruiters looked at my resume, they often assumed that I was a React Native developer, but for most of my mobile career, I have worked on native apps.

## React Native advantages

Before getting too deep into React Native, I want to state that I am a huge fan of React. For most of my career, I have worked on either backend servers or web applications. I am also a huge fan of JavaScript and TypeScript. That being said, React Native is a different animal. There are technical issues you run into with React Native that you do not run into when using only React or Next.js.

React Native excels in a couple of different areas. If you have developers who know React, it is very easy for them to contribute to a React Native application.

Another area where React Native shines is the rapid development of cross-platform prototypes. You can have one team build a single app that runs on both iOS and Android. Many startups build their first prototypes using React Native.

Another feature that attracted me to React Native was over-the-air updates. It is possible to update the JavaScript bundle and push that bundle out to users without having to do an app store deployment. Both Google and Apple have a review cycle that developers use when they release native apps. At one company I worked at, we would sometimes push three over-the-air updates a day, which was not necessarily a good idea.

React also has a feature called HMR (Hot Module Replacement) that automatically updates components while the developer is making edits. This can accelerate development when using React. 

## Now for the disadvantages

React Native is a huge pain to maintain. Sorry, it is. Most React Native apps have native components that are maintained by third parties. When I say maintained by third parties, they may not actually be maintained at all. If you import a third-party component into a React Native app, it is a good idea to make sure it is supported by that third party. It is very common in React Native for an individual developer to build a component, publish it to npm, and never update it again.

There are some good examples of companies that do a good job of supporting third-party components. Expo does a great job of supporting native features, such as the camera.

Framework upgrades are another source of frustration. The React Native framework itself has a new minor release every 51 days. That might not seem like a lot, but even after 10 years, React Native is not on a 1.0 release. At the time of this writing, it is still at 0.87.

You have to stay on top of these React Native releases, or your app will not compile. It is a good idea to upgrade the framework every three months. If you let the upgrade go for more than a year, it is almost impossible to upgrade your project to the latest version. The native parts of the framework use Gradle on Android and CocoaPods on iOS. CocoaPods is being phased out on December 2 of this year. React Native currently still has a dependency on CocoaPods. Work is being done right now to move iOS support in React Native to the Swift Package Manager. There is experimental support for SPM in React Native 0.87.

When I do a React Native upgrade, it usually takes me a week to actually get a build running for iOS and Android. A lot of times, when you do the upgrade, you come across components that are no longer supported, and you have to find replacements if you can.

## The reality of cross platform development

Salesforce has done studies on mobile support, and they found that, for creating a prototype or building a greenfield solution, it is quicker to build a mobile app using React Native. Once you get into supporting an existing mobile app, it costs less to maintain a native app than a React Native app. Most application development is brownfield. Eighty percent of application development involves supporting existing applications, even in mobile.

The reality of mobile app development is that it costs less to maintain a native app than a React Native app.

## Is Shopify making the right decision?

After reading the Shopify post, they may be making the correct decision. Rewriting an app from scratch has a history of failure. I have seen many software projects that attempted to rewrite an app from scratch fail over my career. The good news for Shopify is that it has excellent engineering, and I am sure it will be successful.

I have been doing my own experiments using coding agents to rewrite applications from one language to another. Anthropic recently did this with Bun, rewriting the runtime from Zig to Rust.

That being said, I would not attempt this unless you have engineers who know the languages and frameworks of the platform for which they are developing applications. I am not a fan of the term `Vibe Coding`. While it is great that you can use an LLM agent to convert an application from one language to another, you still need engineers who understand what the code is doing and can debug any problems that arise.

## Statistics on React Native development

According to Appfigures, about 6.7% of Android apps are written in React Native. About 13.5% of the top 10,000 non-game apps on the App Store are written in React Native. There are other cross-platform frameworks, such as Flutter and Unity, but the vast majority of apps on both Google Play and Apple's App Store are native apps.

The good news is that if you are looking for native iOS or Android developers, there is no shortage of experienced developers looking for a job in mobile development.

## Learning more about React Native, iOS development and Android development

If you are interested in learning more about React Native, please check out their [documentation](https://reactnative.dev/) and the Expo [documentation](https://docs.expo.dev/). I would also suggest listening to the [React Native Radio Podcast](https://infinite.red/react-native-radio).

You can find excellent documentation on building native iOS apps from Apple's developer [site](https://developer.apple.com/). If you want to learn about Android development, check out Google's [developer documentation](https://developer.android.com/develop).

## Summary

I hope anyone reading this does not come away with the idea that I am slamming React Native. I think there are certain use cases where it makes sense to develop apps in React Native. If you have React developers who want to contribute to a mobile app, this might be a reason.

That being said, React Native would not be my first choice for building native apps. Using the native SDKs gives developers full access to all of the APIs on these platforms without leaky abstractions that can be hard to implement or maintain.

If you look at modern SwiftUI and Android Compose apps, they have borrowed many of the same paradigms as React. SwiftUI and Compose are both component-based frameworks, like React. In some cases, you can see your edits updated live in the canvas using Xcode or Android Studio. Both Apple and Google have borrowed many of the good ideas that came from the React framework.