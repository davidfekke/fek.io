---
layout: post
title: "CFDump on .NET"
category: "Blog"
date: 2011-01-17
---


I have been developing almost exclusively in C# .net for about a year now. In that time, I have wished for some of the language functionality in ColdFusion to find its way into C#. I have been using Visual Studio 2008 since it came out, and I found a project that is used to test Linq called ObjectDumper. It compiles a class called ObjectDumper that can be used for dumping the value of just about any object into a command line. Here is some sample syntax; [code:c#][/code]>

```c#
using System; using System.Collections.Generic;  
using System.Linq;   
using System.Text; 


namespace DumperTest { [

class Program 
{ 
	static void Main(string[] args) 
	{ 
		var myObject = new[]  
		{ 
			new { Name = "Chris Smith", 
			PhoneNumbers = new[] { "206-555-0101", "425-882-8080" } 
			}, 
				new { Name = "Bob Harris", 
				PhoneNumbers = new[] { "650-555-0199" } 
			}	 
		}; 
		var myPets = new[] 
		{ 
			new { name = "Spike", number=9 }, 
			new { name = "Snoopy", number=7 } 
		}; 
			ObjectDumper.Write(myObject); 
			ObjectDumper.Write(myPets); 
		} 
	} 
} 
```