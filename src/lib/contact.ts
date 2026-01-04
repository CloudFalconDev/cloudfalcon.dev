import posthog from "posthog-js";

export function handleContactClick() {
	// Track contact connect click event
	posthog.capture("contact_connect_clicked", {
		method: "email",
		recipient: "info@cloudfalcon.dev",
		source: "contact_button",
	});

	const subject = "CloudFalcon Dev Services Inquiry";
	const body = "I'm interested in learning more about your services.";
	window.location.href = `mailto:info@cloudfalcon.dev?subject=${encodeURIComponent(
		subject,
	)}&body=${encodeURIComponent(body)}`;
}
