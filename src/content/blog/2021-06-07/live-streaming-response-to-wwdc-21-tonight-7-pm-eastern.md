---
title: "What is Apple showing off to developers this year at WWDC21?"
description: ""
category: 
date: 2021-06-07
tags: ["WWDC21", "Swift", "iOS", "iPadOS"]
cover_image: "./wwdc21highlights.jpg"
---

I live streamed the WWDC21 developer keynote tonight to go over new features Apple is adding for iOS and Swift developers.

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/0wgCljlIOC0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I will be discussing some of the new APIs announced by Apple, the developer tools and new async language features added to Swift.

## Updated 8:27 PM

So I was able to watch both the Keynote as well as the Platforms State of the Union. Apple announced MaxOS 12 Monterey, iOS/iPadOS 15, watchOS 8 and a new tvOS. There was a lot of emphasis placed on the SharePlay API, AR technologies as well different modes for 'do not disturb'. Users can now tailer how and what kind of notifications they depending how busy they are at the time. 

## Xcode Cloud

A couple of years ago Apple bought a company that allowed developers to build their Xcode projects in the Cloud. This may be the end result of that purchase. Apple unveiled a beta for 'Xcode Cloud' today. It gives developers on a team a way of creating apps on a build server. It also looks like Xcode will allow developers to use qit pull requests to kick off new builds, and send the updated apps to TestFlight.

There are other services that allow you to do this now, but it looks like Apple is providing a way for you to do this using their services. Currently GitHub users can do this using GitHub actions. There is some setup, but I am guessing Apple is going to try to streamline the whole process.

## Swift Concurrency

Chris Lattner originally published his [Concurrency Manifesto](https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782) back in 2017. We are finally seeing really cool concurrency features being added to Swift as language. 

### Async/Await

The `async` and `await` keywords are currently already in use in languages like C# and JavaScript. Async and await effectively allow a developer to take a function that calls a long running process that requires a trailing closure, and replace it with a call that looks more like a synchronous call. Lets' take a look at a function that that has five embedded trailing closures listed in the manifesto.

```swift
func loadWebResource(_ path: String, completionBlock: (result: Resource) -> Void) { ... }
func decodeImage(_ r1: Resource, _ r2: Resource, completionBlock: (result: Image) -> Void)
func dewarpAndCleanupImage(_ i : Image, completionBlock: (result: Image) -> Void)

func processImageData1(completionBlock: (result: Image) -> Void) {
    loadWebResource("dataprofile.txt") { dataResource in
        loadWebResource("imagedata.dat") { imageResource in
            decodeImage(dataResource, imageResource) { imageTmp in
                dewarpAndCleanupImage(imageTmp) { imageResult in
                    completionBlock(imageResult)
                }
            }
        }
    }
}
```

We can take this and rewrite it as function that uses the `async` keyword instead of a trailing closure, and we simply place the `await` keyword in front of any function call that we would normally wait for a response.

```swift
func loadWebResource(_ path: String) async -> Resource
func decodeImage(_ r1: Resource, _ r2: Resource) async -> Image
func dewarpAndCleanupImage(_ i : Image) async -> Image

func processImageData1() async -> Image {
    let dataResource  = await loadWebResource("dataprofile.txt")
    let imageResource = await loadWebResource("imagedata.dat")
    let imageTmp      = await decodeImage(dataResource, imageResource)
    let imageResult   = await dewarpAndCleanupImage(imageTmp)
    return imageResult
}
```

As you can see from this second example, this is much easier to read and is missing that tree-like structure of callbacks.

### Actors

Actors have been popular in other languages for while as a way to encapsulate data inside of a DispatchQueue. They have their own keyword called `actor` for constructing objects similar to the `class` or `struct` keyword. But unlike classes or structs, actors eliminate shared mutable state.

```swift
// Sample from swift.org
// https://docs.swift.org/swift-book/LanguageGuide/Concurrency.html
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```

## SwiftUI improvements

SwiftUI is still a fairly new framework for building UIs, so I am expecting to see a lot of improvements this year. I am looking forward to seeing what new features they are adding. The one thing I did see so far is a way of determining which os the view is running on so you can turn certain functionality on or off depending the operating system.

## SharePlay API

In multi-user apps like FaceTime and Messages, Apple showed how many users can now interact with the same content in a app at the same time using the SharePlay API. They demonstrated users sharing a whiteboard and multiple users controlling the playback of a movie at the same time.

# Conclusion

I am looking forward to drilling down into the details of these different features and APIs over the next couple of days.
