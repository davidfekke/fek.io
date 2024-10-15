---
title: "Nasty Scroll Bug in the WKWebView in iOS 12"
description: ""
category: 
date: 2019-03-27
cover_image: "./keyboard.png"
---

I came across a nasty bug in the WKWebView in iOS 12 today when it comes to dismissing the keyboard. What happens sometime when the user scrolls the webview while a textarea is selected, and then they dismiss the keyboard, it leaves the section of the webview that was covered by the keyboard unusable. We have a reload method that can clear this, but then the user will lose all of the input they have entered into their forms.

I came across this [issue](https://github.com/apache/cordova-ios/issues/417) on the Cordova [repo](https://github.com/apache/cordova-ios) on github.  

> Seeing a blocking issue after updating to XCode 10 related to keyboard displacement and then dismissal.

> When an input that would require webview centering is clicked, the viewport is repositioned to center that input, as iOS has traditionally done. However, when dismissing the keyboard, the viewport is not re-positioned properly back to its original position.

> This can leave large gaps where the webview is no longer visible. In the attached screenshots, you can see that this leaves a large margin where the viewport is rendering, shifted upwards and off-screen by a 100+ pixels. There appears to be no way do re-position the viewport short of additional input focus changes, each resulting in similar offset issues.

> To add some additional confusion, it appears this only happens on iOS 12 / XCode 10 produced installs, such that:

* This issue is present ONLY on builds produced in XCode 10 targeting iOS 12 devices.
* This issue affects ALL tested device types on iOS 12.
* This issue is present via Legacy AND Modern build systems
* iOS 10 / 11 devices targeted via XCode 10 are NOT affected.
* iOS 10 / 11 / 12 devices targeted via XCode 9 are NOT affected.

> Any info on potential workarounds or patches would be greatly appreciated. I've already looked into upgrading our cordova-plugin-ionic-webview plugin (as well as various others), but it appears to not have any relevance with the issue. At this point, we're looking at downgrading XCode in order to get working builds out.

We already had some code in our application for triggering methods when the keyboard is shown or dismissed;

```objectivec
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(keyboardWillBeHidden:)
                                                     name:UIKeyboardWillHideNotification object:nil];
```

We added some code from one of the examples for resetting the offsets on the WKWebView subviews once the keyboard has been dismissed.

```objectivec
- (void)keyboardWillBeHidden:(NSNotification*)aNotification {
    ...
    
    if (@available(iOS 12.0, *)) {
        WKWebView *webview = (WKWebView*)self.webViewNew;
        for(UIView *v in webview.subviews) {
            if ([v isKindOfClass:NSClassFromString(@"WKScrollView")]) {
                UIScrollView *scrollView = (UIScrollView *)v;
                [scrollView setContentOffset:CGPointMake(0, 0)];
            }
        }
    }
     
    NSLog(@"Keyboard dismissed");
}
```

I hope this helps anyone else who comes across this issue with the WKWebView.
