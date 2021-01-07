---
layout: default
title: Action
parent: Configuration's API objects
nav_order: 3
permalink: /configuration-api-objects/action/
---

# Action
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Action is an entity which represents the destination on which Alert Notification will send a processed event, e.g. Email, Slack, Webhook, etc.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.action.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


_**@Example:**_
```js
import { State } from '@sap_oss/alert-notification-client';

const action = {
    name: 'to-my-email',
    type: 'EMAIL',
    description: 'send to my mail',
    state: State.ENABLED,
    properties: {
        destination: '<your-email>@<domain>.com'
    }
};
```