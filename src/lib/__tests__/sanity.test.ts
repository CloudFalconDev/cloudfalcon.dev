import { describe, expect, it } from "vitest";
import {
	blogPostQuery,
	docPageQuery,
	rootDocPageQuery,
	urlFor,
} from "../sanity";

describe("Sanity Client", () => {
	it("should have urlFor function", () => {
		expect(urlFor).toBeDefined();
		expect(typeof urlFor).toBe("function");
	});

	it("should have blogPostQuery defined", () => {
		expect(blogPostQuery).toBeDefined();
		expect(typeof blogPostQuery).toBe("string");
		expect(blogPostQuery).toContain("blogPost");
	});

	it("should have docPageQuery defined", () => {
		expect(docPageQuery).toBeDefined();
		expect(typeof docPageQuery).toBe("string");
		expect(docPageQuery).toContain("docPage");
	});

	it("should keep body content out of the list queries", () => {
		expect(blogPostQuery).not.toContain("content");
		expect(docPageQuery).not.toMatch(/^\s*content,?$/m);
	});

	it("should find the docs home in one query", () => {
		expect(rootDocPageQuery).toContain("$rootSlugs");
	});
});
