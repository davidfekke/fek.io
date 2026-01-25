---
title: "USB Missile Launcher in SwiftUI"
tags: ["SwiftUI", "MacOS", "USB"]
description: "Using Generics in Mojo"
category:
date: 2026-01-20
cover_image: "./missilelauncher.png"
---

I bought an USB Missile Launcher almost 20 years ago from a website called thinkgeek.com. The launcher plugged into a USB port on either your Mac or PC using the USB-A type of port. It was made by a Hong Kong based company called `Dream Cheeky`. They made a couple of different USB toys, but from what I can tell they went out of business or stopped selling the toy in the late 2000s.

The software they made for operating the launcher used to ship on a CD. Even if you can find it, it will not work on a modern Mac running MacOS 26. I miss playing with the toy, so I decided to write new client software for operating the toy.

## How to interface

After doing some research, I found out that the toy is actually an HID device, or Human Interface Device for USB. If you have a USB keyboard or mouse, those are also HIDs. To run the device, I decided to write the client app using SwiftUI. SwiftUI is Apple's UI framework for all of their devices. So I created a new SwiftUI app in Xcode using SwiftUI as the framework.

I then created a new swift class file called AirCannon.swift. In that class I imported the IOKit.hid module into my class. I also created a number of properties with a vendorId and a productId. Every USB device has their own product id and vendor id. For my launcher the vendor id and product id were **0x1941** and **0x8021** respectfully. I also created properties for the IOHIDManager and the IOHIDDevice.

```swift
private let vendorID: Int32 = 0x1941
private let productID: Int32 = 0x8021
private var manager: IOHIDManager?
private var device: IOHIDDevice?
```

In the constructor I created a reference to the manager using the `IOHIDManagerCreate` method. I also used the `IOHIDManagerSetDeviceMatching` method to set the manager to the Matching device. I then used the `IOHIDManagerRegisterDeviceMatchingCallback` method to create a connection to the launcher. After setting the manager registration, I used the `IOHIDManagerScheduleWithRunLoop` method for scheduling the manager with the run loop and the `IOHIDManagerOpen` method for opening the connection. Here is the completed constructor method:

```swift
init() {
    manager = IOHIDManagerCreate(kCFAllocatorDefault, IOOptionBits(kIOHIDOptionsTypeNone))
    
    // Safely unwrap the manager before proceeding
    guard let manager = manager else {
        print("Failed to create IOHIDManager")
        return
    }
    
    let deviceMatch: [String: Any] = [
        kIOHIDVendorIDKey: vendorID,
        kIOHIDProductIDKey: productID
    ]
    
    IOHIDManagerSetDeviceMatching(manager, deviceMatch as CFDictionary)
    
    // 1. Create the pointer for 'self' to use inside closures
    let clientPointer = UnsafeMutableRawPointer(Unmanaged.passUnretained(self).toOpaque())
    
    // 2. Register the matching callback
    IOHIDManagerRegisterDeviceMatchingCallback(manager, { (context, result, sender, device) in
        guard let context = context else { return }
        // guard let device = device else { return }
        let mySelf = Unmanaged<AirCannon>.fromOpaque(context).takeUnretainedValue()
        mySelf.device = device
        print("Cannon Connected!")
        
        // --- MOVE REGISTRATION HERE ---
        // Now that we HAVE the device, we can tell the OS to listen to it
        IOHIDDeviceRegisterInputReportCallback(
            device,
            mySelf.reportBuffer,
            8,
            { (context, result, sender, type, reportId, report, reportLength) in
                guard let context = context else { return }
                //, let report = report else { return }
                let mySelf = Unmanaged<AirCannon>.fromOpaque(context).takeUnretainedValue()
                let data = UnsafeBufferPointer(start: report, count: reportLength)
                mySelf.lastStatus = Array(data)
            },
            context // Pass the same clientPointer (context)
        )
        // ------------------------------
        
    }, clientPointer)
    
    // 3. Schedule and Open
    IOHIDManagerScheduleWithRunLoop(manager, CFRunLoopGetCurrent(), CFRunLoopMode.defaultMode.rawValue)
    IOHIDManagerOpen(manager, IOOptionBits(kIOHIDOptionsTypeNone))
}
```

## Controlling the launcher

HIDs use byte arrays with specific bytes as input. The Dream Cheeky USB launcher has six different inputs it seems to accept. Here are the codes in byte array format with what the command does:

