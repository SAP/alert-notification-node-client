---
layout: default
title: Overview
nav_order: 1
has_toc: true
description: "test description"
permalink: /
---

---

# Overview
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What is SAP Cloud Platform Alert Notifcation?

SAP Cloud Platform Alert Notification is part of the DevOps portfolio of the SAP Cloud Platform. The service is specialized in instant delivery of events coming straight from the core platform services, e.g. database or application monitoring tools. This way you're always the first one notified whenever an issue with your dependency occurs. Additionally, Alert Notification provides means for posting real-time
crucial events directly from your application. All those events altogether - either your custom events or the platform ones, could be received on whatever channel is preferred - e-mail, Slack, custom webhook, etc.
Furthermore, events can even be stored in Alert Notification storage and pulled from it later.

## Features

* _Post custom events_
* _Pull already stored events - either custom or platform events, and on the other hand, either stored by request or stored because the requested action has failed for some reason_
* _Manage your actions, conditions and subscriptions_

## Installation

Node package manager will be used in order to install SAP Cloud Platform Alert Notification client:

```bash
$ npm i @sap_oss/alert-notification-client
```

## Usage

In order to use the client you will first have to import it and create an instance:

```js
import { AlertNotificationClient, RegionUtils, BasicAuthentication } from '@sap_oss/alert-notification-client';

const client = new AlertNotificationClient({
  authentication: new BasicAuthentication({
    username: '<your-technical-client-username>', // Replace with your username
    password: '<your-technical-client-password>' // Replace with your password
  }),
  region: RegionUtils.EU10 // Choose your region
});
```

## Resources

* [Configuration management by using the SAP Cloud Platform Cockpit](https://help.sap.com/viewer/5967a369d4b74f7a9c2b91f5df8e6ab6/Cloud/en-US/033cbf7cfab2484abad90276d3d3e776.html)
* [Credential management](https://help.sap.com/viewer/5967a369d4b74f7a9c2b91f5df8e6ab6/Cloud/en-US/80fe24f86bde4e3aac2903ac05511835.html)
* [Catalog of available events](https://help.sap.com/viewer/5967a369d4b74f7a9c2b91f5df8e6ab6/Cloud/en-US/80fe24f86bde4e3aac2903ac05511835.html)
* [Integration with SAP Cloud Platform Alert Notification](https://help.sap.com/viewer/5967a369d4b74f7a9c2b91f5df8e6ab6/Cloud/en-US/04c9ed027b824e93896f59c4081a704a.html)
* [Undelivered event troubleshooting](https://help.sap.com/viewer/5967a369d4b74f7a9c2b91f5df8e6ab6/Cloud/en-US/7272271fb0a74c2db22b03dbaa48546f.html)
* _SAP API Business Hub related resources_
  * [CloudFoundry Configuration API](https://api.sap.com/api/cf_configuration_api/resource)
  * [NEO Configuration API](https://api.sap.com/api/neo_configuration_api/resource)
  * [CloudFoundry Event Producer API](https://api.sap.com/api/cf_producer_api/resource)
  * [NEO Event Producer API](https://api.sap.com/api/neo_producer_api/resource)
  * [CloudFoundry Consumer API](https://api.sap.com/api/cf_consumer_api/resource)
  * [NEO Consumer API](https://api.sap.com/api/neo_consumer_api/resource)

# Alert Notification Client API

## Constructor

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.alert-notification-client.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## Methods

{% for method in site.data.alert-notification-client.methods %}

### {{method.name}}

* _**Description:**_

  * {{ method.description }}

* _**Arguments:**_

{% for argument in method.arguments %}
  * {{argument.name}} - {{argument.description}}
{% endfor %}

* _**Return value:**_

  * {{method.returnValue}}

{% endfor %}

For examples regarding the client, please check [Examples](./examples/overview.md) section.