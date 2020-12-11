---
layout: default
title: EntityType
parent: Configuration's API objects
nav_order: 2
permalink: /configuration-api-objects/entity-type/
---

# EntityType
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

EntityType is an enum which helps deduce what type of entity you are trying to manage.

## Properties

| Type  | Available values |
|:-----:|:----------------:|
|string |     ACTION       |
|string |    CONDITION     |
|string |   SUBSCRIPTION   |

## @Example

```js
import { EntityType } from 'alert-notification-client';

console.log(EntityType.ACTION); // will print 'ACTION'
console.log(EntityType.CONDITION); // will print 'CONDITION'
console.log(EntityType.SUBSCRIPTION); // will print 'SUBSCRIPTION'
```
