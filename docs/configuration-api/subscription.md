---
layout: default
title: Subscription
parent: Configuration's API objects
nav_order: 5
permalink: /configuration-api-objects/subscription/
---

# Subscription
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Subscription is the aggregation of an action and condition. When an event is received in Alert Notification, it will be only processed if a subscription exists and the matching criteria of condition is fullfilled.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.subscription.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


## Example
```js
import { State } from 'alert-notification-node-client';

const subscription = {
    name: 'event-with-eventType-HighCpu-to-mail',
    state: State.ENABLED,
    actions: ['to-my-email'],
    conditions: ['event-type-contains-HighCpu'],
    description: 'Subscription will act when an event with eventType - HighCpu is received and will send an email to me'
};
```