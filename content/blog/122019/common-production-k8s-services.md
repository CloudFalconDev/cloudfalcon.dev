---
title: "Common collection of services for production grade K8s"
date: 2019-12-08
description: production grade K8s
slug: production-grade-K8s
authors: mhmdio
tags: [production, K8s]
---

Common collection of services that makes it easy to run production workloads in Kubernetes.



![alt text](https://github.com/mhmdio/mhmdio.github.io/raw/master/images/k8s.jpeg)

These stacks enable logging, monitoring, certificate management, automatic discovery of Kubernetes resources via public DNS servers and other common infrastructure needs.

Underlying Cloud service provider still needs best practices and production checklists to complete the cycle, but in the following lists, I mentioned the stacks on K8s it self.

## Logging stack

- Elasticsearch: A distributed, RESTful search and analytics engine
- Fluentd: A data collector for unified logging layer
- Kibana: A visualization tool for Elasticsearch dat

## Monitoring stack

- Prometheus: A monitoring system and time series database
- Alertmanager: An alert manager and router
- Grafana: An open source metric analytics & visualization suite

## Ingress stack

- NGINX Ingress Controller: A Controller to satisfy requests for Ingress objects
- cert-manager: A Kubernetes add-on to automate the management and issuance of TLS certificates from various sources
- OAuth2 Proxy: A reverse proxy and static file server that provides authentication using Providers (Google, GitHub, and others) to validate accounts by email, domain or group
- ExternalDNS: A component to synchronize exposed Kubernetes Services and Ingresses with DNS providers

## Checklists for Prod K8s

Use the following checklists of best practices designed to help you release to production

- https://learnk8s.io/production-best-practices
