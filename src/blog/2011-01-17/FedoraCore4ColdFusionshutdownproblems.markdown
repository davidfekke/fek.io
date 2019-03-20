---
layout: post
title: "Fedora Core 4 ColdFusion shutdown problems"
category: "Blog"
date: 2011-01-17
---


A friend of mine is having problems trying to shutdown ColdFusion MX 7 on fedora core 4\. He logs in to root and gets the following error when he uses the stop command;

<div class="code">/opt/coldfusionmx7/bin/coldfusion stop  
 Stopping ColdFusion MX 7, please wait  
 Stopping coldfusion server..could not stop server, either it's not running, you don't have permission to stop the server or it needs to be killed manually The ColdFusion MX 7 server seems to be hanging, will stop non-gracefully ColdFusion MX 7 has been stopped</div>
Since he is logged in as root, he is curious why CFMX is not stopping gracefully? If you have any ideas, please feel free to post them in my comments.