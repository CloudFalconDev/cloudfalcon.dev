import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";

export default function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header MainNavComponent={MainNav} />
			<main id="content" className="flex-1">
				{children}
			</main>
			<Footer />
		</div>
	);
}
