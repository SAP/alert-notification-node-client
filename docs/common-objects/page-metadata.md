---
layout: default
title: PageMetadata
nav_order: 3
parent: Common objects
permalink: /common-objects/page-metadata
---

# PagedMetadata
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

A common object which is contained inside a paginated response. It holds metadata related to the requested pages.

_**Note:**_ The index page starts from 0.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.page-metadata.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}

## @Example

```js
const pagedResponseMetadata = {
    page: 0,
    pageSize: 100,
    totalPages: 1,
    totalResultsCount: 20
}
```