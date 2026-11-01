// HA multi-region web app on AWS, ported from the "HA Multi-region AWS
// Architecture" design canvas. Coordinates are canvas pixels; the SVG
// viewBox crops to the architecture, while the legend and resilience
// controls are rendered as HTML by the Architecture section.

export type Zone =
	| "internet"
	| "region"
	| "vpc"
	| "publicSubnet"
	| "privateSubnet";

export type Tone = Zone | "compute";

export type IconName =
	| "aurora"
	| "auto-scaling-group"
	| "aws-cloud"
	| "backup"
	| "cloudfront"
	| "cloudwatch"
	| "ec2-auto-scaling"
	| "elasticache"
	| "elb"
	| "fis"
	| "kms"
	| "lambda"
	| "nat-gateway"
	| "private-subnet"
	| "public-subnet"
	| "region"
	| "route53"
	| "s3"
	| "secrets-manager"
	| "ses"
	| "shield"
	| "sqs"
	| "users"
	| "vpc"
	| "waf";

export interface DiagramBox {
	x: number;
	y: number;
	w: number;
	h: number;
	stroke?: string;
	strokeWidth?: number;
	dashed?: boolean;
	fill?: string;
	radius?: number;
}

export interface DiagramFlow {
	from: [number, number];
	to: [number, number];
	zone: Zone | "neutral";
	dashed?: boolean;
	arrow?: boolean;
	/** Pulse animation delay in seconds; flows without one are static. */
	delay?: number;
	duration?: number;
}

export interface DiagramGroupLabel {
	x: number;
	y: number;
	size: number;
	icon: IconName;
	tone: Tone;
	bold?: string;
	text: string;
}

export interface DiagramPill {
	x: number;
	y: number;
	text: string;
}

export interface DiagramLabel {
	x: number;
	y: number;
	w: number;
	align: "left" | "center" | "right";
	tone: Tone;
	lines: string[];
}

export interface DiagramNode {
	x: number;
	y: number;
	icon: IconName;
	lines: string[];
}

export interface ResilienceControl {
	title: string;
	detail: string;
}

export const DIAGRAM_VIEWBOX = { x: 32, y: 144, w: 2048, h: 2104 };

export const iconPath = (icon: IconName) =>
	`/images/architecture/aws/${icon}.svg`;

/** Stroke colour for lines, darker text colour for labels (WCAG AA on white). */
export const zoneColors: Record<
	Zone | "neutral" | "compute",
	{ stroke: string; text: string }
> = {
	internet: { stroke: "#232F3E", text: "#232F3E" },
	region: { stroke: "#147EBA", text: "#0F5E8C" },
	vpc: { stroke: "#8C4FFF", text: "#6B3BCC" },
	publicSubnet: { stroke: "#7AA116", text: "#4F6B0E" },
	privateSubnet: { stroke: "#00A4A6", text: "#00787A" },
	neutral: { stroke: "#879196", text: "#545B64" },
	compute: { stroke: "#D86613", text: "#B0520C" },
};

export const legend: { zone: Zone; label: string }[] = [
	{ zone: "internet", label: "Public internet" },
	{ zone: "region", label: "In region" },
	{ zone: "vpc", label: "VPC to VPC" },
	{ zone: "publicSubnet", label: "Public subnet" },
	{ zone: "privateSubnet", label: "Private subnet" },
];

