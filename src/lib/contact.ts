export const CONTACT_EMAIL = "info@cloudfalcon.dev";

const subject = "CloudFalcon Mentorship Inquiry";
const body =
	"I'm interested in mentorship. A bit about me and what I want to achieve:";

/** Prefilled mailto link for mentorship inquiries. */
export const contactMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
	subject,
)}&body=${encodeURIComponent(body)}`;
