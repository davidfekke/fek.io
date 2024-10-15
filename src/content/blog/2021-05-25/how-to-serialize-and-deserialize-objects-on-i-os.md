---
title: "How to serialize and deserialize objects on iOS"
description: ""
category: 
date: 2021-05-25
cover_image: "./Illustration.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/3jMXQJjfgfA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Not only does Apple Think Differently, they also like to name things differently as well. In languages like Java and C#, if you want to share a contract between objects that guarantees the same interface, that is called an 'Interface'. On MacOS, iOS/iPadOS, watchOS and tvOS, that is called a 'Protocol'. Just like you can make a class or struct conform to an interface, you can also make a Swift class or struct conform to a 'Protocol'.

In Objective-C, if you want extend an existing class, that is called a 'Category', but it is called an `extension` in C# and Swift.

Developers that are learning how to program for Apple operating systems may be curious about how they can serialize and deserialize objects. On MacOS and iOS that is called 'archiving' and 'unarchiving'.

If you have a class that you want to serialize or archive, your class will need to implement the 'NSCoding' protocol. The NSCoding protocol requires that you have a method on your class called `encode`, and an `init` constructor that takes a `coder` for decoding the archived object.

# Implementing NSCoding

Lets' take a look at a class I have defined for keeping track of a vehicle.

```swift
class Vehicle {
    var make: String
    var model: String
    var tires: Int = 0
    
    public init(make aMake: String, model aModel: String, tires aTires: Int) {
        self.make = aMake
        self.model = aModel
        self.tires = aTires
    }
}
```

If you are using Xcode, it has a nice feature that will prompt the developer to create any missing methods if you are adding a protocol to your class. When we add the `NSObject` and the `NSCoding` protocol to our class, the end result will look like this in our editor.

```swift
class Vehicle: NSObject, NSCoding {
    var make: String
    var model: String
    var tires: Int = 0
    
    public init(make aMake: String, model aModel: String, tires aTires: Int) {
        self.make = aMake
        self.model = aModel
        self.tires = aTires
    }
    
    func encode(with coder: NSCoder) {
        
    }

    public required init?(coder: NSCoder) {
        
    }
}
```

Now lets' implement these two methods. For the `init?(coder: NSCoder)` we are going to want to make this a convenience init because we want it to call the existing `init` constructor once it has been decoded.

```swift
public required convenience init?(coder: NSCoder) {
    guard let aModel = coder.decodeObject(forKey: "model") as? String,
            let aMake = coder.decodeObject(forKey: "make") as? String
    else { return nil }
    
    self.init(make: aMake, model: aModel, tires: coder.decodeInteger(forKey: "tires"))
}
```

For `encode` method we will need to take the values of our class and encode them using the encoder passed into the method.

```swift
func encode(with coder: NSCoder) {
    coder.encode(make, forKey: "make")
    coder.encode(model, forKey: "model")
    coder.encode(tires, forKey: "tires")
}
```

By adding these two methods we have made our object serializable or archivable depending on the terminology you want to use. The final class should look like the following example.

```swift
class Vehicle: NSObject, NSCoding {   
    var make: String
    var model: String
    var tires: Int = 0
    
    open func encode(with coder: NSCoder) {
        coder.encode(make, forKey: "make")
        coder.encode(model, forKey: "model")
        coder.encode(tires, forKey: "tires")
    }
    
    public init(make aMake: String, model aModel: String, tires aTires: Int) {
        self.make = aMake
        self.model = aModel
        self.tires = aTires
    }
    
    public required convenience init?(coder: NSCoder) {
        guard let aModel = coder.decodeObject(forKey: "model") as? String,
              let aMake = coder.decodeObject(forKey: "make") as? String
        else { return nil }
        
        self.init(make: aMake, model: aModel, tires: coder.decodeInteger(forKey: "tires"))
    }
}
```

# Secure Coding

For archiving and unarchiving classes, Apple has provided the following classes for their different OSs.

* NSKeyedArchiver
* NSKeyedUnarchiver

Starting in iOS 12 Apple deprecated some of the original methods in these classes for performing the archiving, and added new methods that support 'Secure Coding'. Apple has provided a new protocol that your objects must support if you want to support 'Secure Coding'.

This new protocol called `NSSecureCoding` will require a boolean property be added to your class called 'supportsSecureCoding'. This flag can be used along with parameters to the archiving and unarchiving methods to enforce 'Secure Coding'.

Secure Coding will enable the encoding and decoding in a way that will prevent object substitution attacks. If an object substitution attack were to occur, it is possible that object being unarchived could inflate into an object that could potentially allow an attack.

Lets' add the `NSSecureCoding` protocol to our class.

```swift
class Vehicle: NSObject, NSCoding, NSSecureCoding {
    public static var supportsSecureCoding = true
    
    var make: String
    var model: String
    var tires: Int = 0
...
```

Now we can create a new instance of this 'Vehicle' class and archive to a 'Data' object.

```swift

let myVehicle = Vehicle(make: "Tesla", model: "Model 3", tires: 4)
let flatVehicle: Data?

do {
    flatVehicle = try NSKeyedArchiver.archivedData(withRootObject: myVehicle, requiringSecureCoding: true)
} catch {
    print("\(error.localizedDescription)")
}
```

In the example above we can see that `archivedData` function has a second parameter called `requiringSecureCoding`. This function can also throw an error if the function is unable to archive the object.

The `flatVehicle` object is of type `Data`, and can be written to the filesystem or some other persistent store.

If we want to unarchive that data, we can use the `NSKeyedUnarchiver` class.

```swift
do {
    let deserializedObj = try NSKeyedUnarchiver.unarchivedObject(ofClass: Vehicle.self, from: flatVehicle)!
    print("\(deserializedObj.make)") // Output: Tesla
} catch {
    print("\(error.localizedDescription)")
}
```

### Some other things

Not all classes are unarchivable using the `unarchivedObject(ofClass:from:` function. If you are using a datatype like a Swift `Dictionary`, you will have to use another function like the `unarchiveTopLevelObjectWithData` function which does not specify a specific data type.

# Conclusion

As you can see it is possible to serialize and deserialize objects on Macs, the iPhone, iPad and other Apple devices using the NSKeyedArchiver and NSKeyedUnarchiver classes. These utilities should be used with care and security in mind.   