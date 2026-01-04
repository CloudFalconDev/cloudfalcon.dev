"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
	if (!url) return null;

	// Match various YouTube URL formats
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

// YouTube embed component
function YouTubeEmbed({ url }: { url: string }) {
	const videoId = getYouTubeVideoId(url);

	if (!videoId) {
		if (process.env.NODE_ENV === "development") {
			console.warn("Invalid YouTube URL:", url);
		}
		return (
			<div className="my-8 p-4 bg-red-50 border border-red-200 rounded-lg">
				<p className="text-red-600 text-sm">Invalid YouTube URL: {url}</p>
			</div>
		);
	}

	const embedUrl = `https://www.youtube.com/embed/${videoId}`;

	return (
		<div className="my-8 aspect-video rounded-lg overflow-hidden bg-slate-100 shadow-lg">
			<iframe
				src={embedUrl}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="w-full h-full"
				loading="lazy"
			/>
		</div>
	);
}

interface PortableTextProps {
	content: PortableTextBlock[];
}

const components = {
	types: {
		image: ({
			value,
		}: {
			value: {
				asset?: { _ref: string };
				alt?: string;
				url?: string;
			};
		}) => {
			// If URL is provided, use it (external image)
			if (value?.url) {
				const imageUrl = value.url.startsWith("http")
					? value.url
					: value.url.startsWith("/")
						? value.url
						: `/${value.url}`;

				return (
					<div className="my-8">
						<img
							src={imageUrl}
							alt={value.alt || "Image"}
							className="rounded-lg max-w-full h-auto"
							loading="lazy"
							decoding="async"
							fetchPriority="low"
							onError={(e) => {
								if (process.env.NODE_ENV === "development") {
									console.error("Failed to load image:", imageUrl);
								}
								e.currentTarget.style.display = "none";
							}}
						/>
					</div>
				);
			}

			// Handle Sanity asset references
			if (!value?.asset?._ref) {
				return null;
			}
			const imageUrl = urlFor(value).width(800).height(600).url();
			return (
				<div className="my-8">
					<Image
						src={imageUrl}
						alt={value.alt || "Image"}
						width={800}
						height={600}
						className="rounded-lg"
					/>
				</div>
			);
		},
		externalImage: ({
			value,
		}: {
			value: {
				url: string;
				alt?: string;
			};
		}) => {
			if (!value?.url) {
				if (process.env.NODE_ENV === "development") {
					console.warn("externalImage missing url:", value);
				}
				return null;
			}
			// Handle both absolute URLs and relative paths
			const imageUrl = value.url.startsWith("http")
				? value.url
				: value.url.startsWith("/")
					? value.url
					: `/${value.url}`;

			// For local images, use regular img tag
			return (
				<div className="my-8">
					<img
						src={imageUrl}
						alt={value.alt || "Image"}
						className="rounded-lg max-w-full h-auto"
						loading="lazy"
						decoding="async"
						fetchPriority="low"
						onError={(e) => {
							console.error("Failed to load image:", imageUrl);
							e.currentTarget.style.display = "none";
						}}
					/>
				</div>
			);
		},
		code: ({
			value,
		}: {
			value: { code: string; language?: string; filename?: string };
		}) => {
			return (
				<pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto my-4 border border-slate-200">
					<code className={`language-${value.language || "text"}`}>
						{value.code}
					</code>
					{value.filename && (
						<div className="text-xs text-slate-500 mt-2">{value.filename}</div>
					)}
				</pre>
			);
		},
		youtubeVideo: ({ value }: { value: { url: string } }) => {
			if (!value?.url) {
				return null;
			}
			return <YouTubeEmbed url={value.url} />;
		},
	},
	marks: {
		link: ({
			children,
			value,
		}: {
			children: React.ReactNode;
			value?: { href?: string };
		}) => {
			if (!value?.href) {
				return <>{children}</>;
			}
			const isExternal =
				value.href.startsWith("http://") || value.href.startsWith("https://");
			return (
				<a
					href={value.href}
					className="text-blue-600 hover:underline"
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

export default function PortableText({ content }: PortableTextProps) {
	return <PortableTextComponent value={content} components={components} />;
}
