---
title: "Top 10 Programming Languages to learn in 2022"
description: ""
tags: ["Node.js", "JavaScript", "C", "C++", "C#", ".NET", "Python", "Shell", "Julia", "Java", "Swift", "Rust"]
category: 
date: 2021-12-27
cover_image: "./clement-helardot.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/RRVaoejqgi0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Every computer programmer/software engineer should learn a new programming language each year. In the book the Pragmatic Programmer, the book postulates that everyone should try to learn a new programming language each year. I decided to compile a list of languages that if you are not really familiar with, you might be interested in learning more about the language.

## 10: Shell Scripting

Whether you use bash, zsh or powershell, shell scripting is becoming more important with cloud based computing. Most cloud environments solely use command line based terminals. Continuous Integration and Continuous Deployment (CI/CD) are heavily dependant on shell scripting. 

Shell scripts allow for easily repeatable steps to ensure that your environments are always configured the same way each time a deployment is performed. 

## 9: Julia

Julia has been becoming more important over the last couple of years as it is being used for data science and other scientific based computing, but can also be used for writing micro-services. Julia is dynamically typed with the feel of a scripting language, but is compiled and extremely efficient. 

```julia
# Taken from: https://rosettacode.org/wiki/Mandelbrot_set#Julia
function mandelbrot(a)
    z = 0
    for i=1:50
        z = z^2 + a
    end
    return z
end

for y=1.0:-0.05:-1.0
    for x=-2.0:0.0315:0.5
        abs(mandelbrot(complex(x, y))) < 2 ? print("*") : print(" ")
    end
    println()
end
```

Julia has features that make it easy to use object oriented and functional style programming. Julia is open source and has a package manager.

## 8: C++/C

The C programming language has been around since the 70s, but continues to be staple when it comes to doing lower level systems programming. C++ adds types and object oriented features on top of C. While C does not change or get new features frequently, C++ receives new features every couple of years.

C has been criticized for not being as safe as other languages, but there are tons of pre-existing applications and operating systems built on C. In fact, C was originally created to help create UNIX. C is also the primary language used in the Linux kernel.

Pointers and manual memory management are some of the programming concepts are some of the concepts you will have to master in order to write C, but C++ now has features like smart pointers that make this type of programming easier. These languages will be in high demand for some time.

## 7: C#

C#, also pronounced C-sharp, is the main language used for .NET development. While many associate C# and .NET as Microsoft technologies, they have been open sourced and multi-platform for years. You can run C# code on Windows, Linux and MacOS. 

C# is a type based object oriented language like Java or C++, but has many functional features. C# is primarily used for writing web applications and services, but it can also be used for creating desktop applications or even IoT applications.

.NET is still heavily used in the enterprise with 20 years of legacy code and projects, so there will be many opportunities with C# for the forseeable future.

## 6: Java

Java is a general purpose, type based object oriented language like C# and C++. This language is very mature and has been around for a quarter of a century. Java excels at network based computing such as web services and web applications. Java is also used for mobile applications on the Android operating system.

Unlike C and C++, Java uses a feature called garbage collection for memory management. The garbage collector is part of the Java virtual machine, and cycles through the memory of an application shedding stored values once they are no longer needed. This eliminates most of the memory management from the programmer.

```java
public class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Prints the string to the console.
    }
}
```

## 5: Python

Python was originally developed as a scripting language, but has become popular with data scientists and machine learning engineers. Python is an interpreted general purpose language with dynamic typing.

Python has become even more popular in recent years because of machine learning/AI libraries like Tensorflow.

Python is also popular as a learning language, but can be used to write web applications and services.

Python is unique in that blocks are defined with indentation. If you do not format your code correctly, it will not run correctly as you can see from the example below.

```python
n = int(input('Type a number, and its factorial will be printed: '))

if n < 0:
    raise ValueError('You must enter a non-negative integer')

factorial = 1
for i in range(2, n + 1):
    factorial *= i

print(factorial)
```

## 4: Go Lang

Golang or Go is a newer language developed by Google as a possible replacement for C. Go is a strongly typed general purpose language, but unlike Java or C++ is not object oriented. 

All Go code has to be compiled from source, which means you can not include in pre-compiled libraries. Go can be compiled to run on many different operating systems and processor architectures. 

Go simplifies asynchronous programming with a feature called Go routines. These routines are designed to take advantage of modern processors that have multiple cores. This makes it easier for the programmer to write code without having to do manual thread management.

## 3: JavaScript

JavaScript, also known as EcmaScript, is the primary language used in all web browsers. JavaScript has become even more popular since Node.js was introduced in 2009. With Node, JavaScript programmers can write code for both client side and server side applications, or the full stack.

JavaScript may look similar to Java or C, but more closely models functional languages like Scheme or Clojure. JavaScript is also dynamically typed like Python.

## 2: Swift

Swift was originally introduced by Apple in 2014 has since become open sourced and can be used for writing mobile and desktop applications as well as server applications running on Linux or Windows.

Swift has modern features like type inference and optional syntax, but also recently received a major update with support for asynchronous programming with `async/await` syntax and `actors`. These features make it easier for programmers to take advantage of multiple core processor architectures.

Swift is unique in that it can be used as a teaching language as well one for writing operating systems.

## 1: Rust

Rust was originally introduced by the Mozilla organization. It is type base general purpose programming language like Go, but has safety built into the language be default. 

One of the key features of Rust is the concept of memory safety and ownership. Rust does not allow for dangling pointers or null pointers. All inputs must be initialized. All values must have a unique owner.

## Conclusion

These languages just scratch the surface of some of the popular languages that are out there to learn. I sure that there are some I have not mentioned in this post that deserved to be mentioned.

If you are looking for a scripting language, consider learning Python or JavaScript. If you are looking at enterprise development, you might want to take a look at C# or Java. If you are interested in writing lower level applications, C/C++ or Rust might fill that need.

If you are looking at doing high performance cloud based applications, you can take a look at Go lang or Rust. 

## Update

I received a note from [Toptal](https://toptal.com) about an [article](https://www.toptal.com/c-sharp/c-sharp-vs-c-plus-plus) they have comparing C# to C++. It covers the full history and differences between the languages. Please check it out if you like this post.