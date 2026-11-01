import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { openBooking, resetBookingLoader } from "../booking";

const SCRIPT_SELECTOR = 'script[src*="assets.calendly.com"]';

describe("openBooking", () => {
	beforeEach(() => {
		resetBookingLoader();
		delete window.Calendly;
		document.head.innerHTML = "";
	});

	afterEach(() => {
		delete window.Calendly;
	});

	it("opens the popup straight away when Calendly is already loaded", async () => {
		const initPopupWidget = vi.fn();
		window.Calendly = { initPopupWidget };

		await expect(openBooking()).resolves.toBe(true);
		expect(initPopupWidget).toHaveBeenCalledWith({
			url: expect.stringContaining("calendly.com/mohammed-cloudfalcon/30min"),
		});
		expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull();
	});

	it("loads the script once, then opens the popup", async () => {
		const initPopupWidget = vi.fn();
		const first = openBooking();
		const second = openBooking();

		const scripts = document.querySelectorAll(SCRIPT_SELECTOR);
		expect(scripts).toHaveLength(1);

		window.Calendly = { initPopupWidget };
		scripts[0].dispatchEvent(new Event("load"));

		await expect(first).resolves.toBe(true);
		await expect(second).resolves.toBe(true);
		expect(initPopupWidget).toHaveBeenCalledTimes(2);
	});

	it("resolves false when the script fails, and retries on the next call", async () => {
		const attempt = openBooking();
		document.querySelector(SCRIPT_SELECTOR)?.dispatchEvent(new Event("error"));

		await expect(attempt).resolves.toBe(false);
		expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull();

		void openBooking();
		expect(document.querySelectorAll(SCRIPT_SELECTOR)).toHaveLength(1);
	});
});
