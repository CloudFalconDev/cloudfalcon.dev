import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import { getAllBlogPosts } from "@/lib/content";

export default async function BlogIndex() {
	const posts = await getAllBlogPosts();

	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-20 max-w-6xl">
				<div className="flex flex-col items-center mb-20">
					<span className="text-blue-600 font-mono text-sm mb-4 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
						logs.tail_recent()
					</span>
					<h1 className="text-4xl font-bold text-slate-900 text-center font-mono uppercase tracking-tight">
						Technical Intelligence
					</h1>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post, idx) => (
						<Link
							key={post.slug.join("/")}
							href={`/blog/${post.slug.join("/")}`}
							className="block group h-full"
						>
							<div className="border border-slate-100 rounded-3xl p-10 hover:shadow-2xl transition-all bg-white h-full flex flex-col shadow-sm relative overflow-hidden group/card">
								<div className="absolute top-4 right-6 font-mono text-[8px] text-slate-300">
									REF_0x0{idx + 1}
								</div>
								<h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors font-mono tracking-tight">
									{post.title}
								</h2>
								{post.date && (
									<p className="text-sm text-slate-500 mb-6">
										{new Date(post.date).toLocaleDateString()}
									</p>
								)}
								<p className="text-slate-600 flex-1 line-clamp-3 text-sm leading-relaxed">
									{post.excerpt}
								</p>
								<span className="text-blue-600 font-semibold mt-6 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
									Read more &rarr;
								</span>
							</div>
						</Link>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
