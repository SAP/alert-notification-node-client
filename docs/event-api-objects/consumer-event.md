---
layout: default
title: ConsumerEvent
parent: Event API's objects
nav_order: 5
permalink: /event-api-objects/consumer-event
---

# ConsumerEvent
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Received when requesting Undelivered or Matched APIs. Represents a stored event which was either delivered or undelivered. To see which methods are returning such response see [here](/#alertnotificationclientapi).

**Note**: This object is returned on response from Alert Notification's Undelivered and Matched APIs

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.consumer-event.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}


_**@Example:**_
```js
import { Severity, Category } from 'alert-notification-node-client';

const consumerEvent = {
    id: 'matched-or-undelivered-event-id',
    body: 'Your test-resource has been',
    subject: 'test-resource exceeds cpu limits',
    eventType: 'HighCpu',
    severity: 'WARNING',
    category: 'ALERT,
    resource: {
        resourceName: 'test-resource',
        resourceType: 'application',
        resourceInstance: '123456',
        tags: {
            deatilsLink: 'https://example.details.com'
        }
    },
    eventTimestamp: 1602787032,
    priority: 1,
    metadata: {
        cacheTime: 1602788032,
        affectedActionId: 'to-store',
        deliveryStatus: 'MATCHED',
        failureReasons: [
            {
                code: 400,
                reason: 'Bad request',
                timestamp: 1602788020
            }
        ]
    }
};
```

### FailureReason

#### Description

Describes why the delivery of the event has failed. This property is only returned if you have specified the value _**FAILURE_REASON**_ in the  _include_ query parameter.

#### Properties

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.failure-reason.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

#### @Example

```js
const failureReason = {
        code: 400,
        reason: 'Bad request',
        timestamp: 1602788020
};
```

### DeliveryStatus

#### Description

An enum which shows the status of an event. If the event was not delivered to the its status will be _UNDELIVERED_, on the other hand if a _STORE_ action was delivered and saved the status of the event will be _MATCHED_.

#### Properties

| Type  | Available values |
|:-----:|:----------------:|
|string |    UNDELIVERED   |
|string |      MATCHED     |

#### @Example

```js
import { DeliveryStatus } from 'alert-notifcation-node-client';

console.log(DeliveryStatus.UNDELIVERED); // will print 'Undelivered'
console.log(DeliveryStatus.MATCHED); // will print 'matched'
```

### ConsumerEventMetadata

#### Description

Describes details regarding the undelivered/matched event, e.g. when it was stored in Alert Notification, what is the delivery status, etc.

#### Properties

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.consumer-event-metadata.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

#### @Example

```js
const failureReason = {
        cacheTime: 1602788020,
        affectedActionId: 'action-name',
        deliveryStatus: 'UNDELIVERED',
        failuerReasons: [
            {
                code: 400,
                reason: 'Bad request',
                timestamp: 1602788020
            }
        ]
};
```