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

Condition is an entity which defines a condition in the context of the Alert Notification which must be met in order for some Action to be triggered

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.condition.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


## Example
```js
import { Predicate } from '@sap_oss/alert-notification-client';

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
import { Predicate } from '@sap_oss/alert-notification-client';

console.log(Predicate.CONTAINS); // will print 'CONTAINS'
```