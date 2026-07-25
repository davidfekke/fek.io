---
title: "Revisiting Vue.js"
tags: ["Vue", "Nuxt"]
description: "This post describes revisiting Vue.js"
category:
date: 2026-07-24
cover_image: "./vuejs-header.png"
---

I recently spoke to the [JaxNode](https://www.meetup.com/jax-node-js-ug/) user group about a number of technologies related to [Vue.js](https://vuejs.org/) and Evan You. If you are not familiar with Vue.js, it is a frontend framework that initially started in 2013 when Evan You was at Google.

A whole ecosystem of tools have popped up around this framework including [Nuxt](https://nuxt.com/), which is frontend and backend framework similar to Next.js. [Vite](https://vite.dev/guide/) and [Vitest](https://vitest.dev/) both were spun up out of the Vue.js project.

It has been a couple of years since I last looked at Vue. I have been using React as my primary framework for about ten years. While React has worked for the jobs I have had, it is not without it's shortcomings.

## Vue Hello, World!

One of the nice things about Vue, is that you can use it with build tools like Vite, but you can also just drop in a script tag to an existing HTML page, and start adding Vue right in that page:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
    <h1>Hello, {{ message }}</h1>
</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('World!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

It is also pretty easy to add reactivity to your components using  such as this single file component below:

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

## Vue 3.6

As I write this, Vue is currently at version 3.5, but 3.6 is currently at release candidate 2. The two primary features coming in the next release of Vue are signals and a new smaller deployment bundle called Vapor.

## Signals
Signals have been available in a few other frameworks such as Solid.js and Angular. If you are not familiar with signals, they are creating reactive primitives that help the framework update the UI based on changes to the primitive. So if you have a variable in your Vue app, and the value of that variable changes, you want to be able to update the UI automatically.

The version of signals that is in Vue.js 3.6 is the alien-signals library. Signals have been implemented in several other languages besides JavaScript and TypeScript. This version works very similarly to the version of signals that is in Preact and Svelte.

A simple example of how signals work can be seen in the example below:

```typescript
import { signal, computed, effect } from 'alien-signals';

const count - signal(0);
const incrementCount = computed(() => count() + 1);

effect(() => {
    console.log(`Count is ${count()});
}); //  Console: Count is 0

console.log(incrementCount()); // Console: Count is 1

count(5); // Console: Count is 5
```

## Vapor

Vapor offers a new way to compile your Vue code into Vue Single-File Components or SFCs. The goal of Vapor is to reduce the overall bundle size of your app, and to improve performance. Vapor will also be a subset of Vue, so it will be opt in. Any feature that depend on VNodes or the components public instance proxy will not be available in Vapor components.

To support Vapor in your components, the way you will opt in will be add a vapor attribute in the script tag of your component. Here is an example below:

```vue
<script setup vapor>
// ..
</script>

// Or you can use the following short hand in your script tag

<script vapor>
// ..
</script>

// And to use Vapor in the templates, use the `vapor` marker as an attribute
<template vapor>
    <!-- ... -->
</template>
```

To create a Vapor app in Vue, they have added a `createVaporApp` instead of `createApp` as you have done in the past. You can use the following syntax to initialize your app:

```typescript
import { createVaporApp } from 'vue'
import App from './App.vue'

createVaporApp(App).mount('#app')
```

## Summary

I think it is important to go back and look at frameworks, software and tools that you might have dismissed in the past. Sometimes projects will eclipse other projects when you are not paying attention. 

Evan You has started a new company called [VoidZero](https://voidzero.dev/), where they specialize on tooling around Vite. Vite started as a bundling tool for Vue, but other projects started adopting Vite as their build tool. Right now Vite has become the defacto standard as a build tool for TypeScript and JavaScript for projects like Svelte, Lit, Solid.js and Preact. This is one of the reasons why I decided to go back and take another look at Vue.