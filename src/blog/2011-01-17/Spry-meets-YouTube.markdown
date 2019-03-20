---
layout: post
title: "Spry meets YouTube"
category: "Blog"
date: 2011-01-17
---


I was speaking to one of my user group members, Luis Casillas, about Spry at our last meeting. I told him I had been thinking about writing a Spry example that searches YouTube tags, displays results, and even loaded the and played the Flash video.

Last night I sat down and took a look at the YouTube API. They use REST and XML-RPC interfaces to expose their api. They have good documentation on their [dev site](http://www.youtube.com/dev). I used the REST interface to call their tag search method in COldFusion. It returns an XML file that then consumes the XML through an ColdFusion proxy. This solves cross domain security issues, and allows the XMLHttpObj to call without security warnings. There is an example below. 

<div class="code"><font color="MAROON"><cfsilent></font>  

 <font color="MAROON"><cfprocessingdirective pageencoding=<font color="BLUE">"utf-8"</font> /></font>  

 <font color="MAROON"><cfsetting showdebugoutput=<font color="BLUE">"false"</font> /></font>  

 <font color="MAROON"><cfparam name=<font color="BLUE">"url.tag"</font> default=<font color="BLUE">"cat"</font>></font>  

 <font color="MAROON"><cfset youTubeKey = <font color="BLUE">"mykey"</font> /></font>  

 <font color="MAROON"><cfset UTubeName = <font color="BLUE">"myusername"</font> /></font>  

 <font color="MAROON"><cfset methodName = <font color="BLUE">"youtube.videos.list_by_tag"</font> /></font>  

 <font color="MAROON"><cfset uTubeURL = <font color="BLUE">"[http://www.youtube.com/api2_rest?method=#methodName#&dev_id=#youTubeKey#&tag=#url.tag#](http://www.youtube.com/api2_rest?method=#methodName#&dev_id=#youTubeKey#&tag=#url.tag#)"</font> /></font>  

 <font color="MAROON"><cfhttp url=<font color="BLUE">"#uTubeURL#"</font> charset=<font color="BLUE">"utf-8"</font>></font><font color="MAROON"></cfhttp></font>  

 <font color="MAROON"><cfset resultXML = cfhttp.filecontent /></font>  

<font color="MAROON"></cfsilent></font><font color="MAROON"><cfcontent type=<font color="BLUE">"text/xml; charset=utf-8"</font> /></font><font color="MAROON"><cfoutput></font>#resultXML#<font color="MAROON"></cfoutput></font>

</div>
I ran into problems with the XML feed losing the utf-8 encoding coming through COldFusion's CFHTTP tag. I specified utf-8 encoding with the cfprocessingdirective tag as well as the cfhttp tag and the cfcontent tag.

All the rest was done in JavaScript, so the page only has to load once. All of the real functionality are Spry Ajax calls using the Spry.Data.XMLDataSet object.

I use one DataSet object to perform my searches with, and I wrote two functions to use a form perform the search, and another to display the YouTube Video. The JavaScript code is listed below;

<div class="code">var UTubeURL = <font color="BLUE">"youtubesearch.cfm?tag="</font>;  

var UTubeXPath = <font color="BLUE">"/ut_response/video_list/video"</font>;  

var dsYouTube = new Spry.Data.XMLDataSet(UTubeURL, UTubeXPath, { method: <font color="BLUE">"GET"</font>, useCache: false });  

function isdefined( variable)  

{  

return (typeof(window[variable]) == <font color="BLUE">"undefined"</font>)? false: true;  

}  

function searchUTube() {  

 var myTag = document.myForm.tag.value;  

 UTubeURL = <font color="BLUE">"youtubesearch.cfm?tag="</font> + myTag;  

 dsYouTube.setURL(UTubeURL);  

 dsYouTube.loadData();   

 if (isdefined(<font color="BLUE">"so"</font>)) {  

 YouTubeVideoDiv = document.getElementById(<font color="BLUE">"YouTubeVideo"</font>);  

 YouTubeVideoDiv.innerHTML = <font color="BLUE">""</font>;  

 }  

}  

function showVideo(myid) {  

 var swfFileName = '[http://www.youtube.com/v/](http://www.youtube.com/v/)' + myid;  

 so = new SWFObject(swfFileName, <font color="BLUE">"mymovie"</font>, <font color="BLUE">"425"</font>, <font color="BLUE">"350"</font>, <font color="BLUE">"7"</font>, <font color="BLUE">"#336699"</font>);  

 so.write(<font color="BLUE">"YouTubeVideo"</font>);   

}

</div>
I used the following form code to perform searches on new tags.

<div class="code"><font color="NAVY"><font color="FF8000"><form name=<font color="BLUE">"myForm"</font> onsubmit=<font color="BLUE">""</font>></font></font>  

<font color="NAVY"><font color="FF8000"><input type=<font color="BLUE">"text"</font> name=<font color="BLUE">"tag"</font> value=<font color="BLUE">""</font> /></font></font>  

<font color="NAVY"><font color="FF8000"><input onClick=<font color="BLUE">"searchUTube();"</font> type=<font color="BLUE">"button"</font> value=<font color="BLUE">"Search"</font> /></font></font>  

<font color="NAVY"><font color="FF8000"></form></font></font>

</div>
I then used the following div tags and Spry regoins to display the movie and the search results;

<div class="code"><font color="NAVY"><div id=<font color="BLUE">"YouTubeVideo"</font>></font><font color="NAVY"></div></font><font color="NAVY"><br /></font>  

<font color="NAVY"><div id=<font color="BLUE">"mContainer"</font> spry:region=<font color="BLUE">"dsYouTube"</font>></font>  

 <font color="TEAL"><table></font>  

 <font color="TEAL"><tr></font>  

 <font color="TEAL"><th></font>Image<font color="TEAL"></th></font>  

 <font color="TEAL"><th></font>Title<font color="TEAL"></th></font>  

 <font color="TEAL"></tr></font>  

 <font color="TEAL"><tr spry:repeat=<font color="BLUE">"dsYouTube"</font>></font>  

 <font color="TEAL"><td ></font><font color="GREEN"><a href=<font color="BLUE">"{url}"</font>></font><font color="NAVY"><font color="PURPLE"><img src=<font color="BLUE">"{thumbnail_url}"</font> /></font></font><font color="GREEN"></a></font><font color="TEAL"></td></font>  

 <font color="TEAL"><td valign=<font color="BLUE">"top"</font>></font>  

 <font color="TEAL"><table></font>  

 <font color="TEAL"><tr></font>  

 <font color="TEAL"><td></font><font color="GREEN"><a href=<font color="BLUE">"#"</font> id=<font color="BLUE">"{id}"</font> onclick=<font color="BLUE">"showVideo(this.id);return false;"</font>></font>{title}<font color="GREEN"></a></font><font color="TEAL"></td></font>  

 <font color="TEAL"></tr></font>  

 <font color="TEAL"><tr></font>  

 <font color="TEAL"><td></font>{description}<font color="TEAL"></td></font>  

 <font color="TEAL"></tr></font>  

 <font color="TEAL"></table></font>  

 <font color="TEAL"></td></font>  

 <font color="TEAL"></tr></font>  

 <font color="TEAL"></table></font>  

<font color="NAVY"></div></font>

</div>
The next problem I ran into was trying to load the SWF movies dynamically. Khary Mallea turned me on to the SWFObject library. Like Spry, this library dynamically takes care of the browser differences to make sure the movie will always display. Internet Explorer would not load the movies until I added this library.

You can view a working example at this [url](http://www.fekke.com/index.cfm?fuseaction=home.youtube).