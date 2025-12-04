import { useEffect, useRef } from "react";
import * as THREE from "three";

function GeometricBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({ alpha: true });

		sceneRef.current = scene;
		cameraRef.current = camera;
		rendererRef.current = renderer;

		renderer.setSize(window.innerWidth, window.innerHeight);
		const container = containerRef.current;
		container.appendChild(renderer.domElement);

		const geometry = new THREE.IcosahedronGeometry(2, 1);
		const material = new THREE.MeshPhongMaterial({
			color: "#3b82f6",
			wireframe: true,
			transparent: true,
			opacity: 0.9,
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const light = new THREE.DirectionalLight("#60a5fa", 1);
		light.position.set(0, 0, 2);
		scene.add(light);
		scene.add(new THREE.AmbientLight("#1e293b", 0.5));

		camera.position.z = 1; // Adjust depth
		camera.position.y = 0; // Center vertically
		camera.position.x = 0; // Center horizontally

		mesh.position.set(0, 0, 0); // Center the mesh

		const animate = () => {
			requestAnimationFrame(animate);
			mesh.rotation.x += 0.001;
			mesh.rotation.y += 0.002;
			renderer.render(scene, camera);
		};

		const onMouseMove = (event: MouseEvent) => {
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;
			mesh.rotation.x = y * 0.3;
			mesh.rotation.y = x * 0.3;
		};

		window.addEventListener("mousemove", onMouseMove);
		animate();

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			if (container) {
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
