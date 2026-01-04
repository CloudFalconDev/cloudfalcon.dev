import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient() {
	if (!posthogClient) {
		const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
		if (!posthogKey) {
			if (process.env.NODE_ENV === "development") {
				console.warn("PostHog key not set. Server-side analytics disabled.");
			}
			return null;
		}
		posthogClient = new PostHog(posthogKey, {
			host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
			flushAt: 1,
			flushInterval: 0,
		});
	}
	return posthogClient;
}

export async function shutdownPostHog() {
	if (posthogClient) {
		await posthogClient.shutdown();
	}
}
