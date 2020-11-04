---
layout: default
title: Basic Authentication
parent: Authentication
nav_order: 1
permalink: /authentication/basic
---

# Basic Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

BasicAuthnetication is a class in the context of Alert Notification's node client. It helps you with acquiring the authorization header value, when using Basic Authentication mechanism, in order to authenticate yourself against Alert Notification.

## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.basic-authentication.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.data.basic-authentication.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## @Example

```js
import { BasicAuthentication } from 'alert-notification-node-client';

const basicAuthentication = new BasicAuthentication({
    username: 'test-username',
    password: 'test-password'
});

basicAuthentication.getAuthorizationHeaderValue()
.then(authHeaderValue => console.log(authHeaderValue))
.catch(error => console.log(error));  // The current call will print be successful and will print the basic authorization header value with encoded username and password in base64 format 'Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk'
```