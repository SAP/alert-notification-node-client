---
layout: default
title: Configuration
parent: Configuration's API objects
nav_order: 6
permalink: /configuration-api-objects/configuration/
---

# Configuration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Configuration represents the assembly of actions, conditions and subscriptions

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.configuration.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


_**@Example:**_
```js
import { State, Predicate } from 'alert-notification-client';

const configuration =
{
   actions: [
       {
            name: 'to-my-email',
            type: 'EMAIL',
            description: 'send to my mail',
            state: State.ENABLED,
            properties: {
                destination: '<your-email>@<domain>.com'
            }
       }
   ],
   conditions: [
       {
            name: 'event-type-contains-HighCpu',
            description: 'Match events which body contains HighCpu',
            propertyKey: 'eventType',
            predicate: Predicate.CONTAINS,
            propertyValue: 'HighCpu'
       }
   ],
   subscriptions: [
        {
            name: 'event-with-eventType-HighCpu-to-mail',
            state: State.ENABLED,
            actions: ['to-my-email'],
            conditions: ['event-type-contains-HighCpu'],
            description: 'Subscription will act when an event with eventType - HighCpu is received and will send an email to me'
        }
   ]
};
```