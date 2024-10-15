---
title: "Add Tailwindcss to your Gatsby Site"
tags: ["Node.js", "JavaScript", "Gatsby", "Tailwindcss"]
description: ""
category: 
date: 2022-01-30
cover_image: "../2021-05-28/gatsbyplugins.png"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/ImmsEgNFxPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I am in the process of trying to get caught up on all of the new CSS technologies. One of those technologies that has become increasingly popular over the last couple of years has been Tailwindcss.

If you are not familiar with Tailwindcss, it is a CSS framework that gives web developers a set of low level components to style web sites. Unlike frameworks like Bootstrap, instead of giving you a single class for a button, it allows you to use multiple classes to specifically style the element with specific classes. One way you might style a button using Tailwind would be like the following example;

```html
<button class="bg-green-500 text-white px-4 py-2 mt-3 mb-4 rounded">Press Me</button>
```

The previous code will create a button that looks like the following;

![button](./tailwind-button.jpg)

While using all of these classes might seem verbose at first, it gives web developers very precise control of their layouts with having to write a lot of CSS.

## Adding Tailwind to Gatsby

One of the other things that is nice about is they have very good documentation on all of their component classes as well as how to integrate Tailwind with other frameworks like Next.js, Vite and Gatsby. I wanted to use this post to show how easy it is to add Tailwind to an existing Gatsby site.

The first thing you will need to do is add the following modules to your Gatsby site;

```bash
> npm install -D tailwindcss postcss autoprefixer gatsby-plugin-postcss
```

This adds the Tailwind modules along with the gatsby plugin you will need to use Tailwind with Gatsby. After you have added these modules you will need to init Tailwind using the following command;

```bash
> npx tailwindcss init -p
```

This will create the `tailwind.config.js` file along with the `postcss.config.js` files. 

Next we will need to enable PostCSS in our `gatsby.config.js` file. Add the following plugin to this config file.

```javascript
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
  ],
}
```

Now that we have added the postcss plugin to Gatsby we can configure the `tailwind.config.js` file to scan our templates for any tailwind class usage. This can be done by adding our source path to the `tailwind.config.js` file.

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Now lets' add a `styles` folder underneath our `src` folder. In the `styles` folder we will create a file called `global.css`. Add the following `@include` lines to the `global.css file.

```css
/* ./src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now that we have added a `global.css` file, we can add it as an import into the `gatsby-browser.js` file. If you do not have a Gatsby-browser.js file, go ahead and create one and add the following line.

```javascript
// gatsby-browser.js
import './src/styles/global.css'
```

## Start using Tailwindcss

Now that we have Tailwind configured in our Gatsby site, we can now run either `gatsby develop` or `gatsby build` to start using Tailwindcss in our project.

## Conclusion

Both Tailwind and Gatsby make it very easy to integrate into other frameworks. Another thing that is nice about Tailwind 3.0 and above is that it only adds the CSS you need for your site. Previous version of Tailwind included all of the CSS components, but the current version are very lightweight.

[Tailwindcss Gatsby integration instructions](https://tailwindcss.com/docs/guides/gatsby)

[Gatsby Tailwindcss instructions](https://www.gatsbyjs.com/docs/how-to/styling/tailwind-css/)