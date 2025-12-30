import { useEffect, useRef } from "react";
import * as THREE from "three";

function GeometricBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const particlesRef = useRef<THREE.Points | null>(null);
	const linesRef = useRef<THREE.LineSegments | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

		sceneRef.current = scene;
		cameraRef.current = camera;
		rendererRef.current = renderer;

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		const container = containerRef.current;
		container.appendChild(renderer.domElement);

		// Plexus Geometry
		const particleCount = 120;
		const particles = new THREE.BufferGeometry();
		const coords = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount; i++) {
			coords[i * 3] = (Math.random() - 0.5) * 10;
			coords[i * 3 + 1] = (Math.random() - 0.5) * 10;
			coords[i * 3 + 2] = (Math.random() - 0.5) * 10;

			velocities[i * 3] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
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

		const animate = () => {
			requestAnimationFrame(animate);

			const positions = particles.attributes.position.array as Float32Array;
			const linePositions = [];

			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] += velocities[i * 3];
				positions[i * 3 + 1] += velocities[i * 3 + 1];
				positions[i * 3 + 2] += velocities[i * 3 + 2];

				// Bounce off boundaries
				if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
				if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
				if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

				// Connect points
				for (let j = i + 1; j < particleCount; j++) {
					const dx = positions[i * 3] - positions[j * 3];
					const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
					const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
					const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

					if (dist < 2.5) {
						linePositions.push(
							positions[i * 3],
							positions[i * 3 + 1],
							positions[i * 3 + 2],
						);
						linePositions.push(
							positions[j * 3],
							positions[j * 3 + 1],
							positions[j * 3 + 2],
						);
					}
				}
			}

			particles.attributes.position.needsUpdate = true;
			lineGeometry.setAttribute(
				"position",
				new THREE.BufferAttribute(new Float32Array(linePositions), 3),
			);

			particleSystem.rotation.y += 0.001;
			lineMesh.rotation.y += 0.001;

			renderer.render(scene, camera);
		};

		const onMouseMove = (event: MouseEvent) => {
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;
			if (cameraRef.current) {
				cameraRef.current.position.x +=
					(x - cameraRef.current.position.x) * 0.05;
				cameraRef.current.position.y +=
					(y - cameraRef.current.position.y) * 0.05;
				cameraRef.current.lookAt(scene.position);
			}
		};

		window.addEventListener("mousemove", onMouseMove);
		animate();

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
		};
	}, []);

	useEffect(() => {
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
	}, []);

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
