---
layout: default
title: ConsumerQueryParamaters
parent: Event API's objects
nav_order: 7
permalink: /event-api-objects/consumer-query-parameters
---

# ConsumerQueryParamaters
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Describes the query parameters which are passed to the request to Undelivered or Matched APIs. They help you filtering the returned events by different identifiers and time period.

## Properties

[comment]: <> For loop must remain on the lines, if changed table won't behave normally

| Field | Type | Description |
|:---:|:--:|:---------:| {% for field in site.data.consumer-query-parameters.propertyFields %}
| {{field.name}} | {{ field.type }} | {{field.description}} | {% endfor %}