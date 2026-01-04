import { defineField, defineType } from "sanity";

export default defineType({
	name: "category",
	title: "Category",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
			description: "Category name (e.g., 'AWS', 'Terraform', 'DevOps')",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
			description: "URL-friendly identifier for the category",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 2,
			description: "Optional description of the category",
		}),
		defineField({
			name: "parentCategory",
			title: "Parent Category",
			type: "reference",
			to: [{ type: "category" }],
			description: "Optional parent category for nested categories",
		}),
		defineField({
			name: "sidebarPosition",
			title: "Sidebar Position",
			type: "number",
			description: "Position in sidebar (lower numbers appear first)",
		}),
	],
	preview: {
		select: {
			title: "name",
			slug: "slug.current",
		},
		prepare({ title, slug }) {
			return {
				title,
				subtitle: slug ? `/${slug}` : "No slug",
			};
		},
	},
});
