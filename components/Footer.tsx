import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<>
			<footer className="w-full py-12 bg-white border-t border-slate-100 relative overflow-hidden">
				{/* Background decorative binary or grid - Lighter for light theme */}
				<div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[10px] text-blue-600 overflow-hidden leading-none break-all">
					{Array(20)
						.fill(
							"0101011010101010101101010101010101010110101010101011010101010101",
						)
						.join("")}
				</div>

				<div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
					<div className="flex flex-col items-center">
						<div className="mb-12 flex flex-col items-center">
							<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">
								Comms_Bus established
							</span>
							<div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
							{[
								{
									name: "X_FEED",
									icon: Twitter,
									href: "https://twitter.com/cloudfalcondev",
								},
								{
									name: "LINKED_IN",
									icon: Linkedin,
									href: "https://linkedin.com/company/cloudfalcondev",
								},
								{
									name: "GIT_HUB",
									icon: Github,
									href: "https://github.com/cloudfalcondev",
								},
								{
									name: "TUBE_SYS",
									icon: Youtube,
									href: "https://youtube.com/@cloudfalcondev",
								},
							].map((social, idx) => (
								<Link
									key={social.name}
									href={social.href}
									target="_blank"
									className="flex flex-col items-center p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-900/[0.03] transition-all duration-500 group"
								>
									<div className="relative mb-4">
										<div className="absolute inset-0 bg-blue-500/10 blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
										<social.icon className="h-7 w-7 text-slate-400 group-hover:text-blue-600 transition-colors relative z-10" />
									</div>
									<span className="font-mono text-[10px] font-bold text-slate-500 group-hover:text-slate-900 tracking-tighter uppercase transition-colors">
										{social.name}
									</span>
									<span className="mt-2 font-mono text-[8px] text-blue-500/40 font-bold tracking-widest">
										0x0{idx + 1}
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</footer>
			<footer className="w-full max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t border-slate-100">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
							[©] 2015-{new Date().getFullYear()} cloudfalcon_ops
							all_rights_reserved
						</p>
						<nav className="sm:ml-auto flex gap-6">
							<Link
								className="text-[10px] font-mono text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-tighter flex items-center gap-1"
								href="#"
							>
								<span className="opacity-30">::</span> TOS
							</Link>
							<Link
								className="text-[10px] font-mono text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-tighter flex items-center gap-1"
								href="#"
							>
								<span className="opacity-30">::</span> PRIVACY
							</Link>
						</nav>
					</div>
					<div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6 text-[10px] text-slate-400 font-mono border-t border-slate-50 pt-4">
						<span className="flex items-center gap-1.5 text-blue-600 font-bold">
							<span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
							STATUS: ONLINE
						</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span>PING: 24ms</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span className="flex items-center gap-1 font-bold text-slate-600">
							<span className="opacity-50">LOC:</span> 🇵🇸 GAZA_PAL ❤️
						</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span className="flex items-center gap-1">
							<span className="opacity-50">LOC:</span> 🇺🇸 NJ_USA
						</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span className="flex items-center gap-1">
							<span className="opacity-50">LOC:</span> 🇪🇬 CAI_EGY
						</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span className="flex items-center gap-1">
							<span className="opacity-50">LOC:</span> 🇪🇸 MAD_ESP
						</span>
						<span className="hidden sm:inline opacity-20">|</span>
						<span className="flex items-center gap-1">
							<span className="opacity-50">LOC:</span> 🇴🇲 MCT_OMN ORG: SAHAB_INV
							(CR_1571037)
						</span>
					</div>
				</div>
			</footer>
		</>
	);
}
