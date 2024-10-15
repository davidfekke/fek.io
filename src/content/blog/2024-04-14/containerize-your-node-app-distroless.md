---
title: "Containerize your Node app Distroless"
tags: ["Node.js", "Container", "Docker"]
description: ""
category: 
date: 2024-04-14
cover_image: "./distroless.png"
---

<div style="text-align: center">
    <div class="responsive-iframe-container">
        <iframe src="https://youtube.com/embed/Co4DiyDvKPA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>

![A starry night sky.](./distroless.png)

It is easy enough to create a Node.js application, but one of the first roadblocks many developers run into is how they can deploy their application. Many cloud providers have services that will automatically deploy a node app, but underneath the hood almost all of these cloud providers are using Docker. 

## What is Docker
[Docker](http://www.docker.com) is a technology that lets you create a container for your application. Just about any application that can run a server can be run inside a container. Docker is one of many vendors that provide container support. The underlying technology is based on Linux namespaces and Cgroups, which allow developers to run their apps in a isolated and memory efficient space on a server. When combined with services like Kubernetes, your containerized apps can be automatically deployed, run and scheduled. 

A server configured as a node for docker or kubernetes can run multiple docker containers on the same server. These containers can run in their own space, so one application does not effect the other application. In other words, if your application has a dependency that would conflict with another application, such as a library, it will not effect the other application because it is running in it's own container.

# How to Dockerize your Node app

We will start with a very simple node application that creates a server that just returns `Hello World!`.

```javascript
import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!');
}).listen(3000, '0.0.0.0', () => {
    console.log('Server listening on port 3000');
});
```

## Install Docker

If you do not have docker installed already, you can install Docker by going to the [Get Docker page](https://docs.docker.com/get-docker/) on the Docker documentation website. Download the proper installer for your operating system. Once Docker is installed, run `Docker Desktop` and you can test to make sure it is running by running the following command in the terminal of your choice:

```shell
docker run -it hello-world
```

You should see output from your terminal that looks like the following:

```shell
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
478afc919002: Pull complete
Digest: sha256:03b30c6a3c320ff172b52bd68eddffde6ded08ce47e650fe52de861c5e9df46d
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## Add a Dockerfile to your Node app

Now that we have Docker running, we can add a new file to the same root directory as our Node.js application. Name the file `Dockerfile`. Once you have created this file, add the following lines to your file:

```Dockerfile
# specify the node base image with your desired version node:<version>
FROM node:20
# replace this with your application's default port
RUN mkdir /src

COPY package.json /src
WORKDIR /src

# Add your source files
COPY . /src
CMD ["node","index.js"]
```

If we look at the `Dockerfile` above, we can see that it is setting a couple of different things up for our image. The first line always starts with a `FROM`. In this case, we start with a `FROM node:20`. This lets docker know that we will use a Node.js image as the basis of our container. The next parts of the dockerfile are simply creating a new directory to store our app, copying the code into the new directory, setting a working directory and running our app with the `CMD ["node", "index.js"]` at the end.

Now let's create a new file called `.dockerignore` and add the following:

```text
/node_modules
package-lock.json
```

The `.dockerignore` lets you specify any files that you want your container to ignore.

Now that we have our Dockerfile created, we can use the `docker` command in the terminal to create a Docker image and run the image in a container.

```shell
docker build -t mynodeapp .

docker run --name=nodeapp -p 3000:3000 -d mynodeapp
```

Running this container will return `Hello, World!` when run in the browser or by curl command.

Now that we have our node app running in a container, let's take a look at the image for our container:

```shell
docker images mynodeapp 
```

This will return a table that looks like the following:

```text
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
mynodeapp    latest    c781f609bd6b   8 minutes ago   1.1GB
```

As we can see from the table above, the image for our node app is 1.1 gigabytes in size, which is quite large for the size of the application. Not only that, but if we run docker scout, it will show many security vulnerabilities in that image.

This is because most docker images contain a linux distro as part of the image. This is many so we can access many of the features of that distro in our app, even if we are not using those features.

## Using Distroless containers

We can slim down our container by using a distroless image as the basis for our container. So we will make a couple of changes to our `Dockerfile`.

```dockerfile
FROM cgr.dev/chainguard/node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node ["package.json", "index.js"]

CMD [ "index.js" ]
```

Now lets build a new image based on this change.

```shell
docker build -t mynodeapp-cg .
```

Now lets view the image using the `docker images` command.

```shell
docker images mynodeimage-cg
```

The result should use a much smaller image like the following:

```text
REPOSITORY     TAG       IMAGE ID       CREATED         SIZE
mynodeapp-cg   latest    f2a860ffd8e5   3 minutes ago   121MB
```

This example above is using the [Chainguard](https://images.chainguard.dev/directory/image/node/overview) distroless container image from Chainguard. If you are not familiar with Chainguard, they provide secure and slimmed down base images. They are primarily concerned with providing images that are secure and have no known vulnerabilities. Part of the way they do this is not including any unneeded dependencies to your images. On top of making your images smaller, it also reduces the attack vector on your docker image.

## Deploying your container

Now that we have created a container, and ran it locally, we can deploy it on almost any cloud provider. Many companies use Docker along with Kubernetes to deploy their containers onto servers. Kubernetes allows organizations to orchestrate and schedule containers on servers that have Kubernetes and Docker preinstalled. You can also create a virtual machine and install Docker on the VM do you can deploy the container yourself, but most cloud providers offer services that automate this task through a continuous integration process.

## Conclusion

Containers make it easy to isolate your application from other concerns on the host operating system. It also removes the "it works on my machine" problem of software development. By containerizing our applications, we can make them more deployable, reliable and secure.