// Only run on client side - instrumentation-client.ts runs only in browser
if (typeof window !== "undefined") {
	const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

	if (posthogKey) {
		// Use dynamic import to ensure PostHog only loads on client
		import("posthog-js")
			.then((posthogModule) => {
				const posthog = posthogModule.default;
				try {
					posthog.init(posthogKey, {
						api_host: "/ingest",
						ui_host: "https://us.posthog.com",
						capture_exceptions: true,
						debug: process.env.NODE_ENV === "development",
						loaded: () => {
							if (process.env.NODE_ENV === "development") {
								console.log("PostHog initialized successfully");
							}
						},
					});
				} catch (error) {
					if (process.env.NODE_ENV === "development") {
						console.warn("PostHog initialization error:", error);
					}
				}
			})
			.catch((error) => {
				if (process.env.NODE_ENV === "development") {
					console.warn("Failed to load PostHog:", error);
				}
			});
	}
}

// IMPORTANT: Never combine this approach with other client-side PostHog initialization approaches,
// especially components like a PostHogProvider. instrumentation-client.ts is the correct solution
// for initializing client-side PostHog in Next.js 15.3+ apps.
