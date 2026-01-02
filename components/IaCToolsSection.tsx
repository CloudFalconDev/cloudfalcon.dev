"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarqueeSection from "@/components/MarqueeSection";
import { iacTools } from "@/data/iacTools";

export default function IaCToolsSection() {
	// Duplicate tools for seamless loop
	const marqueeTools = [...iacTools, ...iacTools];

	return (
		<section
			id="iac-tools"
			className="w-full py-20 bg-white relative overflow-hidden border-b border-slate-100"
		>
			{/* Techy Grid Pattern */}
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="relative z-10">
				<div className="container px-4 md:px-6 max-w-6xl mx-auto mb-16 text-center">
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-px bg-blue-600" />
							<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
								Technical_Schematic
							</span>
							<div className="w-10 h-px bg-blue-600" />
						</div>
						<h2
							id="iac-tools-heading"
							className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 font-mono uppercase"
						>
							<span className="text-slate-400 opacity-50">0x03</span> IaC
							Ecosystem
						</h2>
					</div>
				</div>

				{/* Marquee Container */}
				<MarqueeSection>
					{marqueeTools.map((tool, idx) => (
						<div
							key={`${tool.name}-${idx}`}
							className="flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] w-[320px] shrink-0 hover:shadow-2xl hover:border-blue-400 transition-all duration-500 group/card relative overflow-hidden"
						>
							{/* Metadata Header */}
							<div className="w-full flex justify-between items-start mb-10 font-mono text-[9px] text-slate-400">
								<span className="uppercase tracking-widest text-blue-600 font-bold tracking-[0.2em]">
									Tool_0x0{(idx % iacTools.length) + 1}
								</span>
								<div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
							</div>

							<Link
								href={tool.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center w-full h-full"
							>
								<div className="h-24 w-full flex items-center justify-center mb-10 relative">
									<div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full scale-0 group-hover/card:scale-100 transition-transform duration-500" />
									<Image
										src={`/img/${tool.image}`}
										alt={tool.name}
										width={180}
										height={72}
										loading="lazy"
										sizes="(max-width: 768px) 160px, 180px"
										className="max-h-20 w-auto object-contain relative z-10 grayscale group-hover/card:grayscale-0 transition-all duration-500 group-hover/card:scale-125"
									/>
								</div>
								<h3 className="text-xl font-bold mb-4 text-slate-900 font-mono uppercase tracking-tight text-center">
									{tool.name}
								</h3>
								<p className="text-slate-500 text-[11px] leading-relaxed font-bold uppercase tracking-tight line-clamp-2 text-center">
									{tool.description}
								</p>

								<div className="mt-auto pt-8 w-full border-t border-slate-50 flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-widest">
									<span className="flex items-center gap-1.5 font-bold text-blue-600">
										Active
									</span>
									<div className="p-1 bg-blue-50 rounded text-blue-600 opacity-0 group-hover/card:opacity-100 transition-opacity">
										<ChevronRight className="w-4 h-4" />
									</div>
								</div>
							</Link>
						</div>
					))}
				</MarqueeSection>
			</div>
		</section>
	);
}
