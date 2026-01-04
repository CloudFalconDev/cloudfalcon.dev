import type { PortableTextBlock } from "@portabletext/types";
import {
	blogPostBySlugQuery,
	blogPostQuery,
	client,
	docPageBySlugQuery,
	docPageQuery,
} from "./sanity";

// --- Types ---

export interface BlogPost {
	slug: string[];
	title: string;
	date: string | null;
	excerpt: string;
	content: PortableTextBlock[];
}

export interface DocPage {
	slug: string[];
	title: string;
	content: PortableTextBlock[];
	frontMatter: Record<string, unknown>;
}

export interface SidebarItem {
	type: "category" | "doc";
	name: string;
	label?: string;
	href?: string;
	position?: number;
	children?: SidebarItem[];
}

interface SanityBlogPost {
	_id: string;
	title: string;
	slug: string;
	date: string;
	excerpt?: string;
	content: PortableTextBlock[];
}

interface SanityCategory {
	_id: string;
	name: string;
	slug: string;
	sidebarPosition?: number;
}

interface SanityDocPage {
	_id: string;
	title: string;
	slug: string;
	category?: SanityCategory | null;
	sidebarPosition?: number;
	sidebarLabel?: string;
	description?: string;
	content: PortableTextBlock[];
}

// --- Blog Logic ---

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	try {
		const posts = (await client.fetch<SanityBlogPost[]>(blogPostQuery)) || [];

		return posts.map((post) => ({
			slug: post.slug.split("/").filter(Boolean),
			title: post.title,
			date: post.date || null,
			excerpt: post.excerpt || "",
			content: [], // content not needed for list view
		}));
	} catch (e) {
		console.error("Error fetching blog posts from Sanity:", e);
		return [];
	}
}

export async function getBlogPost(slug: string[]): Promise<BlogPost | null> {
	try {
		const slugString = slug.join("/");
		const post = await client.fetch<SanityBlogPost | null>(
			blogPostBySlugQuery,
			{ slug: slugString },
		);

		if (!post) {
			return null;
		}

		return {
			slug,
			title: post.title,
			date: post.date || null,
			excerpt: post.excerpt || "",
			content: post.content || [],
		};
	} catch (e) {
		console.error("Error fetching blog post from Sanity:", e);
		return null;
	}
}

// --- Docs Logic ---

export async function getDocPage(slug?: string[]): Promise<DocPage | null> {
	try {
		// Handle root /docs case
		const isRoot = !slug || slug.length === 0;

		if (isRoot) {
			// For root page, try multiple common slug values
			const rootSlugOptions = ["", "intro", "index", "docs"];
			let doc: SanityDocPage | null = null;

			for (const rootSlug of rootSlugOptions) {
				doc = await client.fetch<SanityDocPage | null>(docPageBySlugQuery, {
					slug: rootSlug,
				});
				if (doc) {
					if (process.env.NODE_ENV === "development") {
						console.log(`Found root doc with slug: "${rootSlug}"`);
					}
					break;
				}
			}

			// If still not found, try a broader query for root page
			if (!doc) {
				doc = await client.fetch<SanityDocPage | null>(
					`*[_type == "docPage" && (!defined(slug.current) || slug.current == "" || slug.current == null || slug.current == "intro" || slug.current == "index" || slug.current == "docs")] | order(_createdAt asc) [0]`,
				);
			}

			if (!doc) {
				// Log available docs for debugging
				if (process.env.NODE_ENV === "development") {
					console.error(
						"Root docs page not found. To fix: In Sanity Studio, edit a doc page and set its slug to empty (clear the field), 'intro', 'index', or 'docs'",
					);
				}
				return null;
			}

			return {
				slug: [],
				title: doc.title,
				content: doc.content || [],
				frontMatter: {
					description: doc.description,
					category: doc.category?.name || null,
					categorySlug: doc.category?.slug || null,
					sidebarPosition: doc.sidebarPosition,
					sidebarLabel: doc.sidebarLabel,
				},
			};
		}

		// For non-root pages, use the provided slug
		const slugString = slug.join("/");
		let doc = await client.fetch<SanityDocPage | null>(docPageBySlugQuery, {
			slug: slugString,
		});

		// Try alternative formats if not found
		if (!doc) {
			const altSlug = slugString.replace(/\/$/, "");
			if (altSlug !== slugString) {
				doc = await client.fetch<SanityDocPage | null>(docPageBySlugQuery, {
					slug: altSlug,
				});
			}
		}

		if (!doc) {
			return null;
		}

		// Always use the actual slug from Sanity, not the requested one
		const actualSlug = doc.slug ? doc.slug.split("/").filter(Boolean) : [];

		return {
			slug: actualSlug,
			title: doc.title,
			content: doc.content || [],
			frontMatter: {
				description: doc.description,
				category: doc.category?.name || null,
				categorySlug: doc.category?.slug || null,
				sidebarPosition: doc.sidebarPosition,
				sidebarLabel: doc.sidebarLabel,
			},
		};
	} catch (e) {
		console.error("Error fetching doc page from Sanity:", e);
		return null;
	}
}

