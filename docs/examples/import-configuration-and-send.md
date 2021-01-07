---
layout: default
title: Import configuration and send a test event
parent: Examples
nav_order: 2
permalink: /examples/import-configuration-and-send/
---

# Import configuration and send a test event
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In this example you will import a configuration and send an event with _eventType_ HighCpu, which will be matched by the imported configuration.

## @Example

In order for this example to work you need to replace _username_, _password_, _region_ and _destination_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    EntityType,
    BasicAuthentication,
    RegionUtils,
    Severity,
    Category,
    State,
    Predicate
} from '@sap_oss/alert-notification-client';

const client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10;
});

client.importConfiguration({
   actions: [
       {
            name: 'to-my-email',
            type: 'EMAIL',
            description: 'send to my mail',
            state: State.ENABLED,
            properties: {
                destination: '<your-email>@<domain>.com'
            }
       }
   ],
   conditions: [
       {
            name: 'event-type-contains-HighCpu',
            description: 'Match events which body contains HighCpu',
            propertyKey: 'eventType',
            predicate: Predicate.CONTAINS,
            propertyValue: 'HighCpu'
       }
   ],
   subscriptions: [
        {
            name: 'event-with-eventType-HighCpu-to-mail',
            state: State.ENABLED,
            actions: ['to-my-email'],
            conditions: ['event-type-contains-HighCpu'],
            description: 'Subscription will act when an event with eventType - HighCpu is received and will send an email to me'
        }
   ]
})
.then(_configuration => {
    client.sendEvent({
        body: 'Your test-resource has exceeed the cpu limit',
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
    })
    .then(event => console.log(event)) // Ingested event
    .catch(error => console.log(error));
})
.catch(error => console.log(error)); // Shouldn't happen if everything above is setup correctly
```