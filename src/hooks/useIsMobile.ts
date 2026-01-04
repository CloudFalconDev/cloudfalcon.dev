"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Defer matchMedia to avoid blocking initial render
		// Use requestIdleCallback if available, otherwise setTimeout
		const initMediaQuery = () => {
			// #region agent log
			fetch(
				"http://127.0.0.1:7243/ingest/5f05c192-6016-49b8-896c-dba9c7931ad0",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "src/hooks/useIsMobile.ts:12",
						message: "matchMedia called",
						data: { timestamp: performance.now() },
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "run2",
						hypothesisId: "C",
					}),
				},
			).catch(() => {});
			// #endregion
			const mediaQuery = window.matchMedia("(max-width: 767px)");
			const updateIsMobile = () => setIsMobile(mediaQuery.matches);

			updateIsMobile();
			// #region agent log
			fetch(
				"http://127.0.0.1:7243/ingest/5f05c192-6016-49b8-896c-dba9c7931ad0",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "src/hooks/useIsMobile.ts:20",
						message: "setIsMobile called",
						data: { matches: mediaQuery.matches, timestamp: performance.now() },
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "run2",
						hypothesisId: "D",
					}),
				},
			).catch(() => {});
			// #endregion
			mediaQuery.addEventListener("change", updateIsMobile);
			return () => mediaQuery.removeEventListener("change", updateIsMobile);
		};

		if (typeof window !== "undefined" && "requestIdleCallback" in window) {
			window.requestIdleCallback(initMediaQuery, { timeout: 100 });
		} else {
			setTimeout(initMediaQuery, 0);
		}
	}, []);

	return isMobile;
}
