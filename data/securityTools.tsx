import { Eye, Search, Shield } from "lucide-react";

export const securityTools = [
	{
		name: "Prowler",
		description:
			"AWS security best practices assessment, auditing, and hardening tool.",
		icon: <Shield className="h-6 w-6" />,
		link: "https://github.com/prowler-cloud/prowler",
		logo: "/img/svg/prowler.svg",
	},
	{
		name: "TruffleHog",
		description: "Find credentials and secrets in code, config, and logs.",
		icon: <Search className="h-6 w-6" />,
		link: "https://github.com/trufflesecurity/trufflehog",
		logo: "/img/svg/trufflehog.svg",
	},
	{
		name: "Gitleaks",
		description: "Scan git repos for secrets and keys.",
		icon: <Eye className="h-6 w-6" />,
		link: "https://github.com/gitleaks/gitleaks",
		logo: "/img/svg/gitleaks.svg",
	},
].map((tool) => ({
	...tool,
	logo: "/img/png/sec-tool.png",
}));
