---
title: "How to Create an Objective-C class"
description: ""
category: 
date: 2021-02-23
cover_image: "../unnamed.jpg"
---

# Creating a Class in Objective-C


<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/PoLIIdtie9M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Most modern object oriented languages have the capability of creating a class. Java, C#, Swift and Kotlin all have classes. C++ and Objective-C are a little bit different because they require that you have two files for defining a class. 
These files end with a '.m' and '.h' extension. The '.h' file is the header file and the '.m' file is the implemenation file. 

The header is generally used for defining public methods, properties and instance variables. The implementation file is used for implmenting the actual methods. Lets take a look at a simple class;

```objc
//
//  Person.h
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject {
    NSString *firstName;
    NSString *lastName;
}

-(instancetype)initWithFirstname:(NSString *)first lastname:(NSString *)last;
-(NSString *)fullname;

@end

NS_ASSUME_NONNULL_END

```

As you can see from above this header has `@interface` keyword used to define the class. The `@end` keyword is used to define the end of our header definition. The class is named `Person` and is followed by a `:` and a `NSObject`. When defining your class the word following the colon is the class you are inheriting from. 
All Objective-C classes must inherit from a parent class. `NSObject` is the basis for all Objective-C classes, but you can inherit from other classes.

## Instance Variables
Instance variables, sometimes called 'ivars', are defined in the curly braces after the end of the `@interface` line. In the example above we have two variables we have defined for the 'firstName' and the 'lastName'.

## Method signatures

After the `@interface` line or the curly braces we can define properties or methods. In the example above we have defined to methods. The actual methods will be implemented in the implemetation file later on, but here we defined two methods and their parameters.

## Implementation file

```objc
#import "Person.h"

@implementation Person

- (instancetype)init
{
    self = [self initWithFirstname:@"" lastname:@""];
    return self;
}

-(instancetype)initWithFirstname:(NSString *)first lastname:(NSString *)last {
    self = [super init];
    if (self) {
        firstName = first;
        lastName = last;
    }
    return self;
}

-(NSString *)fullname {
    return [[NSString alloc] initWithFormat:@"%@ %@", firstName, lastName];
}


@end

```

The implementation file begins with a `@implementation` and ends with the `@end` keyword. We begin our file with an import statement for importing the header we defined before. Inside of the implenmentation is where we define the logic for our methods. Any method that has a return type of `(instancetype)` is used for returning the type of the class, which in this case is one of two inits or constructors we defined.