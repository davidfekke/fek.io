---
layout: post
title: "Adding folders and files to Sharepoint document libraries"
category: "Blog"
date: 2011-01-21
---


I am working on project now where we are creating reports and saving them to a document library in Sharepoint 3\. I am automating this by using .NET code to create the subdirectories and files in the document library. I have not seen a lot of good code examples on how to do this on the internet, but this is how I am doing it in C#.

When I add a folder to the document library I used the following code;

<pre class="brush: csharp;">SPSite mySite = new SPSite("http://sitename/");
SPWeb myWeb = mySite.AllWebs["mywebname"];

SPFolderCollection myFolderCollection = myWeb.GetFolder("http://sitename/sites/mywebname/PDF Reports").SubFolders;
myFolderCollection.Add("FolderName");
</pre>
To add a file from a filestream, I used the following code;

<pre class="brush: csharp;">FileStream stream = File.Create("report.pdf", result.Length);

SPSite mySite = new SPSite("http://sitename/");
SPWeb myWeb = mySite.AllWebs["mywebname"];

SPFileCollection destFiles = myWeb.GetFolder("http://sitename/sites/mywebname/PDF Reports/FolderName").Files;
destFiles.Add("report.pdf", stream, true);

stream.Close();
</pre>