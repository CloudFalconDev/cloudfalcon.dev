import { CheckCircle } from "lucide-react";
import posthog from "posthog-js";
import { memo } from "react";
import { Button } from "@/components/ui/button";

// Track pricing tier contact click with tier information
function handlePricingContactClick(tier: string, tierName: string) {
	posthog.capture("pricing_tier_contact_clicked", {
		tier_id: tier,
		tier_name: tierName,
		source: "pricing_section",
	});
	document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function PricingSection() {
	return (
		<section
			id="pricing"
			className="w-full py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100"
		>
			{/* Tech Grid Background */}
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
				<div className="flex flex-col items-center mb-20 text-center">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-px bg-blue-600" />
						<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
							Resource_Allocation
						</span>
						<div className="w-10 h-px bg-blue-600" />
					</div>
					<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 font-mono uppercase">
						<span className="text-slate-400 opacity-50">0x08</span> Service
						Tiers
					</h2>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{/* Basic Tier */}
					<div className="flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] relative group hover:border-blue-400/30 transition-all duration-500">
						<div className="absolute top-4 right-8 font-mono text-[10px] text-slate-300 uppercase font-bold tracking-widest">
							Tier_01
						</div>
						<h3 className="text-2xl font-bold mb-2 text-slate-900 font-mono uppercase tracking-tight">
							Standard
						</h3>
						<p className="text-blue-600 font-mono text-[10px] uppercase tracking-widest mb-10 font-bold">
							Optimization & Security Audit
						</p>

						<ul className="space-y-5 mb-12 flex-1">
							{[
								"Infrastructure security hardening",
								"Cloud cost reduction (FinOps)",
								"CI/CD pipeline refactoring",
								"Next-day engineering response",
							].map((item) => (
								<li key={item} className="flex items-start group/item">
									<CheckCircle
										className="h-5 w-5 text-blue-500 mr-3 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110"
										aria-hidden="true"
									/>
									<span className="text-slate-600 text-sm font-bold uppercase tracking-tight leading-relaxed">
										{item}
									</span>
								</li>
							))}
						</ul>

						<div className="pt-8 border-t border-slate-50">
							<Button
								variant="outline"
								className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl py-8 font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-900/5 transition-all min-h-[48px]"
								onClick={() => handlePricingContactClick("tier_01", "Standard")}
								aria-label="Contact us about Standard tier"
							>
								Contact Us
							</Button>
						</div>
					</div>

					{/* Professional Tier */}
					<div className="flex flex-col p-10 bg-blue-600 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.2)] text-white relative scale-105 z-10 border border-blue-400">
						<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl shadow-yellow-400/20 whitespace-nowrap z-20">
							Highly_Recommended
						</div>
						<div className="absolute top-4 right-8 font-mono text-[10px] text-blue-200 uppercase font-bold tracking-widest">
							Tier_02
						</div>

						<h3 className="text-2xl font-bold mb-2 font-mono uppercase tracking-tight">
							Managed
						</h3>
						<p className="text-blue-100 font-mono text-[10px] uppercase tracking-widest mb-10 font-bold">
							Production Orchestration
						</p>

						<ul className="space-y-5 mb-12 flex-1">
							{[
								"Full IaC migration (Terraform/CDK)",
								"Zero-Downtime deployment setup",
								"Advanced observability dashboard",
								"4-hour priority response SLA",
							].map((item) => (
								<li key={item} className="flex items-start">
									<CheckCircle className="h-5 w-5 text-white mr-3 mt-0.5 shrink-0" />
									<span className="text-white text-sm font-bold uppercase tracking-tight leading-relaxed">
										{item}
									</span>
								</li>
							))}
						</ul>

						<div className="pt-8 border-t border-blue-500">
							<Button
								className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-2xl py-8 shadow-xl shadow-blue-900/20 font-mono text-sm font-bold uppercase tracking-[0.2em] transition-transform active:scale-95 min-h-[48px]"
								onClick={() => handlePricingContactClick("tier_02", "Managed")}
								aria-label="Contact us about Managed tier"
							>
								Contact Us
							</Button>
						</div>
					</div>

					{/* Enterprise Tier */}
					<div className="flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-blue-900/[0.02] relative group hover:border-blue-400/30 transition-all duration-500">
						<div className="absolute top-4 right-8 font-mono text-[10px] text-slate-300 uppercase font-bold tracking-widest">
							Tier_03
						</div>
						<h3 className="text-2xl font-bold mb-2 text-slate-900 font-mono uppercase tracking-tight">
							Enterprise
						</h3>
						<p className="text-blue-600 font-mono text-[10px] uppercase tracking-widest mb-10 font-bold">
							Dedicated SRE Uplink
						</p>

						<ul className="space-y-5 mb-12 flex-1">
							{[
								"Dedicated senior engineer pod",
								"Custom cloud native engineering",
								"Full security compliance (SOC2)",
								"Direct Slack/Discord engineering link",
							].map((item) => (
								<li key={item} className="flex items-start group/item">
									<CheckCircle
										className="h-5 w-5 text-blue-500 mr-3 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110"
										aria-hidden="true"
									/>
									<span className="text-slate-600 text-sm font-bold uppercase tracking-tight leading-relaxed">
										{item}
									</span>
								</li>
							))}
						</ul>

						<div className="pt-8 border-t border-slate-50">
							<Button
								variant="outline"
								className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl py-8 font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-900/5 transition-all min-h-[48px]"
								onClick={() =>
									handlePricingContactClick("tier_03", "Enterprise")
								}
								aria-label="Contact us about Enterprise tier"
							>
								Contact Us
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default memo(PricingSection);
