"use client";

import { AnimatePresence, motion } from "framer-motion";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
	interface Window {
		Calendly: any;
	}
}

const SYSTEM_LOGS = [
	"Initializing secure_uplink_protocol...",
	"Establishing tunnel via AES-256-GCM...",
	"Handshaking with orchestration_calendar...",
	"Fetching available_slots from edge_nodes...",
	"Optimizing buffer_latency...",
	"Uplink channel ESTABLISHED.",
];

const CalendlyWidget = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isInitializing, setIsInitializing] = useState(true);
	const [logIndex, setLogIndex] = useState(0);

	const initCalendly = useCallback(() => {
		if (window.Calendly && containerRef.current) {
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
			// Give it a small delay to simulate final handshake
			setTimeout(() => setIsInitializing(false), 1500);
		}
	}, []);

	useEffect(() => {
		if (isInitializing) {
			const timer = setInterval(() => {
				setLogIndex((prev) =>
					prev < SYSTEM_LOGS.length - 1 ? prev + 1 : prev,
				);
			}, 600);
			return () => clearInterval(timer);
		}
	}, [isInitializing]);

	useEffect(() => {
		if (window.Calendly) {
			initCalendly();
		}
	}, [initCalendly]);

	return (
		<div className="w-full">
			<Script
				src="https://assets.calendly.com/assets/external/widget.js"
				strategy="lazyOnload"
				onLoad={initCalendly}
			/>

			<div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden relative group">
				{/* Terminal Header */}
				<div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800 relative z-20">
					<div className="flex gap-2">
						<div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
						<div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
						<div className="w-3 h-3 rounded-full bg-[#27C93F]" />
					</div>
					<div className="flex items-center gap-3">
						<span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em]">
							uplink_session.sh
						</span>
						<div className="flex gap-1">
							<div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
						</div>
					</div>
					<div className="w-12 h-1 bg-slate-800 rounded-full" />
				</div>

				{/* Terminal Content Area */}
				<div className="relative bg-white">
					{/* Scanning Line Animation */}
					<motion.div
						className="absolute inset-x-0 h-[100px] bg-gradient-to-b from-blue-500/5 to-transparent z-10 pointer-events-none"
						animate={{ top: ["-10%", "110%"] }}
						transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
					/>

					{/* Loader / System Logs Overlay */}
					<AnimatePresence>
						{isInitializing && (
							<motion.div
								exit={{ opacity: 0 }}
								className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 p-10"
							>
								<div className="w-full max-w-sm font-mono text-[10px] text-slate-400 space-y-2">
									{SYSTEM_LOGS.slice(0, logIndex + 1).map((log, i) => (
										<div key={i} className="flex gap-3">
											<span className="text-blue-600 shrink-0">[$]</span>
											<span>{log}</span>
										</div>
									))}
									<div className="flex gap-3 animate-pulse">
										<span className="text-blue-600 shrink-0">[_]</span>
										<span className="w-2 h-4 bg-blue-600/50" />
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					<div
						ref={containerRef}
						className="w-full relative z-0 transition-opacity duration-1000"
						style={{ height: "800px", opacity: isInitializing ? 0 : 1 }}
					/>
				</div>

				{/* Terminal Footer */}
				<div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center relative z-20">
					<div className="flex items-center gap-4">
						<span className="font-mono text-[9px] text-slate-400 flex items-center gap-2 uppercase tracking-tighter font-bold">
							<span
								className={`w-1.5 h-1.5 rounded-full ${isInitializing ? "bg-yellow-500" : "bg-green-500"} animate-pulse`}
							/>
							State: {isInitializing ? "Initializing" : "Linked"}
						</span>
						<span className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">
							Uptime: 100%
						</span>
					</div>
					<span className="font-mono text-[9px] text-blue-500/50 uppercase tracking-[0.2em] font-bold">
						orchestrator_node_v4
					</span>
				</div>
			</div>
		</div>
	);
};

export default CalendlyWidget;
