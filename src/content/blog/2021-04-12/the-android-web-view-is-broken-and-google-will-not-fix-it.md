---
title: "The Android WebView is broken, and Google will not Fix It"
description: ""
category: 
date: 2021-04-12
cover_image: "./cracked-webview.jpg"
---

Apple and Google are both large companies. When issues crop up with their technology, and we file bugs, it can sometimes take years to be addressed. For individual developers this can be unbelievably frustrating.

Even though it is highly encouraged for developers to build mobile apps natively, there are lots of apps and frameworks that require the use of web based components. 
Cordova, Phonegap and Ionic are all examples of SDKs that let developers build mobile apps using HTML, CSS and JavaScript using native WebViews.

On iOS there are a number of choices. The 'UIWebView' has been deprecated, but Apple offers both the 'WKWebView' and the 'SFWebView' for presenting web content to end users. On Android there is only one WebView called 'WebView'.

# The WebView is important

Even if you are building an app that is almost completely native, there are still reasons why you might want to use a WebView. HTML and CSS in a browser turns out to be a powerful rendering engine. There is some content where is just makes sense to render in a WebView.

Another reason is authentication. Whether you are using OpenID or OAuth, many of these frameworks require that users login to their service using a WebView. Facebook, Google and Salesforce all require that users logging in through their sing sign on providers do so through a WebView.

# Android WebView issues

There have recently been a series of [issues](https://www.theverge.com/2021/3/22/22345696/google-android-apps-crashing-fix-system-webview) that have cropped up on Android with the WebView that has broken thousands of applications. Google addressed this [issue](https://www.theregister.com/2021/03/23/google_webview_patch/), but there are a host of other issues that Google has not addressed. These issues pertain to the WebView being able to handle incoming HTTP requests.

The WebView gives app developers a number of features that can be overwritten using an interface called the WebViewClient. The WebViewClient includes many different methods that a developer can use to override the default behavior of the WebView. By default on the Android WebView, a user tapping on any link will get kicked out of the current app into Chrome. You can override this by implementing the 'shouldOverrideUrlLoading' method, and returning false.

# Overriding requests

The WebViewClient also gives developers a way of overriding incoming requests. To override an incoming request, you can use the 'shouldInterceptRequest' method on your WebViewClient as seen below.

```java
public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
    return shouldInterceptRequest(view, request.getUrl().toString());
}
```

This is an improvement over the previous implementation which only included the WebView and the String representation of the incoming URL. It was deprecated in API level 21.

```java
public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
    return null;
}
```

The original purpose for this method was to handle a request for a specific resource like an image or stylesheet which could be cached locally on the device, and retrieved for faster access. While that is a good use case, it only works for certain types of HTTP requests, like GETS, DELETES. There are other use cases where we need to be able to handle POSTs and PUTs using this interface.

The 'shouldInterceptRequest' cannot really be used for POSTs and PUTs because these include a HTML or JSON body. If you are making a form POST with credentials, this method cannot be used because it does not include the body. This also will not work if you have client side JavaScript making AJAX requests with POSTs and PUTs.

There are [workarounds](https://github.com/KonstantinSchubert/request_data_webviewclient) that can be used where you can override the document 'submit' event listener and the XHR object in the DOM of the web content, but this can violate the security policies of some web applications. Ultimately what we need is for Google to add the body to the 'WebResourceRequest' object. Here is what the interface for the 'WebResourceRequest' includes;

```java
package android.webkit;

import android.net.Uri;

import java.util.Map;

public interface WebResourceRequest {
    
    Uri getUrl();

    boolean isForMainFrame();

    boolean isRedirect();

    boolean hasGesture();

    String getMethod();

    Map<String, String> getRequestHeaders();
}

```

As we can see from the example above, the 'WebResourceRequest' includes the Uri of the request as well as the method and the request headers. But it does not include the body.

# Summary

In order for the system 'WebView' on Android to truly be useful, issues like these need to be addressed, otherwise it forces developers to use 'hacky' solutions which can not be guaranteed to work in all security situations. I hope that Google will fix this in future versions of the Android, or with the Jetpack.