import { vi } from "vitest";

// Mock window.matchMedia for testing media queries
export const mockMatchMedia = (matches: boolean = false) => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => {
			return {
				matches,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			};
		}),
	});
};

// Mock window.location
export const mockWindowLocation = (href: string = "") => {
	delete (window as { location?: unknown }).location;
	window.location = { href } as Location;
};

// Mock window.Calendly (for BookingTerminal tests)
export const mockCalendly = () => {
	(window as { Calendly?: unknown }).Calendly = {
		initInlineWidget: vi.fn(),
	};
};
