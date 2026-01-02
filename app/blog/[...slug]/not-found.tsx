import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";

export default function BlogPostNotFound() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
				<div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-slate-900 font-mono uppercase">
							404
						</h1>
						<p className="text-slate-600 font-mono text-sm">
							Blog post not found
						</p>
					</div>

					<Link href="/blog">
						<Button className="bg-blue-600 hover:bg-blue-700">
							Back to Blog
						</Button>
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}
