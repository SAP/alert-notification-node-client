---
layout: default
title: ConsumerPagedResponse
parent: Event API's objects
nav_order: 6
permalink: /event-api-objects/consumer-paged-response
---

# ConsumerPagedResponse
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

The actual response object received when requesting from the Undelivered and Matched APIs.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.consumer-paged-response.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## @Example

_**Note**_: This is the payload you will receive on response.

```js
const consumerPagedResponse = {
        responseMetadata: {
            page: 0,
            pageSize: 100,
            totalPages: 1,
            totalResultsCount: 1
        },
        results: [
            {
                id: 'matched-or-undelivered-event-id',
                body: 'Your test-resource has been',
                subject: 'test-resource exceeds cpu limits',
                eventType: 'HighCpu',
                severity: 'WARNING',
                category: 'ALERT',
                resource: {
                    resourceName: 'test-resource',
                    resourceType: 'application'
                },
                eventTimestamp: 1602787032,
                metadata: {
                    cacheTime: 1602788032,
                    affectedActionId: 'to-store',
                    deliveryStatus: 'MATCHED'
                }
            }
        ]
};
```