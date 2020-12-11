---
layout: default
title: Create and get an entity
parent: Examples
nav_order: 1
permalink: /examples/create-and-get/
---

# Create an action and get it afterwards
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In this example you will create an action and get it after its been created.

_**Note:**_ This can be applied to any other [EntityType](/configuration-api-objects/entity-type). You just need to follow the method signatures from [here](/#alert-notification-client-api).

## @Example

In order for this example to work you need to replace _username_, _password_, _region_ and _destination_ with ones specific for you.

```js
import {
    AlertNotificationClient,
    EntityType,
    BasicAuthentication,
    RegionUtils,
    State
} from 'alert-notification-client';

const client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10;
});

client.create(EntityType.Action, {
    name: 'to-my-email',
    type: 'EMAIL',
    description: 'send to my mail',
    state: State.ENABLED,
    properties: {
        destination: '<your-email>@<domain>.com'
    }
})
.then(action => {
    client.get(EntityType.Action, action.name)
        .then(action => console.log(action)) // Action you have created
        .catch(error => console.log(error));
})
.catch(error => console.log(error)); // Shouldn't happen if everything above is setup correctly
```