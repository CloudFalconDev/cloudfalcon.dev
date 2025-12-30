# DevOps Daily Tools

## AWS Ops

- yq https://mikefarah.gitbook.io/yq/

## MKDocs

- [mkdocs](https://www.mkdocs.org/)
- [mkdocs-material](https://squidfunk.github.io/mkdocs-material/)
- [mkdocs-diagrams](https://pypi.org/project/mkdocs-diagrams/)
- [pymdown-extensions](https://facelessuser.github.io/pymdown-extensions/)

```bash
pip3 install mkdocs mkdocs-material mkdocs-diagrams pymdown-extensions fontawesome_markdown
```

## Terraform DevSecOps

```bash
echo 'installing brew packages'
brew update
brew tap liamg/tfsec
brew install tfenv tflint terraform-docs pre-commit liamg/tfsec/tfsec coreutils checkov
brew upgrade tfenv tflint terraform-docs pre-commit liamg/tfsec/tfsec coreutils checkov

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
```
