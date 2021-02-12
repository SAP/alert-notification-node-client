<img src="https://user-images.githubusercontent.com/11653294/64466233-7cd17480-d119-11e9-8965-e036c1e23c9a.png" alt="CF logo" height="150" align="left"/>

# SAP Alert Notification service for SAP BTP Client
>*Promise based Node.js client library to support the usage of Alert Notification service*

[![Documentation](https://img.shields.io/badge/Service_Documentation-@SAP%20Help%20Portal-ff9900.svg)](https://help.sap.com/viewer/product/ALERT_NOTIFICATION/Cloud/en-US)
[![Blog](https://img.shields.io/badge/Service--related_Blogs-@SAP%20Community%20Portal-3399ff.svg)](https://blogs.sap.com/tag/sap-cloud-platform-alert-notification/)

## About
Alert Notification service is part of the DevOps portfolio of the SAP Business Technology Platform. The service is specialized in instant delivery of events coming straight from the core platform services, e.g. database or application monitoring tools. This way you're always the first one notified whenever an issue with your dependency occurs. Additionally, Alert Notification service provides means for posting real-time
crucial events directly from your application. All those events altogether - either your custom events, or the platform ones, could be received on whatever channel is preferred - e-mail, Slack, custom webhook, etc.
Furthermore, events can be even stored in Alert Notification service storage and pulled from it later.

### Library Features

* Post custom events;
* Pull your stored events – either the stored on purpose ones or those that have for some reason failed to be delivered to the desired point;
* Manage your configuration – actions, conditions and subscriptions

### Installation

```bash
$ npm i @sap_oss/alert-notification-client
```

## Getting Started

Anything you need to get quickly started with the library is available in our [documentation page](https://sap.github.io/alert-notification-node-client/).

Here is a very simple example on how to import and create your first Alert Notification service client:

```js
import {
    AlertNotificationClient,
    EntityType,
    BasicAutentication,
    RegionUtils,
    Severity,
    Category
} from '@sap_oss/alert-notification-client';

const client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10;
});

// After that you can use the provided methods from the Alert Notification service instance
```

### Have an issue?
Please, let us know by filing a [new issue](https://github.com/sap/alert-notification-node-client/issues/new).

### Contributing
We're always open for improvements! If you think the library could be better, please, open an issue and propose your solution as a pull request. We will contact you for discussion as soon as possible.

### License
This project is run under the licensing terms of Apache License 2.0. The paper could be found in the [LICENSE](https://github.com/sap/alert-notification-node-client/blob/master/LICENSE) file
in the top-level directory.