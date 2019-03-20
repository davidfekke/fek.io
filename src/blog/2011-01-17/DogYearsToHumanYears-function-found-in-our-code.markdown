---
layout: post
title: "DogYearsToHumanYears function found in our code"
category: "Blog"
date: 2011-01-17
---


Years and years ago, when I was still using ColdFusion 5, I decided to contribute an UDF to the [cflib.org](http://www.cflib.org/) web site. The function I wrote converts actual years to dog years.

<div class="code">/**  
 * This UDF translates a dogs age to a humans age.  
 *   
 * @param age The age of the dog.   
 * @author David Fekke ([david@fekke.com](mailto:david@fekke.com))   
 * @version 1, February 14,<font color="BLUE"> 2002</font>   
 */  
 function DogYearsToHumanYears(DogAge) {  
 return ((DogAge - 1)* 7) + 9;  
 }</div> When I first submitted it, it was rejected because I used the wrong algorithm. I thought the corect way to determine dog years was to multiply actual years time seven. Raymond Camden corrected me, and when and found the correct calculation.
We were going through the source code for an application we just purchased from another company, and we found my function with the entire common function library.

An important warning that comes with the library is as follows;

Warning:

You may not need all the functions in this library. If speed

is _extremely_ important, you may want to consider deleting

functions you do not plan on using.