export const boxes: DiagramBox[] = [
	{ x: 264, y: 176, w: 1784, h: 2040, stroke: "#232F3E", strokeWidth: 1.5 },
	{
		x: 712,
		y: 232,
		w: 1304,
		h: 944,
		stroke: "#00A4A6",
		strokeWidth: 1.5,
		dashed: true,
	},
	{ x: 760, y: 280, w: 1208, h: 560, stroke: "#8C4FFF", strokeWidth: 1.5 },
	{
		x: 776,
		y: 360,
		w: 1176,
		h: 224,
		stroke: "#00A4A6",
		strokeWidth: 1,
		dashed: true,
	},
	{ x: 784, y: 392, w: 320, h: 176, fill: "#F2F6E8" },
	{ x: 1136, y: 392, w: 352, h: 176, fill: "#E6F6F7" },
	{ x: 1520, y: 392, w: 424, h: 176, fill: "#E6F6F7" },
	{
		x: 776,
		y: 600,
		w: 1176,
		h: 224,
		stroke: "#00A4A6",
		strokeWidth: 1,
		dashed: true,
	},
	{ x: 784, y: 632, w: 320, h: 176, fill: "#F2F6E8" },
	{ x: 1136, y: 632, w: 352, h: 176, fill: "#E6F6F7" },
	{ x: 1520, y: 632, w: 424, h: 176, fill: "#E6F6F7" },
	{
		x: 1152,
		y: 412,
		w: 168,
		h: 376,
		stroke: "#D86613",
		strokeWidth: 1.5,
		dashed: true,
		radius: 4,
	},
	{
		x: 712,
		y: 1240,
		w: 1304,
		h: 944,
		stroke: "#00A4A6",
		strokeWidth: 1.5,
		dashed: true,
	},
	{ x: 760, y: 1288, w: 1208, h: 560, stroke: "#8C4FFF", strokeWidth: 1.5 },
	{
		x: 776,
		y: 1368,
		w: 1176,
		h: 224,
		stroke: "#00A4A6",
		strokeWidth: 1,
		dashed: true,
	},
	{ x: 784, y: 1400, w: 320, h: 176, fill: "#F2F6E8" },
	{ x: 1136, y: 1400, w: 352, h: 176, fill: "#E6F6F7" },
	{ x: 1520, y: 1400, w: 424, h: 176, fill: "#E6F6F7" },
	{
		x: 776,
		y: 1608,
		w: 1176,
		h: 224,
		stroke: "#00A4A6",
		strokeWidth: 1,
		dashed: true,
	},
	{ x: 784, y: 1640, w: 320, h: 176, fill: "#F2F6E8" },
	{ x: 1136, y: 1640, w: 352, h: 176, fill: "#E6F6F7" },
	{ x: 1520, y: 1640, w: 424, h: 176, fill: "#E6F6F7" },
	{
		x: 1152,
		y: 1420,
		w: 168,
		h: 376,
		stroke: "#D86613",
		strokeWidth: 1.5,
		dashed: true,
		radius: 4,
	},
];

