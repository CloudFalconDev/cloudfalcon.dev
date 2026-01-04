import { ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocsSidebar from "@/components/content/DocsSidebar";
import PortableText from "@/components/content/PortableText";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import { getDocPage, getDocsStructure } from "@/lib/content";

interface PageProps {
	params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const doc = await getDocPage(slug);

	if (!doc) {
		return {
			title: "Not Found | CloudFalcon Docs",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const docSlug = slug && slug.length > 0 ? slug.join("/") : "";
	const docUrl = `https://cloudfalcon.dev/docs${docSlug ? `/${docSlug}` : ""}`;
	const description =
		(typeof doc.frontMatter.description === "string"
			? doc.frontMatter.description
			: null) || `Documentation for ${doc.title}`;

	return {
		title: `${doc.title} | CloudFalcon Docs`,
		description,
		alternates: {
			canonical: docUrl,
		},
		openGraph: {
			title: `${doc.title} | CloudFalcon Docs`,
			description,
			url: docUrl,
			siteName: "CloudFalcon Docs",
			type: "article",
			locale: "en_US",
		},
		twitter: {
			card: "summary",
			title: `${doc.title} | CloudFalcon Docs`,
			description,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

async function Breadcrumbs({ slug }: { slug?: string[] }) {
	if (!slug || slug.length === 0) {
		return null;
	}

	// Fetch all segment pages to get their labels
	const segmentDocs = await Promise.all(
		slug.map(async (_, index) => {
			const segmentSlug = slug.slice(0, index + 1);
			const doc = await getDocPage(segmentSlug);
			return { segmentSlug, doc, hasPage: !!doc };
		}),
	);

	const crumbs = slug.map((segment, index) => {
		const segmentDoc = segmentDocs[index];
		const href = `/docs/${slug.slice(0, index + 1).join("/")}`;
		// Use sidebarLabel or title from doc if available, otherwise use segment
		const label = segmentDoc?.doc
			? (segmentDoc.doc.frontMatter.sidebarLabel as string) ||
				segmentDoc.doc.title
			: segment.replace(/-/g, " ");
		const isLast = index === slug.length - 1;
		const hasPage = segmentDoc?.hasPage || false;

		return (
			<li key={href} className="flex items-center">
				<ChevronRight className="w-4 h-4 text-slate-400 mx-2" />
				{isLast ? (
					<span className="text-slate-900 font-medium">{label}</span>
				) : hasPage ? (
					<Link
						href={href}
						className="text-slate-500 hover:text-blue-600 transition-colors"
					>
						{label}
					</Link>
				) : (
					<span className="text-slate-400">{label}</span>
				)}
			</li>
		);
	});

	return (
		<nav aria-label="Breadcrumb" className="mb-8">
			<ol className="flex items-center text-sm">
				<li>
					<Link
						href="/docs"
						className="text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
					>
						<Home className="w-4 h-4" />
						<span>Docs</span>
					</Link>
				</li>
				{crumbs}
			</ol>
		</nav>
	);
}

export const revalidate = 60; // Revalidate every 60 seconds to get fresh data from Sanity

export default async function DocPage({ params }: PageProps) {
	const { slug } = await params;

	const [doc, structure] = await Promise.all([
		getDocPage(slug),
		getDocsStructure(),
	]);

	if (!doc) {
		return notFound();
	}

	return (
		<div className="flex flex-col min-h-screen bg-white">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-12 flex max-w-7xl">
				<DocsSidebar structure={structure} />
				<article className="prose lg:prose-lg flex-1 max-w-4xl min-w-0 prose-slate prose-headings:font-bold prose-a:text-blue-600 prose-code:text-blue-600 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
					{await Breadcrumbs({ slug })}
					<div className="flex flex-col gap-4 mb-8 pb-8 border-b border-slate-100">
						<div className="flex items-center gap-3">
							<span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-mono text-[10px] uppercase tracking-wider border border-blue-100">
								Documentation
							</span>
						</div>
						<h1 className="!mb-0 text-slate-900 !leading-tight !text-4xl">
							{doc.title}
						</h1>
					</div>
					<div className="text-slate-600 leading-relaxed">
						<PortableText content={doc.content} />
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
