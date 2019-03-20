---
layout: post
title: "Running SVN 1.5 on Mac OS X 10.5 with Apache 2.2"
category: "Blog"
date: 2011-01-17
---


I use subversion at work, but I have been wanting to run a subversion server at home. On Windows I use Visual SVN server, but at home I am running Mac OS X on all of my home computers. I use one of my Macs as a server.

Here is the good news. Mac OS X 10.5 comes with Apache 2.2 and SVN pre-installed. 

Here is the bad news. An older version of SVN exists on Mac OS X. I believe it is version 1.4.4 of subversion.

I found some good resources on how to set up Subversion with Apache 2.2\. This [Sonzea](http://www.sonzea.com/articles/subversion-trac.html) article does a good job of the nuts and bolts of setting up a SVN repository. I did have to change the chmod to "www" instead of "_www". I was not able to get trac working. I think it was because I am using an older Mac with a PowerPC processor.

I also was able to install a [newer version](http://www.open.collab.net/downloads/community/) of subversion software from the Collab.net site. After the newer version of subversion is installed, I had to change my subversion.conf file so that it pointed to the newer shared objects.

By default you point your subversion.conf file to the following location;

[code:c#]

LoadModule dav_svn_module libexec/apache2/mod_dav_svn.so

LoadModule authz_svn_module libexec/apache2/mod_authz_svn.so

[/code]>

After I installed the newer version of SVN, I changed this file to point to the new location of the mod_dav_svn.so and mod_authz_svn.so files.

[code:c#]

LoadModule dav_svn_module /opt/subversion/lib/svn-apache/mod_dav_svn.so

LoadModule authz_svn_module /opt/subversion/lib/svn-apache/mod_authz_svn.so

[/code]>

I also installed [project tracker](http://projecttracker.riaforge.org/) after I ran into problems trying to install Trac. I am really liking this web application for doing my bug tracking. It also integrates with subversion and will send SMS messages.