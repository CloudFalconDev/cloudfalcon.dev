export interface PipelineStep {
	id: string;
	tool: string;
	img: string;
	description: string;
	status: string;
	port: string;
}

export const pipelineSteps: PipelineStep[] = [
	{
		id: "NODE_01",
		tool: "Slack",
		img: "/images/icons/slack.png",
		description: "Communication Protocol",
		status: "ACTIVE",
		port: "443",
	},
	{
		id: "NODE_02",
		tool: "Linear",
		img: "/images/icons/linear.png",
		description: "Task Orchestration",
		status: "ACTIVE",
		port: "8080",
	},
	{
		id: "NODE_03",
		tool: "Notion",
		img: "/images/icons/notion.png",
		description: "Knowledge Base",
		status: "ACTIVE",
		port: "3000",
	},
	{
		id: "NODE_04",
		tool: "Github",
		img: "/images/icons/github.png",
		description: "Code Repository",
		status: "ACTIVE",
		port: "22",
	},
];
