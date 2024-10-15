---
title: "Getting a 404 for Salesforce Rest API resource that Exists!"
description: ""
category: 
date: 2021-03-11
cover_image: "./404-erik-mclean.jpg"
---

I recently ran into a issue with a mobile application that was trying to call a [Salesforce Rest API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/quickstart.htm). Whenever the application tried to call this resource, Salesforce would return a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) error. 

It is a common practice in Rest API development to use HTTP status codes to represent different conditions that can occur. As an example, if a resource requires authentication, you can return a 401. This lets the consumer know that the request did not work because they needed to authenticate, usually with a bearer token with Rest APIs.

Getting a 404 status code for a resource that I knew exists was perperplexing to me. It is considered a good practice to return a 404 if you tried to return an item from a collection, and the id for the parameter is not in the collection.

The Rest resource we were trying to call is one that is used to register a device for push notifications. The path used by the Salesforce Rest API generally always starts with `/services/data/v{versoin_number}`. The real path is always after the version number. So for the push notification registartion, the full path is `/services/data/v50.0/sobjects/MobilePushServiceDevice`. This specific API call is done in the form of a POST with four paramaters including the device token for the users device. Salesforce needs this token in order to send push notifications to the device. At my company we have two Salesforce apps, one for iOS and one for Android. This call was working on or iOS app, but not in our Android app.

It turns out the cause for the 404 was rather simple. When any outside application want to access Salesforce APIs, it has to be registered as a 'Connected App' in Salesforce. The connected app uses a 'Consumer Key' for OAuth access back into your Salesforce Org. The Connected App was set to another 'Consumer Key' that was not configured to send push notifications. Because push notifications were not configured, when we tried to call the `MobilePushServiceDevice` resource, it returned a 404. Once this was configured, we received a 201 from the API call.

I writing this post because it can be tricky sometimes to understand why when a resource is not working it would return a '404 resource not found' error. This does not give the consumer any idea why the call is not working. Some might consider this to be a feature, not a bug because for security reasons you may not want a consumer looking for undocumented resources in your API. In our case it would have saved us a lot of time diagnosing the cause of the problem. I personally would have prefered a [418](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) status code over the 404.