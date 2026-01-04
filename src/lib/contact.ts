// PostHog loaded dynamically to avoid blocking initial render
export async function handleContactClick() {
	// Track contact connect click event (lazy load PostHog)
	try {
		const posthog = (await import("posthog-js")).default;
		posthog.capture("contact_connect_clicked", {
			method: "email",
			recipient: "info@cloudfalcon.dev",
			source: "contact_button",
		});
	} catch (error) {
		// PostHog not available, fail silently
		if (process.env.NODE_ENV === "development") {
			console.warn("PostHog not available:", error);
		}
	}

	const subject = "CloudFalcon Dev Services Inquiry";
	const body = "I'm interested in learning more about your services.";
	window.location.href = `mailto:info@cloudfalcon.dev?subject=${encodeURIComponent(
		subject,
	)}&body=${encodeURIComponent(body)}`;
}
