"use client";

import Link from "next/link";
import { useEffect } from "react";
import StatusMessage from "@/components/content/StatusMessage";
import { button, container, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function BlogPostError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			console.error("Blog post error:", error);
		}
		void import("posthog-js")
			.then(({ default: posthog }) => {
				posthog.capture("blog_error_occurred", {
					error_message: error.message,
					error_name: error.name,
					error_digest: error.digest,
					source: "blog_error_page",
				});
				posthog.captureException(error);
			})
			.catch(() => {});
	}, [error]);

	return (
		<div className={cn(container, "py-20 sm:py-28")}>
			<StatusMessage
				code="Error"
				title="This post didn't load."
				actions={
					<>
						<button
							type="button"
							onClick={reset}
							className={cn(button.primary, "h-10")}
						>
							Try again
						</button>
						<Link href="/blog" className={textLink}>
							See all posts
						</Link>
					</>
				}
			>
				Something went wrong while fetching it. Trying again usually works.
			</StatusMessage>
		</div>
	);
}
