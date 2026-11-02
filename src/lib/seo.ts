import type { MetadataRoute } from "next";
import { mentorshipPlans } from "@/data/mentorshipPlans";
import { CONTACT_EMAIL } from "./contact";
import { getAllBlogPosts, getDocsNav } from "./content";

export const SITE_URL = "https://cloudfalcon.dev";

// --- robots.txt and sitemap.xml ---

export function getRobots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// The embedded Sanity Studio and the PostHog proxy
			disallow: ["/studio", "/ingest"],
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
	// Both helpers log and return empty results when Sanity can't be reached
	// (CI builds with a placeholder project), which leaves the static pages.
	const [posts, docsNav] = await Promise.all([getAllBlogPosts(), getDocsNav()]);

	const pages = ["", "/blog", "/docs"].map((path) => ({
		url: `${SITE_URL}${path}`,
	}));

	const blogPosts = posts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug.join("/")}`,
		lastModified: post.date ?? undefined,
	}));

	const docs = docsNav
		.flatMap((group) => group.items)
		// The Overview item is /docs, already listed above
		.filter((item) => item.slug.length > 0)
		.map((item) => ({ url: `${SITE_URL}${item.href}` }));

	return [...pages, ...blogPosts, ...docs];
}

// --- Structured data ---

/** "$180" -> 180, null for anything that isn't a plain dollar amount */
function usdAmount(price: string): number | null {
	const match = /^\$(\d+(?:\.\d{1,2})?)$/.exec(price.trim());
	return match ? Number(match[1]) : null;
}

/** schema.org Service for the homepage, built from the plans shown in Pricing */
export function mentorshipJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Cloud & DevOps Mentorship",
		serviceType: "Mentorship",
		description:
			"1:1 mentorship in cloud, DevOps and platform engineering. From your first deploy to FAANG interviews.",
		url: SITE_URL,
		areaServed: "Worldwide",
		provider: {
			"@type": "Organization",
			name: "CloudFalcon",
			url: SITE_URL,
			email: CONTACT_EMAIL,
		},
		// A plan priced in anything but dollars is left out rather than
		// published with the wrong currency
		offers: mentorshipPlans.flatMap((plan) => {
			const price = usdAmount(plan.price);
			if (price === null) return [];
			return [
				{
					"@type": "Offer",
					name: plan.name,
					description: plan.includes,
					price,
					priceCurrency: "USD",
					priceSpecification: {
						"@type": "UnitPriceSpecification",
						price,
						priceCurrency: "USD",
						unitText: plan.billing,
					},
					url: `${SITE_URL}/#pricing`,
				},
			];
		}),
	};
}

/** JSON for a <script type="application/ld+json">, safe to inline in HTML */
export function jsonLdScript(data: object): string {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}
