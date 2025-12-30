# Journey to DevOps with security in mind

!!! info
    Set up  AWS account with the secure baseline configuration based on CIS Amazon Web Services Foundations and AWS Foundational Security Best Practices.

## AWS Secure Multi Environments

- Account per Environment
- Organization with OU
- SCP Policy
- AWS SSO [ manually or use CloudFormation]

## Identity and Access Management

- Set up IAM Password Policy.
- Create an IAM role for contacting AWS support for incident handling.
- Enable AWS Config rules to audit root account status.
- Enable IAM Access Analyzer in each region.
- IAM best practices

## Logging & Monitoring

- Enable CloudTrail in all regions and deliver events to CloudWatch Logs.
- Object-level logging for all S3 buckets is enabled by default.
- CloudTrail logs are encrypted using AWS Key Management Service.
- All logs are stored in the S3 bucket with access logging enabled.
- Logs are automatically archived into Amazon Glacier after the given period(defaults to 90 days).
- Set up CloudWatch alarms to notify you when critical changes happen in your AWS account.
- Enable AWS Config in each regions to automatically take configuration snapshots.
- Enable SecurityHub and subscribe available standards.
  - Subscribe CIS benchmark standard.
  - Subscribe PCI DSS standard.
  - Subscribe AWS Foundational security best practices standard.
- Enable GuardDuty in each regions.

## Networking & Computing

- Remove all rules associated with default route tables, default network ACLs and default security groups in the default VPC in all regions.
- Enable AWS Config rules to audit unrestricted common ports in Security Group rules.
- Enable VPC Flow Logs with the default VPC in all regions.
- Enable default EBS encryption for newly created volumes.

## Secure IaC Pipeline using Terraform

- Lint checks
- SAST checks
- Compliance checks

## Secure Codebase

- git secrets pre-commit hooks
- AWS Secrets Management
  - AWS Secure Parameter store
  - AWS Secrets Manager
- BridgeCrew free scanning for Terraform source code.

## ChatOps

- Send CloudWatch, Security Hub, and GuardDuty notification to slack
