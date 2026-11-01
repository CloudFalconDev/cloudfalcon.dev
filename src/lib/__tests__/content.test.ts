import type { PortableTextBlock } from "@portabletext/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	buildDocsNav,
	firstParagraph,
	getAllBlogPosts,
	getBlogPost,
	getDocPage,
	getDocsNav,
	humanizeSegment,
	normalizeMarks,
	splitLeadingHeading,
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
	rootDocPageQuery: "*[_type == 'docPage' && !defined(slug.current)][0]",
}));

function block(
	text: string,
	style = "normal",
	key = text || "empty",
): PortableTextBlock {
	return {
		_type: "block",
		_key: key,
		style,
		markDefs: [],
		children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
	};
}

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

			expect(client.fetch).toHaveBeenCalledTimes(1);
			expect(result).toBeDefined();
			expect(result?.slug).toEqual(["test-doc"]);
			expect(result?.title).toBe("Test Doc Page");
			expect(result?.description).toBe("Test description");
		});

		it("should load the root docs page with a single query", async () => {
			const mockDoc = {
				...mockDocPage,
				slug: null,
			};

			vi.mocked(client.fetch).mockResolvedValue(mockDoc);

			const result = await getDocPage([]);

			expect(client.fetch).toHaveBeenCalledTimes(1);
			expect(vi.mocked(client.fetch).mock.calls[0][1]).toEqual({
				rootSlugs: ["", "intro", "index", "docs"],
			});
			expect(result?.slug).toEqual([]);
		});

		it("should use the opening h1 as the title and drop it from the body", async () => {
			vi.mocked(client.fetch).mockResolvedValue({
				...mockDocPage,
				slug: "terraform/links",
				title: "links",
				content: [block("Links", "h1"), block(""), block("First paragraph")],
			});

			const result = await getDocPage(["terraform", "links"]);

			expect(result?.title).toBe("Links");
			expect(result?.content).toHaveLength(1);
			expect(result?.content[0]._key).toBe("First paragraph");
		});

		it("should return null when doc not found", async () => {
			vi.mocked(client.fetch).mockResolvedValue(null);

			const result = await getDocPage(["non-existent"]);

			expect(result).toBeNull();
		});

		it("should rethrow fetch errors so a cached page is kept", async () => {
			vi.mocked(client.fetch).mockRejectedValue(new Error("Fetch failed"));

			await expect(getDocPage(["failing-doc"])).rejects.toThrow("Fetch failed");
		});
	});

	describe("getDocsNav", () => {
		it("should group docs by their first slug segment", async () => {
			vi.mocked(client.fetch).mockResolvedValue([
				{ slug: null, title: "Documentation", heading: "OpenWiki" },
				{
					slug: "aws/aws-vault",
					title: "aws-vault",
					sidebarLabel: "aws-vault",
					category: { name: "AWS", slug: "aws" },
				},
				{
					slug: "aws/aws-multi-account",
					title: "AWS Multi Account Setup",
					sidebarPosition: 1,
				},
				{
					slug: "container_registries/harbor",
					title: "Harbor Registry",
					heading: "Harbor",
				},
				{
					slug: "devops/iacmk/makefile/terraform",
					title: "terraform",
					heading: "Makefile Examples",
				},
			]);

			const result = await getDocsNav();

			expect(client.fetch).toHaveBeenCalledTimes(1);
			expect(result.map((group) => group.label)).toEqual([
				null,
				"AWS",
				"Container registries",
				"DevOps",
			]);
			// Overview first, root doc not repeated
			expect(result[0].items).toEqual([
				{ slug: [], href: "/docs", label: "Overview" },
			]);
			// Positioned docs first, then alphabetical
			expect(result[1].items.map((item) => item.label)).toEqual([
				"AWS Multi Account Setup",
				"aws-vault",
			]);
			expect(result[2].items[0]).toEqual({
				slug: ["container_registries", "harbor"],
				href: "/docs/container_registries/harbor",
				label: "Harbor",
			});
			expect(result[2].id).toBe("container-registries");
			expect(result[3].items[0].href).toBe(
				"/docs/devops/iacmk/makefile/terraform",
			);
		});

		it("should still return the overview when there are no docs", () => {
			expect(buildDocsNav([])).toEqual([
				{
					id: "overview",
					label: null,
					items: [{ slug: [], href: "/docs", label: "Overview" }],
				},
			]);
		});
	});

	describe("helpers", () => {
		it("humanizeSegment should keep known acronyms", () => {
			expect(humanizeSegment("aws")).toBe("AWS");
			expect(humanizeSegment("keyboard-shortcuts")).toBe("Keyboard shortcuts");
			expect(humanizeSegment("macos")).toBe("macOS");
		});

		it("normalizeMarks should turn inline link objects into markDefs", () => {
			const imported = {
				_type: "block",
				_key: "b1",
				style: "normal",
				children: [
					{ _type: "span", _key: "s1", text: "See ", marks: [] },
					{
						_type: "span",
						_key: "s2",
						text: "Terraform",
						marks: [{ _type: "link", href: "https://www.terraform.io/" }],
					},
				],
			} as unknown as PortableTextBlock;

			const [result] = normalizeMarks([imported]);

			expect(result.markDefs).toEqual([
				{ _type: "link", href: "https://www.terraform.io/", _key: "b1-1-0" },
			]);
			expect(result.children?.[1]).toMatchObject({
				text: "Terraform",
				marks: ["b1-1-0"],
			});
			// Blocks that are already well-formed are returned untouched
			const clean = block("Plain text");
			expect(normalizeMarks([clean])[0]).toBe(clean);
		});

		it("splitLeadingHeading should leave bodies without an h1 alone", () => {
			const content = [block("Intro paragraph")];
			expect(splitLeadingHeading(content)).toEqual({
				heading: null,
				body: content,
			});
		});

		it("firstParagraph should skip headings and short lines", () => {
			const long = "A ".repeat(120).trim();
			const result = firstParagraph([
				block("Title", "h2"),
				block("Short"),
				block(long),
			]);
			expect(result?.endsWith("…")).toBe(true);
			expect(result?.length).toBeLessThanOrEqual(160);
		});
	});
});
