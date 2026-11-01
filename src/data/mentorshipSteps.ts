import type { MentorshipStep } from "@/types/data";

// How a mentorship runs, in order.
export const mentorshipSteps: MentorshipStep[] = [
	{
		title: "Free intro call",
		description:
			"30 minutes on video. We talk about where you are, where you want to get to, and whether mentoring is the right way to get there.",
		tools: [],
	},
	{
		title: "A written plan",
		description:
			"You get a roadmap with milestones and resources. We update it as you go.",
		tools: [{ name: "Notion", logo: "/images/icons/notion.png" }],
	},
	{
		title: "Sessions and reviews",
		description:
			"Regular 1:1 calls. Between calls we review your code, Terraform and pull requests.",
		tools: [{ name: "GitHub", logo: "/images/icons/github.png" }],
	},
	{
		title: "Help in between",
		description:
			"Questions go in Slack. Goals and progress are tracked in Linear.",
		tools: [
			{ name: "Slack", logo: "/images/icons/slack.png" },
			{ name: "Linear", logo: "/images/icons/linear.png" },
		],
	},
];
