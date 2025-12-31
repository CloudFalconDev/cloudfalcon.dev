import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Check if device is mobile or prefers reduced motion
const isMobileDevice = () => {
	if (typeof window === "undefined") return false;
	return (
		window.innerWidth < 768 ||
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		)
	);
};

const prefersReducedMotion = () => {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

function GeometricBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const particlesRef = useRef<THREE.Points | null>(null);
	const linesRef = useRef<THREE.LineSegments | null>(null);
	const animationIdRef = useRef<number | null>(null);
	const isVisibleRef = useRef(true);
	const [shouldRender, setShouldRender] = useState(true);

	// Check on mount if we should render at all
	useEffect(() => {
		if (isMobileDevice() || prefersReducedMotion()) {
			setShouldRender(false);
		}
	}, []);

	const cleanup = useCallback(() => {
		if (animationIdRef.current) {
			cancelAnimationFrame(animationIdRef.current);
			animationIdRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (!shouldRender || !containerRef.current) return;

		const isMobile = isMobileDevice();
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		// Limit pixel ratio for performance (max 2)
		const pixelRatio = Math.min(window.devicePixelRatio, 2);
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: !isMobile, // Disable antialiasing on mobile
			powerPreference: "low-power",
		});

		sceneRef.current = scene;
		cameraRef.current = camera;
		rendererRef.current = renderer;

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(pixelRatio);
		const container = containerRef.current;
		container.appendChild(renderer.domElement);

		// Reduced particle count for better performance
		const particleCount = isMobile ? 40 : 80;
		const particles = new THREE.BufferGeometry();
		const coords = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount; i++) {
			coords[i * 3] = (Math.random() - 0.5) * 10;
			coords[i * 3 + 1] = (Math.random() - 0.5) * 10;
			coords[i * 3 + 2] = (Math.random() - 0.5) * 10;

			velocities[i * 3] = (Math.random() - 0.5) * 0.008;
			velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
			velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
		}

		particles.setAttribute("position", new THREE.BufferAttribute(coords, 3));

		const pMaterial = new THREE.PointsMaterial({
			color: "#2563eb",
			size: 0.05,
			transparent: true,
			opacity: 0.8,
		});

		const particleSystem = new THREE.Points(particles, pMaterial);
		scene.add(particleSystem);
		particlesRef.current = particleSystem;

		// Connections (Lines)
		const lineMaterial = new THREE.LineBasicMaterial({
			color: "#3b82f6",
			transparent: true,
			opacity: 0.2,
		});
		const lineGeometry = new THREE.BufferGeometry();
		const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
		scene.add(lineMesh);
		linesRef.current = lineMesh;

		camera.position.z = 5;

		// Pre-allocate array for line positions to reduce GC pressure
		const maxLines = (particleCount * (particleCount - 1)) / 2;
		const linePositionsArray = new Float32Array(maxLines * 6);
		const connectionDistance = isMobile ? 2.0 : 2.5;

		let frameCount = 0;
		const frameSkip = isMobile ? 2 : 1; // Skip frames on mobile

		const animate = () => {
			if (!isVisibleRef.current) {
				animationIdRef.current = requestAnimationFrame(animate);
				return;
			}

			frameCount++;
			if (frameCount % frameSkip !== 0) {
				animationIdRef.current = requestAnimationFrame(animate);
				return;
			}

			const positions = particles.attributes.position.array as Float32Array;
			let lineIndex = 0;

			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += velocities[i * 3];
				positions[i * 3 + 1] += velocities[i * 3 + 1];
				positions[i * 3 + 2] += velocities[i * 3 + 2];

				// Bounce off boundaries
				if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
				if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
				if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

				// Connect points (use squared distance to avoid sqrt)
				for (let j = i + 1; j < particleCount; j++) {
					const dx = positions[i * 3] - positions[j * 3];
					const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
					const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
					const distSq = dx * dx + dy * dy + dz * dz;

					if (distSq < connectionDistance * connectionDistance) {
						linePositionsArray[lineIndex++] = positions[i * 3];
						linePositionsArray[lineIndex++] = positions[i * 3 + 1];
						linePositionsArray[lineIndex++] = positions[i * 3 + 2];
						linePositionsArray[lineIndex++] = positions[j * 3];
						linePositionsArray[lineIndex++] = positions[j * 3 + 1];
						linePositionsArray[lineIndex++] = positions[j * 3 + 2];
					}
				}
			}

			particles.attributes.position.needsUpdate = true;

			// Update line geometry with only the used portion
			const usedPositions = linePositionsArray.slice(0, lineIndex);
			lineGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(usedPositions, 3),
			);

			particleSystem.rotation.y += 0.0008;
			lineMesh.rotation.y += 0.0008;

			renderer.render(scene, camera);
			animationIdRef.current = requestAnimationFrame(animate);
		};

		// Only add mouse tracking on desktop
		const onMouseMove = isMobile
			? null
			: (event: MouseEvent) => {
					const x = (event.clientX / window.innerWidth) * 2 - 1;
					const y = -(event.clientY / window.innerHeight) * 2 + 1;
					if (cameraRef.current) {
						cameraRef.current.position.x +=
							(x - cameraRef.current.position.x) * 0.03;
						cameraRef.current.position.y +=
							(y - cameraRef.current.position.y) * 0.03;
						cameraRef.current.lookAt(scene.position);
					}
				};

		// Visibility API to pause when tab is not visible
		const handleVisibilityChange = () => {
			isVisibleRef.current = document.visibilityState === "visible";
		};

		if (onMouseMove) {
			window.addEventListener("mousemove", onMouseMove);
		}
		document.addEventListener("visibilitychange", handleVisibilityChange);
		animate();

		return () => {
			cleanup();
			if (onMouseMove) {
				window.removeEventListener("mousemove", onMouseMove);
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
			renderer.dispose();
		};
	}, [shouldRender, cleanup]);

	useEffect(() => {
		if (!shouldRender) return;

		const handleResize = () => {
			const container = containerRef.current;
			if (!container) return;

			const camera = cameraRef.current;
			const renderer = rendererRef.current;

			if (camera && renderer) {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [shouldRender]);

	// Don't render anything on mobile or if reduced motion is preferred
	if (!shouldRender) {
		return null;
	}

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 z-0 flex items-center justify-center"
			style={{
				pointerEvents: "none",
				height: "100vh",
				width: "100vw",
				overflow: "hidden",
			}}
		/>
	);
}

export default GeometricBackground;
