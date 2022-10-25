---
layout: default
title: Certificate Authentication
parent: Authentication
nav_order: 2
permalink: /authentication/certificate-authentication
---

# Certificate Authentication
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
   {:toc}

---

## Description

CertificateAuthentication is a class in the context of Alert Notification service node client. It is used to trigger the mTLS based authentication, you just need to provide the certificate and private key generated from your Alert Notification service instance (e.g. from a Service Key or Service Binding). For further information go to [Credential Management](https://help.sap.com/docs/ALERT_NOTIFICATION/5967a369d4b74f7a9c2b91f5df8e6ab6/80fe24f86bde4e3aac2903ac05511835.html?locale=en-US) and select Mutual TLS Authentication option.

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
import { CertificateAuthentication } from '@sap_oss/alert-notification-client';

const certificateAuthentication = new CertificateAuthentication({
    certificate: 'test-certificate',
    privateKey: 'test-privateKey',
});

console.log(certificateAuthentication.getCertificate());
console.log(certificateAuthentication.getPrivateKey());
```