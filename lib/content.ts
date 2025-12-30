import { promises as fs } from "node:fs";
import path from "node:path";
import grayMatter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

// --- Types ---

export interface BlogPost {
	slug: string[];
	title: string;
	date: string | null;
	excerpt: string;
	content: React.ReactNode;
}

export interface DocPage {
	slug: string[];
	title: string;
	content: React.ReactNode;
	frontMatter: Record<string, any>;
}

export interface SidebarItem {
	type: "category" | "doc";
	name: string;
	label?: string;
	href?: string;
	position?: number;
	children?: SidebarItem[];
}

interface CategoryConfig {
	label?: string;
	position?: number;
}

// --- Configuration ---

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const DOCS_DIR = path.join(process.cwd(), "content/docs");

// --- Helpers ---

// Helper to recursively find all files in a directory
async function getFiles(dir: string): Promise<string[]> {
	const subdirs = await fs.readdir(dir);
	const files = await Promise.all(
		subdirs.map(async (subdir) => {
			const res = path.resolve(dir, subdir);
			return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
		}),
	);
	return files.flat();
}

// --- Blog Logic ---

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	try {
		const filePaths = await getFiles(BLOG_DIR);

		const posts = await Promise.all(
			filePaths
				.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
				.map(async (filePath) => {
					const fileContent = await fs.readFile(filePath, "utf8");
					const { data } = grayMatter(fileContent);

					// Calculate slug relative to content/blog
					const relativePath = path.relative(BLOG_DIR, filePath);
					const slug = relativePath.replace(/\.mdx?$/, "").split(path.sep);

					return {
						slug,
						title: data.title || slug[slug.length - 1],
						date: data.date ? new Date(data.date).toISOString() : null,
						excerpt: data.excerpt || "",
						content: null, // content not needed for list view
					};
				}),
		);

		// Sort by date desc
		return posts.sort((a, b) => {
			if (!a.date) return 1;
			if (!b.date) return -1;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	} catch (e) {
		console.error("Error reading blog posts:", e);
		return [];
	}
}

export async function getBlogPost(slug: string[]): Promise<BlogPost | null> {
	try {
		const relativePath = slug.join("/");

		// Try both .md and .mdx
		let fileContent: string;
		try {
			fileContent = await fs.readFile(
				path.join(BLOG_DIR, `${relativePath}.md`),
				"utf8",
			);
		} catch {
			try {
				fileContent = await fs.readFile(
					path.join(BLOG_DIR, `${relativePath}.mdx`),
					"utf8",
				);
			} catch {
				return null;
			}
		}

		const { data, content } = grayMatter(fileContent);
		const { content: mdxContent } = await compileMDX({
			source: content,
			options: { parseFrontmatter: false },
		});

		return {
			slug,
			title: data.title || slug[slug.length - 1],
			date: data.date ? new Date(data.date).toISOString() : null,
			excerpt: data.excerpt || "",
			content: mdxContent,
		};
	} catch (_e) {
		return null;
	}
}

// --- Docs Logic ---

export async function getDocPage(slug?: string[]): Promise<DocPage | null> {
	try {
		const relativePath = slug ? slug.join("/") : "";

		// Determine possible paths
		let possiblePaths = [
			path.join(DOCS_DIR, `${relativePath}.md`),
			path.join(DOCS_DIR, `${relativePath}.mdx`),
			path.join(DOCS_DIR, relativePath, "index.md"),
			path.join(DOCS_DIR, relativePath, "index.mdx"),
		];

		// Special case for root /docs -> intro.mdx
		if (!slug || slug.length === 0) {
			possiblePaths = [
				path.join(DOCS_DIR, "intro.mdx"),
				path.join(DOCS_DIR, "intro.md"),
				path.join(DOCS_DIR, "index.mdx"),
				path.join(DOCS_DIR, "index.md"),
			];
		}

		let fileContent: string = "";
		let found = false;

		for (const p of possiblePaths) {
			try {
				fileContent = await fs.readFile(p, "utf8");
				found = true;
				break;
			} catch {}
		}

		if (!found) return null;

		const { data, content } = grayMatter(fileContent);
		const { content: mdxContent } = await compileMDX({
			source: content,
			options: { parseFrontmatter: false },
		});

		return {
			slug: slug || [],
			title: data.title || (slug ? slug[slug.length - 1] : "Docs"),
			content: mdxContent,
			frontMatter: data,
		};
	} catch (_e) {
		return null;
	}
}

// Helper to read category config
async function getCategoryConfig(dir: string): Promise<CategoryConfig | null> {
	try {
		const configPath = path.join(dir, "_category_.json");
		const content = await fs.readFile(configPath, "utf8");
		return JSON.parse(content) as CategoryConfig;
	} catch {
		return null;
	}
}

// Helper to get frontmatter position from a doc file
async function getDocPosition(filePath: string): Promise<number | undefined> {
	try {
		const content = await fs.readFile(filePath, "utf8");
		const { data } = grayMatter(content);
		return data.sidebar_position;
	} catch {
		return undefined;
	}
}

// Recursive Sidebar Builder
export async function getDocsStructure(
	dir: string = DOCS_DIR,
	baseRoute: string = "/docs",
): Promise<SidebarItem[]> {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		const structure: SidebarItem[] = [];

		for (const entry of entries) {
			if (entry.name.startsWith(".") || entry.name === "_category_.json")
				continue;

			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				const children = await getDocsStructure(
					fullPath,
					`${baseRoute}/${entry.name}`,
				);
				if (children.length > 0) {
					// Get the category config for the subdirectory
					const subCategoryConfig = await getCategoryConfig(fullPath);
					structure.push({
						type: "category",
						name: entry.name,
						label: subCategoryConfig?.label,
						position: subCategoryConfig?.position,
						children,
					});
				}
			} else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
				const name = entry.name.replace(/\.mdx?$/, "");
				const position = await getDocPosition(fullPath);

				let href = `${baseRoute}/${name}`;
				// Handle root intro
				if (name === "intro" && baseRoute === "/docs") {
					href = "/docs";
				}

				structure.push({
					type: "doc",
					name: name,
					href: href,
					position: position,
				});
			}
		}

		// Sort by position first, then alphabetically
		return structure.sort((a, b) => {
			// Items with position come first
			if (a.position !== undefined && b.position !== undefined) {
				return a.position - b.position;
			}
			if (a.position !== undefined) return -1;
			if (b.position !== undefined) return 1;
			// Fall back to alphabetical
			return a.name.localeCompare(b.name);
		});
	} catch (_e) {
		return [];
	}
}
