---
layout: post
title: "What does Serialized CFCs Mean for Enterprise ColdFusion Developers"
category: "Blog"
date: 2011-01-17
---


One of the problems in the past with ColdFusion has been that you could not load CFCs into the session scope of your server in clustered environments, and have those CFCs replicate to the memory of the other app servers in your cluster. The issue was that session scope memory stayed resident in the memory of the application server. You could replicate simple data such as strings, but complex objects would not. In the Java world you can serialize java objects across servers. There have been workarounds such as maintaining sessions onto a single server through sticky sessions or using the request scope. The problems with these approaches is that you either had to keep your CFCs for a session on a single server, so if the app server died, you lost all of the session data. If you use the request scope, you have to reload the CFCs for every request, which is an expensive operation. Neither one of these approaches is ideal for scalable web applications.

With the release of ColdFusion 8 you now have the same ability to serialize CFCs in the session scope over multiple servers. This is not perfect either because there is some latency in replicating session data over multiple servers. Given the latency issues, you still gain in the redundancy of having session data replicated over a cluster of servers.

So why is this so important? The answer is that you can use persisted objects in a clustered environment. A perfect scenario for this new functionality is a shopping cart. Shopping cart data is typically transactional, but still need to be persisted. After the shopping cart goes to a checkout is usually when that data needs to be placed into a database. Before that the shopping cart can stay in session memory.

[code:c#]

[/code]>

The Session.shoppingCart can now be persisted across page requests and application servers. If the server I am requesting crashes, my object will still be alive on the other application servers on the cluster.

If you are planning on using this new feature in ColdFusion 8, I would suggest doing research on session clustering. There are some good articles on how to configure app servers for clustering and replication session data. It is worthwhile to do research on how to set up NIC cards for replicating session data, and how many application servers you can cluster together without losing performance to latency.