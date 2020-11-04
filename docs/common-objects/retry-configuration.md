---
layout: default
title: RetryConfig
nav_order: 3
parent: Common objects
permalink: /common-objects/retry-configuration
---

# RetryConfig
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

This object is used to setup a retry configuration for the Alert Notification client. The logic behind is as simple as follows - if a request to Alert Notification fails it will be retried until the _maxRetries_ are reached and each retry will be attempted after the given _retryBackoff_.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.retry-configuration.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## @Example

```js
const retryConfiguration = {
    maxRetries: 5,
    retryBackoff: 2500
};

// Maximum numbers of retry is 5 and the timeout between each retry is 2500 ms
```