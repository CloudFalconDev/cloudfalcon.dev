"use client";

import type { LucideIcon } from "lucide-react";
import CountUp from "react-countup";
import { usePrefersReducedMotion } from "@/lib/useIsMobile";

interface TelemetryCardProps {
	id: string;
	icon: LucideIcon;
	value: number;
	label: string;
	suffix?: string;
	prefix?: string;
}

export default function TelemetryCard({
	id,
	icon: Icon,
	value,
	label,
	suffix = "",
	prefix = "",
}: TelemetryCardProps) {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<div className="flex flex-col items-center p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] relative group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1">
			<div className="absolute top-4 right-8 font-mono text-[9px] text-slate-300 tracking-widest font-bold uppercase">
				{id}
			</div>
			<Icon className="h-12 w-12 text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500" />
			<div className="flex items-baseline gap-1">
				{prefix && (
					<span className="text-2xl font-bold text-blue-600 font-mono">
						{prefix}
					</span>
				)}
				{prefersReducedMotion ? (
					<span className="text-5xl font-bold text-slate-900 font-mono tracking-tighter">
						{value}
					</span>
				) : (
					<CountUp
						end={value}
						className="text-5xl font-bold text-slate-900 font-mono tracking-tighter"
						duration={2}
						enableScrollSpy
						scrollSpyOnce
					/>
				)}
				{suffix && (
					<span className="text-2xl font-bold text-blue-600 font-mono">
						{suffix}
					</span>
				)}
			</div>
			<p className="text-slate-500 mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em]">
				{label}
			</p>
			<div className="mt-8 w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
				<div className="h-full bg-blue-600 w-[60%] group-hover:w-full transition-all duration-1000" />
			</div>
		</div>
	);
}
