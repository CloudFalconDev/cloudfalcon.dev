"use client";

import { BookOpen, Library } from "lucide-react";
import Link from "next/link";

export default function MainNav() {
	return (
		<nav
			className="hidden md:flex items-center gap-2 bg-slate-900/5 backdrop-blur-sm border border-slate-900/10 shadow-inner px-2 py-1 rounded-full"
			aria-label="Main navigation"
		>
			<Link
				className="px-5 py-2 text-[11px] font-mono font-bold text-slate-500 hover:text-blue-600 transition-all rounded-full hover:bg-white/50 flex items-center gap-3 group min-h-[48px]"
				href="/blog"
				aria-label="Go to blog"
			>
				<div className="relative" aria-hidden="true">
					<div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
					<BookOpen className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors relative z-10" />
				</div>
				<span className="relative z-10">Blog</span>
				<span
					className="text-blue-500 opacity-30 group-hover:opacity-100 transition-opacity ml-1"
					aria-hidden="true"
				>
					0x01
				</span>
			</Link>

			<div className="w-px h-4 bg-slate-900/10 mx-1" />

			<Link
				className="px-5 py-2 text-[11px] font-mono font-bold text-slate-500 hover:text-blue-600 transition-all rounded-full hover:bg-white/50 flex items-center gap-3 group min-h-[48px]"
				href="/docs"
				aria-label="Go to documentation"
			>
				<div className="relative" aria-hidden="true">
					<div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
					<Library className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors relative z-10" />
				</div>
				<span className="relative z-10">Docs</span>
				<span
					className="text-blue-500 opacity-30 group-hover:opacity-100 transition-opacity ml-1"
					aria-hidden="true"
				>
					0x02
				</span>
			</Link>
		</nav>
	);
}
