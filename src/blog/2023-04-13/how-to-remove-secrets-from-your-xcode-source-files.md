---
layout: post
title: "How to Remove Secrets from your Xcode Source Files"
description: ""
category: 
date: 2023-04-13
cover_image: "./unnamed.jpg"
---

A colleague recently showed me an article that showed that half of the repos on GitHub that had ChatGPT examples had their access key in their source code. GitHub actually does a pretty good job of policing when someone checks in a secure key or token, but if you want to avoid checking them in in the first place.

Many 3rd party APIs require the use of some sort of secret or configuration file that you do not want to share with the rest of the world.

I decided to write a post on some of the different ways you can use secure keys and tokens without checking them into your source.

## Secrets in your source

If you have 

## Use environment variables for anything in Info.plist

## Use plistbuddy for plists that are not Info.plist