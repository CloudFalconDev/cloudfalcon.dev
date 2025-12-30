import { notFound } from "next/navigation";
import DocsSidebar from "@/components/DocsSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import { getDocPage, getDocsStructure } from "@/lib/content";

export default async function DocPage(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const { slug } = params;

	const [doc, structure] = await Promise.all([
		getDocPage(slug),
		getDocsStructure(),
	]);

	if (!doc) {
		return notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-16 flex max-w-7xl">
				<DocsSidebar structure={structure} />
				<article className="prose lg:prose-xl flex-1 max-w-4xl min-w-0 prose-slate">
					<div className="flex flex-col gap-4 mb-12 pb-12 border-b border-slate-100">
						<div className="flex items-center gap-3">
							<span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-mono text-[10px] uppercase tracking-wider border border-blue-100">
								System_Doc: v1.0
							</span>
							<span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
								Access_Level: Public
							</span>
						</div>
						<h1 className="!mb-0 text-slate-900 !leading-tight">{doc.title}</h1>
					</div>
					<div className="text-slate-600 leading-relaxed font-medium">
						{doc.content}
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
