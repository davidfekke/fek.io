---
title: "How to add machine learning to your Node.js app"
tags: ["Node.js", "JavaScript", "Machine Learning"]
description: ""
category: 
date: 2022-07-24
cover_image: "./hal9000.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/bhg7iqz7Jw0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I am in the process of trying to learn more about machine learning. AI and machine learning on the surface can appear to be daunting when you hear terms like multi-layered neural networks and linear regression. But for simple tasks you can leverage machine learning fairly easily using either your browser or Node.js

I currently receive hundreds of emails a day. A lot of those emails are either newsletters or technology publications that send out hyperlinks to stories I find interesting. The headlines I am most interested in are programming related. I have been looking for ways to streamline going through these emails to find just the headlines I want to read. So I decided to use Node.js to parse through my email using machine learning.

## Is Node.js the best language for doing Machine Learning
The short answer is no. That being said it is the language I chose because it is one that I am already familiar with for writing my own home automation. If you are serious about learning AI and ML, Python is a better language to start with because there are a ton of resources and frameworks for doing this type of computing.

Some of the tools that are popular for doing ML are Keras, TensorFlow, NLTK, PyTorch, Scikit, Pandas, Numpy and MXNet. There are a lot more that I did even mention.

With Node.js, there are a couple of different modules I looked at using including [TensorFlow.js](https://www.tensorflow.org/js), [Brain.js](https://brain.js.org/#/), [Natural](https://github.com/NaturalNode/natural) and [ML-classify-text](https://github.com/andreekeberg/ml-classify-text-js). I wound up going with Natural because what I wanted to do was to classify a headline as a specific subject I might be interested in reading.

## ML Workflows

Machine learning workflows can be broken down into a couple of steps. The first step is finding the best algorithm for building your model. For text classification I was looking for something that was pretty simple. Natural has a couple of different classifiers, I chose the BayesClassifier.

The next step is finding or defining data you can use to train your model. For my project I used previous headlines that I had already selected for subject areas that I found interesting. This step is probably the most important. The more data you have, and the more accurate your data is, the better your model will perform at selecting the right classification.

After training your model, he next step is to test how accurate your model is against actual data.

The last step is deploying your model into an application. Some ML frameworks allow for models to be updated after they have been created. This is nice because you can continue to iterate on your model to make it more accurate over time.

## Natural example

The following example is from the Natural source code example, but it gives an idea of how easy it is to design, train and use a model.

```javascript
import natural from 'natural';

const { BayesClassifier } = natural;
const classifier = new BayesClassifier();

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');

classifier.train();

console.log(classifier.classify('did the tests pass?')); // software
console.log(classifier.classify('did you buy a new drive?')); // hardware

```

Once you have trained your model and tested it for it's validity, you will need to save it so you can reuse it in your application. Here is an example of how you can save your model using Natural.

```javascript
classifier.save('classifier.json', function (err, classifier) {
  if (err) {
    console.log(err)
  }
  // the classifier is saved to the classifier.json file!
});
```

Once you have your model saved, you can reload it using the following function.

```javascript
natural.BayesClassifier.load(filepath, null, (err, classifier) => {
    if (err) console.log(err);
    //  use your classifier
});
```

The saving and loading functions are both asynchronous tasks. If you want to load your model up in a more synchronous way, you can always use async/await in modern JavaScript.

```javascript
import natural from 'natural';

function loadClassifier(filepath) { 
    return new Promise((resolve, reject) => {
        natural.BayesClassifier.load(filepath, null, (err, classifier) => {
            if (err) reject(err);
            resolve(classifier);
        });
    });
}

const classifier = await loadClassifier('classifier.json');
```

## Hardware requirements

The NLP or natural language processing we have used in this post do not require a lot of computational power, but if you want to get into deep learning and image recognition you will want to investigate GPUs and other specialized processors. Many of the frameworks have hardware acceleration that takes advantage of these types of processors.

Nvidia has a library called [CUDA](https://developer.nvidia.com/machine-learning) that lets developers take advantage of their hardware for doing the kind of linear algebra required for accelerated machine learning.

Google also has a processor they call a [TPU](https://cloud.google.com/tpu/docs/tpus), or Tensor Processing Unit. This is a processor specifically designed for processing Tensors using application specific integrated circuits or ASICs. 

Apple also has part of their M1 processor that is dedicated to ML tasks called a Neural Core. One caveat to using the M1 with existing ML frameworks is that many of the existing projects have a reliance on Python 2.7. Python 2.7 will have to run under Rosetta 2 on M1 Macs. There are some frameworks that are taking advantage of the neural core in the M1s, but you will have to research if this will work for your needs. 

## Conclusion

It is fairly easy to add ML to your Node.js projects. It is worth taking some time to understand some of the other ML frameworks that are available such as Brain.js and TensorFlow.js. These frameworks can do some advanced things like build neural networks and do image classification. Think `Hotdog/Not Hotdog`.