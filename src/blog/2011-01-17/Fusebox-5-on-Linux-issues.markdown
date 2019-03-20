---
layout: post
title: "Fusebox 5 on Linux issues"
category: "Blog"
date: 2011-01-17
---


I have a site that I run that is on a Linux server. I just finished writting an application in fusebox 5, and I noticed the following problems.

Since Fusebox 4, the framework actually compiles code into a "parsed" directory. I tried to reparse my app using the fusebox.cleanbuild=true url parameter, and I got the following error;

<div class="code">An Error during write of Parsed File or Parsing Directory not found.  

 Attempting to write the parsed file 'circuit.filename.cfm' threw an error. This can also occur if the parsed file directory cannot be found.</div>
I changed the "parse" directory to have permissions set at "777" so that the public group had permission to write. I am pretty sure that Fusebox 4 has the same issue, but I have not been able to verify.