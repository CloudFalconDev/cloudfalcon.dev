import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/seo";

// Crawlers read the sitemap far less often than pages change, so hourly is plenty
export const revalidate = 3600;

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
	return getSitemapEntries();
}
