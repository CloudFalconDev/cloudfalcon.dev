import type { PortableTextBlock } from "@portabletext/types";
import { cache } from "react";
import {
	blogPostBySlugQuery,
	blogPostQuery,
	client,
	docPageBySlugQuery,
	docPageQuery,
	rootDocPageQuery,
} from "./sanity";

// --- Types ---

export interface BlogPost {
	slug: string[];
	title: string;
	date: string | null;
	excerpt: string;
	content: PortableTextBlock[];
}

export type BlogPostSummary = Omit<BlogPost, "content">;

export interface DocPage {
	slug: string[];
	title: string;
	description: string | null;
	updatedAt: string | null;
	content: PortableTextBlock[];
}

export interface DocsNavItem {
	slug: string[];
	href: string;
	label: string;
}

export interface DocsNavGroup {
	/** Anchor id, used by the docs index and breadcrumbs */
	id: string;
	/** null for the top group (overview and single-segment docs) */
	label: string | null;
	items: DocsNavItem[];
}

interface SanityBlogPost {
	_id: string;
	title: string;
	slug: string;
	date: string | null;
	excerpt?: string | null;
	content?: PortableTextBlock[] | null;
}

interface SanityDocPage {
	_id: string;
	_updatedAt?: string;
	title: string;
	slug: string | null;
	description?: string | null;
	content?: PortableTextBlock[] | null;
}

export interface SanityDocNavEntry {
	slug: string | null;
	title: string;
	sidebarLabel?: string | null;
	sidebarPosition?: number | null;
	heading?: string | null;
	category?: {
		name?: string | null;
		slug?: string | null;
		sidebarPosition?: number | null;
	} | null;
}

/** Slugs that mean "the docs home page" */
const ROOT_DOC_SLUGS = ["", "intro", "index", "docs"];

// --- Helpers ---

function toSegments(slug: string | null | undefined): string[] {
	return (slug ?? "").split("/").filter(Boolean);
}

function blockText(block: PortableTextBlock): string {
	return (block.children ?? [])
		.map((child) =>
			"text" in child && typeof child.text === "string" ? child.text : "",
		)
		.join("");
}

function isTextBlock(block: PortableTextBlock): boolean {
	return block._type === "block";
}

function isEmptyBlock(block: PortableTextBlock): boolean {
	if (!isTextBlock(block) || block.listItem) return false;
	const children = block.children ?? [];
	return (
		children.every((child) => child._type === "span") &&
		blockText(block).trim() === ""
	);
}

/**
 * The imported content stores links as objects inside each span's `marks`
 * ({ _type: "link", href }) instead of as keys into the block's `markDefs`.
 * Portable Text renderers can't read that shape and hide the text entirely,
 * so move those objects into `markDefs` and reference them by key.
 */
export function normalizeMarks(
	content: PortableTextBlock[],
): PortableTextBlock[] {
	return content.map((block) => {
		const children = block.children ?? [];
		const hasInlineMarks = children.some(
			(child) =>
				Array.isArray(child.marks) &&
				child.marks.some((mark: unknown) => typeof mark !== "string"),
		);
		if (!isTextBlock(block) || !hasInlineMarks) {
			return block;
		}

		const markDefs = [...(block.markDefs ?? [])];
		const normalized = children.map((child, childIndex) => {
			if (!Array.isArray(child.marks)) {
				return child;
			}
			const marks = (child.marks as unknown[]).flatMap((mark, markIndex) => {
				if (typeof mark === "string") return [mark];
				if (mark && typeof mark === "object" && "_type" in mark) {
					const definition = mark as { _type: string; _key?: string };
					const key =
						definition._key ??
						`${block._key ?? "block"}-${childIndex}-${markIndex}`;
					markDefs.push({ ...definition, _key: key });
					return [key];
				}
				return [];
			});
			return {
				...child,
				text: typeof child.text === "string" ? child.text : "",
				marks,
			};
		});

		return { ...block, markDefs, children: normalized };
	});
}

/**
 * Most docs open with an h1 that repeats (and usually improves on) the title.
 * Use it as the page heading and drop it from the body, and skip empty paragraphs.
 */
export function splitLeadingHeading(content: PortableTextBlock[]): {
	heading: string | null;
	body: PortableTextBlock[];
} {
	const blocks = content.filter((block) => !isEmptyBlock(block));
	const [first, ...rest] = blocks;
	if (first && isTextBlock(first) && first.style === "h1") {
		const heading = blockText(first).trim();
		if (heading) {
			return { heading, body: rest };
		}
	}
	return { heading: null, body: blocks };
}

const KNOWN_WORDS: Record<string, string> = {
	aws: "AWS",
	devops: "DevOps",
	macos: "macOS",
	mkdocs: "MkDocs",
	ossf: "OSSF",
	vscode: "VS Code",
	iac: "IaC",
};

/** "container_registries" -> "Container registries", "aws" -> "AWS" */
export function humanizeSegment(segment: string): string {
	return segment
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((word, index) => {
			const known = KNOWN_WORDS[word.toLowerCase()];
			if (known) return known;
			return index === 0 ? word[0].toUpperCase() + word.slice(1) : word;
		})
		.join(" ");
}

function byPositionThenLabel(
	a: { position?: number | null; label: string },
	b: { position?: number | null; label: string },
): number {
	const aHas = typeof a.position === "number";
	const bHas = typeof b.position === "number";
	if (aHas && bHas && a.position !== b.position) {
		return (a.position as number) - (b.position as number);
	}
	if (aHas !== bHas) return aHas ? -1 : 1;
	return a.label.localeCompare(b.label);
}

