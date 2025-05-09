import { Shield, FileText, DollarSign, GitPullRequest, Bug } from "lucide-react";

export const terraformTools = [
    {
        name: "Trivy",
        description: "Comprehensive security scanner for Terraform, containers, and more",
        icon: <Shield className="h-6 w-6" />,
        link: "https://aquasecurity.github.io/trivy/v0.18.3/docs/terraform/",
        logo: "/img/svg/trivy.svg",
    },
    {
        name: "tflint",
        description: "Pluggable Terraform linter for detecting errors and best practices",
        icon: <Bug className="h-6 w-6" />,
        link: "https://github.com/terraform-linters/tflint",
        logo: "/img/svg/tflint.svg",
    },
    {
        name: "terraform-docs",
        description: "Documentation generator for Terraform modules",
        icon: <FileText className="h-6 w-6" />,
        link: "https://terraform-docs.io",
        logo: "/img/svg/terraform-docs.svg",
    },
    {
        name: "infracost",
        description: "Cloud cost estimates for Terraform",
        icon: <DollarSign className="h-6 w-6" />,
        link: "https://www.infracost.io",
        logo: "/img/svg/infracost.svg",
    },
    {
        name: "OPA",
        description: "Open Policy Agent for Terraform policies",
        icon: <Shield className="h-6 w-6" />,
        link: "https://www.openpolicyagent.org",
        logo: "/img/svg/opa.svg",
    },
    {
        name: "Atlantis",
        description: "Terraform Pull Request Automation",
        icon: <GitPullRequest className="h-6 w-6" />,
        link: "https://www.runatlantis.io",
        logo: "/img/svg/atlantis.svg",
    },
].map(tool => ({
    ...tool,
    logo: "/img/png/tf-tool.png",
})); 