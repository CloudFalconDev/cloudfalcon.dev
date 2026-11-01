"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		// Defer matchMedia to avoid blocking initial render
		// Use requestIdleCallback if available, otherwise setTimeout
		let cleanup: (() => void) | null = null;
		let timeoutId: ReturnType<typeof setTimeout> | number | null = null;

		const initMediaQuery = () => {
			const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
			setPrefersReducedMotion(mediaQuery.matches);

			const handler = (e: MediaQueryListEvent) =>
				setPrefersReducedMotion(e.matches);
			mediaQuery.addEventListener("change", handler);
			cleanup = () => mediaQuery.removeEventListener("change", handler);
		};

		if (typeof window !== "undefined" && "requestIdleCallback" in window) {
			timeoutId = window.requestIdleCallback(initMediaQuery, { timeout: 100 });
		} else {
			timeoutId = setTimeout(initMediaQuery, 0);
		}

		return () => {
			if (cleanup) {
				cleanup();
			}
			if (timeoutId !== null) {
				if (typeof timeoutId === "number" && timeoutId > 0) {
					clearTimeout(timeoutId);
				} else if (
					typeof window !== "undefined" &&
					"cancelIdleCallback" in window
				) {
					window.cancelIdleCallback(timeoutId as number);
				}
			}
		};
	}, []);

	return prefersReducedMotion;
}
