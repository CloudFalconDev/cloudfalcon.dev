import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableText from "@/components/content/PortableText";
import {
	type DocsNavGroup,
	type DocsNavItem,
	firstParagraph,
	getDocPage,
	getDocsNav,
} from "@/lib/content";
import { formatDate } from "@/lib/dates";

interface PageProps {
	params: Promise<{ slug?: string[] }>;
}

// Pages are generated at build time and refreshed in the background at most
// once a minute, so visitors always get a cached page.
export const revalidate = 60;

export async function generateStaticParams() {
	const nav = await getDocsNav();
	const params = nav.flatMap((group) =>
		group.items.map((item) => ({ slug: item.slug })),
	);
	// The nav keeps its Overview entry even when Sanity can't be reached (CI
	// without secrets), and prerendering /docs would then fail the build. With
	// no real docs, skip prerendering and render on the first request instead.
	return params.some(({ slug }) => slug.length > 0) ? params : [];
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug = [] } = await params;
	const doc = await getDocPage(slug);

	if (!doc) {
		if (slug.length === 0) {
			return { title: "Docs | CloudFalcon" };
		}
		return {
			title: "Not Found | CloudFalcon Docs",
			robots: { index: false, follow: false },
		};
	}

	const docUrl = `https://cloudfalcon.dev/docs${slug.length ? `/${slug.join("/")}` : ""}`;
	const title = `${doc.title} | CloudFalcon Docs`;
	const description =
		doc.description ||
		firstParagraph(doc.content) ||
		`Documentation for ${doc.title}`;

	return {
		title,
		description,
		alternates: { canonical: docUrl },
		openGraph: {
			title,
			description,
			url: docUrl,
			siteName: "CloudFalcon Docs",
			type: "article",
			locale: "en_US",
		},
		twitter: { card: "summary", title, description },
	};
}

function DocsIndex({ nav }: { nav: DocsNavGroup[] }) {
	const groups = nav
		.map((group) => ({
			...group,
			label: group.label ?? "General",
			items: group.items.filter((item) => item.slug.length > 0),
		}))
		.filter((group) => group.items.length > 0);

	if (groups.length === 0) {
		return null;
	}

	return (
		<section
			aria-labelledby="all-pages"
			className="mt-16 border-t border-line pt-10"
		>
			<h2
				id="all-pages"
				className="font-serif text-[1.75rem] leading-tight tracking-[-0.01em] text-ink"
			>
				All pages
			</h2>
			<div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
				{groups.map((group) => (
					<section key={group.id} id={group.id} aria-label={group.label}>
						<h3 className="text-[15px] font-semibold text-ink">
							{group.label}
						</h3>
						<ul className="mt-3 space-y-2">
							{group.items.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-[15px] text-muted-foreground transition-colors hover:text-ink"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</section>
	);
}

function PageLink({
	item,
	direction,
}: {
	item: DocsNavItem;
	direction: "Previous" | "Next";
}) {
	return (
		<Link
			href={item.href}
			className={
				direction === "Next" ? "group block sm:text-right" : "group block"
			}
		>
			<span className="block font-mono text-[12px] text-muted-foreground">
				{direction}
			</span>
			<span className="mt-1 block text-[15.5px] font-medium text-ink transition-colors group-hover:text-brand">
				{item.label}
			</span>
		</Link>
	);
}

export default async function DocPage({ params }: PageProps) {
	const { slug = [] } = await params;
	const isRoot = slug.length === 0;
	const [doc, nav] = await Promise.all([getDocPage(slug), getDocsNav()]);

	if (!doc && !isRoot) {
		notFound();
	}

	const href = isRoot ? "/docs" : `/docs/${(doc?.slug ?? slug).join("/")}`;
	const pages = nav.flatMap((group) =>
		group.items.map((item) => ({ item, group })),
	);
	const position = pages.findIndex(({ item }) => item.href === href);
	const group = position >= 0 ? pages[position].group : null;
	const previous = position > 0 ? pages[position - 1].item : null;
	const next =
		position >= 0 && position < pages.length - 1
			? pages[position + 1].item
			: null;

	return (
		<article className="max-w-[46rem]">
			{!isRoot && (
				<nav aria-label="Breadcrumb">
					<ol className="flex flex-wrap items-center gap-x-2 font-mono text-[12px] text-muted-foreground">
						<li>
							<Link href="/docs" className="transition-colors hover:text-ink">
								Docs
							</Link>
						</li>
						{group?.label && (
							<>
								<li aria-hidden="true">/</li>
								<li>
									<Link
										href={`/docs#${group.id}`}
										className="transition-colors hover:text-ink"
									>
										{group.label}
									</Link>
								</li>
							</>
						)}
					</ol>
				</nav>
			)}

			<h1 className="mt-4 text-balance font-serif text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink first:mt-0 sm:text-[2.9rem]">
				{doc?.title ?? "Docs"}
			</h1>
			{doc?.description && (
				<p className="mt-4 text-pretty text-[18px] leading-relaxed text-ink/75">
					{doc.description}
				</p>
			)}

			{doc && doc.content.length > 0 && (
				<div className="prose mt-8">
					<PortableText content={doc.content} />
				</div>
			)}

			{isRoot ? (
				<DocsIndex nav={nav} />
			) : (
				<>
					{doc?.updatedAt && (
						<p className="mt-12 font-mono text-[12px] text-muted-foreground">
							Last updated{" "}
							<time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time>
						</p>
					)}
					{(previous || next) && (
						<nav
							aria-label="Previous and next pages"
							className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2"
						>
							{previous ? (
								<PageLink item={previous} direction="Previous" />
							) : (
								<span />
							)}
							{next && <PageLink item={next} direction="Next" />}
						</nav>
					)}
				</>
			)}
		</article>
	);
}
