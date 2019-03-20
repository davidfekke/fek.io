---
layout: post
title: "WCF versus traditional ASMX web services"
category: "Blog"
date: 2011-01-17
---


I just purchased a book on the Windows Communication Foundation. I had a discussion with a Co-worker about why someone would write a SOAP based web service in WCF over traditional ASMX. One of the advantages of WCF is that you take a service written in WCF, and also use it as a MSMQ messaging service or a windows service. I think there is a perception that if you write your services in WCF, they will not be compatible with Java, ColdFusion and other technologies. WCF is completely backwards compatible with the SOAP specification.

Microsoft suggests that if you are writing new web services in .NET, you should write them using in WCF.