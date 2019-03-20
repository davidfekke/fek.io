---
layout: post
title: "JQuery 1.5 Released"
category: "Blog"
tags: [JQuery]
date: 2011-02-01
---


[JQuery 1.5](http://jquery.com "JQuery 1.5") was released yesterday. I have not had a chance to review all of the new features, but it looks like it has all of the performance improvements like in previous releases. One of the cool new features is the .sub() function. The new Sub function actually creates a copy of the JQuery object that can be modified.

<pre class="brush: JavaScript;">  (function(){
    var sub$ = jQuery.sub();

    sub$.fn.myCustomMethod = function(){
      return 'just for me';
    };

    sub$(document).ready(function() {
      sub$('body').myCustomMethod() // 'just for me'
    });
  })();

  typeof jQuery('body').myCustomMethod // undefined
</pre>
There also many improvements to the Ajax functions. Read up on it at [JQuery.com](http://jquery.com "JQuery 1.5").