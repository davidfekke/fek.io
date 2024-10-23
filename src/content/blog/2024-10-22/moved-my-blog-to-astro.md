---
title: "I Moved my Blog to Astro"
tags: ["Node.js", "Astro", "Gatsby"]
description: ""
category: 
date: 2024-10-22
cover_image: "./ac9320d8-3c41-4ed9-b7e2-3b4bc2ba2626.png"
---

I recently moved my blog to [Astro](https://astro.build). I have been using Gatsby for about four or five years, but anyone who follows Gatsby knows that it is not under active development like it was before their acquisition.

Recently at the JaxNode user group, I did a presentation on Astro, and I decided to move my website to Astro.

## Astro for Static Site Generation

I decided to use Astro as a site generator, but it turns out that Astro can be used as a regular web application framework, so if you want to built live server rendered web apps, this is something 
that Astro can do as well. Astro also has great documentation on how to build a site using their framework. Astro is also the foundation for Starlight, a documentation building framework.

Astro also has a plugin architecture you can use to add integrations from other frameworks like React, Vue and Svelte. You can also add other tools like Tailwind CSS and Icon libraries. Astro has a command line app that you can use to add these tools like the following:

```sh
$ npx astro add tailwind
```

By running this command, it automatically adds Tailwind to your Astro configuration file. The Astro configuration file is in the root of the project, and is called `astro.config.mjs`.

```javascript
// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
});
```

## Summary

So far I am very happy with Astro, and I plan on doing a series of blog posts on building websites with Astro.