export const flows: DiagramFlow[] = [
	{ from: [936, 572], to: [1120, 572], zone: "privateSubnet", delay: 0.75 },
	{ from: [1120, 452], to: [1120, 692], zone: "privateSubnet" },
	{
		from: [1120, 452],
		to: [1167, 452],
		zone: "privateSubnet",
		arrow: true,
		delay: 1.05,
	},
	{
		from: [1120, 692],
		to: [1167, 692],
		zone: "privateSubnet",
		arrow: true,
		delay: 1.05,
	},
	{
		from: [1304, 452],
		to: [1767, 452],
		zone: "privateSubnet",
		arrow: true,
		delay: 1.35,
	},
	{ from: [1236, 536], to: [1236, 600], zone: "privateSubnet", delay: 1.35 },
	{
		from: [1236, 600],
		to: [1551, 600],
		zone: "privateSubnet",
		arrow: true,
		delay: 1.55,
	},
	{
		from: [1836, 536],
		to: [1836, 663],
		zone: "privateSubnet",
		dashed: true,
		arrow: true,
		delay: 1.95,
	},
	{
		from: [1236, 776],
		to: [1236, 871],
		zone: "region",
		arrow: true,
		delay: 1.65,
	},
	{
		from: [1304, 900],
		to: [1375, 900],
		zone: "region",
		arrow: true,
		delay: 2.05,
	},
	{
		from: [1512, 900],
		to: [1551, 900],
		zone: "region",
		arrow: true,
		delay: 2.35,
	},
	{
		from: [1168, 900],
		to: [1089, 900],
		zone: "region",
		dashed: true,
		arrow: true,
		delay: 2.05,
	},
	{ from: [936, 1580], to: [1120, 1580], zone: "privateSubnet", delay: 2.0 },
	{ from: [1120, 1460], to: [1120, 1700], zone: "privateSubnet" },
	{
		from: [1120, 1460],
		to: [1167, 1460],
		zone: "privateSubnet",
		arrow: true,
		delay: 2.3,
	},
	{
		from: [1120, 1700],
		to: [1167, 1700],
		zone: "privateSubnet",
		arrow: true,
		delay: 2.3,
	},
	{
		from: [1304, 1700],
		to: [1767, 1700],
		zone: "privateSubnet",
		arrow: true,
		delay: 2.6,
	},
	{ from: [1236, 1544], to: [1236, 1608], zone: "privateSubnet", delay: 2.6 },
	{
		from: [1236, 1608],
		to: [1551, 1608],
		zone: "privateSubnet",
		arrow: true,
		delay: 2.8,
	},
	{
		from: [1836, 1544],
		to: [1836, 1671],
		zone: "privateSubnet",
		dashed: true,
		arrow: true,
		delay: 3.2,
	},
	{
		from: [1236, 1784],
		to: [1236, 1879],
		zone: "region",
		arrow: true,
		delay: 2.9,
	},
	{
		from: [1304, 1908],
		to: [1375, 1908],
		zone: "region",
		arrow: true,
		delay: 3.3,
	},
	{
		from: [1512, 1908],
		to: [1551, 1908],
		zone: "region",
		arrow: true,
		delay: 3.6,
	},
	{
		from: [1168, 1908],
		to: [1089, 1908],
		zone: "region",
		dashed: true,
		arrow: true,
		delay: 3.3,
	},
	{ from: [380, 464], to: [380, 544], zone: "neutral", dashed: true },
	{ from: [596, 464], to: [596, 544], zone: "neutral", dashed: true },
	{
		from: [200, 572],
		to: [311, 572],
		zone: "internet",
		arrow: true,
		delay: 0.0,
	},
	{
		from: [448, 572],
		to: [527, 572],
		zone: "internet",
		arrow: true,
		delay: 0.25,
	},
	{
		from: [664, 572],
		to: [799, 572],
		zone: "publicSubnet",
		arrow: true,
		delay: 0.5,
	},
	{
		from: [636, 656],
		to: [636, 1060],
		zone: "region",
		dashed: true,
		delay: 0.5,
		duration: 2.4,
	},
	{
		from: [636, 1060],
		to: [799, 1060],
		zone: "region",
		dashed: true,
		arrow: true,
		delay: 1.2,
	},
	{
		from: [596, 656],
		to: [596, 1580],
		zone: "publicSubnet",
		dashed: true,
		delay: 0.5,
		duration: 3.0,
	},
	{
		from: [596, 1580],
		to: [799, 1580],
		zone: "publicSubnet",
		dashed: true,
		arrow: true,
		delay: 2.2,
	},
	{
		from: [556, 656],
		to: [556, 2068],
		zone: "region",
		dashed: true,
		delay: 0.5,
		duration: 3.6,
	},
	{
		from: [556, 2068],
		to: [799, 2068],
		zone: "region",
		dashed: true,
		arrow: true,
		delay: 2.8,
	},
	{ from: [1904, 452], to: [1928, 452], zone: "vpc", dashed: true, delay: 1.4 },
	{
		from: [1928, 452],
		to: [1928, 1460],
		zone: "vpc",
		dashed: true,
		delay: 1.6,
		duration: 3.0,
	},
	{
		from: [1928, 1460],
		to: [1905, 1460],
		zone: "vpc",
		dashed: true,
		arrow: true,
		delay: 2.8,
	},
	{ from: [1688, 600], to: [1728, 600], zone: "vpc", dashed: true, delay: 1.6 },
	{
		from: [1728, 600],
		to: [1728, 1608],
		zone: "vpc",
		dashed: true,
		delay: 1.8,
		duration: 3.0,
	},
	{
		from: [1728, 1608],
		to: [1689, 1608],
		zone: "vpc",
		dashed: true,
		arrow: true,
		delay: 3.0,
	},
];

