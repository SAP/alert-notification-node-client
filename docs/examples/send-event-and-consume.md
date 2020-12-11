---
layout: default
title: Send event and consume
parent: Examples
nav_order: 2
permalink: /examples/send-event-and-consume/
---

# Send event and consume from Store
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In this example send an event with _eventType_ HighCpu, which will be matched by the imported configuration, then you will consume the stored event and print it. But firstly you will have to import a configuration (or create a new one if you would like).

## @Example

In order for this example to work you need to replace _username_, _password_ and  _region_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    EntityType,
    BasicAuthentication,
    RegionUtils,
    State,
    Predicate
} from 'alert-notification-client';

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
            name: 'to-store',
            type: 'STORE',
            description: 'events will be saved in store',
            state: State.ENABLED
       }
   ],
   conditions: [
       {
            name: 'event-type-starts-with-consume',
            description: 'Match events which eventType starts with consume',
            propertyKey: 'eventType',
            predicate: Predicate.CONTAINS,
            propertyValue: 'consume'
       }
   ],
   subscriptions: [
        {
            name: 'event-with-eventType-HighCpu-to-mail',
            state: State.ENABLED,
            actions: ['to-store'],
            conditions: ['event-type-starts-with-consume'],
            description: 'Subscription will act when an event with eventType which starts with consume is received and will store it for further consuming'
        }
   ]
})
.then(_configuration => {
    client.sendEvent({
        body: 'Your test-resource has been',
        subject: 'test-resource exceeds cpu limits',
        eventType: 'consumeInStore',
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
    .then(event => {
        // Wait for the event to be processed and stored, in most of the cases it will take less time than 5 seconds, but just to be on the safe side
        setTimeout(() => {
            client.getMatchedEvent(event.id)
                .then(consumedEvent => console.log(consumedEvent)) // Print the consumed event
                .catch(error => console.log(error));
        }, 5000)
    })
    .catch(error => console.log(error));
})
.catch(error => console.log(error)); // Shouldn't happen if everything above is setup correctly
```