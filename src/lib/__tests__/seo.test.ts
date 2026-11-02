import { beforeEach, describe, expect, it, vi } from "vitest";
import { mentorshipPlans } from "@/data/mentorshipPlans";
import { CONTACT_EMAIL } from "../contact";
import { blogPostQuery, client, docPageQuery } from "../sanity";
import {
	getRobots,
	getSitemapEntries,
	jsonLdScript,
	mentorshipJsonLd,
	SITE_URL,
} from "../seo";

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

const staticUrls = [SITE_URL, `${SITE_URL}/blog`, `${SITE_URL}/docs`];

describe("getSitemapEntries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("falls back to the static pages when Sanity is unreachable", async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.mocked(client.fetch).mockRejectedValue(new Error("404 Not Found"));

		const entries = await getSitemapEntries();

		expect(entries.map((entry) => entry.url)).toEqual(staticUrls);
	});

	it("falls back to the static pages when Sanity has no content", async () => {
		vi.mocked(client.fetch).mockResolvedValue([]);

		const entries = await getSitemapEntries();

		expect(entries.map((entry) => entry.url)).toEqual(staticUrls);
	});

	it("lists every blog post and docs page", async () => {
		vi.mocked(client.fetch).mockImplementation((async (query: string) => {
			if (query === blogPostQuery) {
				return [
					{ _id: "1", title: "Newer", slug: "2024/newer", date: "2024-03-01" },
					{ _id: "2", title: "Undated", slug: "undated", date: null },
				];
			}
			if (query === docPageQuery) {
				return [
					{ slug: null, title: "Home" },
					{ slug: "intro", title: "Intro" },
					{ slug: "setup", title: "Setup" },
					{ slug: "aws/aws-vault", title: "aws-vault" },
				];
			}
			return [];
		}) as typeof client.fetch);

		const entries = await getSitemapEntries();

		expect(entries).toEqual([
			{ url: SITE_URL },
			{ url: `${SITE_URL}/blog` },
			{ url: `${SITE_URL}/docs` },
			{ url: `${SITE_URL}/blog/2024/newer`, lastModified: "2024-03-01" },
			{ url: `${SITE_URL}/blog/undated` },
			{ url: `${SITE_URL}/docs/setup` },
			{ url: `${SITE_URL}/docs/aws/aws-vault` },
		]);
	});
});

describe("getRobots", () => {
	it("allows everything except the studio and analytics proxy", () => {
		expect(getRobots().rules).toEqual({
			userAgent: "*",
			allow: "/",
			disallow: ["/studio", "/ingest"],
		});
	});

	it("points to the sitemap", () => {
		expect(getRobots().sitemap).toBe("https://cloudfalcon.dev/sitemap.xml");
	});
});

describe("mentorshipJsonLd", () => {
	it("offers every plan in USD, priced from the plan data", () => {
		const { offers } = mentorshipJsonLd();

		expect(offers).toHaveLength(mentorshipPlans.length);
		offers.forEach((offer, index) => {
			const plan = mentorshipPlans[index];
			expect(offer.name).toBe(plan.name);
			expect(`$${offer.price}`).toBe(plan.price);
			expect(offer.priceCurrency).toBe("USD");
			expect(offer.priceSpecification.unitText).toBe(plan.billing);
		});
	});

	it("names the site, contact email and worldwide service area", () => {
		const jsonLd = mentorshipJsonLd();

		expect(jsonLd["@type"]).toBe("Service");
		expect(jsonLd.url).toBe(SITE_URL);
		expect(jsonLd.areaServed).toBe("Worldwide");
		expect(jsonLd.provider.email).toBe(CONTACT_EMAIL);
	});

	it("makes no claims about reviews or ratings", () => {
		const json = JSON.stringify(mentorshipJsonLd());

		expect(json).not.toMatch(/"(review|reviews|aggregateRating)":/);
	});
});

describe("jsonLdScript", () => {
	it("escapes < so the JSON can't close the script tag", () => {
		const script = jsonLdScript({ text: "</script><script>alert(1)" });

		expect(script).not.toContain("<");
		expect(JSON.parse(script)).toEqual({ text: "</script><script>alert(1)" });
	});
});
