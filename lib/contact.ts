export function handleContactClick() {
    const subject = "CloudFalcon Dev Services Inquiry";
    const body = "I'm interested in learning more about your services.";
    window.location.href = `mailto:info@cloudfalcon.dev?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;
} 