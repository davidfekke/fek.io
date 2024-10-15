---
title: "How to add React Native to an existing Android app in 2022"
tags: ["Node.js", "JavaScript", "React-Native"]
description: ""
category: 
date: 2022-06-26
cover_image: "./RNM1.jpg"
---

<!-- <div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/3wftC30CN2I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> -->

I have been starting to use [React Native](https://reactnative.dev) in an existing iOS and Android app that I am maintaining. One of the problems I am finding in the React Native [docs](https://www.reactnative.dev/docs/integration-with-existing-apps) is the guides they give for adding to an existing iOS application are out of date.


## How to add React Native as of 2022

For this post, I will assume that you already have Xcode installed. You will also need to configure your environment for the React Native CLI Quickstart in the [environment setup guide](https://www.reactnative.dev/docs/environment-setup). The setup will make sure that you have a current version of [Homebrew](https://brew.sh/), [Node.js](https://nodejs.org/en/) installed. I have another post I created recently on how to get React Native [setup](../2022-04-13/how-to-setup-react-native-on-M1-mac-2022.md) and running on a M1 based Mac.

### Set up directory structure

Create a new folder for your project. This is where we will keep the React Native code. After creating this folder, copy your existing iOS project to a folder underneath your project folder called `android`.

### Install Node dependencies

In the root of your project folder, create a package.json file with the following contents:

```json
{
  "name": "YourReactNativeApp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "yarn react-native start"
  }
}
```

Make sure you have the `yarn` package manager installed. If you do not have this installed, you can install it by using the following command:

```shell
> npm install yarn -g
```

To install your Node dependencies, you can use the following command:

```shell
> yarn add react-native
```

When you run this command, it will display a message in your terminal that should look like the following:

|  > react-native@0.68.1" has unmet peer dependency "react@17.0.2".

If your unmet dependency is a specific version of react, you will need to add React for the specific version specified in the message:

```shell
yarn add react@17.0.2
```

## Adding the React View to your Android App

Now that we have added the React Native dependencies to your iOS app, we have the dependencies we need to in order to run the React Native content in your app. Lets' go ahead and modify a ViewController to display our React Native app:

```java
// MainActivity.java

```

Now lets' modify the `index.js` file so it looks like the following:

```javascript
import React from 'react';
import {
    AppRegistry,
    Text,
    View
  } from 'react-native';

const YourApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Hello World! 🎉
      </Text>
    </View>
  );
}

AppRegistry.registerComponent('YourApp', () => YourApp);
```

To test and make sure that this is set up correctly, we to start Metro first by running the following command at the root of our project:

```shell
> yarn start
```

Once we have started Metro, we can run our iOS app again and navigate to the ViewController that contains our `RCTRootView` view. This should create a screen that looks like the following:

## Conclusion

I hope this explains how you can add React Native to an existing Android application. React Native is one of many tools that are available to Android developers to build native applications. One of the nice things about React Native is that it is cross platform. This makes it easy to share code between both iOS and Android applications.