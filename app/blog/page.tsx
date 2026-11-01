import type { Metadata } from "next";
import Link from "next/link";
import { type BlogPostSummary, getAllBlogPosts } from "@/lib/content";
import { formatShortDate, yearOf } from "@/lib/dates";
import { container, docGrid } from "@/lib/styles";
import { cn } from "@/lib/utils";

const description =
	"Tutorials, talks and notes on AWS, Terraform, Kubernetes and DevOps from CloudFalcon.";

export const metadata: Metadata = {
	title: "Blog | CloudFalcon",
	description,
	alternates: { canonical: "https://cloudfalcon.dev/blog" },
	openGraph: {
		title: "Blog | CloudFalcon",
		description,
		url: "https://cloudfalcon.dev/blog",
		type: "website",
	},
};

export const revalidate = 60;

function groupByYear(posts: BlogPostSummary[]) {
	const years = new Map<string, BlogPostSummary[]>();
	for (const post of posts) {
		const year = post.date ? String(yearOf(post.date)) : "Undated";
		years.set(year, [...(years.get(year) ?? []), post]);
	}
	return [...years.entries()];
}

const comparable = (text: string) =>
	text.toLowerCase().replace(/[^a-z0-9]/g, "");

// Many imported excerpts just repeat the title (or its slug); skip those
function hasOwnExcerpt(post: BlogPostSummary): boolean {
	return (
		post.excerpt.trim() !== "" &&
		comparable(post.excerpt) !== comparable(post.title)
	);
}

export default async function BlogIndex() {
	const posts = await getAllBlogPosts();
	const years = groupByYear(posts);

	return (
		<>
			<header className={cn(container, "pb-14 pt-16 sm:pb-20 sm:pt-24")}>
				<h1 className="font-serif text-[2.9rem] leading-[1.02] tracking-[-0.025em] text-ink sm:text-[4.4rem]">
					Blog
				</h1>
				<p className="mt-6 max-w-[36rem] text-pretty text-[19px] leading-[1.6] text-ink/80">
					Tutorials, talks and notes on AWS, Terraform, Kubernetes and DevOps.
				</p>
			</header>

			{years.length === 0 ? (
				<div className={cn(container, "border-t border-line py-16")}>
					<p className="text-[16px] text-muted-foreground">
						No posts yet. Check back soon.
					</p>
				</div>
			) : (
				years.map(([year, yearPosts]) => (
					<section
						key={year}
						aria-labelledby={`year-${year}`}
						className="border-t border-line"
					>
						<div className={cn(container, docGrid, "py-10 sm:py-12")}>
							<h2
								id={`year-${year}`}
								className="font-mono text-[13px] text-muted-foreground lg:pt-[3px]"
							>
								{year}
							</h2>
							<ol className="-my-3">
								{yearPosts.map((post) => (
									<li key={post.slug.join("/")}>
										<Link
											href={`/blog/${post.slug.join("/")}`}
											className="group grid gap-x-8 gap-y-1 py-3 sm:grid-cols-[minmax(0,1fr)_5.5rem]"
										>
											<span className="min-w-0">
												<span className="text-pretty text-[16.5px] font-medium leading-snug text-ink transition-colors group-hover:text-brand">
													{post.title}
												</span>
												{hasOwnExcerpt(post) && (
													<span className="mt-1 line-clamp-2 block text-pretty text-[15px] leading-relaxed text-muted-foreground">
														{post.excerpt}
													</span>
												)}
											</span>
											{post.date && (
												<time
													dateTime={post.date}
													className="row-start-1 font-mono text-[12.5px] text-muted-foreground sm:col-start-2 sm:pt-[3px] sm:text-right"
												>
													{formatShortDate(post.date)}
												</time>
											)}
										</Link>
									</li>
								))}
							</ol>
						</div>
					</section>
				))
			)}
		</>
	);
}
