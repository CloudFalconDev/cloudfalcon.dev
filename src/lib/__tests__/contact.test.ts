import { describe, expect, it, vi } from "vitest";
import { handleContactClick } from "../contact";

describe("handleContactClick", () => {
	it("should construct correct mailto URL", async () => {
		// Mock window.location
		const mockLocation = { href: "" };
		Object.defineProperty(window, "location", {
			value: mockLocation,
			writable: true,
		});

		// Mock posthog-js import
		vi.mock("posthog-js", () => ({
			default: {
				capture: vi.fn(),
			},
		}));

		await handleContactClick();

		expect(mockLocation.href).toContain("mailto:info@cloudfalcon.dev");
		expect(mockLocation.href).toContain("subject=");
		expect(mockLocation.href).toContain("body=");
		expect(mockLocation.href).toContain(
			encodeURIComponent("CloudFalcon Dev Services Inquiry"),
		);
	});

	it("should URL encode special characters", async () => {
		const mockLocation = { href: "" };
		Object.defineProperty(window, "location", {
			value: mockLocation,
			writable: true,
		});

		// Mock posthog-js import
		vi.mock("posthog-js", () => ({
			default: {
				capture: vi.fn(),
			},
		}));

		await handleContactClick();

		// Check that the URL is properly encoded
		expect(mockLocation.href).toContain("%20"); // Space encoding
	});
});
