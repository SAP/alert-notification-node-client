---
layout: default
title: ResourceEvent
parent: Event API's objects
grand_parent: Event API
nav_order: 4
permalink: /event-api-objects/resource-event
---

# ResourceEvent
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Object to use when you want to ingest an event in Alert Notification to alert/notify about what is happening with a resource of yours. To see the methods which are using it check [here](/alert-notification-node-client/#alert-notification-client-api)

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.resource-event.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


## @Example
```js
import { Severity, Category } from '@sap_oss/alert-notification-client';

const resourceEvent = {
    body: 'Your test-resource has been',
    subject: 'test-resource exceeds cpu limits',
    eventType: 'HighCpu',
    severity: Severity.WARNING,
    category: Category.ALERT,
    resource: {
        resourceName: 'test-resource',
        resourceType: 'application',
        resourceInstance: '123456',
        tags: {
            detailsLink: 'https://example.details.com'
        }
    },
    eventTimestamp: 1602787032,
    priority: 1
};
```