---
title: "Add Tailwindcss to your Next.js site"
tags: ["Node.js", "JavaScript", "Next.js", "Tailwindcss"]
description: ""
category: 
date: 2022-02-11
cover_image: "./nextback.jpg"
---

I am in the process of trying to get caught up on a lot of the new CSS technologies. One of those technologies that has become increasingly popular over the last couple of years has been Tailwindcss.

If you are not familiar with [Tailwindcss](https://tailwindcss.com/), it is a CSS framework that gives web developers a set of low level components to style web sites. Unlike frameworks like Bootstrap, instead of giving you a single class for a button, it allows you to use multiple classes to specifically style the element with specific classes. One way you might style a button using Tailwind would be like the following example;

```html
<button class="bg-green-500 text-white px-4 py-2 mt-3 mb-4 rounded">Press Me</button>
```

The previous code will create a button that looks like the following;

![button](../2022-01-30/tailwind-button.jpg)

I have also started using [Next.js](https://nextjs.org/) for building web applications. Next, developed by the [Vercel](https://vercel.com) hosting company, is a server side framework based on [React](https://reactjs.org). You can pre-load data for your React applications and build static content as well. 

It is actually very easy to add Tailwindcss to your Next.js projects.

Lets' create a Next.js project using the following steps. First, make sure you have Node.js installed. Both Tailwindcss and Next.js both require Node. Then execute the following commands in your terminal to create a new Next.js project and go into the directory that was created for your project.

```bash
> npx create-next-app tailwind-next-project
> cd tailwind-next-project
```

Now that we have created our project, we can add the modules we need to use Tailwindcss;

```bash
> npm install -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p
```

Those commands will add the `tailwindcss`, `postcss` and `autoprefixer` modules to our project, as well as add references to our `package.json` file. The `tailwindcss init` will create a config file in the root of our project called `tailwind.config.js`.

Now we need to modify our `tailwind.config.js` file so that it will scan our Next.js pages and components for Tailwind's utility classes. Modify the `tailwind.config.js` file so that it looks like the following;

```javascript
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

We just added search paths in the content for the `pages` and `components` in our config.

Now add the following @tailwind directives to your ./styles/globals.css file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Start using Tailwindcss
Now we have everything we need to start using Tailwindcss in our project. We can test this by running the following command to start the Next.js development server;

```bash
> npm run dev
```

## Conclusion
Both Tailwind and Next.js make it very easy to integrate into other frameworks. Another thing that is nice about Tailwind 3.0 and above is that it only adds the CSS you need for your site. Previous version of Tailwind included all of the CSS components, but the current version are very lightweight.

[Install Tailwindcss with Ne.js](https://tailwindcss.com/docs/guides/nextjs)