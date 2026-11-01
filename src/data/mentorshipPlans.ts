import type { MentorshipPlan } from "@/types/data";

export const mentorshipPlans: MentorshipPlan[] = [
	{
		id: "single_session",
		name: "Single session",
		price: "$50",
		billing: "per session",
		includes:
			"A 60-minute call on any topic. Bring your IaC, pipeline or résumé for review. You get written next steps afterwards.",
	},
	{
		id: "monthly",
		name: "Monthly",
		price: "$180",
		billing: "per month",
		includes:
			"Four 60-minute calls a month, chat between sessions, code and pull request reviews, and a personal roadmap.",
	},
	{
		id: "career_track",
		name: "Career Track",
		price: "$500",
		billing: "for 3 months",
		includes:
			"Monthly for three months, plus a portfolio project built end to end, a certification plan and mock interviews.",
	},
];
