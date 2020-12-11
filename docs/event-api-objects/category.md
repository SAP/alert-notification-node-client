---
layout: default
title: Category
parent: Event API's objects
nav_order: 2
permalink: /event-api-objects/category
---

# Category
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Represents the category of the event.

## Properties

| Type  | Available values |
|:-----:|:----------------:|
|string |       ALERT      |
|string |     EXCEPTION    |
|string |    NOTIFICATION  |

## @Example

```js
import { Category } from 'alert-notification-client';

console.log(Category.ALERT); // will print 'ALERT'
console.log(Category.EXCEPTION); // will print 'EXCEPTION'
console.log(Category.NOTIFICATION); // will print 'NOTIFICATION'
```
