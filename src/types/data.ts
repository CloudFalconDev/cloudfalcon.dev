/**
 * TypeScript interfaces for data structures
 * Centralized type definitions for better type safety
 */

// Service Details
export interface ServiceDetail {
	icon: React.ReactNode;
	title: string;
	description: string;
	stats: {
		value: string;
		label: string;
	};
	features: Array<{
		icon: React.ReactNode;
		text: string;
	}>;
	gradient: string;
}

// Platform
export interface Platform {
	name: string;
	href: string;
	logo: string;
	alt: string;
	description: string;
}

// Integration
export interface Integration {
	name: string;
	href: string;
	logo: string;
	alt: string;
	description: string;
}

// IaC Tool
export interface IaCTool {
	name: string;
	image: string;
	description: string;
	link: string;
}

// Kubernetes Tool
export interface KubernetesTool {
	name: string;
	description: string;
	icon: React.ReactNode;
	link: string;
	logo: string;
}

// Terraform Tool
export interface TerraformTool {
	name: string;
	description: string;
	icon: React.ReactNode;
	link: string;
	logo: string;
}

// Security Tool
export interface SecurityTool {
	name: string;
	description: string;
	icon: React.ReactNode;
	link: string;
	logo: string;
}

// Pipeline Step
export interface PipelineStep {
	id: string;
	tool: string;
	description: string;
	img: string;
}
