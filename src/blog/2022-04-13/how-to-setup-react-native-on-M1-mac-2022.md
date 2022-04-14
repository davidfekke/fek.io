---
layout: post
title: "How to set up React Native on M1 Mac 2022 edition"
tags: ["Node.js", "JavaScript", "React-Native", "M1"]
description: ""
category: 
date: 2022-04-13
cover_image: "./RNM1.jpg"
---

I recently purchased a M1 Mac for development. It is my first time using an M1 Mac, so I thought share my experiences.

Going through the React-Native documentation, I found a lot of it to be out of date. Here is what I had to do to get React-Native running on my new Mac.

* Make sure you have Xcode installed
* Make sure to install Xcode Command Line tools are installed
* Install homebrew
* Install the current LTS version of Node.js
* Install watchman
* Install Cocoapods using homebrew, do not use the Ruby `gem` command listed in the documetation

Once you have all of the prerequisites installed, you can run the following example from their documentation

```bash
> npx react-native init AwesomeProject
```

After installing the example project, you can run it by using the following command;

```bash
> npx react-native run-ios
```

# Conclusion

Not all of the kinks of developing on the Apple Silicon Macs have been worked out yet, but with just a few small changes you can get React-Native running on your M1 Mac.