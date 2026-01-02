"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Dynamic import for Three.js to reduce initial bundle size
const GeometricBackground = lazy(() => import("./GeometricBackground"));

export default function GeometricBackgroundViewport() {
	const [shouldLoad, setShouldLoad] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Only load when in viewport or after a delay
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		// Fallback: load after 2 seconds if not in viewport
		const timeout = setTimeout(() => {
			setShouldLoad(true);
			observer.disconnect();
		}, 2000);

		return () => {
			observer.disconnect();
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 pointer-events-none">
			{shouldLoad && (
				<Suspense fallback={null}>
					<GeometricBackground />
				</Suspense>
			)}
		</div>
	);
}
