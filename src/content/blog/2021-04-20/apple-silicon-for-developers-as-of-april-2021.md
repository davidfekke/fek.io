---
title: "Apple Silicon for Developers as of April 2021"
description: ""
category: 
date: 2021-04-20
cover_image: "./apple_new-imac-spring21_hero_04202021.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/eysQu3pFNa8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I posted a [video](https://www.youtube.com/watch?v=eysQu3pFNa8) to Youtube back in November on whether Apple Silicon M1 Macs could and should be used by Developers and Software Engineers. I received more views for that video than any other video, with the exception of one I made of my broken [air conditioner](https://www.youtube.com/watch?v=HJer7aPM6tk). 

As I write this, Apple did their big April 20th, 2021 product announcements. One of the products they announced was the new [M1 iMac](https://www.apple.com/newsroom/2021/04/imac-features-all-new-design-in-vibrant-colors-m1-chip-and-45k-retina-display/). I have not purchased one of the new M1 Apple Silicon Macs yet, but I may buy one of these iMacs. The computer I am writing this on right now is a 27" iMac with an I7 processor.

I primarily use my iMac for development, so I wanted to see where the development tools I use are as far as support for the new M1 Macs. When the M1 Macs were first released, there was pretty good support for regular user software through either universal apps or through a program on the Mac called Rosetta 2 that will allow you to run x86_64 code on an M1 chip. Lets' take a look to see where we currently are with the tools that developers need.

# Tools
Homebrew is similar to package managers like apt-get on Linux or Chocolatey on Windows. It is a command line tool for installing applications and libraries targeting Unix like operating systems. When the original M1s were released, there was not good support for Homebrew. My understanding is that it has been completely [ported](https://www.imore.com/package-manager-homebrew-now-fully-supports-apple-silicon) to the new ARM64 based architecture.

# Integrated Development Environments and Code Editors

* Xcode: This is fully supported on the M1 Macs as a Universal App. Xcode also has cli based tools for compiling code for Homebrew and other tools.
* Android Studio: Google currently has a developer preview available that runs on the M1. There is basic support for running Android simulators, but your best success will be trying to run directly on a device.
* Visual Studio Code: The editor is very popular with Web Developers, and has wide language support. Microsoft has released it as a Universal App, so it will run natively on both M1s and x86 based Macs.
* JetBrains: This IDE is very popular with Java developers, and it now fully supports the M1 processor.
* Eclipse: Here is a Java IDE I stopped using nearly 20 years ago. There is currently no builds of this for the M1 processor, but you can supposedly run it using Rosetta 2.

# Language Support

* C, C++, Objective-C and Swift: All of these languages have native compiler support on the M1 Macs through Clang and the Swift compiler. These come included with the Xcode tools.
* Java: The Oracle [OpenJDK](https://www.azul.com/downloads/zulu-community/?os=macos&architecture=arm-64-bit&package=jdk) currently has support for the M1 processors.
* Node.js: This very popular JavaScript runtime can now run natively as of Node.js v16. If you are looking for a long term support release, you will have to compile from source or run under Rosetta 2.
* Python: Python now has native support for the M1 processor.
* R: No support for the R programming language. The reason for this is because R is built using a newer version of Fortran. Fortran code can be converted to C, but only Fortran-77. R was built with a newer version of Fortran.
* Go Lang: Go is now fully supported on the M1 processor.
* Rust: The Rust compiler was built with LLVM, the same compiler technology used for Xcode languages. It is now supported on the M1 processor.

# Docker and Virtualization
* Docker: There was an early release of Docker that came out last year, but as a couple of days ago Docker [released](https://www.docker.com/blog/released-docker-desktop-for-mac-apple-silicon/) full support for the M1 processor. Docker supports images that run on both ARM and x86.
* VMWare Fusion: VMWare says they are commited to an M1 version, but they have had no annuncements around an M1 release. Hopefully they will have something soon.
* Parallels: As of April 19th, Parallels just [released](https://www.parallels.com/blogs/Parallels-Desktop-M1/) Desktop 16.5 for the Mac.
* UTM: This looks like a newcomer. I think it is based on QEMU, but this [app](https://mac.getutm.app/) will allow you to run Windows and Linux based ARM OSs.

# Frameworks
* .NET: .NET 6.0 which is in preview has a installer for the M1 based Macs. If you are trying to run an earlier version, you will need Rosetta 2.
* Electron: Electron is a framework for turning HTML and JavaScript based applications into Desktop apps. Visual Studio COde is based on Electron. Electron is now natively supported on the M1 processor.
* Flutter: This works under Rosetta 2. No word yet when it will be native on the M1 processor.

# Conclusion

When I first looked at developer support for Apple Silicon when the M1 Macs were first released, the support was really poor. As of today, the support looks much better. Some of the native tools are in a preview and are not official releases. If you are doing Android development, you may want to keep using an x86 based machine. For most other kinds of development the M1s look a lot safer than they did in November 2020.

Please do your own homework to make your own decision, but I hope the research I have done can assist.