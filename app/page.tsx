"use client";

import { motion } from "framer-motion";
import {
	ArrowUpCircle,
	BarChart,
	LineChart,
	Network,
	Server,
} from "lucide-react";
import Image from "next/image";
import { lazy, Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// Hero section - server-rendered for LCP
import HeroSectionServer from "@/components/HeroSectionServer";
import MainNav from "@/components/MainNav";
import ServicesSection from "@/components/ServicesSection";
import TelemetryCard from "@/components/TelemetryCard";
import { Button } from "@/components/ui/button";
import { pipelineSteps } from "@/data/pipelineSteps";
import { handleContactClick } from "@/lib/contact";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useIsMobile";

// Lazy load below-fold components
const BookingTerminal = lazy(() => import("@/components/BookingTerminal"));
const GeometricBackgroundViewport = lazy(
	() => import("@/components/GeometricBackgroundViewport"),
);
const EcosystemAccordion = lazy(
	() => import("@/components/EcosystemAccordion"),
);
const IaCToolsSection = lazy(() => import("@/components/IaCToolsSection"));
const IntegrationsSection = lazy(
	() => import("@/components/IntegrationsSection"),
);
const PlatformsSection = lazy(() => import("@/components/PlatformsSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));

export default function CloudFalconLanding() {
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();
	const shouldAnimate = !isMobile && !prefersReducedMotion;

	return (
		<div className="flex flex-col min-h-screen relative">
			<Suspense fallback={null}>
				<GeometricBackgroundViewport />
			</Suspense>
			<Header MainNavComponent={MainNav} />
			<main className="flex-1 relative z-10">
				{/* 0x00 // HERO - Server-rendered for LCP */}
				<HeroSectionServer />

				<Suspense fallback={null}>
					<BookingTerminal />
				</Suspense>

				<ServicesSection />
				<Suspense fallback={<div className="h-96" />}>
					<PlatformsSection />
				</Suspense>
				<Suspense fallback={<div className="h-96" />}>
					<IaCToolsSection />
				</Suspense>
				<Suspense fallback={<div className="h-96" />}>
					<IntegrationsSection />
				</Suspense>
				<Suspense fallback={<div className="h-96" />}>
					<EcosystemAccordion />
				</Suspense>

				{/* 0x06 // SYSTEM TELEMETRY */}
				<section className="w-full py-20 md:py-24 bg-slate-50 relative overflow-hidden border-y border-slate-100">
					<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />
					<div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
						<div className="flex flex-col items-center mb-20 text-center">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-px bg-blue-600" />
								<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
									Telemetry_Dashboard
								</span>
								<div className="w-10 h-px bg-blue-600" />
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 font-mono uppercase">
								<span className="text-slate-400 opacity-50">0x06</span> System
								Telemetry
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-6 gap-8">
							<div className="md:col-span-2 space-y-8">
								<TelemetryCard
									id="0x06_A"
									icon={ArrowUpCircle}
									value={50}
									label="Optimization"
									suffix="%"
								/>
								<TelemetryCard
									id="0x06_B"
									icon={LineChart}
									value={40}
									label="Opex_Reduction"
									suffix="%"
								/>
							</div>

							<div className="md:col-span-2 p-12 bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-blue-900/[0.05] relative overflow-hidden group flex flex-col justify-center text-center hover:border-blue-400 transition-all duration-500">
								<div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:20px_20px]" />
								<div className="relative z-10">
									<div className="mb-8 p-8 rounded-[2rem] bg-blue-600 shadow-xl shadow-blue-600/20 group-hover:rotate-[360deg] transition-transform duration-1000 inline-block">
										<Network className="h-16 w-14 text-white" />
									</div>
									<h3 className="text-slate-900 font-mono text-xl mb-3 uppercase tracking-tighter font-bold">
										Global Connectivity
									</h3>
									<p className="text-blue-600 font-mono text-[10px] animate-pulse font-bold tracking-widest uppercase">
										Nodes: 100% Online
									</p>
									<div className="mt-12 grid grid-cols-2 gap-8 w-full border-t border-slate-50 pt-10">
										<div>
											<div className="text-4xl font-bold text-slate-900 font-mono tracking-tighter">
												25+
											</div>
											<div className="text-[8px] text-slate-400 font-mono uppercase tracking-[0.4em] mt-2 font-bold">
												Clients
											</div>
										</div>
										<div>
											<div className="text-4xl font-bold text-slate-900 font-mono tracking-tighter">
												50+
											</div>
											<div className="text-[8px] text-slate-400 font-mono uppercase tracking-[0.4em] mt-2 font-bold">
												Projects
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="md:col-span-2 space-y-8">
								<TelemetryCard
									id="0x06_C"
									icon={Server}
									value={1000}
									label="Nodes_Managed"
									prefix=">"
								/>
								<TelemetryCard
									id="0x06_D"
									icon={BarChart}
									value={50}
									label="Velocity"
									suffix="%"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* 0x07 // THE PIPELINE - GitHub Workflow Style */}
				<section
					id="how-we-work"
					className="w-full py-20 md:py-28 bg-white relative overflow-hidden border-b border-slate-200"
				>
					<div className="container px-4 md:px-6 max-w-6xl mx-auto">
						{/* Header */}
						<div className="flex flex-col items-center mb-16 text-center">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-px bg-blue-600" />
								<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
									Workflow
								</span>
								<div className="w-10 h-px bg-blue-600" />
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 font-mono uppercase">
								<span className="text-slate-400 opacity-50">0x07</span> The
								Pipeline
							</h2>
						</div>

						{/* Pipeline Flow */}
						<div className="relative">
							{/* Desktop: Horizontal Pipeline */}
							<div className="hidden lg:flex items-center justify-between relative">
								{/* Connection Line */}
								<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 -translate-y-1/2 z-0" />

								{/* Animated Beats - only on desktop, defer animation */}
								{shouldAnimate &&
									[0, 1, 2].map((i) => (
										<motion.div
											key={i}
											className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full z-10 shadow-lg shadow-blue-500/50"
											initial={false}
											animate={{
												left: ["0%", "100%"],
												scale: [1, 1.2, 1],
											}}
											transition={{
												duration: 3,
												repeat: Number.POSITIVE_INFINITY,
												delay: i * 1,
												ease: "easeInOut",
											}}
										/>
									))}

								{/* Pipeline Steps */}
								{pipelineSteps.map((step, index) => (
									<div
										key={step.id}
										className="relative z-10 flex flex-col items-center"
									>
										{/* Step Card */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.1 }}
											viewport={{ once: true }}
											className="group"
										>
											<div className="bg-white border-2 border-slate-200 rounded-xl p-6 w-48 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
												{/* Status Indicator */}
												<div className="flex items-center justify-between mb-4">
													<span className="text-[10px] font-mono text-slate-400 uppercase">
														Step {index + 1}
													</span>
													<div className="flex items-center gap-1.5">
														<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
														<span className="text-[10px] font-mono text-green-600">
															Active
														</span>
													</div>
												</div>

												{/* Logo */}
												<div className="flex justify-center mb-4">
													<div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
														<Image
															src={step.img}
															alt={`${step.tool} logo`}
															width={40}
															height={40}
															loading="lazy"
															className="group-hover:scale-110 transition-transform"
														/>
													</div>
												</div>

												{/* Tool Name */}
												<h3 className="text-lg font-bold text-slate-900 text-center mb-1">
													{step.tool}
												</h3>
												<p className="text-xs text-slate-500 text-center">
													{step.description}
												</p>
											</div>
										</motion.div>

										{/* Connector Node */}
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full z-20" />
									</div>
								))}
							</div>

							{/* Mobile/Tablet: Vertical Pipeline */}
							<div className="lg:hidden space-y-0">
								{pipelineSteps.map((step, index) => (
									<div key={step.id} className="relative flex items-start">
										{/* Vertical Line */}
										{index < pipelineSteps.length - 1 && (
											<div className="absolute left-6 top-14 bottom-0 w-0.5 bg-slate-300">
												{/* Static dot instead of animated beat on mobile */}
												<div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-2 h-2 bg-blue-500 rounded-full" />
											</div>
										)}

										{/* Node */}
										<div className="relative z-10 w-12 h-12 flex items-center justify-center">
											<div className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full" />
										</div>

										{/* Card */}
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											viewport={{ once: true }}
											className="flex-1 ml-4 mb-8"
										>
											<div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all">
												<div className="flex items-center gap-4">
													<div className="p-2 bg-slate-50 rounded-lg">
														<Image
															src={step.img}
															alt={`${step.tool} logo`}
															width={32}
															height={32}
															loading="lazy"
														/>
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2">
															<h3 className="font-bold text-slate-900">
																{step.tool}
															</h3>
															<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
														</div>
														<p className="text-xs text-slate-500">
															{step.description}
														</p>
													</div>
												</div>
											</div>
										</motion.div>
									</div>
								))}
							</div>
						</div>

						{/* Summary Stats */}
						<div className="mt-16 flex justify-center">
							<div className="inline-flex items-center gap-6 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-green-500" />
									<span className="text-sm text-slate-600">
										All systems operational
									</span>
								</div>
								<div className="w-px h-4 bg-slate-200" />
								<span className="text-sm text-slate-500">4 active jobs</span>
							</div>
						</div>
					</div>
				</section>

				<PricingSection />

				{/* 0x09 // CONTACT */}
				<section
					id="contact"
					className="w-full py-20 md:py-28 bg-blue-600 text-white relative overflow-hidden"
				>
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
					<div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
						<div className="flex flex-col items-center space-y-16 text-center">
							<div className="space-y-6 max-w-3xl">
								<div
									className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.3em] font-bold"
									aria-live="polite"
								>
									uplink_available
								</div>
								<h2 className="text-5xl font-bold tracking-tighter sm:text-8xl font-mono uppercase">
									<span className="text-blue-200 opacity-50">0x09</span> Ready?
								</h2>
							</div>
							<div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12">
								<Button
									className="bg-white text-blue-600 hover:bg-blue-50 px-12 md:px-16 py-8 md:py-10 text-xl md:text-2xl font-bold rounded-[2.5rem] shadow-2xl transition-all font-mono uppercase tracking-[0.2em] min-h-[48px]"
									type="button"
									onClick={handleContactClick}
									aria-label="Connect with CloudFalcon team"
								>
									Connect
								</Button>
								<div className="flex flex-col items-center sm:items-start">
									<span className="text-[10px] uppercase tracking-[0.4em] font-mono mb-3 text-blue-100 font-bold">
										Voice_Protocol
									</span>
									<a
										href="tel:+96890131817"
										className="text-2xl md:text-4xl font-mono font-bold hover:text-white transition-colors tracking-tighter"
										aria-label="Call CloudFalcon at +968 90131817"
									>
										+968 90131817
									</a>
								</div>
							</div>
							<div className="mt-12 md:mt-16 pt-8 border-t border-blue-500/30 w-full max-w-lg mx-auto">
								<p className="font-mono text-[10px] text-blue-100 uppercase tracking-wider text-center mb-4">
									Or schedule directly via the booking terminal above
								</p>
								<div className="flex justify-center gap-4">
									<button
										type="button"
										onClick={() =>
											window.scrollTo({ top: 0, behavior: "smooth" })
										}
										className="font-mono text-xs text-white/80 hover:text-white px-4 py-2 border border-blue-400/30 rounded-lg hover:border-blue-400 transition-all flex items-center gap-2"
										aria-label="Scroll to top of page"
									>
										<span className="text-blue-300" aria-hidden="true">
											$
										</span>
										scroll_to_top()
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
