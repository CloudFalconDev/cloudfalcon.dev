/**
 * TypeScript interfaces for data structures
 * Centralized type definitions for better type safety
 */

// Who the mentorship is for
export interface Audience {
	title: string;
	description: string;
}

// Mentorship topic (areas a mentee can focus on)
export interface MentorshipTrack {
	title: string;
	description: string;
	focus: string;
}

// Mentorship Plan (pricing row)
export interface MentorshipPlan {
	id: string;
	name: string;
	price: string;
	billing: string;
	includes: string;
}

// A step in how a mentorship runs
export interface MentorshipStep {
	title: string;
	description: string;
	tools: Array<{ name: string; logo?: string }>;
}

// Group of tools in the stack section
export interface StackGroup {
	name: string;
	items: string[];
}

// Track-record facts shown next to the hero
export interface Stat {
	value: string;
	label: string;
}

// The mentor shown in the "Your mentor" section
export interface Mentor {
	name: string;
	role: string;
	location: string;
	/** Optional headshot under /public, e.g. "/images/mentor.jpg" */
	photo?: string;
	bio: string[];
	facts: Array<{ label: string; value: string }>;
	/** Client reviews, quoted word for word from Upwork */
	reviews: Array<{ quote: string; project: string; year: number }>;
	links: Array<{ name: string; href: string }>;
}

// One block of the example roadmap
export interface RoadmapItem {
	weeks: string;
	title: string;
}
