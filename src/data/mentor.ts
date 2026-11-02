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
			label: "On Upwork",
			value:
				"55+ completed contracts since 2016 and 45+ client reviews, including 1:1 tutoring and pair-programming sessions on Terraform, HashiCorp tools and AWS.",
		},
		{
			label: "Certifications",
			value:
				"AWS Certified SysOps Administrator, AWS Certified Solutions Architect – Associate, HashiCorp Certified: Terraform Associate. Named a HashiCorp Ambassador in 2023.",
		},
		{
			label: "Education",
			value:
				"Master of Engineering in Computer Science, Islamic University of Gaza.",
		},
	],
	// Five-star reviews from his Upwork profile. Keep the quotes exact.
	reviews: [
		{
			quote:
				"His work was always high quality and delivered on time, and he's very easy to communicate with and work with. I would definitely hire Mohammed again for future projects.",
			project: "Pulumi infrastructure and AWS migration",
			year: 2024,
		},
		{
			quote:
				"Mohammed took all the hard parts of our Ansible playbooks and rewrote them and reworked them to get them right, and I mean perfect. Highly recommended.",
			project: "Ansible playbook review",
			year: 2020,
		},
		{
			quote:
				"Mohammed is a highly talented, top notch DevOps expert. Just wish we could work with him more!",
			project: "OpenStack-Ansible build with Terraform",
			year: 2017,
		},
	],
	links: [
		{ name: "LinkedIn", href: "https://www.linkedin.com/in/mhmdio/" },
		{ name: "GitHub", href: "https://github.com/mhmdio" },
		{ name: "Upwork", href: "https://www.upwork.com/freelancers/mhmdio" },
	],
};
