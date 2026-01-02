/**
 * Three.js Particle System
 * Extracted logic for geometric background particle animation
 */

import * as THREE from "three";
import { THREE_CONFIG } from "@/lib/constants";
import { isMobileDevice } from "@/lib/device";

export interface ParticleSystemConfig {
	container: HTMLDivElement;
	onCleanup?: () => void;
}

export interface ParticleSystemRefs {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
	particles: THREE.Points;
	lines: THREE.LineSegments;
	animationId: number | null;
	isVisible: boolean;
}

/**
 * Initialize Three.js scene with particles and connections
 */
export function initParticleSystem({
	container,
}: ParticleSystemConfig): ParticleSystemRefs {
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
		antialias: !isMobile,
		powerPreference: "low-power",
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(pixelRatio);
	container.appendChild(renderer.domElement);

	// Create particles
	const particleCount = isMobile
		? THREE_CONFIG.particleCount.mobile
		: THREE_CONFIG.particleCount.desktop;
	const particles = createParticles(particleCount);
	const particleSystem = new THREE.Points(
		particles.geometry,
		particles.material,
	);
	scene.add(particleSystem);

	// Create connections
	const lines = createConnections(particleCount);
	scene.add(lines.mesh);

	camera.position.z = 5;

	return {
		scene,
		camera,
		renderer,
		particles: particleSystem,
		lines: lines.mesh,
		animationId: null,
		isVisible: true,
	};
}

/**
 * Create particle geometry and material
 */
function createParticles(count: number) {
	const geometry = new THREE.BufferGeometry();
	const coords = new Float32Array(count * 3);
	const velocities = new Float32Array(count * 3);

	for (let i = 0; i < count; i++) {
		coords[i * 3] = (Math.random() - 0.5) * 10;
		coords[i * 3 + 1] = (Math.random() - 0.5) * 10;
		coords[i * 3 + 2] = (Math.random() - 0.5) * 10;

		velocities[i * 3] = (Math.random() - 0.5) * 0.008;
		velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
		velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
	}

	geometry.setAttribute("position", new THREE.BufferAttribute(coords, 3));

	const material = new THREE.PointsMaterial({
		color: "#2563eb",
		size: 0.05,
		transparent: true,
		opacity: 0.8,
	});

	return { geometry, material, velocities };
}

/**
 * Create line connections between particles
 */
function createConnections(_particleCount: number) {
	const material = new THREE.LineBasicMaterial({
		color: "#3b82f6",
		transparent: true,
		opacity: 0.2,
	});
	const geometry = new THREE.BufferGeometry();
	const mesh = new THREE.LineSegments(geometry, material);

	return { mesh, geometry };
}

/**
 * Animate particle system
 */
export function animateParticleSystem(
	refs: ParticleSystemRefs,
	velocities: Float32Array,
): void {
	const isMobile = isMobileDevice();
	const particleCount = isMobile
		? THREE_CONFIG.particleCount.mobile
		: THREE_CONFIG.particleCount.desktop;
	const connectionDistance = isMobile
		? THREE_CONFIG.connectionDistance.mobile
		: THREE_CONFIG.connectionDistance.desktop;
	const frameSkip = isMobile
		? THREE_CONFIG.frameSkip.mobile
		: THREE_CONFIG.frameSkip.desktop;

	let frameCount = 0;
	const maxLines = (particleCount * (particleCount - 1)) / 2;
	const linePositionsArray = new Float32Array(maxLines * 6);

	const animate = () => {
		if (!refs.isVisible) {
			refs.animationId = requestAnimationFrame(animate);
			return;
		}

		frameCount++;
		if (frameCount % frameSkip !== 0) {
			refs.animationId = requestAnimationFrame(animate);
			return;
		}

		const positionAttr = refs.particles.geometry.attributes.position;
		if (!positionAttr) return;
		const positions = positionAttr.array as Float32Array;
		let lineIndex = 0;

		// Update particle positions
		for (let i = 0; i < particleCount; i++) {
			const idx3 = i * 3;
			const velIdx3 = i * 3;
			const posX = positions[idx3];
			const posY = positions[idx3 + 1];
			const posZ = positions[idx3 + 2];
			const velX = velocities[velIdx3];
			const velY = velocities[velIdx3 + 1];
			const velZ = velocities[velIdx3 + 2];

			if (
				posX === undefined ||
				posY === undefined ||
				posZ === undefined ||
				velX === undefined ||
				velY === undefined ||
				velZ === undefined
			)
				continue;

			positions[idx3] = posX + velX;
			positions[idx3 + 1] = posY + velY;
			positions[idx3 + 2] = posZ + velZ;

			// Bounce off boundaries
			if (Math.abs(positions[idx3]) > 5 && velocities[velIdx3])
				velocities[velIdx3] *= -1;
			if (Math.abs(positions[idx3 + 1]) > 5 && velocities[velIdx3 + 1])
				velocities[velIdx3 + 1] *= -1;
			if (Math.abs(positions[idx3 + 2]) > 5 && velocities[velIdx3 + 2])
				velocities[velIdx3 + 2] *= -1;

			// Connect points (use squared distance to avoid sqrt)
			for (let j = i + 1; j < particleCount; j++) {
				const jdx3 = j * 3;
				const jPosX = positions[jdx3];
				const jPosY = positions[jdx3 + 1];
				const jPosZ = positions[jdx3 + 2];

				if (jPosX === undefined || jPosY === undefined || jPosZ === undefined)
					continue;

				const dx = positions[idx3] - jPosX;
				const dy = positions[idx3 + 1] - jPosY;
				const dz = positions[idx3 + 2] - jPosZ;
				const distSq = dx * dx + dy * dy + dz * dz;

				if (distSq < connectionDistance * connectionDistance) {
					linePositionsArray[lineIndex++] = positions[idx3];
					linePositionsArray[lineIndex++] = positions[idx3 + 1];
					linePositionsArray[lineIndex++] = positions[idx3 + 2];
					linePositionsArray[lineIndex++] = jPosX;
					linePositionsArray[lineIndex++] = jPosY;
					linePositionsArray[lineIndex++] = jPosZ;
				}
			}
		}

		positionAttr.needsUpdate = true;

		// Update line geometry
		const usedPositions = linePositionsArray.slice(0, lineIndex);
		refs.lines.geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(usedPositions, 3),
		);

		refs.particles.rotation.y += 0.0008;
		refs.lines.rotation.y += 0.0008;

		refs.renderer.render(refs.scene, refs.camera);
		refs.animationId = requestAnimationFrame(animate);
	};

	animate();
}

/**
 * Cleanup Three.js resources
 */
export function cleanupParticleSystem(
	refs: ParticleSystemRefs,
	container: HTMLDivElement,
): void {
	if (refs.animationId) {
		cancelAnimationFrame(refs.animationId);
		refs.animationId = null;
	}

	if (container && refs.renderer.domElement) {
		container.removeChild(refs.renderer.domElement);
	}

	refs.renderer.dispose();
	refs.particles.geometry.dispose();
	if (Array.isArray(refs.particles.material)) {
		for (const mat of refs.particles.material) {
			mat.dispose();
		}
	} else {
		refs.particles.material.dispose();
	}
	refs.lines.geometry.dispose();
	if (Array.isArray(refs.lines.material)) {
		for (const mat of refs.lines.material) {
			mat.dispose();
		}
	} else {
		refs.lines.material.dispose();
	}
}
