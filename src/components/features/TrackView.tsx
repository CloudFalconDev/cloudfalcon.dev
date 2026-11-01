"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Records a PostHog event when a page is viewed. Pages are statically
 * generated, so view events have to be sent from the browser.
 */
export default function TrackView({
	event,
	properties,
}: {
	event: string;
	properties?: Record<string, unknown>;
}) {
	useEffect(() => {
		void track(event, properties);
	}, [event, properties]);

	return null;
}
