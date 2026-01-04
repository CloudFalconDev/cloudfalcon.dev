"use client";

import { lazy, Suspense } from "react";

// Dynamic import for Three.js to reduce initial bundle size
const GeometricBackground = lazy(() => import("./GeometricBackground"));

export default function GeometricBackgroundLazy() {
	return (
		<Suspense fallback={null}>
			<GeometricBackground />
		</Suspense>
	);
}
