"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";

export default function DocsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("Docs error:", error);
		}
	}, [error]);

	return (
		<div className="flex flex-col min-h-screen">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 container mx-auto px-4 py-16 max-w-6xl">
				<div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-slate-900 font-mono uppercase">
							Documentation Error
						</h1>
						<p className="text-slate-600 font-mono text-sm">
							Unable to load the requested documentation page.
						</p>
					</div>

					<div className="flex gap-4">
						<Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
							Try Again
						</Button>
						<Button
							onClick={() => {
								window.location.href = "/docs";
							}}
							variant="outline"
						>
							Back to Docs
						</Button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