// --- Blog ---

export const getAllBlogPosts = cache(async (): Promise<BlogPostSummary[]> => {
	try {
		const posts = (await client.fetch<SanityBlogPost[]>(blogPostQuery)) ?? [];

		return posts.map((post) => ({
			slug: toSegments(post.slug),
			title: post.title,
			date: post.date || null,
			excerpt: post.excerpt || "",
		}));
	} catch (e) {
		console.error("Error fetching blog posts from Sanity:", e);
		return [];
	}
});

// Keyed by a string so generateMetadata and the page share one request
const getBlogPostBySlug = cache(
	async (slug: string): Promise<BlogPost | null> => {
		const post = await client.fetch<SanityBlogPost | null>(
			blogPostBySlugQuery,
			{ slug },
		);

		if (!post) {
			return null;
		}

		return {
			slug: toSegments(post.slug),
			title: post.title,
			date: post.date || null,
			excerpt: post.excerpt || "",
			content: normalizeMarks(post.content ?? []).filter(
				(block) => !isEmptyBlock(block),
			),
		};
	},
);

/**
 * Throws on network errors (instead of returning null) so a failed background
 * revalidation keeps serving the last good page rather than caching a 404.
 */
export async function getBlogPost(slug: string[]): Promise<BlogPost | null> {
	return getBlogPostBySlug(slug.join("/"));
}

// --- Docs ---

const getDocPageBySlug = cache(
	async (slug: string): Promise<DocPage | null> => {
		const doc = slug
			? await client.fetch<SanityDocPage | null>(docPageBySlugQuery, { slug })
			: await client.fetch<SanityDocPage | null>(rootDocPageQuery, {
					rootSlugs: ROOT_DOC_SLUGS,
				});

		if (!doc) {
			return null;
		}

		const { heading, body } = splitLeadingHeading(
			normalizeMarks(doc.content ?? []),
		);

		return {
			slug: slug ? toSegments(doc.slug) : [],
			title: heading ?? doc.title,
			description: doc.description?.trim() || null,
			updatedAt: doc._updatedAt ?? null,
			content: body,
		};
	},
);

/** Same error behaviour as getBlogPost. */
export async function getDocPage(slug: string[] = []): Promise<DocPage | null> {
	return getDocPageBySlug(slug.join("/"));
}

/** Group docs by their first slug segment, e.g. "aws/aws-vault" -> AWS. */
export function buildDocsNav(docs: SanityDocNavEntry[]): DocsNavGroup[] {
	const top: DocsNavGroup = {
		id: "overview",
		label: null,
		items: [{ slug: [], href: "/docs", label: "Overview" }],
	};
	const topEntries: (DocsNavItem & { position?: number | null })[] = [];
	const groups = new Map<
		string,
		{
			key: string;
			label: string;
			position?: number | null;
			entries: (DocsNavItem & { position?: number | null })[];
		}
	>();

	for (const doc of docs) {
		const segments = toSegments(doc.slug);
		if (segments.length === 0 || ROOT_DOC_SLUGS.includes(segments.join("/"))) {
			continue;
		}

		const label =
			doc.sidebarLabel?.trim() ||
			doc.heading?.trim() ||
			doc.title ||
			"Untitled";
		const entry = {
			slug: segments,
			href: `/docs/${segments.join("/")}`,
			label,
			position: doc.sidebarPosition,
		};

		if (segments.length === 1) {
			topEntries.push(entry);
			continue;
		}

		const key = segments[0];
		let group = groups.get(key);
		if (!group) {
			group = { key, label: humanizeSegment(key), entries: [] };
			groups.set(key, group);
		}
		// A category whose slug matches the folder names the group
		if (
			doc.category?.name &&
			doc.category.slug?.toLowerCase() === key.toLowerCase()
		) {
			group.label = doc.category.name;
			group.position = doc.category.sidebarPosition;
		}
		group.entries.push(entry);
	}

	const strip = ({
		position: _position,
		...item
	}: DocsNavItem & { position?: number | null }) => item;

	top.items.push(...topEntries.sort(byPositionThenLabel).map(strip));

	const sections = [...groups.values()]
		.sort(byPositionThenLabel)
		.map((group) => ({
			id: group.key.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			label: group.label,
			items: group.entries.sort(byPositionThenLabel).map(strip),
		}));

	return [top, ...sections];
}

export const getDocsNav = cache(async (): Promise<DocsNavGroup[]> => {
	try {
		const docs = (await client.fetch<SanityDocNavEntry[]>(docPageQuery)) ?? [];
		return buildDocsNav(docs);
	} catch (e) {
		console.error("Error fetching docs navigation from Sanity:", e);
		return buildDocsNav([]);
	}
});

/** First real paragraph of a body, trimmed to a meta-description length. */
export function firstParagraph(
	content: PortableTextBlock[],
	maxLength = 160,
): string | null {
	for (const block of content) {
		if (!isTextBlock(block) || (block.style && block.style !== "normal")) {
			continue;
		}
		const text = blockText(block).replace(/\s+/g, " ").trim();
		if (text.length < 40) continue;
		if (text.length <= maxLength) return text;
		const cut = text.slice(0, maxLength - 1);
		return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
	}
	return null;
}
