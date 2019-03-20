---
layout: post
title: "Converting WMF files to Gif files in ColdFusion 8 using the .NET interop"
category: "Blog"
date: 2011-01-17
---


Todd over at cfsilence.com had a a question about one of my recent blog posts on converting WMF files to GIF files. I gave an example of how to do this in .NET, but how do you leverage ColdFusion's .NET integration to do the same thing in ColdFusion.

The first thing you have to do is create a class project in .NET. Add a reference to the System.Drawing library. Here is the class I built for this example; [code:c#]

using System;

using System.Collections.Generic;

using System.Drawing;

using System.Drawing.Imaging;

using System.IO;

using System.Text;

namespace ImageConvertLibrary

{

public class GifItUtility

{

public static void saveGifToPath(string wmfFilePath, string gifFilePath)

{

Image myImage = Image.FromFile(wmfFilePath, true);

int myWidth = (int)myImage.HorizontalResolution;

int myHeight = (int)myImage.VerticalResolution;

Bitmap myBitmap = new Bitmap(myImage, (int)myImage.HorizontalResolution, (int)myImage.VerticalResolution); 

Graphics myGraphics = Graphics.FromImage(myBitmap);

myGraphics.Clear(Color.White);

myGraphics.DrawImage(myImage, 0, 0, myWidth, myHeight);

myBitmap.Save(gifFilePath, ImageFormat.Gif);

}

}

}

[/code]>

Build the project into a dll file that can be added to the Windows assembly. Visual Studio will place this file either in the project bin/debug or bin/release folder. 

The saveGifToPath method excepts two string parameters, one for the input WMF file path, and the second for the path to GIF file.

Here is an example of a ColdFusion file using this class and method to create a GIF file from a WMF file;

[code:c#]

[/code]>

I did some googling for a Java library that will do the same thing as this .NET code, and I found some propriatery libraries that will do converting of images from the WMF format. If you are running ColdFusion on Windows, or you have a Windows server you can proxy too, this is a free way to convert this files.