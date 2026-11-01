import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL, contactMailto } from "../contact";

describe("contactMailto", () => {
	it("targets the contact address with subject and body", () => {
		expect(contactMailto.startsWith(`mailto:${CONTACT_EMAIL}?`)).toBe(true);
		expect(contactMailto).toContain(
			`subject=${encodeURIComponent("CloudFalcon Mentorship Inquiry")}`,
		);
		expect(contactMailto).toContain("&body=");
	});

	it("URL-encodes special characters", () => {
		expect(contactMailto).toContain("%20");
		expect(contactMailto).not.toMatch(/subject=[^&]* /);
	});
});
