import type { MetadataRoute } from "next";
import { getRobots } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	return getRobots();
}
