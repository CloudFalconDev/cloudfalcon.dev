import type { MentorshipTrack } from "@/types/data";

export const mentorshipTracks: MentorshipTrack[] = [
	{
		title: "Getting into cloud",
		description:
			"Linux, networking, one cloud provider and a first project, in an order that makes sense.",
		focus: "Career switch",
	},
	{
		title: "Infrastructure as code",
		description: "Terraform, CDK and Pulumi: modules, state, testing and CI.",
		focus: "Terraform",
	},
	{
		title: "Kubernetes",
		description:
			"Workloads, networking, Helm, and GitOps with Argo CD or Flux.",
		focus: "CKA / CKAD",
	},
	{
		title: "CI/CD and platforms",
		description:
			"Pipelines, release processes and internal developer platforms.",
		focus: "Platform",
	},
	{
		title: "Cloud security",
		description: "IAM, network boundaries, secrets and compliance checks.",
		focus: "DevSecOps",
	},
	{
		title: "Observability and SRE",
		description: "Metrics, logs, traces, alerting and on-call.",
		focus: "SRE",
	},
	{
		title: "Certifications",
		description:
			"Study plans, labs and practice exams for AWS, CKA and Terraform Associate.",
		focus: "AWS / CKA",
	},
	{
		title: "FAANG interviews",
		description:
			"Mock system design, infrastructure and behavioral interviews, with feedback after each one.",
		focus: "Interviews",
	},
	{
		title: "Senior and staff growth",
		description: "Design docs, technical ownership and leading projects.",
		focus: "Senior+",
	},
	{
		title: "Team mentoring",
		description: "Regular sessions and reviews for a whole engineering team.",
		focus: "Teams",
	},
];
