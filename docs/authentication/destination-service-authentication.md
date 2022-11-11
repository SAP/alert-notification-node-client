---
layout: default
title: mTLS Authentication using the Destination Service
parent: Authentication
nav_order: 2
permalink: /authentication/mtls-authentication-using-the-Destination-service
---

# mTLS Authentication using the Destination Service
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

DestinationConfiguration is a class in the context of Alert Notification service Node client. It is used to trigger the mTLS authentication, Basic authentication or oAuth authentication using the Destination service, you just need to provide the clientID, Client secret, OAuth url, Destination service configuration URL generated from your Destination Service instance (e.g. from a Service Key or Service Binding) and the name of the destination where your Alert Notification credentials are configured. For further information go to [Credential Management](https://help.sap.com/docs/ALERT_NOTIFICATION/5967a369d4b74f7a9c2b91f5df8e6ab6/80fe24f86bde4e3aac2903ac05511835.html?locale=en-US) and select Mutual TLS Authentication with Destination Service option.
## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.destination-service.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.destination-service.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## @Example

```js
import { DestinationConfiguration } from '@sap_oss/alert-notification-client';

const destinationConfiguration = new DestinationConfiguration({
    username: 'test-certificate',
    password: 'test-privateKey', 
    oAuthTokenUrl: 'https://test.oauth.cert.service.com/oauth/token',
    destinationUrl: 'https://destination-configuration.test.com',
    destinationName: 'test-destination'
});

destinationConfiguration.getAuthentication()
        .then(authentication => console.log(authentication))
        .catch(error => console.log(error));  // The current call will print the authentication configured in the destination.'

```