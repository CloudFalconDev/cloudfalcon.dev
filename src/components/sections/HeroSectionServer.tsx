// Server component - renders hero text immediately for LCP
export default function HeroSectionServer() {
	const firstTagline = "Ship faster with IaC in the same language you use";

	return (
		<section className="w-full py-20 md:py-28 relative overflow-hidden bg-transparent">
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
									<span>{firstTagline}</span>
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
