---
title: "Here is how to remove secrets from your Xcode Source"
description: ""
tags: ["secrets", "iOS", "Xcode"]
category: 
date: 2023-07-30
cover_image: "./securesource.jpg"
---

A colleague recently showed me an article that showed that half of the repos on GitHub that had ChatGPT examples had their access key in their source code. GitHub actually does a pretty good job of policing when someone checks in a secure key or token, but if you want to avoid checking them in in the first place.

Many 3rd party APIs require the use of some sort of secret or configuration file that you do not want to share with the rest of the world.

It is considered a bad practice to keep secrets in your source code. Whether you are keeping you source code in a public repo or private repo, do not keep secrets in your source.

## What is a secret?

A secret is any kind of information you do not want exposed to either external or internal resources. Even if you have a private repo through Github or Bitbucket, you have services that you might use that need to access your source code. That might be an external build system or even an internal employee who you do not want to access a service.

It is very common for a 3rd party service you consume in your application to provide secret keys to access that service. Having that key exposed could cause someone else to either run up charges on that service, or even worse, allow access to sensitive organizational information or customer data. I hope in this post I can show how to remove these secrets from your source code.

## Finding secrets in your source code

The first thing you should do is identify anywhere in your application that you are using secrets. If you are using Github, it already will give you some warnings if it detects that you are storing. You also might be able to use a third party service if you are using a self hosted git server like GitLab.

Some places to look for secrets would be the `Info.plist` for your application. Some services like Firebase will provide their own plist files. Also look for anywhere in your code where a developer might have hard coded a password or secret.

```swift
// DO NOT DO THIS!!!
let servicePassword = "my_secret_1234"
```

## The problem with plists

Plists are XML files that can be used for storing permanent values in your application in the file system. Apple on the iOS and iPadOS operating uses a system called secure enclave to encrypt any file that is used in your application. While that does provide a certain amount of security, it is not foolproof. Jamon Holmgren of Infinite Red recently tweeted about the problem with using these types of files in your application.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">No way in any iOS app. Quoted tweet was Flutter, but my first exposure to this problem was in a native compiled app. A friend showed me how to extract the secret keys from my app and he took about 3 minutes. It blew my mind.</p>&mdash; Jamon (@jamonholmgren) <a href="https://twitter.com/jamonholmgren/status/1646894687880613890?ref_src=twsrc%5Etfw">April 14, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The bottom line if someone can download your IPA file to a desktop computer, the IPA file is a zip format, and the contents of the IPA can be browsed quite easily.

## Where can I store my secrets

There are a couple of different places you can store your secrets. If you use GitHub or GitLab, they both provide a place where you can store variables and secrets. It is important to make sure only the people who need access to these variables are able to view those variables. Generally in a larger org you will have engineers who have this level access. This is usually the `Devops` team that can set and view.

If you are using AWS, they have a feature called AWS secrets manager that can store these secrets as well. There are also third party vault tools that can be deployed that can be used as source for your secrets.

## How to reference your secrets in Xcode

Depending on where you need your secrets in your code, there are a few different ways to make you secrets available in your application. Some of this will depend if you referencing them directly in your code or through an external file like a plist. The `Info.plist` is the most common plist used by Apple applications. In the current version of Xcode, part of this file has been moved internally inside of the `xcodeproj` bundle. 

Apple actually provides and easy way to inject values into this plist using environment variables. Xcode can swap out these values out at build time inside of your `Info.plist`. If you look inside of your Info.plist file you will see values are contained inside of a `$()`. Anything side of those parenthesis are replaced by the value coming from the environment variable. The Executable file will be set to a string called `$(EXECUTABLE_NAME)`. It should look like this inside of the plist.

```xml
<string>$(EXECUTABLE_NAME)</string>
```

You can add a new key for your secret to the `Info.plist`, and then reference that value in your code when you need to use the secret. 

```xml
...
<key>YourSecretKey</key>
<string>$(YourSecretKeyFromEnvironmentVariable)</string>
...
```

To reference this value in your code, you can use the `Bundle.main` object like follows:

```swift
if let infoDict = Bundle.main.infoDictionary {
    // Access the value for your secret key in the Info.plist
    if let mySecret = infoDict["YourSecretKey"] as? String {
        print("mySecret value: \(mySecret)")
        // You can use the value here as needed
    } else {
        print("mySecret not found in Info.plist")
    }
} else {
    print("Info.plist not found.")
}
```

## Replacing secrets in your code at build time

Another technique for using secrets in your code is to replace your secrets using a template at build time. This can be done very simply using a shell script. You can then just run this script on your build server.

An easy way to implement this is to create a constants file that can use dummy values in your source. Here is an example:

```swift
public struct Constants {
    let mySuperSecret = "DummyValue"
} 
```

This file can be replaced by file with the actual values at build time using a shell script. There is a command in Unix called `envsubst` that will substitute any environment variables in a template, and let you create a new file. The template can just be a text file like the following:

```swift
// mytemplate.txt
public struct Constants {
    let mySuperSecret = "${SUPER_SECRET_VALUE}"
} 
```

Then you can use the `envsubst` command in a shell script to create the file you want to use at build time.

```sh
#!/bin/bash

# Create the output file by substituting the environment variables in the template
echo "Create Constants.swift file for secret constants values"
envsubst < Scripts/mytemplate.txt > Shared/Constants.swift
```

This will create a new file or replace an existing file with the correct secrets.

```swift
public struct Constants {
    let mySuperSecret = "ActualSuperSecretValue123"
}
```

Then in the rest of you code you can reference this secret like this:

```swift
let password = Constants.mySuperSecret
```

## Updating values in other plists

If you are using other plists or are required by an SDK to use a third party plist, you can set dummy values in this plist file, and then update the plist at build time using `PlistBuddy`. `PlistBuddy` is a command line tool build by Apple that come included on all Macs. If you are using a Mac as your build machine you can reference this tool in a shell script as follows:

```sh
/usr/libexec/PlistBuddy
```

`PlistBuddy` can read, set the value of a key, and delete or add keys. `PlistBuddy` takes two parameters for the command and the plist. An example for setting a key value might like like this:

```sh
/usr/libexec/PlistBuddy -c "Set :SecretString 123" ThirdParty.plist
```

## Conclusion

As you can see there are multiple ways to store and reference secrets in your application with out storing them in your source code. If you work at a large enough organization, you can consult with your Information Security team or your Devops team to go over some of the different strategies for storing secrets for your application.

It is more important than ever that everyone do their part in making sure that we secure and lock down our apps. You do not want to be too late in making this change to how you store secrets.