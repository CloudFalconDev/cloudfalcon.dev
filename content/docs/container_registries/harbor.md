# Harbor

- :fontawesome-brands-github: @goharbor/harbor

## Demo with Helm and Minikube

- Helm
- minikube

```bash
minikube addons enable ingress
minikube addons enable ingress-dns
helm repo add harbor https://helm.goharbor.io
helm install demo harbor/harbor
kubectl get ingress
# Edit /etc/hosts
>> 192.168.99.101 core.harbor.domain
```

### Access

- https://core.harbor.domain
- username admin
- password Harbor12345

### Configuration

- Create User
- Create `test` Project
- Assign User `mhmdio` to Project

## Docker login

```bash
docker login -umhmdio core.harbor.domain
Password:
# Error response from daemon: Get https://core.harbor.domain/v2/: x509: certificate signed by unknown authority
# Download ca.crt from Project
security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain ./ca.crt
docker login -umhmdio core.harbor.domain

```

## Docker Push Command

Tag an image for this project:

```bash
# docker tag SOURCE_IMAGE[:TAG] core.harbor.domain/test/REPOSITORY[:TAG]
docker tag alpine:latest core.harbor.domain/test/alpine:latest
```

Push an image to this project:

```bash
# docker push core.harbor.domain/test/REPOSITORY[:TAG]
docker push core.harbor.domain/test/alpine:latest
```

## Helm Push Command

Add Harbor to Helm Repository List

```bash
helm plugin install https://github.com/chartmuseum/helm-push
# Add only Test Project
helm repo add --ca-file ca.crt --username=mhmdio --password=Harbor12345 mini-harbor https://core.harbor.domain/chartrepo/test

```

Tag a chart for this project:

```bash
helm chart save CHART_PATH core.harbor.domain/test/REPOSITORY[:TAG]
```

~helm chart save . core.harbor.domain/test/harbor:1.4.0-dev~

Push a chart to this project:

```bash
helm push --ca-file=ca.crt --username=mhmdio --password=Harbor12345 chart_repo/hello-helm-0.1.0.tgz mini-harbor
# helm push --ca-file=../Downloads/ca.crt --username=mhmdio --password=Harbor12345 harbor-helm mini-harbor
# helm chart push core.harbor.domain/test/REPOSITORY[:TAG]
```

## CNAB Push Command

Push a CNAB to this project:

```bash
cnab-to-oci push CNAB_PATH --target core.harbor.domain/test/REPOSITORY[:TAG] --auto-update-bundle
```
