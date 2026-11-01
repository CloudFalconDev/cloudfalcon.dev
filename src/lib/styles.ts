// Shared class names for the marketing pages.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Two-column "document" grid: margin column for labels, main column for content. */
export const docGrid =
	"grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14";

export const button = {
	primary:
		"inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-paper transition-colors hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
};

/** Inline text link in the brand colour. */
export const textLink =
	"font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand";
