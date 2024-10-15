---
title: "How to observe changes to the DOM without using a JavaScript framework"
description: ""
tags: ["JavaScript", "Document Object Model", "DOM", "Mutation Observer"] 
category: ""
date: 2021-06-25
cover_image: "./mutation.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/-ivM7fyXnTk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Nearly a decade ago I used to use jQuery for manipulating the document object model, or (DOM), in my web applications. jQuery has been supplanted in popularity by other frameworks like Angular, Backbone and React. These frameworks have become almost a standard for web development.

I ran into a situation a couple of years ago where I had to watch for changes to a particular DOM element, and remove any children that were being added by another framework inside of a WebView. While it would have been more ideal to change the code in that framework not to add these unnecessary DOM elements, I did not have that option.

## Welcoming the Mutation Observer

The Mutation Observer allows you to monitor any changes that are made to the DOM, and run your own code if needed. This code could be used if any elements are added, removed or attributes are added or changed. The Mutation Observer is one of the Web APIs that we get for free from the browser.

A common scenario of when we would use this API would be if a `div` element is added to a particular section, and we wanted to add an event listener for a mouse over.

The MutationObserver requires a constructor that takes a function that is used to handle those mutations. The constructor function takes the mutation list and an observer as parameters.

After defining a MutationObserver, you will also need to select the element or node you want to watch and call the observe function on the MutationObserver object. The observe function takes two arguments, one being the element to watch and the other being options we want to pass to the observer.

```javascript
// Create your observer
const observer = new MutationObserver(function(mutationList, observer) {
    // Your handling code here
});

// Select the element you want to watch
const elementNode = document.querySelector('.myClassName');

// Call the observe function by passing the node you want to watch with configuration options
observer.observe(elementNode, { 
    attributes: false, 
    childList: true, 
    subtree: false }
);

// When ready to diconnect
observer.disconnect();
```

## MutationObserver options

The Mutation Observer lets' us pass a lot of different options on what we want to observe. You can observe all items under the tree structure of the DOM element you are watching. You can also watch for the attributes changes to the element. At a minimum at least the `childList`, `attributes`, and or `characterData` must be true in order for the observer to watch a node. Here is a list of the different options you can pass.

* subtree
* childList
* attributes
* attributeFilter
* attributeOldValue
* characterData
* characterDataOldValue

## Click Listener Example

One example of how we could use the Mutation Observer if we are adding a div element to an element in out HTML, and we want to add an event listener to the div element any time the element is moused over. Lets' create a section with an id of 'div_section';

```html
<section id="div_section">

</section>
```

Now lets' write some JavaScript to add a `div` element to this section.

```javascript
const section = document.querySelector('#div_section');
let my_div_element = document.createElement('div');
my_div_element.className = 'div_element';
my_div_element.textContent = `My content goes here`;
section.appendChild(my_div_element);
```

The resulting HTML will look like the following once the JavaScript is executed.

```html
<section id="div_section">
    <div class="div_element">My content goes here</div>
</section>
```

Now lets' write an event handler that prints a console.log anytime an event is fired.

```javascript
function eventMouseOver(event) {
    console.log('This element was just moused over');
}
```

Now we can write a Mutation Observer to add this event listener anytime that a new `div` element with the class of `div_element` is added to our section.

```javascript
const div_section = document.querySelector('#div_section');

const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            const nodes = mutation.addedNodes;
            nodes.forEach(node => {
                node.addEventListener('mouseover', eventMouseOver);
            });
        }
    }
});

observer.observe(div_section, { 
    attributes: true, 
    childList: true, 
    subtree: true }
);
```

Now whenever someone mouses over our div element, we will get a console.log message that it has been moused over. 

Here is a complete example below.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample</title>
    </head>
    <body>
        <h1>Sample</h1>

        <section id="div_section">

        </section>

        <script type="text/javascript">
            const div_section = document.querySelector('#div_section');

            const observer = new MutationObserver((mutationsList, observer) => {
                for(const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        console.log('A child node has been added or removed.');
                        const nodes = mutation.addedNodes;
                        nodes.forEach(node => {
                            node.addEventListener('mouseover', eventMouseOver);
                        });
                    }
                }
            });
            
            observer.observe(div_section, { 
                attributes: false, 
                childList: true, 
                subtree: false }
            );

            function eventMouseOver(event) {
                console.log('This element was just moused over');
            }

            (function (){
                const section = document.querySelector('#div_section');
                let my_div_element = document.createElement('div');
                my_div_element.className = 'div_element';
                my_div_element.textContent = `My content goes here`;
                section.appendChild(my_div_element);
            })();
        </script>
    </body>
</html>
```

# Conclusion

As we can see from my example above the Mutation Observer gives web developers a lot pf power over the DOM. This is especially in use cases where we may be required to use another framework that may be manipulating our HTML in a way we cannot control.

There are some frameworks that I have scene that are constantly traversing the entire DOM looking for changes. This is not necessary when you use the Mutation Observer API. Check out the documentation below.

https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
