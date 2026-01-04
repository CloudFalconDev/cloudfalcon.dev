import { vi } from "vitest";

// Mock Next.js Image component
export const mockNextImage = () => {
	vi.mock("next/image", () => ({
		default: (props: {
			src: string;
			alt: string;
			width?: number;
			height?: number;
			[key: string]: unknown;
		}) => {
			// Return a simple div with image data attributes for testing
			return {
				type: "div",
				props: {
					"data-testid": "next-image",
					"data-src": props.src,
					"data-alt": props.alt,
					"data-width": props.width,
					"data-height": props.height,
				},
			};
		},
	}));
};

// Mock Next.js Link component
export const mockNextLink = () => {
	vi.mock("next/link", () => ({
		default: (props: {
			children: unknown;
			href: string;
			[key: string]: unknown;
		}) => {
			return {
				type: "a",
				props: {
					href: props.href,
					children: props.children,
				},
			};
		},
	}));
};

// Mock Next.js useRouter hook
export const mockNextRouter = () => {
	vi.mock("next/navigation", () => ({
		useRouter: () => ({
			push: vi.fn(),
			replace: vi.fn(),
			prefetch: vi.fn(),
			back: vi.fn(),
			forward: vi.fn(),
			refresh: vi.fn(),
		}),
		usePathname: () => "/",
		useSearchParams: () => new URLSearchParams(),
	}));
};

// Mock Next.js Script component
export const mockNextScript = () => {
	vi.mock("next/script", () => ({
		default: (props: { children?: unknown }) => {
			return props.children || null;
		},
	}));
};
