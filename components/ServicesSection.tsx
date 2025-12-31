"use client";
import { motion } from "framer-motion";
import { ChevronRight, Cpu } from "lucide-react";
import { serviceDetails } from "@/data/serviceDetails";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useIsMobile";

export default function ServicesSection() {
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();
	const shouldAnimate = !isMobile && !prefersReducedMotion;

	// Duplicate for marquee effect
	const marqueeServices = [...serviceDetails, ...serviceDetails];

	return (
		<section
			id="services"
			className="w-full py-20 bg-white relative overflow-hidden border-b border-slate-100"
		>
			{/* Background technical grid */}
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="relative z-10">
				<div className="container px-4 md:px-6 max-w-7xl mx-auto mb-16 text-center">
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-px bg-blue-600" />
							<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
								Core_Capabilities
							</span>
							<div className="w-10 h-px bg-blue-600" />
						</div>
						<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 font-mono uppercase">
							<span className="text-slate-400 opacity-50">0x01</span>{" "}
							Engineering Core
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
						{marqueeServices.map((service, idx) => (
							<div
								key={`${service.title}-${idx}`}
								className="flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] w-[320px] shrink-0 hover:shadow-2xl hover:border-blue-400 transition-all duration-500 group/card relative overflow-hidden"
							>
								{/* Metadata Header */}
								<div className="w-full flex justify-between items-start mb-10 font-mono text-[9px] text-slate-400">
									<span className="uppercase tracking-widest text-blue-600 font-bold tracking-[0.2em]">
										Cap_0x0{(idx % serviceDetails.length) + 1}
									</span>
									<div className="flex gap-1">
										<div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
										<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
									</div>
								</div>

								<div className="flex-1">
									<div className="mb-10 p-6 rounded-[1.5rem] bg-blue-50 text-blue-600 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all duration-700 inline-block shadow-sm">
										<div className="scale-150">{service.icon}</div>
									</div>

									<h3 className="text-xl font-bold mb-4 font-mono tracking-tight text-slate-900 group-hover/card:text-blue-600 transition-colors uppercase">
										{service.title}
									</h3>

									<p className="text-[11px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight line-clamp-3">
										{service.description}
									</p>
								</div>

								<div className="mt-10 w-full pt-8 border-t border-slate-50 flex justify-between items-center">
									<div className="flex flex-col">
										<span className="text-[8px] font-mono uppercase tracking-widest text-slate-400 mb-1 font-bold">
											Impact
										</span>
										<span className="text-3xl font-bold font-mono text-blue-600">
											{service.stats.value}
										</span>
									</div>
									<div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover/card:text-blue-600 transition-colors">
										<ChevronRight className="w-5 h-5" />
									</div>
								</div>

								{/* Decorative Corner Accent */}
								<div className="absolute -bottom-2 -right-2 opacity-0 group-hover/card:opacity-5 transition-opacity text-blue-600">
									<Cpu className="w-24 h-24 rotate-12" />
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
