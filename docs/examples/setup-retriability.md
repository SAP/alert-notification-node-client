---
layout: default
title: Setup retriability
parent: Examples
nav_order: 1
permalink: /examples/setup-retriability/
---

# Setup retriability
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In order to setup retriability you will have to provide to the constructor a [RetryConfig](/common-objects/retry-configuration) object.

## @Example

You must replace _username_, _password_ and _region_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    BasicAuthentication,
    RegionUtils
} from 'alert-notification-node-client';

const client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10,
    retryConfig: {
        maxRetries: 5,
        retryBackoff: 2500
    }
});

// Now each time a request to Alert Notification fails it will
// retry for up to 5 times with timeout between request for 2500 milliseconds
```