---
layout: post
title: "CFCs ease adoption of C#"
category: "Blog"
date: 2011-01-17
---


I have finished up some projects recently developing C# windows form based applications. When .NET was first released in beta, I took a look at it and joined a C# User Group, but I never developed any applications. About that same time, Macromedia released a beta of ColdFusion MX with these new things called components. I looked at the syntax and observed that they were really class based objects. That was enough to keep me busy for the next couple of years.

My next job was working at a company that needed to rearchitect a web application where the business logic needed to be reused throughout several front ends web sites. They were looking at using Custom Tags. I evangilized using CFCs instead because that seemed to be a much better way to implement backend reuse. They also worked better as a BlackBox. Custom Tags can arbitralily pull values from any scope and place values back into those scopes or the caller scope. Custom Tags do not offer true encapsulation.

I have had a lot of religous arguments with other developers about whether ColdFusion is truly Object Oriented language now. It is true that CFCs do not offer method overloading and a true way of implementing interfaces, but you can still do most of what you would be able to do with Java or other Object Oriented languages.

The end result was I learned a lot about writing Object Oriented code and Object Oriented design patterns.

When I started writing these new programs in C# I had not looked at the language or .NET in about three years. I was able to write these programs with little or no effort mainly to do with the fact that I was familiar with the concepts of Object Oriented development from working with CFCs. 

My biggest learning curve came from learning the .NET API. I had some experience working with ADO from ASP 3.0\. Microsoft has made some nice enhancements to ADO for .NET 2.0\. 

I am usually the first person to criticize Microsoft, but they have some very nice development tools and a very nice framework now. I am still not sold on ASP.NET.

At my current job we use a lot of different tools including a hardware router for integrations. I am a firm believer in using the right tool for the right job. Dot NET will make a nice complement to the tools that we already use.