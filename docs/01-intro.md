---
slug: '/'
sidebar_position: 1
---

# Introduction

*Continuous Delivery for Digital Goods and Downloads* expands your WordPress download portal to a fully-fledged Continuous Delivery pipeline.

*Continuous Delivery for Digital Goods and Downloads* provides unified API endpoints to publish new releases of your software products. Those endpoints can be called from CI services like GitHub Actions or Jenkins.
Previously uploaded files to AWS S3 can be published in [Easy Digital Downloads](https://wordpress.org/plugins/easy-digital-downloads/) or [Download Monitor](https://wordpress.org/plugins/download-monitor/) and then be provided as protected downloads.

## Goal and Motivation
*Continuous Delivery for Digital Goods and Downloads* integrates your WordPress customer portal into your CI/CD pipeline.
A big disadvantage of WordPress' downloads plug-ins and portals like Gumroad and Pebble have been the missing feature of integration in CI/CD processes. This plug-in fixes the issue for WordPress.

## Features
- Same integration experience for [Easy Digital Downloads](https://wordpress.org/plugins/easy-digital-downloads/) and [Download Monitor](https://wordpress.org/plugins/download-monitor/)
- Unified API endpoints for publishing new release versions
- Provide download of files in S3-compatible object storages like AWS S3 or Minio
- Downloaded files are logged in EDD's and DLM's reports