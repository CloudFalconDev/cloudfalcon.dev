import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	getAllBlogPosts,
	getBlogPost,
	getDocPage,
	getDocsStructure,
} from "../content";
import { client } from "../sanity";
import { mockBlogPost, mockDocPage } from "./mocks/sanity";

// Mock the Sanity client
vi.mock("../sanity", () => ({
	client: {
		fetch: vi.fn(),
	},
	blogPostQuery: "*[_type == 'blogPost']",
	blogPostBySlugQuery: "*[_type == 'blogPost' && slug.current == $slug][0]",
	docPageQuery: "*[_type == 'docPage']",
	docPageBySlugQuery: "*[_type == 'docPage' && slug.current == $slug][0]",
}));

describe("Content Functions", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getAllBlogPosts", () => {
		it("should fetch all blog posts", async () => {
			const mockPosts = [
				{
					...mockBlogPost,
					slug: "post-1",
					title: "Post 1",
				},
				{
					...mockBlogPost,
					slug: "post-2",
					title: "Post 2",
				},
			];

			vi.mocked(client.fetch).mockResolvedValue(mockPosts);

			const result = await getAllBlogPosts();

			expect(client.fetch).toHaveBeenCalled();
			expect(result).toHaveLength(2);
			expect(result[0].title).toBe("Post 1");
			expect(result[1].title).toBe("Post 2");
		});

		it("should return empty array when no posts found", async () => {
			vi.mocked(client.fetch).mockResolvedValue([]);

			const result = await getAllBlogPosts();

			expect(result).toEqual([]);
		});

		it("should handle errors gracefully", async () => {
			vi.mocked(client.fetch).mockRejectedValue(new Error("Fetch failed"));

			const result = await getAllBlogPosts();
			// Functions catch errors and return empty array
			expect(result).toEqual([]);
		});
	});

	describe("getBlogPost", () => {
		it("should fetch blog post by slug", async () => {
			const mockPost = {
				...mockBlogPost,
				slug: "test-post",
			};

			vi.mocked(client.fetch).mockResolvedValue(mockPost);

			const result = await getBlogPost(["test-post"]);

			expect(client.fetch).toHaveBeenCalled();
			expect(result).toBeDefined();
			expect(result?.slug).toEqual(["test-post"]);
			expect(result?.title).toBe("Test Blog Post");
		});

		it("should return null when post not found", async () => {
			vi.mocked(client.fetch).mockResolvedValue(null);

			const result = await getBlogPost(["non-existent"]);

			expect(result).toBeNull();
		});

		it("should handle multi-segment slugs", async () => {
			const mockPost = {
				...mockBlogPost,
				slug: "category/post",
			};

			vi.mocked(client.fetch).mockResolvedValue(mockPost);

			const result = await getBlogPost(["category", "post"]);

			expect(result).toBeDefined();
			expect(result?.slug).toEqual(["category", "post"]);
		});
	});

	describe("getDocPage", () => {
		it("should fetch doc page by slug", async () => {
			const mockDoc = {
				...mockDocPage,
				slug: "test-doc",
			};

			vi.mocked(client.fetch).mockResolvedValue(mockDoc);

			const result = await getDocPage(["test-doc"]);

			expect(client.fetch).toHaveBeenCalled();
			expect(result).toBeDefined();
			expect(result?.slug).toEqual(["test-doc"]);
			expect(result?.title).toBe("Test Doc Page");
		});

		it("should handle root docs page", async () => {
			const mockDoc = {
				...mockDocPage,
				slug: "",
			};

			vi.mocked(client.fetch).mockResolvedValue(mockDoc);

			const result = await getDocPage([]);

			expect(result).toBeDefined();
			expect(result?.slug).toEqual([]);
		});

		it("should return null when doc not found", async () => {
			vi.mocked(client.fetch).mockResolvedValue(null);

			const result = await getDocPage(["non-existent"]);

			expect(result).toBeNull();
		});
	});

	describe("getDocsStructure", () => {
		it("should build sidebar structure from docs", async () => {
			const mockDocs = [
				{
					...mockDocPage,
					slug: "getting-started",
					title: "Getting Started",
					category: {
						name: "Introduction",
						slug: "introduction",
						sidebarPosition: 1,
					},
					sidebarPosition: 1,
				},
				{
					...mockDocPage,
					slug: "advanced",
					title: "Advanced",
					category: {
						name: "Guides",
						slug: "guides",
						sidebarPosition: 2,
					},
					sidebarPosition: 1,
				},
			];

			vi.mocked(client.fetch).mockResolvedValue(mockDocs);

			const result = await getDocsStructure();

			expect(client.fetch).toHaveBeenCalled();
			expect(result).toBeDefined();
			expect(Array.isArray(result)).toBe(true);
		});

		it("should return empty array when no docs found", async () => {
			vi.mocked(client.fetch).mockResolvedValue([]);

			const result = await getDocsStructure();

			expect(result).toEqual([]);
		});

		it("should handle errors gracefully", async () => {
			vi.mocked(client.fetch).mockRejectedValue(new Error("Fetch failed"));

			const result = await getDocsStructure();
			// Functions catch errors and return empty array
			expect(result).toEqual([]);
		});
	});
});
