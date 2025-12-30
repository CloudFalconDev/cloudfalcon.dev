import {
	Activity,
	Bot,
	CheckCircle,
	Clock,
	Cloud,
	Code,
	DollarSign,
	GraduationCap,
	LineChart,
	Lock,
	Server,
	Shield,
	Users,
	Workflow,
	Zap,
} from "lucide-react";

export const serviceDetails = [
	{
		icon: <Zap className="h-12 w-12" />,
		title: "Cloud Automation",
		description:
			"Streamline your operations with cutting-edge automation solutions.",
		stats: { value: "50%", label: "Reduced Manual Tasks" },
		features: [
			{
				icon: <Server className="h-5 w-5" />,
				text: "Infrastructure as Code (IaC)",
			},
			{
				icon: <Cloud className="h-5 w-5" />,
				text: "CI/CD Pipeline Automation",
			},
			{
				icon: <Clock className="h-5 w-5" />,
				text: "Automated Scaling & Monitoring",
			},
		],
		gradient: "from-blue-500 to-cyan-500",
	},
	{
		icon: <Shield className="h-12 w-12" />,
		title: "Cloud Security",
		description: "Protect your assets with advanced security measures.",
		stats: { value: "99.9%", label: "Security Compliance" },
		features: [
			{ icon: <Lock className="h-5 w-5" />, text: "Zero Trust Architecture" },
			{
				icon: <CheckCircle className="h-5 w-5" />,
				text: "Compliance Automation",
			},
			{ icon: <Users className="h-5 w-5" />, text: "Identity Management" },
		],
		gradient: "from-purple-500 to-pink-500",
	},
	{
		icon: <DollarSign className="h-12 w-12" />,
		title: "Cost Optimization",
		description: "Maximize ROI with cost-effective strategies.",
		stats: { value: "40%", label: "Average Cost Reduction" },
		features: [
			{
				icon: <LineChart className="h-5 w-5" />,
				text: "Resource Usage Analysis",
			},
			{
				icon: <Cloud className="h-5 w-5" />,
				text: "Automated Cost Monitoring",
			},
			{
				icon: <CheckCircle className="h-5 w-5" />,
				text: "Optimization Recommendations",
			},
		],
		gradient: "from-green-500 to-emerald-500",
	},
	{
		icon: <GraduationCap className="h-12 w-12" />,
		title: "Cloud Training",
		description: "Expert training for your team.",
		stats: { value: "100+", label: "Engineers Trained" },
		features: [
			{
				icon: <Users className="h-5 w-5" />,
				text: "Customized Training Programs",
			},
			{ icon: <CheckCircle className="h-5 w-5" />, text: "Hands-on Workshops" },
			{ icon: <Clock className="h-5 w-5" />, text: "Ongoing Support" },
		],
		gradient: "from-orange-500 to-red-500",
	},
	{
		icon: <Code className="h-12 w-12" />,
		title: "Developer Experience",
		description:
			"Empower your engineering team with world-class tools and processes.",
		stats: { value: "30%", label: "Improved Productivity" },
		features: [
			{
				icon: <Server className="h-5 w-5" />,
				text: "Internal Developer Platforms",
			},
			{ icon: <Clock className="h-5 w-5" />, text: "Streamlined Onboarding" },
			{ icon: <Code className="h-5 w-5" />, text: "Local Dev Environments" },
		],
		gradient: "from-indigo-500 to-purple-500",
	},
	{
		icon: <Bot className="h-12 w-12" />,
		title: "AIOps & Intelligence",
		description:
			"Leverage AI to automate operations and predict incidents before they happen.",
		stats: { value: "60%", label: "Faster Resolution" },
		features: [
			{ icon: <Zap className="h-5 w-5" />, text: "Predictive Scaling" },
			{
				icon: <CheckCircle className="h-5 w-5" />,
				text: "Automated Remediation",
			},
			{
				icon: <Activity className="h-5 w-5" />,
				text: "Intelligent Alerting",
			},
		],
		gradient: "from-yellow-500 to-orange-500",
	},
	{
		icon: <Activity className="h-12 w-12" />,
		title: "Observability",
		description:
			"Gain deep visibility into your systems with comprehensive telemetry.",
		stats: { value: "100%", label: "System Visibility" },
		features: [
			{ icon: <LineChart className="h-5 w-5" />, text: "Distributed Tracing" },
			{ icon: <Server className="h-5 w-5" />, text: "Log Aggregation" },
			{ icon: <Activity className="h-5 w-5" />, text: "Custom Dashboards" },
		],
		gradient: "from-teal-500 to-cyan-500",
	},
	{
		icon: <Workflow className="h-12 w-12" />,
		title: "n8n Automation",
		description:
			"We build custom n8n workflows to automate your repetitive business tasks.",
		stats: { value: "10x", label: "Faster Workflow Creation" },
		features: [
			{
				icon: <Workflow className="h-5 w-5" />,
				text: "Custom Automation Agents",
			},
			{ icon: <Cloud className="h-5 w-5" />, text: "App Integrations" },
			{ icon: <Clock className="h-5 w-5" />, text: "Business Process Ops" },
		],
		gradient: "from-red-500 to-pink-500",
	},
];
