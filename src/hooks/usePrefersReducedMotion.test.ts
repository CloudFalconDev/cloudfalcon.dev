import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "@/lib/__tests__/mocks/window";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
	let originalMatchMedia: typeof window.matchMedia;

	beforeEach(() => {
		originalMatchMedia = window.matchMedia;
	});

	afterEach(() => {
		window.matchMedia = originalMatchMedia;
	});

	it("should return false when reduced motion is not preferred", () => {
		mockMatchMedia(false);
		const { result } = renderHook(() => usePrefersReducedMotion());
		expect(result.current).toBe(false);
	});

	it("should return true when reduced motion is preferred", () => {
		mockMatchMedia(true);
		const { result } = renderHook(() => usePrefersReducedMotion());
		expect(result.current).toBe(true);
	});

	it("should update when preference changes", async () => {
		let matches = false;
		const handlers: ((e: MediaQueryListEvent) => void)[] = [];

		const mediaQueryList = {
			get matches() {
				return matches;
			},
			media: "(prefers-reduced-motion: reduce)",
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(
				(event: string, handler: (e: MediaQueryListEvent) => void) => {
					if (event === "change") {
						handlers.push(handler);
					}
				},
			),
			removeEventListener: vi.fn(
				(event: string, handler: (e: MediaQueryListEvent) => void) => {
					if (event === "change") {
						const index = handlers.indexOf(handler);
						if (index > -1) {
							handlers.splice(index, 1);
						}
					}
				},
			),
			dispatchEvent: vi.fn(),
		} as MediaQueryList;

		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn(() => mediaQueryList),
		});

		const { result } = renderHook(() => usePrefersReducedMotion());
		expect(result.current).toBe(false);

		// Simulate preference change
		matches = true;
		const mockEvent = {
			matches: true,
			media: "(prefers-reduced-motion: reduce)",
		} as MediaQueryListEvent;
		for (const handler of handlers) {
			handler(mockEvent);
		}

		await waitFor(
			() => {
				expect(result.current).toBe(true);
			},
			{ timeout: 2000 },
		);
	});

	it("should clean up event listener on unmount", () => {
		const removeEventListener = vi.fn();
		const mediaQueryList = {
			matches: false,
			media: "(prefers-reduced-motion: reduce)",
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

		const { unmount } = renderHook(() => usePrefersReducedMotion());
		unmount();

		expect(removeEventListener).toHaveBeenCalled();
	});
});
