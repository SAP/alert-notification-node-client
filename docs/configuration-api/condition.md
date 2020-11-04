---
layout: default
title: Condition
parent: Configuration's API objects
nav_order: 4
permalink: /configuration-api-objects/condition/
---

# Condition
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
|:---:|:--:|:---------:| {% for field in site.data.condition.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


## Example
```js
import { Predicate } from 'alert-notification-node-client';

const condition = {
    name: 'event-type-contains-HighCpu',
    description: 'Match events which body contains HighCpu',
    propertyKey: 'eventType',
    predicate: Predicate.CONTAINS,
    propertyValue: 'HighCpu'
};
```
## Associated types

### Predicate

#### Description

Predicate is an enum value representing a matching criteria for a condition.

#### Properties

|  Type  |  Available values |
|:------:|:-----------------:|
| string |     CONTAINS      |
| string |  DOES_NOT_CONTAIN |
| string |    STARTS_WITH    |
| string |DOES_NOT_START_WITH|
| string |    ENDS_WITH      |
| string | DOES_NOT_END_WITH |
| string |     EQUALS        |
| string |    NOT_EQUALS     |
| string |       ANY         |
| string |    LESS_THAN      |
| string |    NO_VALUE       |
| string |  GREATHER_THAN    |
| string |  NUMBER_EQUALS    |

#### Example
```js
import { Predicate } from 'alert-notification-node-client';

console.log(Predicate.CONTAINS); // will print 'Contains'
```