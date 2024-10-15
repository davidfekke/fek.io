---
title: "Startup services in the background on your iOS App"
description: ""
tags: ["iOS", "Concurrency"]
category: 
date: 2023-12-18
cover_image: "./chain.png"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/kRVZJIhXi_4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

Apple has added a lot of features for concurrency in the Apple ecosystem as well as in the Swift language. I had a colleague show me a neat way to load services in the background using Operation Queues. Operation Queues are an older API that have their origination from the older Objective-C frameworks, but they are still useful even with [Grand Central Dispatch](https://developer.apple.com/documentation/DISPATCH), [Swift Concurrency](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/) features and [Combine](https://developer.apple.com/documentation/combine).

In most highly visible iOS apps there are services that are needed as part of the services that are used by the company producing the app. A lot of apps use logging services like LogRocket, Firebase or Datadog to track when users experience errors or exceptions in their applications. It is a good way to improve the quality of your software. There are also realtime databases like Firebase and Realm that need to be set up and run at application startup.

## Starting services Application startup

Whether your app is a SwiftUI app or a UIKit app, these services usually need to be started on application startup. On UIKit based apps, this is generally handled with the AppDelegate::application:didFinishLaunchingWithOptions: function. If you do not have an AppDelegate class in your SwiftUI app, you can add one, or use the SwiftUI App file to launch your services. If you want to use the AppDelegate with your SwiftUI App struct, I have a post on how to [add](/blog/why-you-need-to-add-an-app-delegate-to-your-swift-ui-app/) that to your SwiftUI App.

## Defining an Operation

To create a Operation for doing some work on the operation queue, you just need to create a new class that inherits from `Operation`.

```swift
class FirebaseSetupOperation: Operation {

    override func main() {
        FirebaseApp.configure()
        print("Firebase Configured")
    }

}
```
Now in our AppDelegate, we can add an `OperationQueue` to our startup process that we have defined. We can add the `FirebaseSetupOperation` to our OperationQueue.

```swift
import Foundation
import UIKit

class AppDelegate: NSObject, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        runMyStartupOperations()
        return true
    }
    
    func runMyStartupOperations() {
        let firebaseSetupOperation = FirebaseSetupOperation()
        let operationQueue = OperationQueue()
        operationQueue.addOperation(firebaseSetupOperation)
    }
}
```

Your application will create an instance of your operation, and run it in a background thread until the operation is completed. This operation can now run without the fear of the main thread being blocked.

## Handling Dependencies

There is a good chance that if you have more than one operation, one of the operations may have a dependency on another. If you have an operation that has a dependency that requires that another operation to run first, you can also configure this very easily before running any of the operations.

You can also chain operations together. These operations will run in their own thread. 

```swift
let firebaseSetupOperation = FirebaseSetupOperation()
let iRequireLoggingOperation = IRequireLoggingOperation()
iRequireLoggingOperation.addDependency(firebaseSetupOperation)

operationQueue.addOperations([firebaseSetupOperation, iRequireLoggingOperation], waitUntilFinished: false)
```

This will guarantee that the `logSetupOperation` runs before the `iRequireLoggingOperation`. 

## Conclusion

Apple's SDks contain many different tools for handling concurrency. If you find this useful, please take a look at Grand Central Dispatch as well as [Combine](https://developer.apple.com/documentation/combine), [Async/await](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/) and [Swift Actors](https://developer.apple.com/videos/play/wwdc2021/10133/).