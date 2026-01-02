import { describe, expect, it } from "vitest";
import { handleContactClick } from "../contact";

describe("handleContactClick", () => {
	it("should construct correct mailto URL", () => {
		// Mock window.location
		const mockLocation = { href: "" };
		Object.defineProperty(window, "location", {
			value: mockLocation,
			writable: true,
		});

		handleContactClick();

		expect(mockLocation.href).toContain("mailto:info@cloudfalcon.dev");
		expect(mockLocation.href).toContain("subject=");
		expect(mockLocation.href).toContain("body=");
		expect(mockLocation.href).toContain("CloudFalcon Dev Services Inquiry");
	});

	it("should URL encode special characters", () => {
		const mockLocation = { href: "" };
		Object.defineProperty(window, "location", {
			value: mockLocation,
			writable: true,
		});

		handleContactClick();

		// Check that the URL is properly encoded
		expect(mockLocation.href).toContain("%20"); // Space encoding
	});
});
