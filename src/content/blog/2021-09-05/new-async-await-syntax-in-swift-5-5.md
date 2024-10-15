---
title: "Async/Await syntax in Swift 5.5"
description: ""
category: 
date: 2021-09-05
cover_image: "./moveleft.jpg"
---

*Note: This is a re-post of an article I wrote for [Logrocket](https://blog.logrocket.com/). You can read the original [here](https://blog.logrocket.com/concurrency-swift-async-await-syntax/)*

When Swift was first introduced by Apple in 2014, it promised to meet the demands software engineers needed in modern programming languages. Since then Apple has open sourced the language and continued to evolve the language. Chris Lattner, who designed the language at Apple, had the goal of making a language that could be used to teach programming as well as build software for operating systems.

One of the key features that has been missing from the language has been primitives for concurrency and parallelism. In the past it was possible to do this kind of programming with Swift, but by using libraries like Grand Central Dispatch and libdispatch.  

## Why concurrency is important

Concurrency has become increasingly important because of changes that have been made to processors over the last decade. While newer processors have more transistors on them, there has been no significant improvement in clock speed. The one continuous improvement we are seeing in newer processors is more CPU Cores on each chip.

Apple's newer processors such as the A14 found in the iPhone 12 now has six cores, and their M1 processor in Apple Silicon based Macs and the iPad has eight CPU cores. The clock speed for the A14 is still around 3.1 gigahertz.

The real advancements in CPU design has come to the number of cores that are designed in the modern chips. To take advantage of these newer processors we need to do a better job of doing concurrent programming.

## Do not block the Main Threat

One of the important things that is often stressed to iOS/iPad OS developers is to never block the main thread. In most modern computer systems the main thread is used to render and handle the user interface as well as user interactions. If a user tries to interact with the UI of your app, and they can't because your UI is frozen because of a long running task, it can be very frustrating user experience.

For this reason, Apple has provided a number of different tools we can use to prevent the UI of our applications from being blocked by a long running task.

Some example of tasks that can take a long time is any task that involves making a network request, interacting with the file system and querying a database.

## Concurrency options in Swift

Modern concurrent programming has been made easier through improvements to frameworks like Grand Central Dispatch and libdispatch. For iPhone and iPad developers the default option has been to use Grand Central Dispatch.

Currently on iOS/iPad OS devices the current practice is to offload any task that would block the main thread to a background thread or queue until that task has completed. Once background tasks are completed, the results are usually handled in a block or trailing closure.

Prior to Grand Central Dispatch Apple provided APIs that used delegation to offload work that would require running a separate thread to a delegated object, and that object would call a method on the calling class to handle the completion of the task.

While both of these solutions worked, and can be difficult to read that kind of code, and it also allows for new kinds of bugs to be introduced if the completions are not handled correctly.

In 2017, Chris Lattner wrote his [Swift Concurrency Manifesto](https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782) which expressed his ideas on how to add concurrency to Swift using Async/await and Actors.

## Grand Central Dispatch

Grand Central Dispatch, or GCD, was first introduced in 2009 by Apple. It is Apple's way of managing task parallelism through a managed thread pool on Apple's operating systems.

GCD's implementation originated as a C library, so it could be used with C, C++ and Objective-C. Those languages were the main languages used by iOS and MacOS developers at the time. After Swift was introduced, a Swift wrapper for GCD was created for developers using Apple's newer language.

GCD has also been ported to 'libdispatch' which is used in other open source software. The Apache web server has incorporated this library to do multi-processing.

A simple example of how to use GCD now is to assign work to another dispatch queue. Here is an example of a function assigning some of it is work to an asynchronous task.

```swift
func doSomethinginTheBackground() {
    DispatchQueue.global(qos: .background).async {
        // Do some long running work here
        ...
    }
}
```

The DispatchQueue class provides methods and properties that allow developers to run code in a trailing closure. A very common scenario is to run a long running task in a trailing closure that produces some type of result, and then return that result back to the main thread. Here is an example of DispatchQueue that does some work, and returns a result back to the main thread.

```swift
DispatchQueue.global(qos: .background).async {
    // Do some work here
    DispatchQueue.main.async {
        // return to the main thread.
        print("Work completed and back on the main thread!")
    }
}
```

A more common scenario would be making a networking call using NSURLSession, handling the results in a trailing closure, and then returning to the main thread.

```swift
func goGrabSomething(completion: @escaping (MyJsonModel?, Error?) -> Void) {
    let ourl = URL(string: "https://mydomain.com/api/v1/getsomejsondata")
    if let url = ourl {
        let req = URLRequest(url: url)
        URLSession.shared.dataTask(with: req) { data, _, err in
            guard let data = data, err == nil else {
                return
            }
            do {
                let model = try JSONDecoder().decode(MyJsonModel.self, from: data)
                DispatchQueue.main.async {
                    completion(model, nil)
                }
            } catch {
                completion(nil, error)
            }
        }.resume()
    }
}
```

The following example will compile and run, there are some bugs in the example. I am not using completion handlers everywhere this function can exit. It is also harder to read if I was writing my code synchronously.

## Using Async/Await in your code

When iOS/iPad OS 15 and MacOS 12 are released this Fall, developers will start to be able to use the new Async/await syntax. Async/await can already be found in languages such as JavaScript and C#. These keywords are starting to become the way modern programming languages can write concurrent code. Lets' take a look at the previous function `goGrabSomething` rewritten to use the new Async/await syntax.

```swift
func goGrabSomething() async throws -> MyJsonModel? {
    var model: MyJsonModel? = nil
    let ourl = URL(string: "https://mydomain.com/api/v1/getsomejsondata")
    if let url = ourl {
        let req = URLRequest(url: url)
        let (data, _) = try await URLSession.shared.data(for: req)
        model = try JSONDecoder().decode(MyJsonModel.self, from: data)
    }
    return model
}
```

As we can see from my example above, we added the `async` keyword before the `throws` and after the function name. If our function did not throw, `async` would go before the `->`. I was able to change the function signature so that it no longer requires a completion. We can now return the object that has been decoded from our API call.

Inside of our function I am using the keyword `await` in front of my `URLSession.shared.data(for: URLRequest)`. Since the URLSession data function can throw an error, I have put a `try` in front the `await` keyword. Every time we use an `await` in the body of our function it creates a continuation. When the system processes our function, if it has to wait, it can now suspend our function until it is ready to return from its suspended state. 

If we try to call the `goGrabSomething` function from synchronous code, it will fail. But Swyft provides a nice workaround for that use case. We can use an `async` closure in our synchronous code to be able to call our async functions.

```swift
Task.init {
    var myModel = try await goGrabSomething() 
    print("Name: \(myModel.name)")
}
```

Swift now has it own system for managing concurrency and parallelism. By leveraging these new keywords, we can take advantage of these new concurrency features in the system.  

The end result is we are able to write a function that is easier to read and contains less code.

# Conclusion

Async/await in Swift greatly simplifies they way we write concurrent code in our iOS/iPad OS applications. You can start to play around with these new features by downloading Xcode 13 and running these examples on the betas of iOS/iPad OS 15 or MacOS 12.

This article is just scratching the surface of what you can do with these new concurrent features. Swift also has added an `actor` object type to language so developers can create write objects that contain shared mutable state that can be used across threads without having race conditions. 

Please watch Apple's WWDC21 presentation, [Meet async/await in Swift](https://developer.apple.com/videos/play/wwdc2021/10132/) to find out more about Async/await in Swift.