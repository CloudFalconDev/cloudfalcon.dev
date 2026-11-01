import type { Mentor } from "@/types/data";

// Shown in the "Your mentor" section. Taken from Mohammed's 2026 CV.
export const mentor: Mentor = {
	name: "Mohammed Almusaddar",
	role: "Senior Cloud and DevOps Engineer",
	location: "Madrid, Spain",
	bio: [
		"Mohammed started out running infrastructure on-premises, as IT infrastructure manager at Al-Aqsa University in Gaza: the campus network, data centre and backups for over 27,000 students and 1,200 staff.",
		"In 2017 he moved into cloud and DevOps, working remotely from Gaza for consultancies and product teams in the US, the UK, Germany and Italy. It's the same switch many mentees are making. Since then he has led AWS and Azure platforms built with Terraform, Pulumi and CDK, and run them in production.",
	],
	facts: [
		{
			label: "Now",
			value:
				"Senior DevOps Engineer at Nuvolar in Madrid, and Senior AWS Cloud Engineer at Schematic (US, remote).",
		},
		{
			label: "Before",
			value:
				"AWS DevOps Lead at Snaile, Azure DevOps Lead at UNRWA, AWS DevOps Engineer at globaldatanet, DevOps Engineer at UNICC and at Flux7 (now part of NTT Data).",
		},
		{
			label: "Certifications",
			value:
				"AWS Certified SysOps Administrator, AWS Certified Solutions Architect – Associate, HashiCorp Certified: Terraform Associate.",
		},
		{
			label: "Education",
			value:
				"Master of Engineering in Computer Science, Islamic University of Gaza.",
		},
	],
	links: [
		{ name: "LinkedIn", href: "https://www.linkedin.com/in/mhmdio/" },
		{ name: "GitHub", href: "https://github.com/mhmdio" },
	],
};
