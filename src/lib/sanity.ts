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

// Blog index: no body content, the list only needs titles, dates and excerpts
export const blogPostQuery = `*[_type == "blogPost" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  content
}`;

// Docs navigation: one light query for the sidebar, index and static params.
// "heading" is the text of the opening h1, which reads better than the
// file-name style titles many docs were imported with.
export const docPageQuery = `*[_type == "docPage"] {
  "slug": slug.current,
  title,
  sidebarLabel,
  sidebarPosition,
  "heading": select(content[0].style == "h1" => pt::text(content[0])),
  "category": category->{
    name,
    "slug": slug.current,
    sidebarPosition
  }
}`;

const docPageFields = `{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  description,
  content
}`;

export const docPageBySlugQuery = `*[_type == "docPage" && slug.current == $slug][0] ${docPageFields}`;

// The docs home is the page with no slug (or one of the common index slugs)
export const rootDocPageQuery = `*[_type == "docPage" && (!defined(slug.current) || slug.current in $rootSlugs)] | order(_createdAt asc)[0] ${docPageFields}`;
