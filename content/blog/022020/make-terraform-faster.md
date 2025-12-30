---
title: Make Terraform Development Faster
date: 2020-02-10
description: When Applying Terraform, it will be faster.
slug: Make-Terraform-Development-Faster
authors: mhmdio
tags: [Terraform, Development]
---

There are simple Terraform provider flags you can add, which in development, will make planning, applying or destroying faster.


```js
provider "aws" {
  region  = "eu-central-1"
  profile = "cloudfalcon-dev"
  # Make it faster by skipping something
  skip_get_ec2_platforms      = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_requesting_account_id  = true
}
```

Check AWS Provider:

- [https://www.terraform.io/docs/providers/aws/index.html/](https://www.terraform.io/docs/providers/aws/index.html/)
