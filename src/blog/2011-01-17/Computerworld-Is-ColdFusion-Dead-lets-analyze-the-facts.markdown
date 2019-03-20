---
layout: post
title: "Computerworld, Is ColdFusion Dead, lets analyze the facts"
category: "Blog"
date: 2011-01-17
---


Lets analyze the facts. Is ColdFusion Dead? Full disclosure. I just switched jobs a couple of months ago, and I am no longer a full time ColdFusion developer. When I switched jobs, I was asked the same question by a co-worker at my new job, "I thought ColdFusion was dead?" after I told him about my previous experience. I could see where someone would get that impression if you were to base it solely on Adobe's marketing of CF.

In Mary Brandel's "opinion piece", she states the following;

[code:c#]

This once-popular Web programming language -- released in the mid-1990s by Allaire Corp. (which was later purchased by Macromedia Inc., which itself was acquired by Adobe Systems Inc.) -- has since been superseded by other development platforms, including Microsoft Corp.'s Active Server Pages and .Net, as well as Java, Ruby on Rails, Python, PHP and other open-source languages.

Debates continue over whether ColdFusion is as robust and scalable as its competitors, but nevertheless, premiums paid for ColdFusion programmers have dropped way off, according to Foote. "It was really popular at one time, but the market is now crowded with other products," he says.

[/code]>

So lets analyze this sentence by sentence. Brandel states that ColdFusion was once-popular. It is "once-popular" when you consider it has always been a popular web application language since it was released in 1995\. Back then you could write CGI applications in C++, or use ColdFusion and ASP. ColdFusion quickly became popular because it was easier to develop for then ASP or C++. Later on in the 90s PHP and JSP became popular options, but neither are as easy to use as CF.

Brandel goes on to mention that ColdFusion has been superseded by .NET, Java, Ruby on Rails, Python, PHP and other open-source languages. She kind of lumps application servers with languages. .NET and Java are both application runtime environments that can be run on desktops, phones and servers. They can also run multiple languages. ColdFusion currently runs on top of Java, and can be used in conjuction with Java. The two products actually compliment each other. New Atlanta makes a CFML engine that runs on .NET called BlueDragon.NET.

I have done some PHP programming, and I like PHP as a scripting language, but not as much as CFML. You can still write web apps quicker in CFML than in PHP. Unlike Ruby on Rails and Python, CFML and PHP are made from the ground up to be a web scripting language. Python requires that the code be indented, which makes it next to impossible to combine inline HTML with your code. Ruby on Rails is not a language, it is a web application framework. 37 signals has automated a lot of things in Rails, including scaffolding and AJAX, but the underlying language is Ruby. Ruby is probably easier to learn than Perl, but it is still just a system scripting language.

Brandel goes on to write that "Debates continue over whether ColdFusion is as robust and scalable as its competitors". .NET and Java both scale extremely well. Since ColdFusion runs on top of Java, it also scales very well. I just came from a company that had a hosted solution the ran on a web farm of clustered servers. Their customers included Fortune 100 companies. There is no debate, ColdFusion does scale. The same can not be said about other technologies like Ruby on Rails. Two of my favorite sites are running on Rails. They are Twitter and Basecamp. Both of these sites are down constantly, or at least run extremely slow because Rails does not scale well.

She also said that premiums for ColdFusion developers have fallen. I am not sure what time frame she is writing about because my phone was ringing off the hook when I was in my last job transition a couple of months ago. There was a period around 2002 after the Dot Com bust where there was a drop off in salaries, but I found that to be the case for all development. Saleries are actually higher now for ColdFusion than I have ever seen them in the past.

Brandel goes on to quote David Foote who says "It was really popular at one time, but the market is now crowded with other products." Lets analyze this bit of brilliance from Mr. Foote. If anything there are fewer competing products then there were in the late 90s. Many of the smaller products have died or have withered on the vine. If you look at Python and Ruby, they are actually older than ColdFusion. If you also look at the number of development jobs out in the marketplace, ColdFusion outnumbers Rails jobs by a factor of two. 

In the Computerworld article, Brandel compares ColdFusion to non-relational databases, COBOL, and OS/2\. ColdFusion is still being sold, supported and developed into new versions by one of the largest software companies on the planet, unlike OS/2\. Brandel mentions that ColdFusion was acquired from Allaire by Macromedia, and Macromedia by Adobe. I think the fact that a software product is being purchased by an even larger software company is a good thing, not bad.

There are no less than five different application servers that run CFML applications. Some of these are open source projects. Plenty of options from multiple vendors.

Op-Ed pieces like this are typical of pubs like Computerworld and Wired nowadays. I guess it is to be considered when you realize that Adobe has completely mishandled the marketing of ColdFusion. One has to ask how Ruby on Rails has garnered such positive press with no advertising budget, and ColdFusion gets an "It is dead" article every three months.

Tim Buntel, Where are you when we need you?