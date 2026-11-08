---
title: "Understanding Rust's memory ownership, references, borrowing and lifetimes"
tags: ["Rust", "C", "C++"]
description: "Understanding Rust's memory ownership, references, borrowing and lifetimes"
category:
date: 2026-11-07
cover_image: "./understanding-rust-s-memory-ownership-references-borrowing-and-lifetimes.png"
---

I am starting to learn the [Rust](https://rust-lang.org/) programming language. There are many reasons why I have decided to learn Rust. I try to learn a new programming language once a year, even if I am not going to use that language. 

I am also learning Rust because it is being used in more and more projects for speed. When you write your code in Rust, you can compile it to run natively on just about any processor and operating system. Many projects in the Node.js ecosystem have been rewritten to run in Rust, including [Vite](https://vite.dev/) and [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). [Bun](https://bun.com/) was recently rewritten to run in Rust.

Rust is even being used in the Linux kernel, and in Windows.

I have used other native languages like [C](https://www.c-language.org/), [Swift](https://www.swift.org/) and [Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html), but Rust has some features that make it unique when it comes to the way it handles memory. Most programming languages either force you to do your own memory management or have a runtime that uses a GC (garbage collection). I have used languages that have a garbage collector before, and they are nice because you don't necessarily have to do your own memory management. Garbage collection systems are not perfect, and can offer drawbacks. The JVM famously has to do pause in order to clean up unused memory. This made it problematic for game development on Android as an example drawback.

There is a third option for memory management, and that is the approach that is used in languages like Swift and Rust. Most of the memory cleanup is done in the compiler. This eliminates need for having a complex runtime. Apple accomplished this by using ARC, or automatic reference counting. Apple toyed around with using a garbage collector in Objective-C in the mid 00s, but dropped in favor of ARC.

Formerly in Objective-C if you declared a reference type object, you would have to release that object when you were done. Here is an example:

```objective-c
NSString *aString = [[NSString alloc] initWithFormat:@"%@ %@", @"First", @"Second"];
NSLog(aString);
[aString release]; // You used to have do this in your Obj-C code or you would have memory leaks.
```

When Apple introduced ARC, you no longer had to call the release method on the object, the LLVM compiler would add that into the compiled executable automatically.

Rust uses similar conventions when it comes to managing memory, but also adds its own rules for safety. Some of these features include ownership, borrowing, references and generic lifetime notation. 
I am going to attempt explain all of these different concepts in this post.

## Ownership

When you assign a reference typed value in Rust, it will allocate that memory on the heap. Once the variable for that reference is out of scope, Rust will dispose of that variable, as in the example below:

```rust
{
    let s = String::from("Hi there!");
    println!("{}", s);
} // At the end of this scope, the variable `s` is dropped by the compiler
```

So after the curly braces, you could no longer access `s` in your code. This is because once a value is out of scope, the rust compiler will use a method on that value called `drop`. This is very similar to the `free` method in C, but as a Rust programmer, or a Crustacean, this is done automatically.

Now if you want to assign that string in `s` to another variable, you can do that, but `s` will no longer own that that value. The following example would fail if you tried to run or compile the code.

```rust
let s1 = String::from("Hi there!");
let s2 = s1;
println!("{}", s1); // This will throw an error because s1 is no longer the owner of the string value, s2 is.
```

When you assign `s1` to `s2`, you reassign the pointer to the memory were the string is located in the heap. `s` will no longer contain that pointer to the string, but `s2` will have the pointer to the string. Rust does this because it is faster to reassign the pointer then it is to copy the value to another location in the heap. Copying or cloning all of the data in a reference type is an expensive operation. 

Something else you can't do in Rust is modify the value in `s` because when you define a variable in Rust it is immutable by default. You can override this behavior and make the variable mutable by add the `mut` keyword between the `let` and the variable name. So if you need to modify a string value, you can do this using the following example:

```rust
let mut s = String::from("My name is ");
s.push_str("David."); // push_str() appends a literal to a String
println!("{s}"); // this will print `My name is David.`

```

The scope of your variables also will be dropped if you pass that value into a function unless that function returns the value back. Here is an example of a function taking ownership of a string:

```rust
fn main() {
    let s1 = String::from("Some string");
    print_string(s1);
    // s1 no longer accessible
    let s2 = String::from("Another string");
    let s3 = prints_and_gives_back_str(s2);
    // s3 is still in scope
}

fn print_string(a_string: String) {
    println!("{}", a_string);
}

fn prints_and_gives_back_str(a_string: String) {
    println!("{}", a_string);
    a_string
}
```

## Borrowing

Rust makes heavy use of `borrowing` of a value rather than having to reassign ownership. This allows for a variable to be reused without having to give up ownership of that value. This can be done by prepending an `&` symbol to the beginning of a parameter or a variable. This creates a reference back to the original value. This is also known as a pointer. Consider the following example:

```rust
let s1 = String::from("My string value");
let r1 = &s1; // r1 becomes a reference to s1, but s1 is still the owner
```

This comes in real handy if you need to pass a reference into a function, but do not want to give up ownership.

```rust
fn main() {
    let s1 = String::from("My string value");
    let len = get_length_of_string(&s1);
    println!("The length of this string {} is {}.", s1, len);
    // This will print "The length of this string My string value is 14"
}

fn get_length_of_string(a_string: &String) -> usize {
    s_string.len()
}
```

If you want to mutate a value of a reference, you have to explicitly add the `mut` keyword to both the reference and the signature of the function.

```rust
fn main() {
    let mut s = String::from("My name is ");

    add_my_name_to_string(&mut s);
    println!("{}", s); // My name is David.
}

fn add_my_name_to_string(a_string: &mut String) {
    a.push_str(" David.");
}
```

Something to watch out for is trying to reference a value with different mutability. For instance, the rust compiler will throw an error if you try to reference two different variables with different mutabilitys.

```rust
let mut s = String::from("This my first reference");

let r1 = &s;
let r2 = &s;
let r3 = &mut s; // This last reference will throw an error
```

Rust will let you set a variable to a mutable reference if the previous immutable variables have been used.

```rust
let mut s = String::from("This my first reference");

let r1 = &s;
let r2 = &s;
println!("{} {}", r1, r2);
let r3 = &mut s; // This will now compile because the previous two references have been used
println!("{r3}"); 
```

## Slices

The slice type lets you select a series of elements in array. This is commonly used in the String type, but could be used with any array. A series of values can be returned by using the following index notation.

```rust
let a = [1, 2, 3, 4, 5];

let int_slice = &a[2..4];

assert_eq!(int_slice, &[3, 4]);
```

If you want to grab every item from that array, you could express it this way:

```rust
let len = a.len();
let int_slice = &a[0..len];
// or like this
let int_slice = &a[..];
```

## Generic Lifetimes Annotation

A Generic Lifetimes Annotation in Rust is how we can describe to the compiler the lifetime of multiple references and how they relate to each other. Take the following function that compares the length of two strings:

```rust
fn shortest_str(a: &str, b: &str) -> &str {
    if a.len() > b.len() {
        b
    } else {
        a
    }
}
```

The Rust compiler will not know how to compile this because it does not know the lifetimes of the two references for `a` and `b`. We can assign a generic lifetime to this function by using the `'` notation. When I first saw this feature Rust, it confused me because I have only seen types referenced in generic syntax. Let's take a look at how we can modify this to compile by letting the compiler how to compare lifetimes.

```rust
fn shortest_str<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        y
    } else {
        x
    }
}
```

It is also possible to make variables static for the lifetime of the application using similar syntax like the example below:

```rust
let endpoint_url: &'static str = "https://fek.io/api/v1";
```

Using the `static` after the `'` tells the compiler that the `endpoint_url` will be available over the lifetime of the application.

## Summary

The best way to learn a new language is by trying to use that language. A lot of developers are starting to use Rust because they have access to the many different agentic coding tools, but it is worthwhile learning the language so you can understand what is going on in the language.

Rust also has excellent documentation. I have been using the official [Rust book](https://doc.rust-lang.org/book/). I also joined an online study group. Everything I put into this post can be found in chapters four and 10.