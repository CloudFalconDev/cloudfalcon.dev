import type { ReactNode } from "react";
import DocsSidebar from "@/components/content/DocsSidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import { getDocsNav } from "@/lib/content";
import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";

// Header and sidebar live in the layout, so moving between docs pages only
// swaps the article (and prefetches only download the article).
export default async function DocsLayout({
	children,
}: {
	children: ReactNode;
}) {
	const nav = await getDocsNav();

	return (
		<div className="flex min-h-screen flex-col">
			<Header MainNavComponent={MainNav} />
			<div
				className={cn(
					container,
					"flex-1 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16",
				)}
			>
				<DocsSidebar nav={nav} />
				<main id="content" className="min-w-0 pb-24 pt-10 lg:pt-12">
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
}
