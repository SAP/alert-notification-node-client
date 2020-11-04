---
layout: default
title: State
parent: Configuration's API objects
nav_order: 2
permalink: /configuration-api-objects/state/
---

# State
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

State is an enum holding a value for enablement and disablement of an entity

## Properties

|  Type  | Available values |
|:------:|:----------------:|
| string |     ENABLED      |
| string |     DISABLED     |

## Example

```js
import { State } from 'alert-notification-node-client';

console.log(State.ENABLED); // will print ENABLED
console.log(State.DISABLED); // will print DISABLED
```
