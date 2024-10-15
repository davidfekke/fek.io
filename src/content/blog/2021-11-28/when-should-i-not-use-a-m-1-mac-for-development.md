---
title: "When should I not use a M1 Mac for development"
description: ""
tags: ["M1", "M1 Max", "M1 Pro", "Apple", "x86", "Intel"]
category: 
date: 2021-11-28
cover_image: "./pcb.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/cvuwrYnrjRE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I have made a number of videos on what kinds of development you can do on M1 Macs. Lately I have received a number of posts about specific cases where the M1 based Macs are not the best fit for certain types of software engineering.

Before we can discuss which type of development we can't do on these new M1 processors, we will need to look at what architecture the M1 is based on, and what has changed.

When I first started using Macs, they were based on a processor called Motorola 68000. In the mid-nineties Apple moved to another processor called the PowerPC. The PowerPC was based on a RISC processor, or reduced instruction set computing. At the same time PCs where using Intel based chips that were based on x86 architecture. The x86 chips are often referred to as `CISC` or complex instruction set computing.

Both chips were originally 32 bit processors, but both eventually made the transition to 64 bits. In the mid 00s the Intel chips started to outpace the performance of the PowerPC chips. Not only were the Intel chips faster than the PowerPC chips, they were also more energy efficient. 

Apple wisely at that time decided to transition away from the PowerPC to the Intel x86 architecture. When they made this change, I was extremely happy because I could now run x86 based software on my Mac. A number of companies also provided ways you could run Linux and Windows virtually on the Mac while using MacOS as the host operating system.

At the time I was doing .NET and SQL Server development. Now I could run both on the same laptop. This was a huge win for developers because we could run Microsoft software like Visual Studio, and still use the Unix style tools on the Mac.

A couple of years later Apple started secretly working on a new device that would be come known as the iPhone. Apple chose to use an ARM based processor for the first iPhone. 

ARM processors are a licensed design, not an actual type of chip. Any company that has a chip fab can license the ARM design, and make their own chips. Apple started designing their own chips for the iPhone and iPad. It is from this design that the new M1 chips are based. This is why you can run software that was compiled for the iPhone on one of the new M1 based Macs. 

The M1 based chips are more than just another ARM chip, they are specially designed by Apple to accelerate graphics processing along with machine learning. They are what is know as System on a Chip, or SOC.

The ARM architecture is actually a `RISC` based architecture. Microsoft has been making versions of Windows for years that will run on ARM based processors, but unlike Apple, you can still run x86 code on the M1s using Rosetta 2. Rosetta can emulate the instructions needed to run x86 code.

## Rosetta 2

While Rosetta is fine for the average user, it is not ideal for software engineers. While a lot of the tooling seems to run fine under Rosetta, there are certain things that do not. It is always better to have software that was written specifically to run the architecture you are using. 

## Mobile development

When we are writing software, we generally target a specific platform I like to define these into four different groups; Mobile, Desktop, Cloud or server and embedded. Most mobile devices use ARM based processors. For mobile developers the M1 is a good choice because you are essentially developing on the same chip architecture that your software will running on eventually. The M1 is a good option specifically for iOS and iPadOS development. The newest version of Android Studio has also been upgraded to develop on the M1 Macs.

## Desktop development

For years when writing software for desktop computers, Mac or PC, they both used x86 based processors. There are a number of static libraries that could be used in desktop applications. These libraries are typically written with compiled languages like C and C++. These libraries would need to be rewritten to run on M1 Macs, but a lot of these applications can still be run under Rosetta.

## Server development

Most servers still run x86 based processors. There are some exceptions like AWS's [graviton](https://aws.amazon.com/ec2/graviton/) EC2 service. If you are writing software for cloud based infrastructure you most likely want to use the same type of processor architecture as the machine you are developing on.

## Predicting the Future

Apple usually tries to stay out in front of the rest of the industry when comes to using certain technology as well as dropping technology. The real question now is when will the rest of industry follow what Apple has done with their hardware. Intel is trying to catch up with TSMC's 4 nanometer process, which I am sure they will at some point. The other advancement with the M1 processor is the system on the chip (SoC) architecture. I would not be surprised if Microsoft, Intel and AMD follow suit with similar designs.   

## Docker buildx

One solution that developers may be interested in using is Docker's new buildx feature.

```shell
$ docker buildx build --platform=value[,value]
```

With this build command you can target multiple platforms as in this example below;

```shell
$ docker buildx build --platform=linux/amd64,linux/arm64,linux/arm/v7 .
```

Now you can create a docker image that supports multiple processors.

## Conclusion

At the end of the day you will probably want to develop on similar technology that you are planning on targeting. A lot of systems and languages are processor independent. Languages such as Java, JavaScript, .NET, Python, Ruby are either interpreted or run on a intermediate runtime can be written on just about any processor. 

Compiled languages like Golang, Rust, C, C++, Objective-C and Swift are compiled for the processor. These compiled languages should probably be developed on a computer that uses a similar architecture.