```text
stop: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
up: [0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
down: [0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
left: [0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
right: [0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
fire: [0x10, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
```

I created a method for sending those bytes to the launcher with the following method:

```swift
private func send(bytes: [UInt8]) {
    guard let device = device else {
        print("Error: Cannon not connected")
        return
    }

    hidWriteQueue.async {
        let reportID: CFIndex = 0
        let result = IOHIDDeviceSetReport(
            device,
            kIOHIDReportTypeOutput,
            reportID,
            bytes,
            bytes.count
        )

        if result != kIOReturnSuccess {
            print("Failed to send command: \(result)")
        }       
    }
}
```

In this method I am using the `IOHIDDeviceSetReport` method to send the bytes to the device. I also wrapped the write in a queue so that it does not run on the same thread as the UI.

So with the example above we can create a connection to the USB device and send bytes to control the missile launcher. This toy can also detect if the launcher has reached the limits of movement. In order to read the status I have created a property called `lastStatus`. This property gets set in a callback that we have already defined in the constructor. Whenever the `IOHIDDeviceSetReport` method is called, is uses that callback to update the status bytes in our property. Here is the section of the constructor we used to set that callback:

```swift
IOHIDDeviceRegisterInputReportCallback(
    device,
    mySelf.reportBuffer,
    8,
    { (context, result, sender, type, reportId, report, reportLength) in
        guard let context = context else { return }
        //, let report = report else { return }
        let mySelf = Unmanaged<AirCannon>.fromOpaque(context).takeUnretainedValue()
        let data = UnsafeBufferPointer(start: report, count: reportLength)
        mySelf.lastStatus = Array(data)
    },
    context // Pass the same clientPointer (context)
)
```

In the callback above we can see where we use an `UnsafeBufferPointer` to create a copy of the report into the bytes that get passed to the `lastStatus`. Now that we have a property that is getting updated with device status, we can write a method that we can use to retrieve the last status:

```swift
private func getStatus() -> [UInt8] {
    return lastStatus
}
```

We can now use this method to get the current device status when we are sending commands to the launcher. We will need to check if the launcher has reached it's limit of motion or is currently firing. For checking if the limit has been reached, we can use the following method:

```swift
func isLimitReached(for direction: CannonDirection) -> Bool {
    let status = getStatus()
    let config = direction.limitConfig
    
    // Check if the specific bit is set in the status byte
    return (status[config.index] & config.mask) != 0
}
```

This method uses a bit mask to determine if the status has reached it's limit by using a Swift Enum. Swift Enums are extremely powerful. Enums in Swift can have there own properties. For this method I created an Enum called `CannonDirection` to store the limits for each of the four directions:

```swift
public enum CannonDirection {
    case up, down, left, right
    
    // Returns (Byte Index, Bitmask)
    var limitConfig: (index: Int, mask: UInt8) {
        switch self {
        case .up:    return (0, 0x80) // 128
        case .down:  return (0, 0x40) // 64
        case .left:  return (1, 0x04) // 4
        case .right: return (1, 0x08) // 8
        }
    }
}
```

When moving the launcher in different directions, we will implement a method called `smartMove` that will use the `isLimitReached` method to make sure we do not try to move the launcher in any direction too far.

```swift
func moveSmart(direction: CannonDirection, duration: Double) async {
    // 1. Start moving
    switch direction {
    case .up:    up()
    case .down:  down()
    case .left:  left()
    case .right: right()
    }

    let startTime = Date()
    
    // 2. Monitor on a background thread
    DispatchQueue.global(qos: .userInitiated).async {
        while Date().timeIntervalSince(startTime) < duration {
            if self.isLimitReached(for: direction) {
                print("Limit reached for \(direction)! Stopping.")
                break
            }
            usleep(5000) // Poll every 5ms
        }
        
        // 3. Stop movement
        self.stop()
    }
}
```

## Shooting a missile from the launcher

The Dream Cheeky launcher has a mechanism that builds up air pressure before firing a missile. It takes a couple of seconds to build up enough pressure before it can actually fire the missile. In order to write a method that will fire the missile, we will need to check the status to make sure that a missile firing is in progress. Once the motor returns home we will send a stop command to the launcher. 

