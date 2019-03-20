---
layout: post
title: "Playing with the Google Map API"
category: "Blog"
date: 2011-01-17
---


I have had a lot of fun playing around with some of the Google APIs lately. My favorite so far is the Google Map API. If you have seen the Google Maps [maps.google.com](http://maps.google.com).

Google Maps uses an AJAX javascript object to display Interactive map within a div tag. AJAX stands for Asynchronous Javascript and XML. The Javascript object can call back to the Google server to pull updated information without having to reload the whole page. Google requires that the page use pure xhtml code and that you have a Google Map key. You can get a key by going to [this page](http://www.google.com/apis/maps/signup.html) at Google. Place the following script call in the head section of your html page.

<div class="code"><font color="NAVY"><font color="MAROON"><script src=<font color="BLUE">"[http://maps.google.com/maps?file=api&v=1&key=YOURKEYHERE](http://maps.google.com/maps?file=api&v=1&key=YOURKEYHERE)"</font> type=<font color="BLUE">"text/javascript"</font>></font></font><font color="NAVY"><font color="MAROON"></script></font></font></div>
Inside the body of the html page, place a div tag with the ID set to MAP. 

<div class="code"><font color="NAVY"><div id=<font color="BLUE">"map"</font> style=<font color="BLUE">"width: 900px; height: 600px"</font>></font><font color="NAVY"></div></font></div>
The next thing that needs to be done is to create a Javascript object based on the div tag.

<div class="code">var map = new GMap(document.getElementById(<font color="BLUE">"map"</font>));</div>
There are several different controls that can be placed on the map. For the control with the zoom slider, you will need the large control.

<div class="code">map.addControl(new GLargeMapControl());</div>
The map is centered using a what is called a gpoint and the zoom level. The code looks like this;

<div class="code">map.centerAndZoom(new GPoint(-81.48125,<font color="BLUE"> 30</font>.30912),<font color="BLUE"> 2</font>);</div>
The Gpoint is based on Geocodes, which is a decimal version of Latitude and longitude.