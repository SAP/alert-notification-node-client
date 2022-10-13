---
layout: default
title: Certificate service Authentication
parent: Authentication
nav_order: 2
permalink: /authentication/certificate-service
---

# OAuth Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
   {:toc}

---

## Description

Certificate service Authentication is a class in the context of Alert Notification service node client. It helps you to authenticate directly against Alert Notification service. 

## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.certificate-service-authentication.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.data.certificate-service-authentication.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## @Example

```js
import { CertificateServiceAuthentication } from '@sap_oss/alert-notification-client';

const certificateServiceAuthentication = new CertificateServiceAuthentication({
    certificate: 'test-certificate',
    privateKey: 'test-privateKey',
});

console.log(certificateServiceAuthentication.getCertificate());
console.log(certificateServiceAuthentication.getPrivateKey());
```