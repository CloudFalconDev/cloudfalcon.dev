"use client";

import Link from "next/link";
import { useEffect } from "react";
import StatusMessage from "@/components/content/StatusMessage";
import { button, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function DocsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			console.error("Docs error:", error);
		}
		void import("posthog-js")
			.then(({ default: posthog }) => {
				posthog.capture("docs_error_occurred", {
					error_message: error.message,
					error_name: error.name,
					error_digest: error.digest,
					source: "docs_error_page",
				});
				posthog.captureException(error);
			})
			.catch(() => {});
	}, [error]);

	return (
		<StatusMessage
			code="Error"
			title="This page didn't load."
			actions={
				<>
					<button
						type="button"
						onClick={reset}
						className={cn(button.primary, "h-10")}
					>
						Try again
					</button>
					<Link href="/docs" className={textLink}>
						Back to the docs
					</Link>
				</>
			}
		>
			Something went wrong while fetching it. Trying again usually works.
		</StatusMessage>
	);
}
