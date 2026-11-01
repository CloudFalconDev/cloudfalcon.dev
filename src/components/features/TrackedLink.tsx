"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/analytics";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	event: string;
	properties?: Record<string, unknown>;
}

/** A plain link that also records a PostHog event when clicked. */
export default function TrackedLink({
	href,
	event,
	properties,
	onClick,
	children,
	...props
}: TrackedLinkProps) {
	return (
		<a
			href={href}
			{...props}
			onClick={(clickEvent) => {
				onClick?.(clickEvent);
				void track(event, properties);
			}}
		>
			{children}
		</a>
	);
}
