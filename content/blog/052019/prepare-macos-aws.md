---
title: "Prepare MacOS for interacting with AWS EKS"
date: 2019-05-07
description: MacOS and AWS EKS
slug: macOS-AWS-EKS
authors: mhmdio
tags: [AWS, EKS, macOS]
---
Amazon EKS clusters require `kubectl` and `kubelet` binaries and the aws-iam-authenticator binary to allow IAM authentication for your `Kubernetes` cluster.


![alt text](https://github.com/mhmdio/mhmdio.github.io/raw/master/images/amazoneks.jpg)

If you do not already have Homebrew installed on your Mac, install it with the following command.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## INSTALL KUBERNETES TOOLS

- kubectl

```bash
brew install kubectl
```

- aws-iam-authenticator

```bash
brew install aws-iam-authenticator
```

- jq

```bash
brew install jq
```

- envsubst

```bash
brew install gettext
brew link --force gettext
```

## Verify

```bash
for command in kubectl aws-iam-authenticator jq envsubst
  do
    which $command &>/dev/null && echo "$command in path" || echo "$command NOT FOUND"
  done
```

## eksctl - a CLI for Amazon EKS

Instead of using AWS console to create EKS cluster, you can use a more simpler but powerfull tool.

eksctl is a simple CLI tool for creating clusters on EKS - Amazon’s new managed Kubernetes service for EC2. It is written in Go, and uses CloudFormation.

```bash
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
```
