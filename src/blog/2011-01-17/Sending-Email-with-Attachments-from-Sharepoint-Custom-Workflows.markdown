---
layout: post
title: "Sending Email with Attachments from Sharepoint Custom Workflows"
category: "Blog"
date: 2011-01-17
---


I have been developing custom Sharepoint workflows in Visual Studio 2005 over the past year. It can be fustrating developing for Sharepoint 2007 because Microsoft has done a lousy job documenting the Sharepoint API.

The SendMail activity in the workflow tools does not allow for email attachments. I found a good work around is to use the .NET email API in a custom code activity. In the following example I send an email with an attachment.

[code:c#]

SmtpClient client = new SmtpClient();

client.Host = smtpServer;

client.Port = 25;

client.DeliveryMethod = SmtpDeliveryMethod.Network;

MailMessage myMailMessage = new MailMessage();

myMailMessage.From = new MailAddress(this.fromEmail);

myMailMessage.Subject = "Test email subject";

myMailMessage.Body = "This is a test email message.";

myMailMessage.To.Add(new MailAddress(toEmail));

MemoryStream myMemoryStream = new MemoryStream(this.attachmentByteArray);

myMailMessage.Attachments.Add(new Attachment(myMemoryStream, this.attachmentFileName));

client.Send(myMailMessage);

[/code]>

If you need to dynamically get the name of the Smtp server, you can get this throught the parent web application. Here is an example of how to call it through the Workflow Properties.

[code:c#]

SPSite site = this.workflowProperties.Site;

SPWebApplication webapp = site.WebApplication;

//Get the SMTP server 

string smtpServer = webapp.OutboundMailServiceInstance.Server.Address;

[/code]>

I found the previous example in this 

[Blog post](http://blog.bacchin.org/2007/08/sharepoint-2007-outgoing-smtp-server.html).

Update

There is a question on how I got the Byte[] array. I used a InfoPath form to collect the attachment. The InfoPath form stores this attachment in a XML node as base64 encoded string. When .NET pulls the value from the XML node, it turns the value into a byte array. I then use the following code to extract the filename and the document data;

[code:c#]

byte[] myAttachment = myInfoPathForm.Attachment;

if (myAttachment != null)

{

int namebufferlen = myAttachment[20] * 2;

byte[] filenameBuffer = new byte[namebufferlen];

for (int i = 0; i < filenameBuffer.Length; i++)

{

filenameBuffer[i] = myAttachment[24 + i];

}

char[] asciiChars = UnicodeEncoding.Unicode.GetChars(filenameBuffer);

string filename = new string(asciiChars);

filename = filename.Substring(0, filename.Length - 1);

byte[] filecontent = new byte[myAttachment.Length - (24 + namebufferlen)];

for (int i = 0; i < filecontent.Length; i++)

{

filecontent[i] = myAttachment[24 + namebufferlen + i];

}

this.attachmentByte = filecontent;

this.attachmentFileName = filename;

}

[/code]>

This code only works if you are pulling the data from an InfoPath form.