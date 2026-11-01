// Calendly scheduling for the free intro call.
// The widget script is only fetched when someone actually clicks "book",
// so it never costs anything on initial page load.

export const CALENDLY_URL = "https://calendly.com/mohammed-cloudfalcon/30min";

const POPUP_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=2350f0`;
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

declare global {
	interface Window {
		Calendly?: {
			initPopupWidget: (options: { url: string }) => void;
		};
	}
}

let loader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
	if (window.Calendly) return Promise.resolve();
	if (loader) return loader;

	loader = new Promise<void>((resolve, reject) => {
		if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
			const style = document.createElement("link");
			style.rel = "stylesheet";
			style.href = STYLE_HREF;
			document.head.appendChild(style);
		}

		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => {
			// Allow a retry on the next click
			loader = null;
			script.remove();
			reject(new Error("Calendly failed to load"));
		};
		document.head.appendChild(script);
	});

	return loader;
}

/**
 * Opens the Calendly scheduler as a popup.
 * Resolves to false when it can't (e.g. the script is blocked),
 * so the caller can fall back to the plain Calendly link.
 */
export async function openBooking(): Promise<boolean> {
	try {
		await loadCalendly();
		if (!window.Calendly) return false;
		window.Calendly.initPopupWidget({ url: POPUP_URL });
		return true;
	} catch {
		return false;
	}
}

/** Test helper: forget any cached loader between tests. */
export function resetBookingLoader() {
	loader = null;
}
