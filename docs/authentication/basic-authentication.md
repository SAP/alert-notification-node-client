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

BasicAuthentication is a class in the context of Alert Notification service node client. It helps you with acquiring the authorization header value, when using Basic Authentication mechanism, in order to authenticate yourself against Alert Notification service. For further information go to [Credential Management](https://help.sap.com/docs/ALERT_NOTIFICATION/5967a369d4b74f7a9c2b91f5df8e6ab6/80fe24f86bde4e3aac2903ac05511835.html?locale=en-US) and select Basic Access Authentication option.

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
import { BasicAuthentication } from '@sap_oss/alert-notification-client';

const basicAuthentication = new BasicAuthentication({
    username: 'test-username',
    password: 'test-password'
});

basicAuthentication.getAuthorizationHeaderValue()
.then(authHeaderValue => console.log(authHeaderValue))
.catch(error => console.log(error));  // The current call will print the basic authorization header value with encoded username and password in base64 format 'Basic dGVzdC11c2VybmFtZTp0ZXN0LXBhc3N3b3Jk'
```