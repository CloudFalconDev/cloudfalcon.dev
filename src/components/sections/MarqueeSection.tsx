"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ANIMATION_DURATION, COMPONENT_SIZES } from "@/lib/constants";

interface MarqueeSectionProps {
	children: ReactNode;
	className?: string;
}

/**
 * Shared marquee component for horizontal scrolling animations
 * Used by ServicesSection, PlatformsSection, IaCToolsSection, IntegrationsSection
 */
export default function MarqueeSection({
	children,
	className = "",
}: MarqueeSectionProps) {
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();
	const shouldAnimate = !isMobile && !prefersReducedMotion;

	return (
		<div
			className={`flex overflow-hidden ${
				shouldAnimate ? "group" : "overflow-x-auto"
			} ${className}`}
		>
			<motion.div
				className="flex gap-8 px-4"
				animate={shouldAnimate ? { x: ["0%", "-50%"] } : undefined}
				transition={
					shouldAnimate
						? {
								duration: ANIMATION_DURATION.marquee / 1000, // Convert to seconds
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							}
						: undefined
				}
			>
				{children}
			</motion.div>
		</div>
	);
}

/**
 * Marquee card wrapper component
 * Provides consistent styling for marquee items
 */
export function MarqueeCard({
	children,
	className = "",
	...props
}: {
	children: ReactNode;
	className?: string;
	[key: string]: unknown;
}) {
	return (
		<div
			className={`flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] shrink-0 hover:shadow-2xl hover:border-blue-400 transition-all duration-500 group/card relative overflow-hidden ${className}`}
			style={{ width: `${COMPONENT_SIZES.marqueeCard}px` }}
			{...props}
		>
			{children}
		</div>
	);
}
