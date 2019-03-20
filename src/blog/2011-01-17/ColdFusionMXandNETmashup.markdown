---
layout: post
title: "ColdFusion MX and .NET mashup"
category: "Blog"
date: 2011-01-17
---


I am a firm believer in not re-inventing the wheel. My company has a text parser that was written in ColdFusion. It typically processes one document. I just finished a project where I had to process 200,000 documents. The kicker was almost all of these documents where Microsoft Word files. I needed to write an application that could read Word files and convert them to text files. I used the COM interop features built into .NET 2.0 to accomplish this task.

I also wanted to have a way to monitor the progress of this conversion. I used Windows forms and the progress bar component to do this part.

I kept the parsing functions in ColdFusion, and passed the text to a ColdFusion SOAP web service.

The end result was able to come up with a solution in a day without having to rewrite all of the functionality in C# or Java.