export const groupLabels: DiagramGroupLabel[] = [
	{
		x: 264,
		y: 176,
		size: 32,
		icon: "aws-cloud",
		tone: "internet",
		text: "AWS Cloud",
	},
	{
		x: 712,
		y: 232,
		size: 32,
		icon: "region",
		tone: "privateSubnet",
		bold: "us-east-1",
		text: " · Primary region (active)",
	},
	{ x: 760, y: 280, size: 32, icon: "vpc", tone: "vpc", text: "VPC" },
	{
		x: 784,
		y: 320,
		size: 24,
		icon: "public-subnet",
		tone: "publicSubnet",
		text: "Public subnets",
	},
	{
		x: 1136,
		y: 320,
		size: 24,
		icon: "private-subnet",
		tone: "privateSubnet",
		text: "Private subnets · App + VPC endpoints",
	},
	{
		x: 1528,
		y: 320,
		size: 24,
		icon: "private-subnet",
		tone: "privateSubnet",
		text: "Private subnets · Data",
	},
	{
		x: 1152,
		y: 393,
		size: 16,
		icon: "auto-scaling-group",
		tone: "compute",
		text: "Auto Scaling group (min 2, across AZs)",
	},
	{
		x: 712,
		y: 1240,
		size: 32,
		icon: "region",
		tone: "privateSubnet",
		bold: "us-west-2",
		text: " · Secondary region (warm standby)",
	},
	{ x: 760, y: 1288, size: 32, icon: "vpc", tone: "vpc", text: "VPC" },
	{
		x: 784,
		y: 1328,
		size: 24,
		icon: "public-subnet",
		tone: "publicSubnet",
		text: "Public subnets",
	},
	{
		x: 1136,
		y: 1328,
		size: 24,
		icon: "private-subnet",
		tone: "privateSubnet",
		text: "Private subnets · App + VPC endpoints",
	},
	{
		x: 1528,
		y: 1328,
		size: 24,
		icon: "private-subnet",
		tone: "privateSubnet",
		text: "Private subnets · Data",
	},
	{
		x: 1152,
		y: 1401,
		size: 16,
		icon: "auto-scaling-group",
		tone: "compute",
		text: "Auto Scaling group (min 2, across AZs)",
	},
];

export const zonePills: DiagramPill[] = [
	{ x: 968, y: 350, text: "Availability Zone a" },
	{ x: 968, y: 590, text: "Availability Zone b" },
	{ x: 968, y: 1358, text: "Availability Zone a" },
	{ x: 968, y: 1598, text: "Availability Zone b" },
];

export const labels: DiagramLabel[] = [
	{
		x: 784,
		y: 880,
		w: 150,
		align: "left",
		tone: "region",
		lines: ["Async jobs (outside", "VPC, via endpoints)"],
	},
	{
		x: 1848,
		y: 592,
		w: 64,
		align: "left",
		tone: "privateSubnet",
		lines: ["replica"],
	},
	{
		x: 1340,
		y: 576,
		w: 120,
		align: "center",
		tone: "privateSubnet",
		lines: ["sessions / cache"],
	},
	{
		x: 1248,
		y: 846,
		w: 96,
		align: "left",
		tone: "region",
		lines: ["enqueue job"],
	},
	{
		x: 1308,
		y: 872,
		w: 64,
		align: "center",
		tone: "region",
		lines: ["trigger"],
	},
	{
		x: 1092,
		y: 872,
		w: 72,
		align: "center",
		tone: "region",
		lines: ["after 3 fails"],
	},
	{
		x: 1340,
		y: 428,
		w: 160,
		align: "center",
		tone: "privateSubnet",
		lines: ["reads / writes"],
	},
	{
		x: 784,
		y: 1888,
		w: 150,
		align: "left",
		tone: "region",
		lines: ["Async jobs (outside", "VPC, via endpoints)"],
	},
	{
		x: 1848,
		y: 1600,
		w: 64,
		align: "left",
		tone: "privateSubnet",
		lines: ["replica"],
	},
	{
		x: 1340,
		y: 1584,
		w: 120,
		align: "center",
		tone: "privateSubnet",
		lines: ["sessions / cache"],
	},
	{
		x: 1248,
		y: 1854,
		w: 96,
		align: "left",
		tone: "region",
		lines: ["enqueue job"],
	},
	{
		x: 1308,
		y: 1880,
		w: 64,
		align: "center",
		tone: "region",
		lines: ["trigger"],
	},
	{
		x: 1092,
		y: 1880,
		w: 72,
		align: "center",
		tone: "region",
		lines: ["after 3 fails"],
	},
	{
		x: 1340,
		y: 1676,
		w: 200,
		align: "center",
		tone: "privateSubnet",
		lines: ["reads (read-only until failover)"],
	},
	{
		x: 668,
		y: 548,
		w: 40,
		align: "center",
		tone: "publicSubnet",
		lines: ["origin"],
	},
	{ x: 720, y: 1032, w: 76, align: "left", tone: "region", lines: ["static"] },
	{
		x: 608,
		y: 1440,
		w: 96,
		align: "left",
		tone: "publicSubnet",
		lines: ["failover origin"],
	},
	{ x: 720, y: 2040, w: 76, align: "left", tone: "region", lines: ["static"] },
	{
		x: 1744,
		y: 1192,
		w: 172,
		align: "right",
		tone: "vpc",
		lines: ["Aurora Global Database", "RPO ≈ 1 s"],
	},
	{
		x: 1532,
		y: 1192,
		w: 184,
		align: "right",
		tone: "vpc",
		lines: ["ElastiCache Global", "Datastore"],
	},
	{
		x: 800,
		y: 1200,
		w: 600,
		align: "left",
		tone: "vpc",
		lines: [
			"Cross-region: S3 CRR · Secrets Manager replica · KMS multi-Region key · AWS Backup copy",
		],
	},
];

