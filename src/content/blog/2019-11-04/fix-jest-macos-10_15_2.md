---
title: "Fixing Jest on macOS 10.15.2"
description: "After I upgraded to macOS 10.15.2 my Jest tests stopped running"
category: 
date: 2019-11-04
cover_image: "./jestdocblur.jpg"
---

## Sorting out all of the different JavaScript frameworks can be a chore

Most of the JavaScript frameworks and tools are under constant change. Staying on top of all of the churn can be a chore. I recently came across an issue after I upgraded to the latest version of macOS (10.15.2), Xcode (11.2) and Node.js 13.0.1. 
None of my [Jest](https://jestjs.io/) based tests would run anymore. When I ran `npm test` or `yarn test` jest would start, but would never run any tests. It was like jest was just hanging or stuck, and not able to run any of the tests.

I tried reinstalling Node.js, downgrading Node. I even emptied the NPM cache and reinstalled jest. Nothing I did worked. I came across a Stackoverflow [post](https://stackoverflow.com/a/55260912/97313). One of the tools Jest uses is called `watchman`.
The Stackover flow post suggested uninstalling and reinstalling `watchman`. You can use [Homebrew](https://brew.sh) to do this on the Mac. If you are not familiar with Homebrew, it is essentially the missing package manager for macOS.

```bash
brew uninstall watchman
brew install watchman
```

After I made this change, I reinstalled jest onto my computer, and now all of my tests run like they did before. I hope this helps with your set up as well.
