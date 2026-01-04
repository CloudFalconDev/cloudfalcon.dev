import { defineField, defineType } from "sanity";

export default defineType({
	name: "blogPost",
	title: "Blog Post",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "date",
			title: "Publish Date",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			description: "Short description for blog listing",
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [
				{
					type: "block",
				},
				{
					type: "image",
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alternative text",
						},
						{
							name: "url",
							type: "string",
							title: "Image URL (alternative to upload)",
							description:
								"If you want to use an external image URL instead of uploading, paste the URL here. Leave empty if uploading an image.",
							validation: (Rule) =>
								// biome-ignore lint/suspicious/noExplicitAny: Sanity validation context type is complex
								Rule.custom((url: string | undefined, context: any) => {
									const hasAsset = context.parent?.asset;
									const hasUrl = url && url.trim() !== "";

									// If neither asset nor URL, that's fine (user might be adding it)
									if (!hasAsset && !hasUrl) {
										return true;
									}

									// If both are provided, prefer asset (upload takes precedence)
									if (hasAsset && hasUrl) {
										return "Upload takes precedence. Remove URL if uploading an image.";
									}

									// If URL is provided, validate it
									if (hasUrl) {
										if (
											url.startsWith("/") ||
											url.startsWith("http://") ||
											url.startsWith("https://")
										) {
											return true;
										}
										return "Must be a relative path (starting with /) or absolute URL (starting with http:// or https://)";
									}

									return true;
								}),
						},
					],
					options: {
						hotspot: true,
					},
				},
				{
					type: "object",
					name: "externalImage",
					title: "External Image",
					fields: [
						{
							name: "url",
							type: "string",
							title: "Image URL or Path",
							description:
								"Image URL or path (e.g., /images/blog/022022/zoom.png or https://example.com/image.jpg)",
							validation: (Rule) =>
								Rule.required().custom((url: string | undefined) => {
									if (!url) return "URL is required";
									// Allow relative paths starting with / or absolute URLs
									if (
										url.startsWith("/") ||
										url.startsWith("http://") ||
										url.startsWith("https://")
									) {
										return true;
									}
									return "Must be a relative path (starting with /) or absolute URL (starting with http:// or https://)";
								}),
						},
						{
							name: "alt",
							type: "string",
							title: "Alternative text",
						},
					],
					preview: {
						select: {
							url: "url",
							alt: "alt",
						},
						prepare({ url, alt }) {
							return {
								title: alt || "External Image",
								subtitle: url,
							};
						},
					},
				},
				{
					type: "code",
					options: {
						languageAlternatives: [
							{ title: "TypeScript", value: "typescript" },
							{ title: "JavaScript", value: "javascript" },
							{ title: "JSON", value: "json" },
							{ title: "HTML", value: "html" },
							{ title: "CSS", value: "css" },
							{ title: "Bash", value: "bash" },
							{ title: "Python", value: "python" },
							{ title: "YAML", value: "yaml" },
							{ title: "Markdown", value: "markdown" },
							{ title: "Plain text", value: "text" },
						],
					},
				},
				{
					type: "object",
					name: "youtubeVideo",
					title: "YouTube Video",
					fields: [
						{
							name: "url",
							type: "url",
							title: "YouTube URL",
							description:
								"YouTube video URL (e.g., https://www.youtube.com/watch?v=...)",
							validation: (Rule) =>
								Rule.required().custom((url: string | undefined) => {
									if (!url) return true;
									const youtubeRegex =
										/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
									return youtubeRegex.test(url)
										? true
										: "Must be a valid YouTube URL";
								}),
						},
					],
					preview: {
						select: {
							url: "url",
						},
						prepare({ url }) {
							return {
								title: "YouTube Video",
								subtitle: url || "No URL",
							};
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			date: "date",
		},
		prepare({ title, date }) {
			return {
				title,
				subtitle: date ? new Date(date).toLocaleDateString() : "No date",
			};
		},
	},
	orderings: [
		{
			title: "Date, Newest",
			name: "dateDesc",
			by: [{ field: "date", direction: "desc" }],
		},
		{
			title: "Date, Oldest",
			name: "dateAsc",
			by: [{ field: "date", direction: "asc" }],
		},
	],
});
