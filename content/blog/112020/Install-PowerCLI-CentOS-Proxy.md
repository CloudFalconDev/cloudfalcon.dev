---
title: How to Install PowerCLI on CentOS ?
date: 2020-11-26
description: Behind a Proxy!
slug: Install-PowerCLI-CentOS
authors: mhmdio
tags: [PowerCLI, CentOS]
---

In this article I will show you **How to Install PowerCLI on CentOS**, with Some Enterprises, most of the production or staging servers has no internet connectivity and you need to install PowerCLI behind a proxy.

## What is VMware PowerCLI

**VMware PowerCLI** is a command-line and scripting tool built on Windows PowerShell, and provides more than 700 **cmdlets** for managing and automating vSphere, VMware Cloud Director, vRealize Operations Manager, vSAN, NSX-T, VMware Cloud Services, VMware Cloud on AWS, VMware HCX, VMware Site Recovery Manager, and VMware Horizon environments.

## Tested on

| OS     | Version |
| ------ | ------- |
| CentOS | 7       |

## Export proxy settings

```bash
export http_proxy=http://proxy.mhmd.io:3128
export https_proxy=http://proxy.mhmd.io:3128
```

## Install PowerShell

```bash
# Register the Microsoft RedHat repository
curl https://packages.microsoft.com/config/rhel/7/prod.repo | tee /etc/yum.repos.d/microsoft.repo
# Install PowerShell
yum install -y powershell
```

## Install VMware.PowerCLI

```bash
pwsh -command Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
pwsh -command Install-Module VMware.PowerCLI,PowerNSX,PowervRA
```
