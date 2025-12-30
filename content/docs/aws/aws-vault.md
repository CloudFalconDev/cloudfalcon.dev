# aws-vault

## Configure SSO with aws-vault

```bash
code ~/.aws/config    
```

Add AWS SSO settings

```bash
[profile XYZ-shared]
sso_start_url=https://XYZ.awsapps.com/start
sso_region=eu-west-1
sso_account_id=XYZXYZXYZXYZ
sso_role_name=Admins
```

Login with aws-vault

```bash
aws-vault exec XYZ-shared
```
