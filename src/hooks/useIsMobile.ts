"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Defer matchMedia to avoid blocking initial render
		// Use requestIdleCallback if available, otherwise setTimeout
		let cleanup: (() => void) | null = null;
		let timeoutId: ReturnType<typeof setTimeout> | number | null = null;

		const initMediaQuery = () => {
			const mediaQuery = window.matchMedia("(max-width: 767px)");
			const updateIsMobile = () => setIsMobile(mediaQuery.matches);

			updateIsMobile();
			mediaQuery.addEventListener("change", updateIsMobile);
			cleanup = () => mediaQuery.removeEventListener("change", updateIsMobile);
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

	return isMobile;
}
