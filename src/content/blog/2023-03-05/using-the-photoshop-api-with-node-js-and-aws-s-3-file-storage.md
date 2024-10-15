---
title: "Using the Photoshop API with Node.js and AWS S3 File Storage"
description: ""
tags: ["Node.js", "Photoshop", "Photoshop API", "AWS S3"]
category: 
date: 2023-03-05
cover_image: "./P51Illustration.png"
---

I recently came across this [post](https://blog.developer.adobe.com/introducing-the-adobe-photoshop-apis-cc7284c9d236) from Raymond Camden on how to use the Photoshop APIs with Node.js. If you are not familiar with Raymond Camden, he is an engineer at Adobe, and has worked with some cool server and client side technology. He is currently the Senior Developer Evangelist for [Adobe](https://www.adobe.com).

In the post he shows how to use the Photoshop API to remove the background from an image, and save it to a [Azure](https://azure.microsoft.com/en-us/products/storage) File Storage. 

I decided to play around with the API, but I wanted to use AWS S3 storage instead. I have not found and good documentation on how to use the Photoshop API with S3, so I decided to write this post on how to use the Photoshop API with AWS S3.

## Image processing on the server

For a little background, I started my career as graphic artist, and I have been working with Photoshop since version 1.0. One of the first big programming projects I had at my first job was 
taking a large collection of high resolution images, and saving out thumbnails for a web server with the background knocked out. I did this using a Photoshop extension that allowed developers to use AppleScript to run a series of actions and save a new version of the image. Back in the 90s we did not have a lot of the tools that we have now for doing image processing on a server.

Saving a thumbnail of an image can be done easily now with Node.js using Sharp or Jimp. These tools are great, but what if you want to use some of the advanced features of Photoshop to manipulate with the fool power of Photoshop. It is not realistic to run Photoshop on server since most servers nowadays are running linux.

Adobe has solved this problem by giving developers access to the Photoshop API.

## How much does it cost?

Adobe provides three different pricing models: a free trial up to 5000 API calls, Individual Developer with $0.15 per API call and custom pricing for the Enterprise.

I got set up with a free trial. You can to by following this [free trial link](https://developer.adobe.com/photoshop/api/signup/?ref=signup).

## Starting a new project

Once you have signed up, go to the I/O console, and create a new project. There are three options after creating a new project in the I/O console: Add an API, Add event and Add plugin. You will want to select `Add an API`. Select the Adobe Photoshop API, and then select next. The wizard will ask whether you want to Generate a key pair, or upload a public key for your JWT credentials. For out example we will choose option 1 to generate a key pair.

Once you select a new key pair, your browser will download a `config.zip` that contains your keys. Don't loose this, you will need this to authenticate against the Adobe Photoshop service. Unzip your config.zip. It contains two files: `certificate_pub.crt` and a `private.key`. You will also be shown a scree with your API Key (client Id).

Make sure to go to your project in the console and select the service account (JWT). This page contains your Client Id, Client Secret, Technical Account Id, Technical Account Email and Organization Id. You will need these when we go to set up our Node.js application.

## File Storage

Adobe gives you three options for file storage. Those providers are as follows:

* Azure File Storage
* AWS S3
* Dropbox

For this example I chose to use S3 because I have worked with it before, and it is probably the most popular of the three.

## Create an AWS account

If you do not already have one, go ahead and create an AWS account. Once you have created your AWS account, we are going to create a new S3 bucket in AWS. We will call it `photoshopservice`.

You will also need to install the AWS cli. Once you have installed the cli, you will need to login to AWS through the cli in order to authenticate AWS on your development computer.

## What are we building with the PS API

We will be creating a service that takes an existing photograph and makes it look like an oil painting. Here is an example of a before and after image.

![Oil Painting Example](./miles1box.jpg)

Once we have run the action, we will save the output back to our S3 bucket.

## Setting up the Environment Variables

Since we are using Node.js, we will use the `dotenv` package to load our environment variables.

```text
CLIENT_ID=<the client id>
CLIENT_SECRET=<the client secret>
TECHNICAL_ACCOUNT_ID=<account id>
TECHNICAL_ACCOUNT_EMAIL=<account email>
ORGANIZATION_ID=<org id>
KEY="<The private key here>"

BUCKET='photoshopservice'
REGION=<Your AWS Region>
```

## The code

For our code we will use a Node.js module. We can do this by giving our file extension the `.mjs` or changing the `type` in the `project.json` to `module`.

The next thing we will need to do is include the Node.js modules we need to run our code. You can install these modules by using the following NPM command.

```bash
> npm install @adobe/jwt-auth @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv node-fetch
```

Now we can can create our JavaScript module file with the following code:

```javascript
// Code taken from Raymond Camden's example, but using S3
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import auth from '@adobe/jwt-auth';
import fs from 'fs';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TECHNICAL_ACCOUNT_ID = process.env.TECHNICAL_ACCOUNT_ID;
const ORG_ID = process.env.ORGANIZATION_ID;
const KEY = process.env.KEY;

async function delay(x) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, x);
	});
}

const run = async () => {
    const s3Client = new S3Client({ region: process.env.REGION });

    const getParams = {
        Bucket: process.env.BUCKET,
        Key: 'miles1.jpg',
        Expires: 3600 
    };
    
    const putParams = {
        Bucket: process.env.BUCKET,
        Key: 'miles1_oilpaint2.png'

    };

    const actionsGetParams = {
        Bucket: process.env.BUCKET,
        Key: "Oil-paint.atn",
        Expires: 3600
    };

    const inputCommand = new GetObjectCommand(getParams);
    const inputActionsCommand = new GetObjectCommand(actionsGetParams);
    const outputCommand = new PutObjectCommand(putParams);

    const inputSignedUrl = await getSignedUrl(s3Client, inputCommand, { expiresIn: 3600 });
    const inputActionsSignedUrl = await getSignedUrl(s3Client, inputActionsCommand, { expiresIn: 3600 });
    const outputSignedUrl = await getSignedUrl(s3Client, outputCommand, { expiresIn: 3600 });
    
    let config = {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET, 
        technicalAccountId: TECHNICAL_ACCOUNT_ID,
        orgId: ORG_ID,
        privateKey: KEY,
        metaScopes:'ent_ccas_sdk'
    }

    let { access_token } = await auth(config);

    let data = {
        "inputs": [
            {
                "storage":"external",
                "href": inputSignedUrl
            }
        ],
        "options": {
            "actions": [
                {
                    "href": inputActionsSignedUrl,
                    "storage": "external",
                    "actionName": "Action 51"
                }
            ]
        },
        "outputs": [
                {
                    "storage":"external",
                    "href": outputSignedUrl,
                    "type": "image/png"
                }
            ]      
    };

    let resp = await fetch('https://image.adobe.io/pie/psdService/photoshopActions', {
        method: 'POST', 
        headers: {
            'Authorization':`Bearer ${access_token}`,
            'x-api-key': CLIENT_ID
        }, 
        body: JSON.stringify(data)
    });
    let result = await resp.json();
	console.log(result);

    let status = 'running';
    let jobResult;
	while(status === 'running' || status === 'pending' || status === 'starting') {
		console.log('delaying while checking');
		await delay(5000);

		let jobReq = await fetch(result['_links']['self']['href'], {
			headers: {
				'Authorization':`Bearer ${access_token}`,
				'x-api-key': CLIENT_ID
			}
		})
		
		jobResult = await jobReq.json();
		
		status = jobResult['status'];
	}

	console.log('Final result', jobResult);
};
run();
```

To run this example you will have needed to upload two files to your S3 bucket already. One for the input file and one for the action. The oil painting action can be found at the following [link](https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oil-paint.atn) on GitHub.

So lets break down what this code is actually doing. The top portion of the code seen below imports the AWS code modules and the Adobe auth library. It also sets up our environment variables for the auth and the S3 bucket and region.

```javascript
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import auth from '@adobe/jwt-auth';
import fs from 'fs';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TECHNICAL_ACCOUNT_ID = process.env.TECHNICAL_ACCOUNT_ID;
const ORG_ID = process.env.ORGANIZATION_ID;
const KEY = process.env.KEY;
```

The next part of the code creates an S3 client and code for creating the presigned S3 URLs that Adobe will need for our inputs and output.

```javascript
const s3Client = new S3Client({ region: process.env.REGION });

const getParams = {
    Bucket: process.env.BUCKET,
    Key: 'miles1.jpg',
    Expires: 3600 
};

const putParams = {
    Bucket: process.env.BUCKET,
    Key: 'miles1_oilpaint2.png'

};

const actionsGetParams = {
    Bucket: process.env.BUCKET,
    Key: "Oil-paint.atn",
    Expires: 3600
};

const inputCommand = new GetObjectCommand(getParams);
const inputActionsCommand = new GetObjectCommand(actionsGetParams);
const outputCommand = new PutObjectCommand(putParams);

const inputSignedUrl = await getSignedUrl(s3Client, inputCommand, { expiresIn: 3600 });
const inputActionsSignedUrl = await getSignedUrl(s3Client, inputActionsCommand, { expiresIn: 3600 });
const outputSignedUrl = await getSignedUrl(s3Client, outputCommand, { expiresIn: 3600 });
```

After creating the presigned URLs we can create our `access_token` using the Adobe auth library:

```javascript
let config = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET, 
    technicalAccountId: TECHNICAL_ACCOUNT_ID,
    orgId: ORG_ID,
    privateKey: KEY,
    metaScopes:'ent_ccas_sdk'
}

let { access_token } = await auth(config);
```

Now that we our `access_token`, we can define the data for the body of our request to the Photoshop API.

```javascript
let data = {
    "inputs": [
        {
            "storage":"external",
            "href": inputSignedUrl
        }
    ],
    "options": {
        "actions": [
            {
                "href": inputActionsSignedUrl,
                "storage": "external",
                "actionName": "Action 51"
            }
        ]
    },
    "outputs": [
            {
                "storage":"external",
                "href": outputSignedUrl,
                "type": "image/png"
            }
        ]      
};
```

As you can see from the example above, we are defining the inputs, options with actions we want to run, and the outputs. All three of these take an array, which is different from some of the other Photoshop APIs which only take a single input and output.

Once we have out body, now we can make out request using `node-fetch`.

```javascript
let resp = await fetch('https://image.adobe.io/pie/psdService/photoshopActions', {
    method: 'POST', 
    headers: {
        'Authorization':`Bearer ${access_token}`,
        'x-api-key': CLIENT_ID
    }, 
    body: JSON.stringify(data)
});
let result = await resp.json();
console.log(result);
```

In Raymond Camden's earlier example he checks the status every five seconds to see if the service has completed running.

```javascript
let status = 'running';
let jobResult;
while(status === 'running' || status === 'pending' || status === 'starting') {
    console.log('delaying while checking');
    await delay(5000);

    let jobReq = await fetch(result['_links']['self']['href'], {
        headers: {
            'Authorization':`Bearer ${access_token}`,
            'x-api-key': CLIENT_ID
        }
    })
    
    jobResult = await jobReq.json();
    
    status = jobResult['status'];
}

console.log('Final result', jobResult);
```

## Conclusion

For doing simple image manipulation, it is not necessary to use the Photoshop API, but if you have specialized tasks you need to perform on images, the Photoshop API might be the way to go.
If you just need to resize an image, or save in a different format, you do not need the Photoshop API to perform these sort of tasks.

However, if you need to run a set of actions, add typography to your images, use some of Adobe's AI for creating smart objects, the Photoshop API is probably the way to go for these types of jobs.

I will be presenting on the Photoshop API at the next [JaxNode User Group meeting on March 16th](https://www.meetup.com/jax-node-js-ug/events/291773993/). If you are in Jacksonville at the time, please come out.