---
layout: default
title: PageResponse
parent: Configuration's API objects
nav_order: 7
permalink: /configuration-api-objects/page-response/
---

# PageResponse
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


## Description

Paged response is a common object for the Configuration API returned when searching for all entities of a given type.

## Constructor properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.page-response.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## @Example

```js
const pagedResponse = {
    results: [],
    page: 0,
    pageSize: 100,
    totalPages: 1,
    totalResultsCount: 0
}
```