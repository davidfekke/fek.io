---
layout: post
title: "Method Swizzling in Obj-C and Swift"
description: ""
category: 
date: 2021-09-29
cover_image: "./belinda-fewings.jpg"
---

One of the things I first came across when I started to work on legacy iOS applications was Method Swizzling. Swizzling lets' developers change the underlying implementation of a pre-existing method without having to change the original implementation. In affect you can swap one method with another method. JavaScript developers might be familiar with this concept if they have ever done monkey patching.

Most modern object-oriented and statically typed languages have a way of overriding existing methods if you inheriting from  base class. This is sometimes referred to as polymorphism. But what if you want to change the original implementation with out changing the original underlying code in the base class?

You can do this in most of Apple's languages using method swizzling. You may asking yourself why do this if you have the original code of the method you need to change. The main reason is usually if you are using a library that you can not change or do not have permission to alter, you can at least change the behavior of a method using swizzling at runtime.

## Objective-C Runtime

The runtime for Objective-C provides some nice utilities for executing operations at application runtime. You can use selectors to create references to method signatures in Objective-C, and then use those selectors to manipulate the runtime.

In the following example we have a class that has a method that we need to change. We will call the class `TaxCalculator` and our method that we want to swizzle `whatAreMyTaxes`.

```objective-c
// TaxCalculator.h
#import <Foundation/Foundation.h>

@interface TaxCalculator : NSObject

@property (nonatomic, retain) NSNumber *revenue;

-(NSNumber *)whatAreMyTaxes;

@end

// TaxCalculator.m
#import "TaxCalculator.h"

@implementation TaxCalculator

- (instancetype)init
{
    self = [super init];
    if (self) {
        _revenue = 0;
    }
    return self;
}

-(NSNumber *)whatAreMyTaxes {
    float rev = [self.revenue floatValue];
    float taxesDue = 0.39 * rev;
    NSNumber *nsTaxesDue = [NSNumber numberWithFloat:taxesDue];
    return nsTaxesDue;
}

@end
```

Now we are going to create a Objective-C category, which is like an extension in swift, to add a new method to our `TaxCalculator` class.

```objective-c
// TaxCalculator+rates2018.h
#import "TaxCalculator.h"

@interface TaxCalculator (rates2018)

-(NSNumber *)swizzle_whatAreMyTaxes;

@end

// TaxCalculator+rates2018.m
#import "TaxCalculator+rates2018.h"
#import "SimpleSwizzleHelper.h"

@implementation TaxCalculator (rates2018)

-(NSNumber *)swizzle_whatAreMyTaxes {
    float rev = [self.revenue floatValue];
    float taxesDue = 0.21 * rev;
    NSNumber *nsTaxesDue = [NSNumber numberWithFloat:taxesDue];
    return nsTaxesDue;
}

@end
```

This category adds a new method called `swizzle_whatAreMyTaxes`