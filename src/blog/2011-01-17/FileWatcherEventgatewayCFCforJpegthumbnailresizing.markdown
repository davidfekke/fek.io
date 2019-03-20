---
layout: post
title: "File Watcher Event gateway CFC for Jpeg thumbnail resizing"
category: "Blog"
date: 2011-01-17
---


I gave a presentation last year on the Event Gateway for ColdFusion MX 7\. John Lyons asked me to post the code for the CFC I used in my presentation to my blog.

The way this code works is that it uses a File watcher event gateway to see if any files of type jpg are written to a folder specified in the Event Gateway. Here is the code for the CFC.

<div class="code"><font color="MAROON"><cfcomponent displayname=<font color="BLUE">"imageWatcher"</font>></font>  

 <font color="MAROON"><cffunction name=<font color="BLUE">"onAdd"</font> access=<font color="BLUE">"public"</font> returntype=<font color="BLUE">"void"</font>></font>  
 <font color="MAROON"><cfargument name=<font color="BLUE">"CFEvent"</font> type=<font color="BLUE">"struct"</font> required=<font color="BLUE">"true"</font>></font>  
 <font color="MAROON"><cfset data=CFEvent.data></font>  

 <font color="MAROON"><cflog file=<font color="BLUE">"MydirWatcher"</font> application=<font color="BLUE">"No"</font> text=<font color="BLUE">"ACTION: #data.type#; FILE: #data.filename#; TIME: #timeFormat(data.lastmodified)#"</font>></font>  
 <font color="MAROON"><cftry></font>  
 <font color="MAROON"><cfset createThumbImage(data.filename) /></font>  
 <font color="MAROON"><cfcatch type=<font color="BLUE">"any"</font>></font>  
 <font color="MAROON"><cfwddx action=<font color="BLUE">"cfml2wddx"</font> input=<font color="BLUE">"#cfcatch#"</font> output=<font color="BLUE">"myWDDX"</font> /></font>  
 <font color="MAROON"><cflog file=<font color="BLUE">"MydirWatcher"</font> application=<font color="BLUE">"No"</font> text=<font color="BLUE">"#myWDDX#"</font>></font>  
 <font color="MAROON"></cfcatch></font>  
 <font color="MAROON"></cftry></font>  
 <font color="MAROON"></cffunction></font>  

 <font color="MAROON"><cffunction name=<font color="BLUE">"createThumbImage"</font> access=<font color="BLUE">"public"</font> returntype=<font color="BLUE">"void"</font>></font>  
 <font color="MAROON"><cfargument name=<font color="BLUE">"filepath"</font> type=<font color="BLUE">"string"</font> required=<font color="BLUE">"yes"</font> /></font>  
 <font color="MAROON"><cfset var imageName = <font color="BLUE">"Thumb"</font> & getFileFromPath(arguments.filepath) /></font>  
 <font color="MAROON"><cfset var ImageIOObj = CreateObject(<font color="BLUE">"Java"</font>, <font color="BLUE">"javax.imageio.ImageIO"</font>) /></font>  
 <font color="MAROON"><cfset var FileInputStream = CreateObject(<font color="BLUE">"Java"</font>, <font color="BLUE">"java.io.FileInputStream"</font>) /></font>  
 <font color="MAROON"><cfset var FileOutputStream = CreateObject(<font color="BLUE">"Java"</font>, <font color="BLUE">"java.io.FileOutputStream"</font>) /></font>   
 <font color="MAROON"><cfset var newImage = createObject(<font color="BLUE">"java"</font>, <font color="BLUE">"java.awt.image.BufferedImage"</font>) /></font>  
 <font color="MAROON"><cfset var AffineTransform = CreateObject(<font color="BLUE">"Java"</font>, <font color="BLUE">"java.awt.geom.AffineTransform"</font>) /></font>  
 <font color="MAROON"><cfset var AffineTransformOp = CreateObject(<font color="BLUE">"Java"</font>, <font color="BLUE">"java.awt.image.AffineTransformOp"</font>) /></font>  
 <font color="MAROON"><cfset var width = 0 /></font>  
 <font color="MAROON"><cfset var height = 0 /></font>  
 <font color="MAROON"><cfset var imageType = 0 /></font>  

 <font color="GRAY">_<!--- Ideal ratio is 128 pixels by 128 pixels --->_</font>  
 <font color="MAROON"><cfset FileInputStream.init(arguments.filepath) /></font>  
 <font color="MAROON"><cfset Image = ImageIOObj.read(FileInputStream) /></font>  
 <font color="MAROON"><cfset width = Image.getWidth() /></font>  
 <font color="MAROON"><cfset height = Image.getHeight() /></font>  
 <font color="MAROON"><cfset imageRatio = height/width /></font>  

 <font color="GRAY">_<!--- Set the new dimensions for the thumbnail based on the image ratio. --->_</font>  
 <font color="MAROON"><cfif imageRatio GT<font color="BLUE"> 1</font>></font>  
 <font color="MAROON"><cfset newHeight = 128 /></font>  
 <font color="MAROON"><cfset newWidth = 128 * (width/height) /></font>  
 <font color="MAROON"><cfelse></font>  
 <font color="MAROON"><cfset newHeight = 128 * (height/width) /></font>  
 <font color="MAROON"><cfset newWidth = 128 /></font>  
 <font color="MAROON"></cfif></font>  

 <font color="MAROON"><cfset pWidth = newWidth / Width /></font>  
 <font color="MAROON"><cfset pHeight = newHeight / Height /></font>  

 <font color="MAROON"><cfset jwidth = javaCast(<font color="BLUE">"int"</font>, newWidth) /></font>  
 <font color="MAROON"><cfset jheight = javaCast(<font color="BLUE">"int"</font>, newHeight) /></font>  
 <font color="MAROON"><cfset imageType = Image.getType() /></font>  

 <font color="MAROON"><cfset newImage.init(jwidth, jheight, imageType) /></font>  
 <font color="MAROON"><cfset AffineTransform.scale(pWidth, pHeight) /></font>  
 <font color="MAROON"><cfset AffineTransformOp.init(AffineTransform, AffineTransformOp.TYPE_BILINEAR) /></font>  
 <font color="MAROON"><cfset AffineTransformOp.filter(Image, newImage) /></font>  

 <font color="MAROON"><cfset FileOutputStream.init(<font color="BLUE">"[c:\thumbnails](c:\thumbnails)\#imageName#"</font>) /></font>  
 <font color="MAROON"><cfset ImageIOObj.write(newImage, <font color="BLUE">"jpg"</font>, FileOutputStream) /></font>  

 <font color="MAROON"><cfset Image.flush() /></font>  
 <font color="MAROON"><cfset FileOutputStream.close() /></font>  

 <font color="MAROON"></cffunction></font>  

 <font color="MAROON"></cfcomponent></font></div>
This code uses the underlying Java libraries that are included with ColdFusion to resize the images.

Doug Hughes has written an Image component that takes advantage of these underlying java libraries. I highly recommend that if you need to do image processing in your web app, that you take a look at some of the components that Doug sells at his company [Alagad](http://www.alagad.com). He also sells a component for doing Capchas.