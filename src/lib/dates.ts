const LONG: Intl.DateTimeFormatOptions = {
	day: "numeric",
	month: "long",
	year: "numeric",
};

/**
 * Formats a Sanity date ("2022-02-25" or an ISO timestamp) in UTC, so the day
 * never shifts with the server or visitor time zone. Default: "25 February 2022".
 */
export function formatDate(
	value: string,
	options: Intl.DateTimeFormatOptions = LONG,
): string {
	return new Intl.DateTimeFormat("en-GB", {
		...options,
		timeZone: "UTC",
	}).format(new Date(value));
}

/** Calendar year in UTC, e.g. 2022 */
export function yearOf(value: string): number {
	return new Date(value).getUTCFullYear();
}

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/** "22 Sep" (UTC). Built by hand because some locales print "Sept". */
export function formatShortDate(value: string): string {
	const date = new Date(value);
	return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}
