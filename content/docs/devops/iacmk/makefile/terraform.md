# Makefile Examples

## Terraform Makefile for Stacks

Use this Makefile if you follow stack-based Terraform layout

```make

BACKEND_PATH=../config/XXXXXXXXXX/eu-central-1/s3.config

all: help

prepare:
    echo 'installing brew packages'
    brew update
    brew install tfsec tfenv tflint terraform-docs pre-commit coreutils checkov
    brew upgrade tfsec tfenv tflint terraform-docs pre-commit coreutils checkov

    echo 'installing pre-commit hooks'
    pre-commit install

    echo 'setting pre-commit hooks to auto-install on clone in the future'
    git config --global init.templateDir ~/.git-template
    pre-commit init-templatedir ~/.git-template

    echo 'installing terraform with tfenv'
    tfenv install min-required
    tfenv use min-required

    echo 'installing infracost'
    brew install infracost
    infracost register  
    
check-stack:
ifndef STACK
    $(error Please set STACK=[network-stack|data-stack])
endif

init: check-stack
    cd $(STACK) && \
    terraform init \
    -backend-config=$(BACKEND_PATH) \
    -backend-config="key=$(STACK).tfstate"

fmt:
    terraform fmt -recursive

validate: check-stack
    cd $(STACK) && \
    terraform validate

plan: check-stack
    cd $(STACK) && \
    terraform plan

deploy: check-stack
    cd $(STACK) && \
    terraform apply -auto-approve

output: check-stack
    cd $(STACK) && \
    terraform output

docs: check-stack
    cd $(STACK) && \
    terraform-docs markdown . --config=../.terraform-docs.yml >> README.md

tflint: check-stack
    cd $(STACK) && \
    tflint --config=../.tflint.hcl --module --deep

tfsec: check-stack
    cd $(STACK) && \
    tfsec .

checkov: check-stack
    cd $(STACK) && \
    checkov --framework terraform --output github_failed_only --soft-fail --directory . --file $(BACKEND_PATH)

tfcompliance: check-stack
    cd $(STACK) && \
    terraform plan -out=plan.out && \
    terraform-compliance --no-failure \
    -p plan.out \
    -f ../compliance
    rm -f plan.out
    rm -f plan.out.json

cost: check-stack
    cd $(STACK) && \
    infracost \
    --show-skipped \
    --tfdir . \
    --use-tfstate      

kubeconfig:
    cd app-stack && \
    terraform output kubectl_config
    export KUBECONFIG="${PWD}/kubeconfig_pai-data-foundation"    

help:
    @echo ">> help list:"
    @echo "  make prepare"
    @echo "  STACK=network-stack make init"
    @echo "  make fmt"
    @echo "  STACK=network-stack make validate"
    @echo "  STACK=network-stack make plan"
    @echo "  STACK=network-stack make deploy"
    @echo "  STACK=network-stack make ouput"
    @echo "  STACK=network-stack make docs"
    @echo "  STACK=network-stack make tflint"
    @echo "  STACK=network-stack make tfsec"
    @echo "  STACK=network-stack make checkov"
    @echo "  STACK=network-stack make tfcompliance"
    @echo "  STACK=network-stack make cost"
    @echo "  STACK=app-stack make kubeconfig"
```

## Terraform Makefile - Simple

```make
TERRAFORM_VERSION=0.14.3
REGION=eu-west-1
PROFILE=aes-shared 

install:
	pre-commit install && \
	tenv install $(TERRAFORM_VERSION)

fmt:
	terraform fmt

init:
	terraform init

validate:
	terraform validate

plan:
	terraform plan

apply:
	terraform apply -auto-approve

docs:
	terraform-docs markdown ./

test: validate
		tflint .
		
		tfsec .

cost:
	infracost .

kms:
	aws kms list-keys --region $(REGION)

aws-vault:
	aws-vault exec $(PROFILE)
```