```swift
func fireAndWait(completion: @escaping () -> Void) async {
    // 1. Send the fire command
    fire()
    
    // 2. Poll the device on a background thread so we don't freeze the app
    DispatchQueue.global(qos: .userInitiated).async {
        // Wait for the motor to start moving (the bit becomes 1)
        while !self.isFiringInProgress {
            usleep(10000) // Sleep 10ms to save CPU
        }
        
        // Wait for the motor to return to home (the bit becomes 0)
        while self.isFiringInProgress {
            usleep(10000)
        }
        
        // 3. Command complete
        self.stop()
        DispatchQueue.main.async {
            print("Firing cycle complete.")
            completion()
        }
    }
}
```

In the method above we use dispatch queues so we do not block the UI thread. Once the method finishes firing the missile, we return back to the UI thread using the `DispatchQueue.main.async`.

## Destroying the connection

We will use a `deinit` method to dispose of any resources we do not need once we are finished with this class.

```swift
deinit {
    reportBuffer.deallocate()
    
    // Also a good idea to stop the manager
    if let manager = manager {
        IOHIDManagerClose(manager, IOOptionBits(kIOHIDOptionsTypeNone))
    }
}
```

## IOKit.hid C roots

A lot of the methods we use in this class do not seem very Swift like, and that is because the `IOKit.hid` module has legacy C roots. A lot of the code we use such as the `UnsafeMutablePointer`, `UnsafeMutableRawPointer` and `Unmanaged<Any>.fromOpaque()` are Swift objects wrappers around native C pointers and native data types. This code is meant help bridge between the Swift and C APIs.

My full class for controlling the missile launcher is as follows:

```swift
import Foundation
import IOKit.hid

class AirCannon {
    private let vendorID: Int32 = 0x1941
    private let productID: Int32 = 0x8021
    private var manager: IOHIDManager?
    private var device: IOHIDDevice?
    
    private var lastStatus: [UInt8] = [0, 0, 0, 0, 0, 0, 0, 0]
    // Allocate 8 bytes of memory for the report buffer
    private let reportBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: 8)
    
    private let hidWriteQueue = DispatchQueue(label: "hid.write.queue")

    // Your existing logic now works instantly
    var isFiringInProgress: Bool {
        let status = getStatus()
        return (status[1] & 0x80) != 0
    }
    
    func isLimitReached(for direction: CannonDirection) -> Bool {
        let status = getStatus()
        let config = direction.limitConfig
        
        // Check if the specific bit is set in the status byte
        return (status[config.index] & config.mask) != 0
    }
    
    init() {
        manager = IOHIDManagerCreate(kCFAllocatorDefault, IOOptionBits(kIOHIDOptionsTypeNone))
        
        // Safely unwrap the manager before proceeding
        guard let manager = manager else {
            print("Failed to create IOHIDManager")
            return
        }
        
        let deviceMatch: [String: Any] = [
            kIOHIDVendorIDKey: vendorID,
            kIOHIDProductIDKey: productID
        ]
        
        IOHIDManagerSetDeviceMatching(manager, deviceMatch as CFDictionary)
        
        // 1. Create the pointer for 'self' to use inside closures
        let clientPointer = UnsafeMutableRawPointer(Unmanaged.passUnretained(self).toOpaque())
        
        // 2. Register the matching callback
        IOHIDManagerRegisterDeviceMatchingCallback(manager, { (context, result, sender, device) in
            guard let context = context else { return }
            // guard let device = device else { return }
            let mySelf = Unmanaged<AirCannon>.fromOpaque(context).takeUnretainedValue()
            mySelf.device = device
            print("Cannon Connected!")
            
            // --- MOVE REGISTRATION HERE ---
            // Now that we HAVE the device, we can tell the OS to listen to it
            IOHIDDeviceRegisterInputReportCallback(
                device,
                mySelf.reportBuffer,
                8,
                { (context, result, sender, type, reportId, report, reportLength) in
                    guard let context = context else { return }
                    //, let report = report else { return }
                    let mySelf = Unmanaged<AirCannon>.fromOpaque(context).takeUnretainedValue()
                    let data = UnsafeBufferPointer(start: report, count: reportLength)
                    mySelf.lastStatus = Array(data)
                },
                context // Pass the same clientPointer (context)
            )
            // ------------------------------
            
        }, clientPointer)
        
        // 3. Schedule and Open
        IOHIDManagerScheduleWithRunLoop(manager, CFRunLoopGetCurrent(), CFRunLoopMode.defaultMode.rawValue)
        IOHIDManagerOpen(manager, IOOptionBits(kIOHIDOptionsTypeNone))
    }
    
    private func getStatus() -> [UInt8] {
        return lastStatus
    }

    private func send(bytes: [UInt8]) {
        guard let device = device else {
            print("Error: Cannon not connected")
            return
        }

        hidWriteQueue.async {
        
            let reportID: CFIndex = 0
            let result = IOHIDDeviceSetReport(
                device,
                kIOHIDReportTypeOutput,
                reportID,
                bytes,
                bytes.count
            )

            if result != kIOReturnSuccess {
                print("Failed to send command: \(result)")
            }
            
        }
        
        
    }

    // MARK: - Commands
    func stop()  { send(bytes: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    func up()    { send(bytes: [0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    func down()  { send(bytes: [0x02, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    func left()  { send(bytes: [0x04, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    func right() { send(bytes: [0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    func fire()  { send(bytes: [0x10, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) }
    
    func moveSmart(direction: CannonDirection, duration: Double) async {
        // 1. Start moving
        switch direction {
        case .up:    up()
        case .down:  down()
        case .left:  left()
        case .right: right()
        }

        let startTime = Date()
        
        // 2. Monitor on a background thread
        DispatchQueue.global(qos: .userInitiated).async {
            while Date().timeIntervalSince(startTime) < duration {
                if self.isLimitReached(for: direction) {
                    print("Limit reached for \(direction)! Stopping.")
                    break
                }
                usleep(5000) // Poll every 5ms
            }
            
            // 3. Stop movement
            self.stop()
        }
    }
    
    func fireAndWait(completion: @escaping () -> Void) async {
        // 1. Send the fire command
        fire()
        
        // 2. Poll the device on a background thread so we don't freeze the app
        DispatchQueue.global(qos: .userInitiated).async {
            // Wait for the motor to start moving (the bit becomes 1)
            while !self.isFiringInProgress {
                usleep(10000) // Sleep 10ms to save CPU
            }
            
            // Wait for the motor to return to home (the bit becomes 0)
            while self.isFiringInProgress {
                usleep(10000)
            }
            
            // 3. Command complete
            self.stop()
            DispatchQueue.main.async {
                print("Firing cycle complete.")
                completion()
            }
        }
    }
    
    deinit {
        reportBuffer.deallocate()
        
        // Also a good idea to stop the manager
        if let manager = manager {
            IOHIDManagerClose(manager, IOOptionBits(kIOHIDOptionsTypeNone))
        }
    }
}

```

