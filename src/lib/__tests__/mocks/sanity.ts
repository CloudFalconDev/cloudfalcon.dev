import type { PortableTextBlock } from "@portabletext/types";
import { vi } from "vitest";

// Mock Sanity client
export const createMockSanityClient = () => {
	const mockFetch = vi.fn();

	return {
		fetch: mockFetch,
		mockFetch,
	};
};

// Mock blog post data
export const mockBlogPost = {
	_id: "test-id",
	title: "Test Blog Post",
	slug: "test-blog-post",
	date: "2024-01-01",
	excerpt: "Test excerpt",
	content: [] as PortableTextBlock[],
};

// Mock doc page data
export const mockDocPage = {
	_id: "test-doc-id",
	title: "Test Doc Page",
	slug: "test-doc",
	category: {
		_id: "category-id",
		name: "Test Category",
		slug: "test-category",
		sidebarPosition: 1,
	},
	sidebarPosition: 1,
	sidebarLabel: "Test Doc",
	description: "Test description",
	content: [] as PortableTextBlock[],
};

// Mock Sanity client module
export const mockSanityClient = () => {
	vi.mock("@/lib/sanity", async () => {
		const actual =
			await vi.importActual<typeof import("@/lib/sanity")>("@/lib/sanity");
		const { createMockSanityClient } = await import("./sanity");

		const mockClient = createMockSanityClient();

		return {
			...actual,
			client: mockClient as unknown as typeof actual.client,
		};
	});
};