// Recursive Sidebar Builder
export async function getDocsStructure(): Promise<SidebarItem[]> {
	try {
		const docs = (await client.fetch<SanityDocPage[]>(docPageQuery)) || [];

		if (!docs || docs.length === 0) {
			return [];
		}

		// Build a tree structure based on slug paths
		// Use a more robust approach that handles any slug structure
		const tree = new Map<string, SidebarItem>();
		const categoryLabels = new Map<string, string>(); // Store custom category labels

		// First pass: collect category labels from docs that have them
		// Always use the category name from Sanity, matching by slug
		for (const doc of docs) {
			if (doc.category?.name && doc.category?.slug) {
				const slugParts = doc.slug.split("/").filter(Boolean);
				if (slugParts.length > 0) {
					const categoryPath = slugParts.slice(0, -1);
					if (categoryPath.length > 0) {
						const categoryKey = categoryPath.join("/");
						const lastPart = categoryPath[categoryPath.length - 1];
						// Match by slug (case-insensitive) or if not set yet
						if (
							doc.category.slug.toLowerCase() === lastPart.toLowerCase() ||
							!categoryLabels.has(categoryKey)
						) {
							categoryLabels.set(categoryKey, doc.category.name);
						}
					}
				}
			}
		}

		// Helper to get or create a category node
		function getOrCreateCategory(
			path: string[],
			fullPath: string,
		): SidebarItem {
			const key = fullPath;
			const existing = tree.get(key);
			if (existing) {
				return existing;
			}

			// Use custom label if available, otherwise use the last part of path
			const categoryName = path[path.length - 1];
			const customLabel = categoryLabels.get(fullPath);
			const category: SidebarItem = {
				type: "category",
				name: categoryName,
				label: customLabel || categoryName,
				children: [],
				position: undefined,
			};

			tree.set(key, category);
			return category;
		}

		// Process each document - always use current slug from Sanity
		for (const doc of docs) {
			// Skip invalid docs
			if (!doc.slug || !doc.title) {
				continue;
			}

			const slugParts = doc.slug.split("/").filter(Boolean);
			const isRoot =
				doc.slug === "" || (slugParts.length === 1 && slugParts[0] === "intro");

			if (isRoot) {
				// Skip root intro in sidebar
				continue;
			}

			// Always build href from current slug - this ensures it's always correct
			// Use sidebarLabel if it exists and is not empty, otherwise fall back to title
			const displayLabel =
				doc.sidebarLabel && doc.sidebarLabel.trim() !== ""
					? doc.sidebarLabel
					: doc.title;
			const item: SidebarItem = {
				type: "doc",
				name: slugParts[slugParts.length - 1] || doc.slug,
				label: displayLabel,
				href: `/docs/${doc.slug}`, // Always use current slug
				position: doc.sidebarPosition,
			};

			if (slugParts.length === 1) {
				// Root level doc
				const key = slugParts[0];
				// Only add if not already exists (avoid duplicates)
				if (!tree.has(key)) {
					tree.set(key, item);
				} else {
					// Update existing item if it's a category (shouldn't happen, but be safe)
					const existing = tree.get(key);
					if (existing && existing.type === "doc") {
						tree.set(key, item);
					}
				}
			} else {
				// Nested doc - build category structure recursively
				const categoryPath = slugParts.slice(0, -1);
				const categoryKey = categoryPath.join("/");
				const category = getOrCreateCategory(categoryPath, categoryKey);

				// Always update category label if doc has a category field
				// Match by slug (case-insensitive) to ensure correct category name
				if (doc.category?.name && doc.category?.slug) {
					const lastPart = categoryPath[categoryPath.length - 1];
					// Match by slug (case-insensitive) - if it matches, use category name
					if (doc.category.slug.toLowerCase() === lastPart.toLowerCase()) {
						category.label = doc.category.name;
						categoryLabels.set(categoryKey, doc.category.name);
					}
				}

				// Also check if we already have a label for this category from first pass
				// and update it if not set
				if (!category.label || category.label === category.name) {
					const existingLabel = categoryLabels.get(categoryKey);
					if (existingLabel) {
						category.label = existingLabel;
					}
				}

				category.children = category.children || [];
				// Check for duplicates before adding
				const existingIndex = category.children.findIndex(
					(child) => child.href === item.href,
				);
				if (existingIndex >= 0) {
					// Update existing item
					category.children[existingIndex] = item;
				} else {
					category.children.push(item);
				}
			}
		}

		// Convert tree to array and sort
		const structure: SidebarItem[] = Array.from(tree.values());

		// Sort categories and their children
		function sortItems(items: SidebarItem[]): SidebarItem[] {
			return items
				.map((item) => {
					if (item.children && item.children.length > 0) {
						item.children = sortItems(item.children);
					}
					return item;
				})
				.sort((a, b) => {
					// Items with position come first
					if (a.position !== undefined && b.position !== undefined) {
						return a.position - b.position;
					}
					if (a.position !== undefined) return -1;
					if (b.position !== undefined) return 1;
					// Fall back to alphabetical
					return (a.label || a.name).localeCompare(b.label || b.name);
				});
		}

		return sortItems(structure);
	} catch (e) {
		console.error("Error fetching docs structure from Sanity:", e);
		return [];
	}
}
