import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/__tests__/mocks/window";
import { useIsMobile } from "./useIsMobile";

describe("useIsMobile", () => {
	let originalMatchMedia: typeof window.matchMedia;

	beforeEach(() => {
		originalMatchMedia = window.matchMedia;
	});

	afterEach(() => {
		window.matchMedia = originalMatchMedia;
	});

	it("should return false for desktop viewport", () => {
		mockMatchMedia(false);
		const { result } = renderHook(() => useIsMobile());
		expect(result.current).toBe(false);
	});

	it("should return true for mobile viewport", () => {
		mockMatchMedia(true);
		const { result } = renderHook(() => useIsMobile());
		expect(result.current).toBe(true);
	});

	it("should update when media query changes", async () => {
		let matches = false;
		const mediaQueryList = {
			matches,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn((event: string, handler: () => void) => {
				if (event === "change") {
					// Store handler for manual triggering
					(mediaQueryList as { handler?: () => void }).handler = handler;
				}
			}),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		};

		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn(() => mediaQueryList),
		});

		const { result } = renderHook(() => useIsMobile());
		expect(result.current).toBe(false);

		// Simulate media query change
		matches = true;
		mediaQueryList.matches = true;
		const handler = (mediaQueryList as { handler?: () => void }).handler;
		if (handler) {
			handler();
		}

		await waitFor(() => {
			expect(result.current).toBe(true);
		});
	});

	it("should clean up event listener on unmount", () => {
		const removeEventListener = vi.fn();
		const mediaQueryList = {
			matches: false,
			media: "(max-width: 767px)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener,
			dispatchEvent: vi.fn(),
		};

		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn(() => mediaQueryList),
		});

		const { unmount } = renderHook(() => useIsMobile());
		unmount();

		expect(removeEventListener).toHaveBeenCalled();
	});
});
