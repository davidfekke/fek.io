---
title: "How to Create your own Integration Test Email #1 from Node.js"
description: ""
category: 
tags: [JavaScript, Node.js, email, nodemailer]
date: 2021-06-18
cover_image: "./xavi-cabrera-unsplash.jpg"
---

Like many other HBO Max subscribers I received an email titled "Integration Test Email #1" to the email I use for my HBO Max account. I decided to write a post about how you can send your own 'Integration Test Email' from Node.js. There are a couple of different ways.

![Spam](./spam.png)

Sending automated emails from a server application is something you need to be careful about. Email is typically sent out through the SMTP protocol. Internet service providers are cautious that bad actors are not using their networks for sending SPAM. So when when writing software that sends email we need to make sure that we do not do anything to get us blacklisted. It is very easy to do if you are not careful.

## Nodemailer

The way I have sent email from Node.js in the past is by using a NPM module called `Nodemailer`. You can install it into your project by using the following terminal command.

```bash
> npm i nodemailer --save
```

To send out our "Integration Test Email" we can write a simple program that creates network connection to a SMTP server.

```javascript
import nodemailer from 'nodemailer';

const mailconnection = nodemailer.createTransport({
    host: 'smtp.mydomain.com',
    port: 2525,
    auth: {
       user: '<USERNAME>',
       pass: '<PASSWORD>'
    }
});

const messageObj = {
    from: 'intern@hbomax.com',
    to: 'me@mydomain.com',
    subject: 'Integration Test Email #1',
    text: 'This template is used by integration tests only.'
};

mailconnection.sendMail(messageObj, function(err, result) {
    if (err) {
      console.err(err)
    } else {
      console.log(result);
    }
});
```

# Testing with a development server

If you are going to test sending email, you might want to start by using a fake SMTP service. [Mailtrap.io](https://mailtrap.io/) offers a free service you can use for testing your email features. I would use a service like this before trying to run an integration test on every customer email account in my database.

## Third party services

There are third party services like [Sendgrid](https://sendgrid.com/) and [mailchimp](https://mailchimp.com/) that you can use for sending emails to your customers. The great thing about these services is they manage the complexity of staying off of email blacklists, and they offer APIs you can use for sending email rather than having to manage your own SMTP server.

These third party services also allow you to maintain lists. When you are sending out bulk emails, these services can also manage the users who want to opt out of receiving any more emails.

# Conclusion

There are a lot of great tools available to Node.js developers who want to leverage automated email services. As our Intern found out at HBO MAX, we need to very careful how we use these tools so we do not SPAM our own customers with 'Integration Test Emails'. I am hoping that HBO is kind to this intern because this appears to be an honest mistake. Hopefully the Intern will be able to laugh about this soon as me an my friends have been this morning.