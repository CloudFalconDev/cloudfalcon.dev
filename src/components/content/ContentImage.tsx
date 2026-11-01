"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An image from post or doc content. Many older posts link to images on hosts
 * that no longer exist, so a broken image is hidden instead of showing an icon.
 */
export default function ContentImage({
	src,
	alt,
}: {
	src: string;
	alt: string;
}) {
	const ref = useRef<HTMLImageElement>(null);
	const [failed, setFailed] = useState(false);

	// The error event can fire before hydration; catch that case on mount
	useEffect(() => {
		const image = ref.current;
		if (image?.complete && image.naturalWidth === 0) {
			setFailed(true);
		}
	}, []);

	if (failed) {
		return null;
	}

	return (
		<figure className="my-8">
			<img
				ref={ref}
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				onError={() => setFailed(true)}
				className="h-auto max-w-full rounded-[3px] border border-line bg-white"
			/>
		</figure>
	);
}
