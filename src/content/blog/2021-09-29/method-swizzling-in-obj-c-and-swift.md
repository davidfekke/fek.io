---
title: "Method Swizzling in Obj-C and Swift"
description: ""
tags: ["objective-c", "method swizzling", "Apple", "iOS"]
category: 
date: 2021-09-29
cover_image: "./belinda-fewings.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/EubqhkP1ggw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

One of the things I first came across when I started to work on legacy iOS applications was Method Swizzling. Swizzling lets' developers change the underlying implementation of a pre-existing method without having to change the original implementation. In affect you can swap one method with another method. JavaScript developers might be familiar with this concept if they have ever done monkey patching.

Most modern object-oriented and statically typed languages have a way of overriding existing methods if you are inheriting from  base class. This is sometimes referred to as polymorphism. But what if you want to change the original implementation with out changing the original underlying code in the base class?

You can do this in most of Apple's languages using method swizzling. You may asking yourself why do this if you have the original code of the method you need to change. The main reason is usually if you are using a library that you can not change or do not have permission to alter, you can at least change the behavior of a method using swizzling at runtime.

## Objective-C Runtime

The runtime for Objective-C provides some nice utilities for executing operations at application runtime. You can use selectors to create references to method signatures in Objective-C, and then use those selectors to manipulate the runtime.

In the following example we have a class that has a method that we need to change. We will call the class `TaxCalculator` and our method that we want to swizzle `whatAreMyTaxes`.

```objc
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

```objc
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

This category adds a new method called `swizzle_whatAreMyTaxes`. This will be the method we use to swizzle the original method `whatAreMyTaxes`. 

In order for our application to use the swizzled method, we will need to swap the methods when our application is first loaded. We will use Objective-C's `load` method to swap our methods. The `load` method on a class always executes when the application is initialized. We will also need to make sure that this is loaded only once. We will use grand central dispatch (GCD) to make sure that the method is only loaded once. The implementation will look like the following example;

```objc
+ (void) load {
    if (self == TaxCalculator.self) {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            Class class = [self class];
            
            SEL originalSelector = @selector(whatAreMyTaxes);
            SEL swizzledSelector = @selector(swizzle_whatAreMyTaxes);

            Method originalMethod = class_getInstanceMethod(class, originalSelector);
            Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
            
            method_exchangeImplementations(originalMethod, swizzledMethod);
        });
    }
}

```

Looking at the method above, lets' break down what we are doing for each line. The first thing we do in the load method is check that `self` is an instance of the TaxCalculator class. Once we have verified we are loading the correct class at runtime, we create a `dispatch_once_t` token which we will use in the `dispatch_once` method. This method takes two parameters, the first being the address to the token, and the second being a closure or block.

In out `dispatch_once` closure we create a reference to the current class by using the `Class` type and calling `[self class]`. Then we can create two selectors for our original method and our swizzled method. In Objective-C we use `@selector` method to get the reference to our method signatures.

After defining our selectors, we will need to get the actual method reference. Here is where we start using the Objective-C runtime. We will create references for both methods using the `class_getInstanceMethod` method. If you are swizzling out class methods, there is a different runtime method you can use called `class_getClassMethod`. Both methods take the class reference and selector references as parameters.

Now that we have both method references, we swizzle them using the `method_exchangeImplementations` method. This method can also be used to swap them back.

## Swizzle utility

I created a utility class that you can use to easily swap out either instance or class methods. Here is my `SimpleSwizzleHelper` class;

```objc
// SimpleSwizzleHelper.h header file

//
//  SimpleSwizzleHelper.h
//  SwizzleExample
//
//  Created by David Fekke on 9/29/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SimpleSwizzleHelper : NSObject

+ (void)swizzleMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz isInstanceMethod:(BOOL)isInstanceMethod;
+ (void)swizzleInstanceMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz;
+ (void)swizzleClassMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz;

@end

NS_ASSUME_NONNULL_END

// SimpleSwizzleHelper.m implementation file

//
//  SimpleSwizzleHelper.m
//  SwizzleExample
//
//  Created by David Fekke on 9/29/21.
//

#import "SimpleSwizzleHelper.h"
#import <objc/runtime.h>

@implementation SimpleSwizzleHelper


+ (void)swizzleMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz isInstanceMethod:(BOOL)isInstanceMethod {
    Method originalMethod;
    Method swizzledMethod;
    
    const char *className = [NSStringFromClass(clazz.self) UTF8String];
    Class myClazz = objc_getMetaClass(className);
    
    if (isInstanceMethod) {
        originalMethod = class_getInstanceMethod(clazz, originalSelector);
        swizzledMethod = class_getInstanceMethod(clazz, swizzledSelector);
        method_exchangeImplementations(originalMethod, swizzledMethod);
    } else {
        originalMethod = class_getClassMethod(myClazz, originalSelector);
        swizzledMethod = class_getClassMethod(myClazz, swizzledSelector);
        BOOL didAddMethod = class_addMethod(myClazz, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        
        if (didAddMethod) {
            class_replaceMethod(myClazz, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
    }
}

+ (void)swizzleInstanceMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz {
    
    Method originalMethod = class_getInstanceMethod(clazz, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(clazz, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
}

+ (void)swizzleClassMethod:(SEL)originalSelector with:(SEL)swizzledSelector forClass:(Class)clazz {
    const char *className = [NSStringFromClass(clazz.self) UTF8String];
    Class myClazz = objc_getMetaClass(className);
    
    Method originalMethod = class_getClassMethod(myClazz, originalSelector);
    Method swizzledMethod = class_getClassMethod(myClazz, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
}

@end
```

Using this helper class, we can now refactor our load method to enable the swizzling. Note that `SimpleSwizzleHelper` can handle both instance and class methods.

```objc
+ (void) load {
    if (self == TaxCalculator.self) {
        [self enableSwizzledMethods];
    }
}

+ (void) enableSwizzledMethods {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];
        
        SEL originalSelector = @selector(whatAreMyTaxes);
        SEL swizzledSelector = @selector(swizzle_whatAreMyTaxes);
        [SimpleSwizzleHelper swizzleMethod:originalSelector with:swizzledSelector forClass:class isInstanceMethod:YES];
    });
}
```


[Example Swizzling repo](https://github.com/davidfekke/SwizzleExample)

## Conclusion

Method swizzling is a very powerful feature that comes as part of the Objective-C runtime. Be wary of using this feature. This should only be used when you are not able to change the underlying implementation directly.

Any developer using this feature should also be careful about swizzling out methods where you do not know what the original implementation, i.e. you have the headers and a static library, but no access to the original code. I would also avoid swizzling out any system code from Apple's operating systems. This can cause harm if not used properly.

Now that you have read this post, have fun swizzling!