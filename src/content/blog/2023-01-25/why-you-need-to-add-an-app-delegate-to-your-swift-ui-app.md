---
title: "Why you need to add an AppDelegate to your SwiftUI app"
tags: ["Swift", "SwiftUI"]
description: ""
category: 
date: 2023-01-25
cover_image: "../2019-03-27/keyboard.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/g6Ei6esE7Ac" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

By default when you create a new application in Xcode that is a SwiftUI app, it generates an application without an AppDelegate class. It has been replaced by an App struct. Much like how SwiftUI uses structs 
for views, Apple also is creating a struct for the App.

The nice thing about structs in Swift is that they use fewer resources than classes. In Swift structs are value types and classes are reference types. Value types generally are only loaded into the stack while reference types are loaded into the heap of the system. 

## Why do I need an AppDelegate class?

The AppDelegate is a special object in a MacOS or iOS application that is responsible for handling important events and tasks throughout the lifecycle of the app. 

It is typically used to handle events such as the app launching, entering the background, and shutting down. The AppDelegate is also used to set up the initial state of the app, such as creating the main window and loading any necessary data, resources, etc... Additionally, it can handle other system-level events such as push notifications and URL opening.

The app struct that is part of the standard Xcode SwiftUI template does not handle all of the application lifecycle and external events that are handled by the AppDelegate class. This is why you may need to add this class to your app.

## SwiftUI file structure

When you create a new SwiftUI iOS app in Xcode, it will create a folder named after your app, and two files for the App struct and the ContentView struct. They look like the following;

```swift
// SampleApp.swift
import SwiftUI

@main
struct SampleApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

```swift
// ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, world!")
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

## Add the AppDelegate

In Xcode, add a new swift file, and call it `AppDelegate.swift`.

```swift
import Foundation
import UIKit

class AppDelegate: NSObject, UIApplicationDelegate {

    // swiftlint: disable line_length
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        setupMyApp()
        return true
    }

    private func setupMyApp() {
        // TODO: Add any intialization steps here.
        print("Application started up!")
    }
}
```

Then in your App.swift file you can add a reference to the AppDelegate file in your struct. Put this line before your `body` property.

```swift
...
struct SampleApp: App {

    @UIApplicationDelegateAdaptor private var appDelegate: AppDelegate

    var body: some Scene {
...
```

## Conclusion

By adding the AppDelegate to your app you can take advantage of a lot of functionality that is not available in a pure SwiftUI app. Use the AppDelegate to have access to the full lifecycle of your app.