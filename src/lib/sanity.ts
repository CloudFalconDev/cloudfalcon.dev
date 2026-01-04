import { createClient } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	useCdn: process.env.NODE_ENV === "production",
	apiVersion: "2024-01-01",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// GROQ queries
export const blogPostQuery = `*[_type == "blogPost"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  content
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  content
}`;

export const docPageQuery = `*[_type == "docPage"] {
  _id,
  title,
  "slug": slug.current,
  "category": category->{
    _id,
    name,
    "slug": slug.current,
    sidebarPosition
  },
  sidebarPosition,
  sidebarLabel,
  description,
  content
}`;

export const docPageBySlugQuery = `*[_type == "docPage" && (
  ($slug == "" && (!defined(slug.current) || slug.current == "" || slug.current == null)) ||
  ($slug != "" && defined(slug.current) && slug.current == $slug)
)][0] {
  _id,
  title,
  "slug": slug.current,
  "category": category->{
    _id,
    name,
    "slug": slug.current,
    sidebarPosition
  },
  sidebarPosition,
  sidebarLabel,
  description,
  content
}`;
