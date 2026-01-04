"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		// #region agent log
		fetch("http://127.0.0.1:7243/ingest/5f05c192-6016-49b8-896c-dba9c7931ad0", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "src/hooks/usePrefersReducedMotion.ts:9",
				message: "matchMedia called",
				data: { timestamp: performance.now() },
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "C",
			}),
		}).catch(() => {});
		// #endregion
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mediaQuery.matches);
		// #region agent log
		fetch("http://127.0.0.1:7243/ingest/5f05c192-6016-49b8-896c-dba9c7931ad0", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "src/hooks/usePrefersReducedMotion.ts:12",
				message: "setPrefersReducedMotion called",
				data: { matches: mediaQuery.matches, timestamp: performance.now() },
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "D",
			}),
		}).catch(() => {});
		// #endregion

		const handler = (e: MediaQueryListEvent) =>
			setPrefersReducedMotion(e.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	return prefersReducedMotion;
}
