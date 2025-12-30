"use client";

import { BookOpen, Library, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleContactClick } from "@/lib/contact";
import MainNav from "./MainNav";

export default function Header({
	MainNavComponent = MainNav,
}: {
	MainNavComponent?: React.ComponentType;
}) {
	return (
		<header className="sticky top-0 z-50 w-full py-4 px-4 pointer-events-none">
			<div className="container max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between bg-white/40 backdrop-blur-md border border-blue-500/10 shadow-2xl shadow-blue-900/5 rounded-2xl pointer-events-auto relative overflow-hidden group">
				{/* Decorative scanning line */}
				<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />

				{/* Brand/Logo - Terminal Style */}
				<Link
					className="flex items-center justify-center group/logo shrink-0"
					href="/"
					aria-label="CloudFalcon Home"
				>
					<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-500 shadow-lg shadow-blue-600/20 group-hover/logo:scale-110 transition-all duration-500">
						<span className="font-mono text-white text-sm font-bold">cf_</span>
					</div>
					<div className="ml-3 flex flex-col -space-y-1">
						<span className="text-lg font-mono font-bold text-slate-900 tracking-tighter">
							cloudfalcon
							<span className="text-blue-600 relative inline-block ml-0.5 group-hover/logo:animate-pulse">
								.dev
								<span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-blue-400 scale-x-0 group-hover/logo:scale-x-100 transition-transform duration-500 origin-left" />
							</span>
						</span>
						<span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
							sys_orchestrator
						</span>
					</div>
				</Link>

				{/* Navigation - Centered (Hidden on mobile) */}
				<MainNavComponent />

				{/* Right side: Contact + Mobile Menu */}
				<div className="flex items-center gap-2 md:gap-4">
					<Button
						onClick={handleContactClick}
						className="hidden sm:flex bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 font-mono text-xs tracking-widest transition-all rounded-xl h-10 px-6 uppercase group/btn border border-blue-500"
					>
						<span className="mr-2 opacity-50">$</span>
						./connect
						<span className="ml-2 w-1 h-3 bg-white animate-pulse" />
					</Button>

					{/* Mobile Menu Trigger */}
					<div className="md:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-xl text-slate-600"
								>
									<Menu className="h-6 w-6" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-56 bg-white p-2 rounded-xl border-blue-50 shadow-2xl"
							>
								<DropdownMenuItem asChild>
									<Link
										href="/blog"
										className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-mono text-xs"
									>
										<BookOpen className="w-4 h-4 text-blue-500" />
										Blog
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/docs"
										className="px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-mono text-xs"
									>
										<Library className="w-4 h-4 text-blue-500" />
										Docs
									</Link>
								</DropdownMenuItem>
								<div className="h-px bg-slate-100 my-2" />
								<DropdownMenuItem asChild>
									<Button
										onClick={handleContactClick}
										className="w-full bg-blue-600 text-white justify-start px-3 font-mono text-[10px] uppercase tracking-widest"
									>
										$ ./connect
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
