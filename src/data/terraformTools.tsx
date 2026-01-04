import {
	Bug,
	DollarSign,
	FileText,
	GitPullRequest,
	Shield,
} from "lucide-react";

export const terraformTools = [
	{
		name: "Trivy",
		description:
			"Comprehensive security scanner for Terraform, containers, and more",
		icon: <Shield className="h-6 w-6" />,
		link: "https://aquasecurity.github.io/trivy/v0.18.3/docs/terraform/",
		logo: "/images/icons/svg/trivy.svg",
	},
	{
		name: "tflint",
		description:
			"Pluggable Terraform linter for detecting errors and best practices",
		icon: <Bug className="h-6 w-6" />,
		link: "https://github.com/terraform-linters/tflint",
		logo: "/images/icons/svg/tflint.svg",
	},
	{
		name: "terraform-docs",
		description: "Documentation generator for Terraform modules",
		icon: <FileText className="h-6 w-6" />,
		link: "https://terraform-docs.io",
		logo: "/images/icons/svg/terraform-docs.svg",
	},
	{
		name: "infracost",
		description: "Cloud cost estimates for Terraform",
		icon: <DollarSign className="h-6 w-6" />,
		link: "https://www.infracost.io",
		logo: "/images/icons/svg/infracost.svg",
	},
	{
		name: "OPA",
		description: "Open Policy Agent for Terraform policies",
		icon: <Shield className="h-6 w-6" />,
		link: "https://www.openpolicyagent.org",
		logo: "/images/icons/svg/opa.svg",
	},
	{
		name: "Atlantis",
		description: "Terraform Pull Request Automation",
		icon: <GitPullRequest className="h-6 w-6" />,
		link: "https://www.runatlantis.io",
		logo: "/images/icons/svg/atlantis.svg",
	},
].map((tool) => ({
	...tool,
	logo: "/images/icons/tf-tool.png",
}));
