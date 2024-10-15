---
title: "How to install Mojo on your M1 Mac if you are using asdf"
description: ""
tags: ["mojo", "asdf", "python"]
category: 
date: 2023-10-19
cover_image: "./terminalheader.png"
---

I have been playing around with the new programming language `Mojo` by [Modular](https://developer.modular.com/download). If you are not familiar with Mojo, it is a language that is a superset of `Python`, but with blazing fast performance.

For anyone else using `asdf`, I was getting the following error trying to install Mojo.

```bash
~ > modular install mojo                                                      ✔
# Found release for https://packages.modular.com/mojo @ 0.4.0
# Installing to /Users/davidfekke/.modular/pkg/packages.modular.com_mojo
# Downloading artifacts. Please wait...
# Downloads complete, setting configs...
# Configs complete, running post-install hooks...
unknown command: python3. Perhaps you have to reshim?
modular: error: failed to run python:
```

I had to uninstall python from asdf, remove the reference from .tool-versions. I had to add the homebrew path to my ~/.zshrc file. I was able to look up the correct path using `brew info` python. 

I also had to remove python3 from my asdf shims. Once I did all of those things, I was able to get Mojo installed on my M1 Mac.