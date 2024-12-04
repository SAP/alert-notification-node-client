---
layout: default
title: Destination Authentication
parent: Authentication
nav_order: 1
permalink: /authentication/destinationService
---

# Basic Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

DestinationAuthentication is a class in the context of Alert Notification service node client. It helps you with acquiring the authorization header value, automatically by just providing the name of the destination.

It is using the SAP Cloud SDK to derive the `destinations` configured on a bound `destination-service-instance` or provided within the `default-env.json` for your local testing. For testing, you also could inject your destination configuration to the `process.env.destinations` variable. 

Instead of the "mTLS Authentication using the Destination Service", you really do not have to store or obtain anything further. Just provide the name of the destination and the SAP Cloud SDK will do cover you :)

Find more details about the SAP Cloud SDK and the destination-handling [here](https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations)

## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.destination-authentication.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.data.destination-authentication.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## @Example

```js
import { DestinationAuthentication } from '@sap_oss/alert-notification-client';

const destAuthentication = new DestinationAuthentication({
    destinationName: 'myWonderfulDestination'
});

destAuthentication.getAuthorizationHeaderValue()
.then(authHeaderValue => console.log(authHeaderValue))
.catch(error => console.log(error));  // The current call will print the authorization header value
```