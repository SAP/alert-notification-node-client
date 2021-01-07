---
layout: default
title: Export and import configuration
parent: Examples
nav_order: 3
permalink: /examples/export-and-import/
---

# Export and import configuration in a different Alert Notification instance
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In this example you will export a configuration from one instance of Alert Notification and import it in a brand new one recently created on newly onboarded region.

_**Note:**_ Keep in mind that Alert Notification will never return actions' passwords and you will have to traverse the returned json and populate them yourself, of course in a secure manner.

## @Example

In order for this example to work you need to replace _username_, _password_ and _region_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    EntityType,
    BasicAuthentication,
    RegionUtils
} from '@sap_oss/alert-notification-client';

const eu10Client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10;
});

const us10Client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-other-technical-client-username>',
        password: '<your-other-technical-client-password'
    }),
    region: RegionUtils.US10;
});

eu10Client.exportConfiguration()
.then(configuration => {
    // ...
    // Any modifications of the exported configuration should happen here.
    // ...
    us10Client.importConfiguration(configuration)
        .then(action => console.log(action)) // Configuration is successfully imported
        .catch(error => console.log(error));
})
.catch(error => console.log(error)); // Shouldn't happen if everything above is setup correctly
```