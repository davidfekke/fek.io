---
layout: post
title: "Cast Iron Class notes"
category: "Blog"
date: 2011-01-17
---


I finished my training yesterday on the Cast Iron Application router. It is composed of two pieces of software, one is a Java based Studio application for creating orchestrations. The other is a web based management console. The studio application lets you graphically create an integration. You simply set up endpoints to HTTP posts, web services, databases or even email. Then you can design your transformations. Once you finish the design, you can push them to a router for testing.

Most of the actual debuging occurs on the Web based console. You can schedule integrations on the web console as well as generate WSDL files for hosted web services, and change parameters for your integrations.

The router does allow for different levels of security, and will log every single aspect of an integration taking care of most Sarbanes Oxley issues.

The Router does have some limitations. They do not have any support for encryption. While they do support MQ series messaging, there is no support for JMS messaging.