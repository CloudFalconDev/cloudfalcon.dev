/**
 * Device detection utilities
 * Centralized device detection logic to avoid code duplication
 */

/**
 * Check if device is mobile using matchMedia
 * More performant than checking window.innerWidth on resize
 */
export function isMobileDevice(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
