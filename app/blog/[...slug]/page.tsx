import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import { getBlogPost } from "@/lib/content";

export default async function BlogPost(props: {
	params: Promise<{ slug: string[] }>;
}) {
	const params = await props.params;
	const post = await getBlogPost(params.slug);

	if (!post) {
		return notFound();
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
						{post.content}
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
