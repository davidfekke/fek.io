---
layout: post
title: "Method Swizzling in Obj-C and Swift"
description: ""
category: 
date: 2021-09-29
cover_image: "./unnamed.jpg"
---

One of the things I first came across when I started to work on legacy iOS applications was Method Swizzling. Swizzling lets' developers change the underlying implementation of a pre-existing method without having to change the original implementation. In affect you can swap one method with another method. JavaScript developers might be familiar with this concept if they have ever done monkey patching.

Most modern object-oriented and statically typed languages have a way of overriding existing methods if you inheriting from  base class. This is sometimes referred to as polymorphism. But what if you want to change the original implementation with out changing the original underlying code in the base class?

You can do this in most of Apple's languages using method swizzling. You may asking yourself why do this if you have the original code of the method you need to change. The main reason is usually if you are using a library that you can not change or do not have permission to alter, you can at least change the behavior of a method using swizzling at runtime.