# Simple font end

I used a `SwiftUI` struct to create a super simple UI for controlling the launcher. Nothing Earth shattering here, but a simple layout for controlling the launcher on your Mac:

```swift
import SwiftUI

struct ContentView: View {
    let usbController = AirCannon()
   
    var body: some View {
        VStack {
            
            Button("Up") {
                Task {
                    await usbController.moveSmart(direction: .up, duration: 0.5)
                }
            }
            HStack {
                Button("Left") {
                    Task {
                        await usbController.moveSmart(direction: .left, duration: 0.5)
                    }
                    
                }
                Button("Stop") {
                    Task {
                        usbController.stop()
                    }
                    
                }
                Button("Right") {
                    Task {
                        await usbController.moveSmart(direction: .right, duration: 0.5)
                    }
                    
                }
            }
            
            Button("Down") {
                Task {
                    await usbController.moveSmart(direction: .down, duration: 0.5)
                }
                
            }
            Button("Fire") {
                Task {
                    await usbController.fireAndWait {}
                }
            }
        }
        .padding()
    }
}
```

## Conclusion

I hate the idea of hardware not being able to be used because there is not any current software. I chose to do a little reverse engineering to figure out how I could still use this toy with modern operating systems like MacOS 26. It also gave me an excuse to play around with some C bridging code to get a better idea on how I can leverage a C library with a SwiftUI application.

While a lot of Apple's APIs have been written or rewritten in Swift, they do still have a lot of APIs that are written in Objective-C and pure C or C++. This was a good way to reacquaint myself with using some of those older APIs.

I have published my source code on the following github [repo](https://github.com/davidfekke/missileUSB), as well as an installable version of the [app](https://github.com/davidfekke/missileUSB/releases/download/1.0/missileUSB.zip) you can run on your Mac. Please do not shoot your eye out.

![Christmas Story copyright 1983](./shoot-your-eye-out-magnet_720x.webp)