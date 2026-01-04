/**
 * Application constants
 * Centralized constants to avoid magic numbers and improve maintainability
 */

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
	fast: 100,
	normal: 300,
	slow: 500,
	verySlow: 1000,
	marquee: 40000, // 40 seconds for marquee animations
} as const;

// Typing animation speeds
export const TYPING_SPEED = {
	typing: 50,
	deleting: 30,
	initial: 100,
	pause: 2000, // Pause before deleting
} as const;

// Component dimensions
export const COMPONENT_SIZES = {
	marqueeCard: 320, // Width of marquee cards in pixels
	telemetryCard: {
		icon: 48,
		value: 60,
	},
} as const;

// Three.js configuration
export const THREE_CONFIG = {
	particleCount: {
		mobile: 40,
		desktop: 80,
	},
	connectionDistance: {
		mobile: 2.0,
		desktop: 2.5,
	},
	frameSkip: {
		mobile: 2,
		desktop: 1,
	},
} as const;
