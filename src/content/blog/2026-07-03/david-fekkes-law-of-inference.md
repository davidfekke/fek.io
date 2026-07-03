---
title: "David Fekke's Law of Inference"
tags: ["AI", "Machine Learning", "Inference", "TOKENMAXXING"]
description: "This post describes my law of inference"
category:
date: 2026-07-03
cover_image: "./lawofinference.png"
---

One of my favorite bloggers is Jeff Atwood. One of my favorite quotes from Jeff is his law on software development, based on Tim Berner-Lee's Rule of Least Power.

> "Any application that can be written in JavaScript, will eventually be written in JavaScript."

~Jeff Atwood

## #TOKENMAXXING

As I have been building software either around AI or using AI, I have noticed something that I think everyone else has noticed, AI is getting expensive. In some cases, [really expensive](https://techcrunch.com/2026/06/10/ai-pilled-firms-spend-7500-per-employee-each-month-on-ai/).

In June of this year GitHub changed their pricing models for GitHub Copilot. Both Claude Code and OpenAI's codex have limits on how much you can use their services based on per token pricing. At the company I currently work at a limit has been placed on how many tokens we are allowed to use per month.

There is good reason for the change in pricing. The hardware and electricity used to provide inference for these large frontier models costs money. Couple that with constrained resources and component costs, even off the shelf desktop and laptops has seen their costs go up because of the constraint on resources. Memory prices have quadruped and GPU cards have also gone up in cost.

The term you hear managers holding the purse strings say is **TOKENMAXXING**, that is how to get the most value out of every token possible. 

While this has been happening, many people have discovered that you can actually run models on fairly recent desktops and laptops using software like [Ollama](https://ollama.com/), [LM Studio](https://lmstudio.ai/) and [MLX](https://opensource.apple.com/projects/mlx/). Some smaller models can even be run on smaller compute devices like a [Raspberry Pi](https://www.raspberrypi.com/).

Music vlogger Rick Beato recently [spoke](https://www.youtube.com/watch?v=YTLnnoZPALI) about how you did not need data centers because you can run these models on your home computer. Rick is partially right and wrong at the same time. We do need data centers because these models require in some cases months of training on clusters of servers, usually running advanced hardware like NVidia GPUs or TPUs.

While advanced computing is required for training, inference can generally by run on less advanced hardware. Inference refers to the type of processing you use to run a model after it has been trained. 

The trick is you need to have enough VRAM or unified memory to hold the model in memory in order to run inference. It also helps to have NPU (Neural Processing Units) cores to calculate the prediction from the model. Apple, Intel and AMD all produce multi-core processors that include these types of cores.

The trend I think we will start to see with AI is that not all models need to be run in data centers or even on servers, some will be run locally. With this trend I decided to define my own law similar to Atwood's law. I am calling my law David Fekke's Law of AI Inference:

> "If an AI model can be run locally, it will be eventually run locally."

~David Fekke

There are some advantages to running models locally. For one thing, if you can run a model on a users device, you do not need to lease expensive hardware from a hyper scaler. Privacy is another benefit. Users do not like having to share their personal information with these companies if they do not have to share.

Apple is trying to use this approach with their current devices. With the next release of version 27 of OS releases, we are seeing the strategy take place in the following form and order:

```
Run on device. 
    -> If prompt can't run locally, Run in private cloud. 
        -> If inference can't be run on private cloud, run in Google Gemini.
```

## Summary
The combination of cost of AI inference and privacy concerns will drive more AI to the device and away from data centers. Users will not only want, but demand that they can run models locally. 