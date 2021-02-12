---
layout: default
title: OAuth Authentication
parent: Authentication
nav_order: 2
permalink: /authentication/oauth
---

# OAuth Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

OAuthAuthentication is a class in the context of Alert Notification service node client. It helps you with acquiring the authorization header value, when using OAuth Authentication mechanism, in order to authenticate yourself against Alert Notification service.

_**Note**_: Grant type query parameter will be added automatically by the client with value __client_credentials__.

## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.oauth-authentication.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.data.oauth-authentication.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## @Example

```js
import { OAuthAuthentication } from '@sap_oss/alert-notification-client';

const oAuthAuthentication = new OAuthAuthentication({
    username: 'test-username',
    password: 'test-password',
    oAuthTokenUrl: 'https://test.oauth.service.com/oauth/token'
});

oAuthAuthentication.getAuthorizationHeaderValue()
.then(authHeaderValue => console.log(authHeaderValue))
.catch(error => console.log(error)); // In the current case an error will be logged, as the provided arguments are invalid. In order for the call to pass you must provide valid arguments.
```