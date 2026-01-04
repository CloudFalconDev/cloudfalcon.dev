"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Dynamic import for Three.js to reduce initial bundle size
const GeometricBackground = lazy(() => import("./GeometricBackground"));

export default function GeometricBackgroundViewport() {
	const [shouldLoad, setShouldLoad] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Defer Three.js loading to reduce initial TBT
		// Use requestIdleCallback if available, otherwise setTimeout
		const loadThreeJS = () => {
			setShouldLoad(true);
		};

		// Only load when in viewport or after idle time
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					// Use requestIdleCallback to load during idle time
					if (
						typeof window !== "undefined" &&
						"requestIdleCallback" in window
					) {
						window.requestIdleCallback(loadThreeJS, { timeout: 3000 });
					} else {
						setTimeout(loadThreeJS, 3000);
					}
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		// Fallback: load after 3 seconds if not in viewport (increased delay)
		const timeout = setTimeout(() => {
			if (typeof window !== "undefined" && "requestIdleCallback" in window) {
				window.requestIdleCallback(loadThreeJS, { timeout: 1000 });
			} else {
				loadThreeJS();
			}
			observer.disconnect();
		}, 3000);

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
