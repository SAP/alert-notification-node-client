---
layout: default
title: AffectedResource
parent: Event API's objects
nav_order: 3
permalink: /event-api-objects/affected-resource
---

# AffectedResource
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Object representing your resource.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.affected-resource.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


## @Example
```js
import { Severity, Category } from 'alert-notification-node-client';

const affectedResource = {
    resourceName: 'test-resource',
    resourceType: 'application',
    resourceInstance: '123456',
    tags: {
        deatilsLink: 'https://example.details.com'
    };
};
```