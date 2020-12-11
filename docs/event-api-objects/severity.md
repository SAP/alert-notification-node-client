---
layout: default
title: Severity
parent: Event API's objects
grand_parent: Event API
nav_order: 1
permalink: /event-api-objects/severity
---

# Severity
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Represents the event impact in the context of the affected resource.

## Properties

| Type  | Available values |
|:-----:|:----------------:|
|string |      INFO        |
|string |      FATAL       |
|string |      ERROR       |
|string |      NOTICE      |
|string |      WARNING     |

## @Example

```js
import { Severity } from 'alert-notification-client';

console.log(Severity.NOTICE); // will print 'NOTICE'
```
