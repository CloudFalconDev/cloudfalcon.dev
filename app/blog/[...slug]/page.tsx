import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortableText from "@/components/content/PortableText";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import { getBlogPost } from "@/lib/content";
import { getPostHogClient } from "@/lib/posthog-server";

export async function generateMetadata(props: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
	const params = await props.params;
	const post = await getBlogPost(params.slug);

	if (!post) {
		return {
			title: "Post Not Found | CloudFalcon Blog",
		};
	}

	return {
		title: `${post.title} | CloudFalcon Blog`,
		description: post.excerpt || "Technical insights from CloudFalcon",
		openGraph: {
			title: post.title,
			description: post.excerpt || "Technical insights from CloudFalcon",
			type: "article",
			publishedTime: post.date || undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt || "Technical insights from CloudFalcon",
		},
	};
}

export default async function BlogPost(props: {
	params: Promise<{ slug: string[] }>;
}) {
	const params = await props.params;
	const post = await getBlogPost(params.slug);

	if (!post) {
		return notFound();
	}

	// Track blog post view on server side
	const posthog = getPostHogClient();
	if (posthog) {
		posthog.capture({
			distinctId: "anonymous",
			event: "blog_post_viewed",
			properties: {
				post_title: post.title,
				post_slug: params.slug.join("/"),
				post_date: post.date,
				source: "blog_post_page",
			},
		});
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
				<article className="prose lg:prose-xl mx-auto prose-slate">
					<div className="flex flex-col gap-4 mb-12 pb-12 border-b border-slate-100">
						<div className="flex items-center gap-3">
							<span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-mono text-[10px] uppercase tracking-wider border border-blue-100">
								Post_Type: Analysis
							</span>
							{post.date && (
								<span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
									Timestamp:{" "}
									{new Date(post.date)
										.toLocaleDateString("en-US", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
										})
										.replace(/\//g, ".")}
								</span>
							)}
						</div>
						<h1 className="!mb-0 text-slate-900 !leading-tight">
							{post.title}
						</h1>
					</div>
					<div className="text-slate-600 leading-relaxed font-medium">
						<PortableText content={post.content} />
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
