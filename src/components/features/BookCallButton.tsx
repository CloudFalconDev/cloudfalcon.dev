"use client";

import type { MouseEvent, ReactNode } from "react";
import { track } from "@/lib/analytics";
import { CALENDLY_URL, openBooking } from "@/lib/booking";

interface BookCallButtonProps {
	/** Where on the page the click came from, for analytics */
	source: string;
	/** Set when booking from a pricing plan */
	plan?: { id: string; name: string };
	className?: string;
	children: ReactNode;
}

/**
 * Opens the Calendly popup for the free intro call.
 * Renders a real link, so it still works without JavaScript or when the
 * popup can't load, and cmd/ctrl-click opens Calendly in a new tab.
 */
export default function BookCallButton({
	source,
	plan,
	className,
	children,
}: BookCallButtonProps) {
	async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		if (
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return;
		}
		event.preventDefault();

		void track("booking_terminal_opened", {
			consultation_type: "30min_free",
			source,
			plan_id: plan?.id,
		});
		if (plan) {
			void track("pricing_tier_contact_clicked", {
				tier_id: plan.id,
				tier_name: plan.name,
				source: "pricing_section",
			});
		}

		const opened = await openBooking();
		if (!opened) window.location.assign(CALENDLY_URL);
	}

	return (
		<a
			href={CALENDLY_URL}
			target="_blank"
			rel="noopener noreferrer"
			onClick={handleClick}
			className={className}
		>
			{children}
		</a>
	);
}
