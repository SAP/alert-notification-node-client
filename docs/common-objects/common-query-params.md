---
layout: default
title: CommonQueryParams
nav_order: 4
parent: Common objects
permalink: /common-objects/query-params
---

# CommonQueryParams
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Common query parameters used when making requests to Alert Notification service.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.common-query-parameters.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## @Example

```js
const queryParameters = {
    page: 1,
    pageSize: 20
};
```