export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { shutdownPostHog } = await import("./src/lib/posthog-server");

		// Handle graceful shutdown to ensure events are flushed
		process.on("SIGTERM", async () => {
			await shutdownPostHog();
		});

		process.on("SIGINT", async () => {
			await shutdownPostHog();
		});
	}
}
