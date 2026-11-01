import {
	PortableText as PortableTextComponent,
	type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import ContentImage from "./ContentImage";

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
	if (!url) return null;

	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
		/youtube\.com\/watch\?.*v=([^&\n?#]+)/,
	];

	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match?.[1]) {
			return match[1];
		}
	}

	return null;
}

function resolveImageUrl(url: string): string {
	if (url.startsWith("http") || url.startsWith("/")) return url;
	return `/${url}`;
}

/**
 * Docs were imported from Docusaurus, where pages link to each other by file
 * ("../devops/tools.md"). Docs URLs mirror those paths, so dropping the
 * extension makes the relative link resolve to the right page.
 */
function withoutMarkdownExtension(href: string): string {
	if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
	return href.replace(/\.mdx?(?=$|[#?])/, "");
}

function YouTubeEmbed({ url }: { url: string }) {
	const videoId = getYouTubeVideoId(url);

	if (!videoId) {
		return (
			<p>
				<a href={url} target="_blank" rel="noopener noreferrer">
					Watch the video
				</a>
			</p>
		);
	}

	return (
		<div className="not-prose my-8 aspect-video overflow-hidden rounded-[3px] border border-line bg-ink/5">
			<iframe
				src={`https://www.youtube.com/embed/${videoId}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="h-full w-full"
				loading="lazy"
			/>
		</div>
	);
}

const components: PortableTextComponents = {
	block: {
		// The page title is the only h1; headings inside the body start at h2
		h1: ({ children }) => <h2>{children}</h2>,
	},
	types: {
		image: ({
			value,
		}: {
			value: { asset?: { _ref: string }; alt?: string; url?: string };
		}) => {
			if (value?.url) {
				return (
					<ContentImage
						src={resolveImageUrl(value.url)}
						alt={value.alt || ""}
					/>
				);
			}
			if (!value?.asset?._ref) {
				return null;
			}
			return (
				<figure className="my-8">
					<Image
						src={urlFor(value).width(1200).auto("format").url()}
						alt={value.alt || ""}
						width={1200}
						height={800}
						sizes="(min-width: 1024px) 44rem, 100vw"
						className="h-auto w-full rounded-[3px] border border-line bg-white"
					/>
				</figure>
			);
		},
		externalImage: ({ value }: { value: { url?: string; alt?: string } }) => {
			if (!value?.url) {
				return null;
			}
			return (
				<ContentImage src={resolveImageUrl(value.url)} alt={value.alt || ""} />
			);
		},
		code: ({
			value,
		}: {
			value: { code?: string; language?: string; filename?: string };
		}) => {
			const label =
				value.filename ||
				(value.language && value.language !== "text" ? value.language : null);
			return (
				<figure className="not-prose my-6 overflow-hidden rounded-[3px] border border-line bg-[#f2f1ec]">
					{label && (
						<figcaption className="border-b border-line px-4 py-2 font-mono text-[12px] text-muted-foreground">
							{label}
						</figcaption>
					)}
					<pre className="overflow-x-auto p-4 font-mono text-[13.5px] leading-[1.65] text-ink">
						<code className={`language-${value.language || "text"}`}>
							{value.code}
						</code>
					</pre>
				</figure>
			);
		},
		youtubeVideo: ({ value }: { value: { url?: string } }) => {
			if (!value?.url) {
				return null;
			}
			return <YouTubeEmbed url={value.url} />;
		},
	},
	marks: {
		link: ({ children, value }) => {
			const href: string | undefined = value?.href;
			if (!href) {
				return <>{children}</>;
			}
			// Internal links use the router so they open instantly
			if (href.startsWith("/") && !href.startsWith("//")) {
				return <Link href={href}>{children}</Link>;
			}
			const isExternal = /^https?:\/\//.test(href);
			return (
				<a
					href={isExternal ? href : withoutMarkdownExtension(href)}
					{...(isExternal && {
						target: "_blank",
						rel: "noopener noreferrer",
					})}
				>
					{children}
				</a>
			);
		},
	},
};

export default function PortableText({
	content,
}: {
	content: PortableTextBlock[];
}) {
	return <PortableTextComponent value={content} components={components} />;
}
