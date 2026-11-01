// PostHog is loaded on demand so it never blocks the initial render.
export async function track(
	event: string,
	properties?: Record<string, unknown>,
): Promise<void> {
	try {
		const posthog = (await import("posthog-js")).default;
		posthog.capture(event, properties);
	} catch (error) {
		// PostHog not available, fail silently
		if (process.env.NODE_ENV === "development") {
			console.warn("PostHog not available:", error);
		}
	}
}