export const nodes: DiagramNode[] = [
	{ x: 800, y: 544, icon: "elb", lines: ["Application LB", "(multi-AZ)"] },
	{ x: 952, y: 424, icon: "nat-gateway", lines: ["NAT Gateway", "AZ a"] },
	{ x: 952, y: 664, icon: "nat-gateway", lines: ["NAT Gateway", "AZ b"] },
	{
		x: 1168,
		y: 424,
		icon: "ec2-auto-scaling",
		lines: ["EC2 (stateless)", "AZ a"],
	},
	{
		x: 1168,
		y: 664,
		icon: "ec2-auto-scaling",
		lines: ["EC2 (stateless)", "AZ b"],
	},
	{
		x: 1552,
		y: 544,
		icon: "elasticache",
		lines: ["ElastiCache", "Multi-AZ primary"],
	},
	{ x: 1768, y: 424, icon: "aurora", lines: ["Aurora writer"] },
	{ x: 1768, y: 664, icon: "aurora", lines: ["Aurora reader", "AZ b"] },
	{ x: 800, y: 1032, icon: "s3", lines: ["Amazon S3", "primary bucket"] },
	{
		x: 984,
		y: 1032,
		icon: "secrets-manager",
		lines: ["Secrets Manager", "primary"],
	},
	{ x: 1168, y: 1032, icon: "kms", lines: ["KMS multi-Region", "key"] },
	{ x: 1352, y: 1032, icon: "backup", lines: ["AWS Backup", "vault"] },
	{
		x: 1768,
		y: 1032,
		icon: "cloudwatch",
		lines: ["CloudWatch", "+ Synthetics"],
	},
	{ x: 952, y: 872, icon: "sqs", lines: ["SQS dead-letter", "queue"] },
	{ x: 1168, y: 872, icon: "sqs", lines: ["Amazon SQS", "email-jobs queue"] },
	{
		x: 1376,
		y: 872,
		icon: "lambda",
		lines: ["Lambda worker", "render + send"],
	},
	{
		x: 1552,
		y: 872,
		icon: "ses",
		lines: ["Amazon SES", "emails to customers"],
	},
	{ x: 800, y: 1552, icon: "elb", lines: ["Application LB", "(multi-AZ)"] },
	{ x: 952, y: 1432, icon: "nat-gateway", lines: ["NAT Gateway", "AZ a"] },
	{ x: 952, y: 1672, icon: "nat-gateway", lines: ["NAT Gateway", "AZ b"] },
	{
		x: 1168,
		y: 1432,
		icon: "ec2-auto-scaling",
		lines: ["EC2 (stateless)", "AZ a"],
	},
	{
		x: 1168,
		y: 1672,
		icon: "ec2-auto-scaling",
		lines: ["EC2 (stateless)", "AZ b"],
	},
	{
		x: 1552,
		y: 1552,
		icon: "elasticache",
		lines: ["ElastiCache", "Global secondary"],
	},
	{ x: 1768, y: 1432, icon: "aurora", lines: ["Aurora Global", "secondary"] },
	{ x: 1768, y: 1672, icon: "aurora", lines: ["Aurora reader", "AZ b"] },
	{ x: 800, y: 2040, icon: "s3", lines: ["Amazon S3", "CRR replica"] },
	{
		x: 984,
		y: 2040,
		icon: "secrets-manager",
		lines: ["Secrets Manager", "replica"],
	},
	{ x: 1168, y: 2040, icon: "kms", lines: ["KMS replica", "key"] },
	{ x: 1352, y: 2040, icon: "backup", lines: ["AWS Backup", "copy vault"] },
	{
		x: 1768,
		y: 2040,
		icon: "cloudwatch",
		lines: ["CloudWatch", "+ Synthetics"],
	},
	{ x: 952, y: 1880, icon: "sqs", lines: ["SQS dead-letter", "queue"] },
	{ x: 1168, y: 1880, icon: "sqs", lines: ["Amazon SQS", "email-jobs queue"] },
	{
		x: 1376,
		y: 1880,
		icon: "lambda",
		lines: ["Lambda worker", "standby (same code)"],
	},
	{
		x: 1552,
		y: 1880,
		icon: "ses",
		lines: ["Amazon SES", "emails to customers"],
	},
	{ x: 64, y: 544, icon: "users", lines: ["Users"] },
	{
		x: 312,
		y: 544,
		icon: "route53",
		lines: ["Route 53", "+ health checks / ARC"],
	},
	{
		x: 528,
		y: 544,
		icon: "cloudfront",
		lines: ["CloudFront", "origin groups"],
	},
	{ x: 312, y: 352, icon: "shield", lines: ["AWS Shield", "Advanced"] },
	{ x: 528, y: 352, icon: "waf", lines: ["AWS WAF"] },
];

