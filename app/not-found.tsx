import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import { Button } from "@/components/ui/button";
import { getPostHogClient } from "@/lib/posthog-server";

export default async function NotFound() {
	// Track 404 page view on server side
	const posthog = getPostHogClient();
	if (posthog) {
		posthog.capture({
			distinctId: "anonymous",
			event: "not_found_page_viewed",
			properties: {
				status_code: 404,
				source: "not_found_page",
			},
		});
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
				<div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
					<div className="space-y-2">
						<h1 className="text-6xl font-bold text-slate-900 font-mono">404</h1>
						<p className="text-slate-600 font-mono text-lg">Page not found</p>
					</div>

					<div className="flex gap-4">
						<Link href="/">
							<Button className="bg-blue-600 hover:bg-blue-700">Go Home</Button>
						</Link>
						<Link href="/blog">
							<Button variant="outline">View Blog</Button>
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
