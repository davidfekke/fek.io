---
title: "Use Node.js to control your Xmas Lights"
description: "unsplash Photo by Madison Kaminski"
tags: ["Node.js", "Hue Lights", "IoT", "Raspberry Pi", "Github Actions"]
category: 
date: 2021-12-18
cover_image: "./xmaslights.jpg"
---

<div style="text-align: center">
<iframe width="700" height="393" src="https://youtube.com/embed/pA55JQgUl9o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Or how to over engineer your Christmas Lights.

I have wanted to get light bulbs that you could control over a network or smart phone for years. I finally splurged and got the Philips Hue bridge and bulb. You can find these at most hardware stores now. The bridge ran me about $59 US. You can also purchase starter kits with some bulbs for about $69.

There are number of smart bulbs that you can purchase that connect directly to the Internet using your WiFi connections, but not all of them have the same IoT like capabilities. The Hue bridge can be controlled over a smart phone app, Amazon Dots, Google Home and also with a number of open source APIs.

I have a color bulb, and I wanted to make a light that cycled between green and red for the Christmas Holidays. In order to write an application that can communicate with the Hue bridge, you will need two pieces of information, the IP address of the bridge on your network, and user id.

You can find the IP address of your Hue bridge by using the smart phone app you used to configure and setup the bridge. In the app you can select the settings tab, then select Bridges > and then the bridge you setup. It will have the IP address listed in the info for the bridge.

The next step for getting a whitelisted user you can use for the bridge is to make a HTTP post to the Hue bridge. View the instructions down below;

[https://developers.meethue.com/develop/get-started-2/](https://developers.meethue.com/develop/get-started-2/)

Once you have the IP address and user token, you have all of the information you need to control the bulbs on your bridge.

# Getting a list of bulbs on your Bridge

Before we can send commands to a bulb, we will need to find the bulbs and their Ids so we can make calls using the Hue REST API. Here is a script for returning a list of all devices on your bridge;

```javascript
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ip_address = process.env.IP_ADDRESS;
const user = process.env.USERTOKEN;

const endpoint = `http://${ip_address}/api/${user}/lights/1`;

async function listAllBulbs() {
    const result = await axios.get(endpoint);
    console.log(result.data);
}

listAllBulbs();

```

Right now I only have one bulb on, so I will only get the result for the one bulb;

```shell
{
  '1': {
    state: {
      on: true,
      bri: 254,
      hue: 41371,
      sat: 82,
      effect: 'none',
      xy: [Array],
      ct: 153,
      alert: 'select',
      colormode: 'xy',
      mode: 'homeautomation',
      reachable: true
    },
    ...
  }
}
```

If I want to get the bulb state for a specific bulb, I can add the number of the bulb to the end point. We can rewrite that script to return just the first bulb;

```javascript
...

const endpoint = `http://${ip_address}/api/${user}/lights/1`;

async function listAllBulbs() {
    const result = await axios.get(endpoint);
    console.log(result.data);
}

listAllBulbs();

```

```shell
{
  state: {
    on: true,
    bri: 254,
    hue: 41371,
    sat: 82,
    effect: 'none',
    xy: [ 0.3085, 0.3266 ],
    ct: 153,
    alert: 'select',
    colormode: 'xy',
    mode: 'homeautomation',
    reachable: true
  },
  ...
}
```

If I want to change the color of the bulb to green, I can pass a new state to the bulb using the PUT verb and adding `state` to the end of the URL endpoint. Here is an example of setting the bulb to green;

```javascript
const endpoint = `http://${ip_address}/api/${user}/lights/1/state`;

const state = {
    "on": true,
    "bri": 254,
    "hue": 25600,
    "sat": 254
};

async function setBulbState(state) {
    const result = await axios.put(endpoint, state);
    console.log(result.data);
}

setBulbState(state);

```

## Cycling the bulb between green and red

To give the bulb a Christmas feel, I am going to cycle the bulb between green and red every two seconds. For the main script I will use a `setInterval` function, and set it run every 2000 milliseconds.

```javascript
let toggle = true;

async function cycleXMASLights() {
    await axios.put(endpoint, {
        "on":true,
        "sat":254,
        "bri":254,
        "hue": toggle ? 25600 : 0
    });
    toggle = !toggle;
}

let timer = setInterval(await cycleXMASLights, 2000);

```

Are full script should look like the following;

```javascript
// cyclexmaslights.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ip_address = process.env.IP_ADDRESS;
const user = process.env.USERTOKEN;

const endpoint = `http://${ip_address}/api/${user}/lights/1/state`;

let toggle = true;

async function cycleXMASLights() {
    await axios.put(endpoint, {
        "on":true,
        "sat":254,
        "bri":254,
        "hue": toggle ? 25600 : 0
    });
    toggle = !toggle;
}

let timer = setInterval(await cycleXMASLights, 2000);

```

## Run as a service

If we want to run our script as a service, we can do this my using `pm2`. PM2 to is a process manager written in node that can run on just about any operating system. Use the following command to install pm2 on our computer.

```shell
> npm i pm2 -g
```

This will install pm2 globally on our system. Now we can take our main script and install it as a service on our computer.

```shell
> pm2 install cyclexmaslights.js --name xmaslights
```

Now if we want to save this configuration so that our computer will remember this service, we can use the following command.

```shell
> pm2 save
```

If we want to continue to use our pm2 configuration after restart, we can use the following command to generate the command we will need to use to make pm2 a system service.

```shell
> pm2 startup

To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/user
```

On Linux it will probably use `systemd`. On the Mac it will probably use `launchd`.

## What if my computer goes to sleep or I turn it off?

If you are like me, and you want your lights to run all night long, using a computer that goes to sleep or that you turn off will kill the script. A good option here is to use a computer like the Raspberry Pi. They do not use a lot of power, and you can leave them just about anywhere in your home.

## Conclusion

IoT projects like this can be fun projects to do with your family at home. It is also fun learning more about hardware and embedded systems. Projects like this also help us learn more about APIs and Rest.

Hue also has a remote API that can be used over the internet to control a Hue bridge. There are a number of open source frameworks in many different languages that can be used for controlling lighting.