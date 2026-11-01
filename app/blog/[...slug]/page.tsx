import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortableText from "@/components/content/PortableText";
import BookCallButton from "@/components/features/BookCallButton";
import TrackView from "@/components/features/TrackView";
import { firstParagraph, getAllBlogPosts, getBlogPost } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { button, container, docGrid, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface PageProps {
	params: Promise<{ slug: string[] }>;
}

// Generated at build time, refreshed in the background at most once a minute
export const revalidate = 60;

export async function generateStaticParams() {
	const posts = await getAllBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		return {
			title: "Post Not Found | CloudFalcon Blog",
			robots: { index: false, follow: false },
		};
	}

	const url = `https://cloudfalcon.dev/blog/${post.slug.join("/")}`;
	const description =
		post.excerpt ||
		firstParagraph(post.content) ||
		"Technical notes from CloudFalcon";

	return {
		title: `${post.title} | CloudFalcon Blog`,
		description,
		alternates: { canonical: url },
		openGraph: {
			title: post.title,
			description,
			url,
			type: "article",
			publishedTime: post.date || undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description,
		},
	};
}

export default async function BlogPost({ params }: PageProps) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<article className={cn(container, "pb-24 pt-12 sm:pt-16")}>
			<TrackView
				event="blog_post_viewed"
				properties={{
					post_title: post.title,
					post_slug: post.slug.join("/"),
					post_date: post.date,
					source: "blog_post_page",
				}}
			/>
			<div className={docGrid}>
				<div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[12.5px] text-muted-foreground lg:block lg:space-y-1.5 lg:pt-4">
					<Link href="/blog" className="transition-colors hover:text-ink">
						← All posts
					</Link>
					{post.date && (
						<p>
							<time dateTime={post.date}>{formatDate(post.date)}</time>
						</p>
					)}
				</div>

				<div className="min-w-0 max-w-[46rem]">
					<h1 className="text-balance font-serif text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[3.1rem]">
						{post.title}
					</h1>

					<div className="prose mt-8 sm:mt-10">
						<PortableText content={post.content} />
					</div>

					<aside
						aria-label="Mentorship"
						className="mt-16 border-t border-line pt-8"
					>
						<p className="font-serif text-[1.6rem] leading-snug tracking-[-0.01em] text-ink">
							Learning this for a new role?
						</p>
						<p className="mt-2 max-w-[36rem] text-pretty text-[16px] leading-relaxed text-ink/75">
							CloudFalcon runs one-to-one mentorship in cloud, DevOps and
							platform engineering. The first 30-minute call is free.
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
							<BookCallButton
								source="blog_post"
								className={cn(button.primary, "h-10")}
							>
								Book a free call
							</BookCallButton>
							<Link href="/#pricing" className={cn(textLink, "text-[15px]")}>
								See pricing
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</article>
	);
}
