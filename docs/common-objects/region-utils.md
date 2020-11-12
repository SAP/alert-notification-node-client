---
layout: default
title: RegionUtils
nav_order: 4
parent: Common objects
permalink: /common-objects/region-utils
---

# RegionUtils
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

RegionUtils contains:
* constants with predefined regions which represent where Alert Notification is currently onboarded
* a class which can be used to fully customize your region with a specific URL and platform.
* an enum representing the environment on which Alert Notification is onboarded

## Region

### Description

A class which can be used to fully customize your region with a specific URL and platform.

### Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.region-utils.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

### Methods

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Name | Returns | Description |
|:---:|:--:|:---------:| {% for method in site.data.region-utils.methods %}
| {{method.name}} | {{method.returnValue}}|{{method.description}} | {% endfor %}

## Platform

### Description

Platform is an enum representing the environment on which Alert Notification is onboarded.

### Properties

| Type  | Available values |
|:-----:|:----------------:|
|string |        CF        |
|string |        NEO       |

### @Example

```js
import { RegionUtils } from 'alert-notification-node-client';

console.log(RegionUtils.Platform.CF); // will print 'CF'
console.log(RegionUtils.Platform.NEO); // will print 'NEO'
```

## Constants

### Description

RegionUtils contains exported constants which represent predefined regions, on which Alert Notification is onboarded.

### Available Constants

| Constants |
|:---------:|
|    AE1    |
|    AP1    |
|    AP2    |
|    BR1    |
|    CA1    |
|    CA2    |
|    CN1    |
|    RU1    |
|    SA1    |
|    EU1    |
|    EU2    |
|    EU3    |
|    US1    |
|    US2    |
|    US3    |
|    US4    |
|    JP1    |
|    EU10   |
|    EU20   |
|    AP10   |
|    BR10   |
|    CA10   |
|    AP11   |
|    US20   |
|    US21   |
|    AP21   |
|    JP20   |
|    US10   |
|    JP10   |
|   NEO_ROT |
| NEO_FRANKFURT |
| NEO_AMSTERDAM |
| NEO_ASHBURN   |
| NEO_CHANDLER  |
| NEO_STERLING  |
| NEO_COLORADO_SPRINGS |
| NEO_TOKYO |
| NEO_DUBAI |
| NEO_SYDNEY |
| NEO_SYDNEY_DR |
| NEO_SAO_PAULO |
| NEO_TORONTO |
| NEO_TORONTO_DR |
| NEO_RIYADH |
| NEO_SHANGHAI |
| NEO_MOSCOW |
| CF_AWS_SYDNEY |
| CF_AWS_SINGAPORE |
| CF_AWS_SAO_PAULO |
| CF_AWS_MONTREAL |
| CF_AWS_FRANKFURT |
| CF_AWS_TOKYO |
| CF_AWS_US_EAST |
| CF_AZURE_SINGAPORE |
| CF_AZURE_NETHERLANDS |
| CF_AZURE_TOKYO |
| CF_AZURE_WA |
| CF_AZURE_VA |

### @Example

```js
import { RegionUtils } from 'alert-notification-node-client';

console.log(RegionUtils.EU10); // will print EU10 region instance
```