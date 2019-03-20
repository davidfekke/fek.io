---
layout: post
title: "Converting Image files in InfoPath to gifs once submitted"
category: "Blog"
date: 2011-01-17
---


I have been developing a lot of windows workflows and web services in .NET recently. I came across a need to convert a WMF file (Windows Meta File) into a gif file. SQL Server Reporting Services can not display WMF files.

.NET 2.0 can convert and resize images natively. Here is how I converted the WMF files. First I added the following using statements;

[code:c#]

using System.Drawing;

using System.Drawing.Imaging;

[/code]>

InfoPath saves images as Base64 strings, and .NET treats this as a byte array. So I had to convert the WMF byte array to a gif byte array.

[code:c#]

byte[] imageByteArray = DiagramImage;

MemoryStream inStream = new MemoryStream(imageByteArray);

StreamReader myStreamReader = new StreamReader(inStream);

Image myImage = Image.FromStream(inStream);

Bitmap myBitmap = new Bitmap(myImage);

Graphics myGraphics = Graphics.FromImage(myBitmap);

//Keep background white.

myGraphics.Clear(Color.White);

myGraphics.DrawImage(myImage, 0, 0, myImage.Width, myImage.Height);

MemoryStream outStream = new MemoryStream();

myBitmap.Save(outStream, ImageFormat.Gif);

byte[] gifByteArray = outStream.GetBuffer();

[/code]>