import type { StackGroup } from "@/types/data";

export const stackGroups: StackGroup[] = [
	{
		name: "Cloud",
		items: [
			"AWS",
			"Azure",
			"Google Cloud",
			"Cloudflare",
			"DigitalOcean",
			"Oracle Cloud",
			"OpenStack",
		],
	},
	{
		name: "Infrastructure as code",
		items: [
			"Terraform",
			"Pulumi",
			"AWS CDK",
			"Crossplane",
			"Atlantis",
			"tflint",
			"Infracost",
		],
	},
	{
		name: "Kubernetes",
		items: [
			"Helm",
			"Kustomize",
			"Argo CD",
			"Flux",
			"Istio",
			"Ingress NGINX",
			"Kubecost",
		],
	},
	{
		name: "Observability and security",
		items: [
			"Prometheus",
			"Loki",
			"Datadog",
			"Trivy",
			"Prowler",
			"TruffleHog",
			"OPA",
		],
	},
];
