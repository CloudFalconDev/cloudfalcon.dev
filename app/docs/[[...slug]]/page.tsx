import { ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocsSidebar from "@/components/DocsSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
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
		};
	}

	return {
		title: `${doc.title} | CloudFalcon Docs`,
		description:
			doc.frontMatter.description || `Documentation for ${doc.title}`,
	};
}

function Breadcrumbs({ slug }: { slug?: string[] }) {
	if (!slug || slug.length === 0) {
		return null;
	}

	const crumbs = slug.map((segment, index) => {
		const href = `/docs/${slug.slice(0, index + 1).join("/")}`;
		const label = segment.replace(/-/g, " ");
		const isLast = index === slug.length - 1;

		return (
			<li key={href} className="flex items-center">
				<ChevronRight className="w-4 h-4 text-slate-400 mx-2" />
				{isLast ? (
					<span className="text-slate-900 font-medium capitalize">{label}</span>
				) : (
					<Link
						href={href}
						className="text-slate-500 hover:text-blue-600 capitalize transition-colors"
					>
						{label}
					</Link>
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
					<Breadcrumbs slug={slug} />
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
					<div className="text-slate-600 leading-relaxed">{doc.content}</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
