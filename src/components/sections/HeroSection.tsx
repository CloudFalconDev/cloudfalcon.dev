"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Ensure this component renders immediately for LCP

const TAGLINES = [
	"Ship faster with IaC in the same language you use",
	"Kill YAML complexity with Infrastructure as Code",
	"Deploy Zero-Trust environments programmatically",
	"Orchestrate multi-cloud nodes at scale",
	"Reduce cloud burn with automated FinOps",
	"Implement self-healing system modules",
	"Orchestrate Kubernetes with pure TypeScript",
];

export default function HeroSection() {
	const [index, setIndex] = useState(0);
	const isMobile = useIsMobile();
	const prefersReducedMotion = usePrefersReducedMotion();
	const shouldAnimate = !isMobile && !prefersReducedMotion;

	// CRITICAL: Always start with first tagline to ensure LCP element is detected
	const [displayText, setDisplayText] = useState(TAGLINES[0] || "");

	const [isDeleting, setIsDeleting] = useState(false);
	const [speed, setTypingSpeed] = useState(100);
	const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const prevIndexRef = useRef(index);

	// Handle mobile/reduced motion: show static tagline
	useEffect(() => {
		if (!shouldAnimate) {
			setDisplayText(TAGLINES[index] || "");
			setIsDeleting(false);
			return;
		}
	}, [index, shouldAnimate]);

	// Reset animation when index changes
	useEffect(() => {
		if (shouldAnimate && prevIndexRef.current !== index) {
			setDisplayText("");
			setIsDeleting(false);
			setTypingSpeed(100);
			prevIndexRef.current = index;
		}
	}, [index, shouldAnimate]);

	// Handle desktop typing animation - delay to ensure LCP is captured
	useEffect(() => {
		if (!shouldAnimate) {
			return;
		}

		// Wait for LCP to be captured before starting animation
		const initialDelay = setTimeout(() => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			if (pauseTimerRef.current) {
				clearTimeout(pauseTimerRef.current);
				pauseTimerRef.current = null;
			}

			const handleTyping = () => {
				const fullText = TAGLINES[index];
				if (!fullText) return;

				setDisplayText((prev) => {
					if (!isDeleting) {
						const newText = fullText.substring(0, prev.length + 1);
						setTypingSpeed(50);

						if (newText === fullText) {
							pauseTimerRef.current = setTimeout(() => {
								setIsDeleting(true);
							}, 2000);
						}
						return newText;
					} else {
						const newText = prev.substring(0, prev.length - 1);
						setTypingSpeed(30);

						if (newText === "") {
							setIsDeleting(false);
							setIndex((prevIndex) => (prevIndex + 1) % TAGLINES.length);
							return "";
						}
						return newText;
					}
				});
			};

			const delay = displayText === TAGLINES[index] ? 2000 : speed;
			timeoutRef.current = setTimeout(handleTyping, delay);
		}, 1500); // Delay to ensure LCP is captured

		return () => {
			clearTimeout(initialDelay);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			if (pauseTimerRef.current) {
				clearTimeout(pauseTimerRef.current);
				pauseTimerRef.current = null;
			}
		};
	}, [isDeleting, index, speed, shouldAnimate, displayText]);

	// This component enhances the server-rendered hero with animation
	// It's positioned absolutely to overlay the server component
	return (
		<section
			className="w-full py-20 md:py-28 relative overflow-hidden bg-transparent absolute top-0 left-0 right-0 pointer-events-none"
			style={{ display: "none" }}
		>
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />
			<div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
				<div className="flex flex-col items-center space-y-8 text-center">
					<div className="space-y-6 max-w-4xl">
						<div
							className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-mono text-[10px] mb-4 animate-pulse uppercase tracking-widest font-bold shadow-sm"
							aria-live="polite"
						>
							system_ready
						</div>
						<div className="min-h-[180px] md:min-h-[220px] flex flex-col items-center justify-center">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-slate-900 flex flex-col items-center justify-center">
								<span className="block mb-3 font-mono text-xl md:text-2xl uppercase tracking-[0.4em] text-slate-400 font-bold">
									Cloud Orchestration
								</span>
								<span
									className="text-blue-600 font-mono inline-block"
									aria-live="polite"
									aria-atomic="true"
									itemProp="headline"
								>
									<span
										className="text-slate-300 mr-3 opacity-50"
										aria-hidden="true"
									>
										#
									</span>
									<span>{displayText || TAGLINES[index] || TAGLINES[0]}</span>
									{shouldAnimate && displayText && (
										<span
											className="inline-block w-3 h-10 md:w-5 md:h-16 bg-blue-600 ml-2 animate-pulse align-middle"
											aria-hidden="true"
										/>
									)}
								</span>
							</h1>
						</div>
						<div className="relative max-w-2xl mx-auto mt-10">
							<div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-transparent rounded-[2.5rem] blur opacity-20" />
							<p className="relative px-10 py-8 bg-white/60 backdrop-blur-md border border-slate-100 rounded-[2.5rem] text-slate-500 font-mono text-sm md:text-base leading-relaxed shadow-xl shadow-blue-900/[0.02] text-center uppercase tracking-tight font-bold">
								<span className="text-blue-600 mr-2">$</span>
								Orchestrating production automation, security hardening, and
								engineering deep-dives at global scale.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