export const resilienceControls: ResilienceControl[] = [
	{
		title: "Stateless app tier",
		detail: "Sessions and cache in ElastiCache, nothing on the instance.",
	},
	{
		title: "Warm standby",
		detail:
			"us-west-2 ASG min 2, AMIs and launch templates copied, scale out on failover.",
	},
	{
		title: "Data failover",
		detail:
			"Aurora Global Database managed failover; ElastiCache Global Datastore promotion.",
	},
	{
		title: "Traffic failover",
		detail:
			"CloudFront origin groups (GET/HEAD); the origin hostname is a Route 53 failover record with health checks, so writes fail over too; ARC for a controlled switch.",
	},
	{
		title: "No AZ dependency",
		detail:
			"NAT Gateway per AZ, VPC endpoints for AWS APIs, min 2 AZs per tier.",
	},
	{
		title: "One codebase",
		detail: "Terraform deploys both regions identically, no drift.",
	},
	{
		title: "Backups",
		detail: "AWS Backup + Aurora PITR, cross-region copy vault.",
	},
	{
		title: "Detection",
		detail:
			"CloudWatch alarms (ALB 5xx, replica lag, ASG health), Synthetics canaries.",
	},
	{
		title: "Edge protection",
		detail: "AWS WAF + Shield Advanced on CloudFront and Route 53.",
	},
	{
		title: "Prove it",
		detail: "AWS FIS experiments and a quarterly failover game day.",
	},
	{
		title: "Async work",
		detail:
			"SQS + DLQ decouples slow jobs (emails, exports) from requests; Lambda retries, nothing lost if a worker fails.",
	},
	{
		title: "Targets",
		detail: "SLA 99.9% · RTO and RPO agreed per workload.",
	},
];

export const verificationTools: { icon: IconName; label: string }[] = [
	{ icon: "fis", label: "AWS FIS chaos tests" },
	{ icon: "cloudwatch", label: "CloudWatch alarms + canaries" },
	{ icon: "backup", label: "AWS Backup cross-region" },
];
