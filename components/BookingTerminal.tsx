"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Calendar,
	ChevronDown,
	Clock,
	Rocket,
	Sparkles,
	Terminal,
	Video,
	Zap,
} from "lucide-react";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useIsMobile";

const BOOT_SEQUENCE = [
	"[SYS] Initializing quantum_scheduler_v4.2...",
	"[NET] Establishing encrypted_tunnel via TLS 1.3...",
	"[CAL] Syncing with orchestration_calendar...",
	"[RDY] Channel open. Select your slot...",
];

export default function BookingTerminal() {
	const [isOpen, setIsOpen] = useState(false);
	const [isBooting, setIsBooting] = useState(false);
	const [bootLine, setBootLine] = useState(0);
	const [calendlyReady, setCalendlyReady] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();

	const initCalendly = useCallback(() => {
		if (window.Calendly && containerRef.current && isOpen) {
			containerRef.current.innerHTML = "";
			window.Calendly.initInlineWidget({
				url: "https://calendly.com/mohammed-cloudfalcon/30min",
				parentElement: containerRef.current,
				resize: true,
				pageSettings: {
					backgroundColor: "ffffff",
					hideEventTypeDetails: true,
					hideLandingPageDetails: true,
					primaryColor: "2563eb",
					textColor: "0f172a",
				},
			});
			setTimeout(() => {
				setIsBooting(false);
				setCalendlyReady(true);
			}, 800);
		}
	}, [isOpen]);

	const handleToggle = () => {
		if (!isOpen) {
			setIsOpen(true);
			setIsBooting(true);
			setBootLine(0);
			setCalendlyReady(false);
		} else {
			setIsOpen(false);
			setIsBooting(false);
			setCalendlyReady(false);
		}
	};

	// Boot sequence animation
	useEffect(() => {
		if (isBooting && bootLine < BOOT_SEQUENCE.length) {
			const timer = setTimeout(
				() => {
					setBootLine((prev) => prev + 1);
				},
				prefersReducedMotion ? 100 : 300,
			);
			return () => clearTimeout(timer);
		}
		if (isBooting && bootLine >= BOOT_SEQUENCE.length) {
			initCalendly();
		}
		return undefined;
	}, [isBooting, bootLine, initCalendly, prefersReducedMotion]);

	// Initialize Calendly when script loads and panel is open
	useEffect(() => {
		if (window.Calendly && isOpen && !calendlyReady && !isBooting) {
			initCalendly();
		}
	}, [isOpen, calendlyReady, isBooting, initCalendly]);

	return (
		<section className="w-full py-8 md:py-12 relative overflow-hidden">
			<Script
				src="https://assets.calendly.com/assets/external/widget.js"
				strategy="lazyOnload"
				onLoad={() => {
					if (isOpen && !calendlyReady) {
						initCalendly();
					}
				}}
			/>

			{/* Background glow effect */}
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-transparent opacity-50" />

			<div className="container px-4 md:px-6 max-w-5xl mx-auto relative">
				{/* Main CTA Card */}
				<div
					className={`relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
						isOpen
							? "bg-slate-900 shadow-2xl shadow-slate-900/50"
							: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01]"
					}`}
				>
					{/* Decorative elements when closed */}
					{!isOpen && (
						<>
							<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
							<div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
						</>
					)}

					{/* Main Clickable Header */}
					<button
						type="button"
						onClick={handleToggle}
						className="w-full relative z-10 text-left"
						aria-label={
							isOpen ? "Close booking terminal" : "Open booking terminal"
						}
						aria-expanded={isOpen}
					>
						{!isOpen ? (
							/* Expanded CTA when closed */
							<div className="px-6 md:px-12 py-8 md:py-12">
								{/* Top badge */}
								<div className="flex flex-wrap items-center gap-3 mb-6">
									<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 font-mono text-[10px] md:text-xs uppercase tracking-wider border border-white/10">
										<Sparkles className="w-3 h-3 text-yellow-300" />
										Free Consultation
									</span>
									<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 font-mono text-[10px] md:text-xs uppercase tracking-wider border border-green-500/20">
										<span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
										Available Now
									</span>
								</div>

								{/* Main headline */}
								<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
									<div className="flex-1">
										<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
											Book Your <span className="text-yellow-300">Free</span>
											<br />
											<span className="inline-flex items-center gap-3">
												30-Min Call
												<Clock className="w-8 h-8 md:w-10 md:h-10 text-blue-200" />
											</span>
										</h2>
										<p className="text-blue-100 text-sm md:text-base max-w-lg leading-relaxed">
											Get expert advice on cloud architecture, IaC strategy, or
											Kubernetes optimization.
											<span className="text-white font-semibold">
												{" "}
												Zero commitment, real value.
											</span>
										</p>
									</div>

									{/* Big CTA Button */}
									<div className="flex flex-col items-center md:items-end gap-3">
										<div className="group flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white rounded-2xl shadow-xl shadow-black/20 hover:shadow-2xl transition-all hover:scale-105">
											<Rocket className="w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform" />
											<span className="font-bold text-lg md:text-xl text-blue-600 uppercase tracking-wide">
												Schedule Now
											</span>
											<ChevronDown className="w-5 h-5 text-blue-400" />
										</div>
										<span className="font-mono text-[10px] text-blue-200/70 uppercase tracking-wider">
											Click to open scheduler
										</span>
									</div>
								</div>

								{/* Feature pills */}
								<div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/10">
									{[
										{ icon: Video, text: "Video Call" },
										{ icon: Calendar, text: "Pick Your Time" },
										{ icon: Zap, text: "Instant Confirmation" },
									].map(({ icon: Icon, text }) => (
										<span
											key={text}
											className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-xs font-medium"
										>
											<Icon className="w-4 h-4" />
											{text}
										</span>
									))}
								</div>
							</div>
						) : (
							/* Compact header when open */
							<div className="px-4 md:px-6 py-4 flex items-center justify-between border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
								<div className="flex items-center gap-3 md:gap-4">
									<div className="flex gap-1.5">
										<div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
										<div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
										<div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
									</div>
									<div className="flex items-center gap-2">
										<Terminal className="w-4 h-4 text-blue-400" />
										<span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
											30-min free consultation
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<span className="font-mono text-xs text-slate-500 hidden sm:inline">
										Click to close
									</span>
									<motion.div
										animate={{ rotate: 180 }}
										className="text-slate-400"
									>
										<ChevronDown className="w-5 h-5" />
									</motion.div>
								</div>
							</div>
						)}
					</button>

					{/* Expandable Content */}
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
								className="overflow-hidden"
							>
								{/* Boot Sequence / Loading */}
								<AnimatePresence>
									{isBooting && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="bg-slate-950 px-6 py-8 min-h-[150px]"
										>
											<div className="font-mono text-xs space-y-2">
												{BOOT_SEQUENCE.slice(0, bootLine).map((line, i) => (
													<motion.div
														key={line}
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														className={`flex items-start gap-2 ${
															line.includes("[RDY]")
																? "text-green-400"
																: line.includes("[SYS]")
																	? "text-yellow-400"
																	: line.includes("[NET]")
																		? "text-cyan-400"
																		: "text-purple-400"
														}`}
													>
														<span className="opacity-50">{">"}</span>
														<span>{line}</span>
														{i === bootLine - 1 && (
															<span className="animate-pulse">_</span>
														)}
													</motion.div>
												))}
												{bootLine < BOOT_SEQUENCE.length && (
													<div className="flex items-center gap-2 text-slate-500">
														<span className="opacity-50">{">"}</span>
														<span className="w-2 h-4 bg-slate-500 animate-pulse" />
													</div>
												)}
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Calendly Widget Container */}
								<div
									className={`bg-white transition-opacity duration-500 ${
										isBooting ? "opacity-0 h-0" : "opacity-100"
									}`}
								>
									<div
										ref={containerRef}
										className="w-full"
										style={{
											height: isBooting ? 0 : isMobile ? "700px" : "650px",
										}}
									/>
								</div>

								{/* Terminal Footer */}
								<div className="bg-slate-900 px-4 md:px-6 py-3 border-t border-slate-800 flex flex-wrap justify-between items-center gap-2">
									<div className="flex items-center gap-3 md:gap-4">
										<span className="font-mono text-[9px] text-slate-500 flex items-center gap-2 uppercase tracking-tighter">
											<span
												className={`w-1.5 h-1.5 rounded-full ${
													calendlyReady
														? "bg-green-500"
														: isBooting
															? "bg-yellow-500 animate-pulse"
															: "bg-slate-600"
												}`}
											/>
											{calendlyReady
												? "READY"
												: isBooting
													? "LOADING"
													: "STANDBY"}
										</span>
									</div>
									<span className="font-mono text-[9px] text-blue-500/50 uppercase tracking-wider">
										Powered by Calendly
									</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
