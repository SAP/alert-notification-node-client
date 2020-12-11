---
layout: default
title: Setting up authentication
parent: Examples
nav_order: 1
permalink: /examples/setup-authentication/
---

# Setting up an authentication for your client
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

In this example you will get familiar on how to setup an authentication object for your Alert Notification client. The setup is nothing more than just providing the authentication object of your choice as an argument to your client instance's constructor

## @Example - basic authentication

You must replace _username_, _password_ and _region_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    BasicAuthentication,
    RegionUtils
} from 'alert-notification-client';

const client = new AlertNotificationClient({
    authentication: new BasicAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password'
    }),
    region: RegionUtils.EU10;
});

// If you have setup correct credentials for your authentication you
// will be able to access the endpoints to which your technical client has scopes to
```


## @Example - oauth authentication

You must replace _username_, _password_, _oAuthTokenUrl_ and _region_  with ones specific for you.

```js
import {
    AlertNotificationClient,
    OAuthAuthentication,
    RegionUtils
} from 'alert-notification-client';

const client = new AlertNotificationClient({
    authentication: new OAuthAuthentication({
        username: '<your-technical-client-username>',
        password: '<your-technical-client-password',
        oAuthTokenUrl: '<oauth-token-url>'
    }),
    region: RegionUtils.EU10;
});

// If you have setup correct credentials for your authentication you
// will be able to access the endpoints to which your technical client has scopes to
```