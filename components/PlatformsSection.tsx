"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { platforms } from "@/data/platforms";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useIsMobile";

export default function PlatformsSection() {
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();
	const shouldAnimate = !isMobile && !prefersReducedMotion;

	// Duplicate platforms for seamless loop
	const marqueePlatforms = [...platforms, ...platforms];

	return (
		<section
			id="cloud-platforms"
			className="w-full py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100"
		>
			{/* Techy Grid Pattern */}
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="relative z-10">
				<div className="container px-4 md:px-6 max-w-6xl mx-auto mb-16 text-center">
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-px bg-blue-600" />
							<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
								Environment_Context
							</span>
							<div className="w-10 h-px bg-blue-600" />
						</div>
						<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 font-mono uppercase">
							<span className="text-slate-400 opacity-50">0x02</span> Cloud
							Platforms
						</h2>
					</div>
				</div>

				{/* Marquee Container */}
				<div
					className={`flex overflow-hidden ${shouldAnimate ? "group" : "overflow-x-auto"}`}
				>
					<motion.div
						className="flex gap-8 px-4"
						animate={shouldAnimate ? { x: ["0%", "-50%"] } : undefined}
						transition={
							shouldAnimate
								? {
										duration: 40,
										ease: "linear",
										repeat: Number.POSITIVE_INFINITY,
									}
								: undefined
						}
					>
						{marqueePlatforms.map((platform, idx) => (
							<Link
								key={`${platform.name}-${idx}`}
								href={platform.href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] w-[320px] shrink-0 hover:shadow-2xl hover:border-blue-400 transition-all duration-500 group/card relative overflow-hidden"
							>
								{/* Metadata Header */}
								<div className="w-full flex justify-between items-start mb-10 font-mono text-[9px] text-slate-400">
									<span className="uppercase tracking-widest text-blue-600 font-bold tracking-[0.2em]">
										Node_0x0{(idx % platforms.length) + 1}
									</span>
									<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
								</div>

								<div className="flex-1 flex flex-col items-center justify-center">
									<div className="h-24 w-full flex items-center justify-center mb-10">
										<Image
											src={platform.logo}
											alt={platform.alt}
											width={180}
											height={72}
											className="max-h-20 w-auto object-contain grayscale group-hover/card:grayscale-0 transition-all duration-500 scale-110 group-hover/card:scale-125"
										/>
									</div>
									<div className="w-full h-px bg-slate-50 mb-8" />
									<p className="text-slate-500 text-[11px] leading-relaxed font-bold uppercase tracking-tight line-clamp-3 text-center">
										{platform.description}
									</p>
								</div>
							</Link>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
