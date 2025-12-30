"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { kubernetesTools } from "@/data/kubernetesTools";
import { securityTools } from "@/data/securityTools";
import { terraformTools } from "@/data/terraformTools";

export default function EcosystemAccordion() {
	return (
		<section
			id="ecosystem"
			className="w-full py-20 md:py-24 bg-white relative overflow-hidden border-b border-slate-100"
		>
			<div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:24px_24px]" />

			<div className="container px-4 md:px-6 max-w-4xl mx-auto relative z-10">
				<div className="flex flex-col items-center mb-16 text-center">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-px bg-blue-600" />
						<span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
							Tool_Registry
						</span>
						<div className="w-10 h-px bg-blue-600" />
					</div>
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 font-mono uppercase">
						<span className="text-slate-400 opacity-50">0x05</span> Tooling
						Ecosystem
					</h2>
				</div>

				<Accordion type="single" collapsible className="w-full space-y-6">
					{[
						{
							id: "kubernetes",
							label: "K8S",
							title: "Kubernetes Orchestration",
							tools: kubernetesTools,
						},
						{
							id: "terraform",
							label: "IaC",
							title: "Terraform & OpenTofu",
							tools: terraformTools,
						},
						{
							id: "security",
							label: "SEC",
							title: "Security & Auditing",
							tools: securityTools,
						},
					].map((item) => (
						<AccordionItem
							key={item.id}
							value={item.id}
							className="border border-slate-200 rounded-[2.5rem] px-8 bg-slate-50/50 overflow-hidden group shadow-xl shadow-blue-900/[0.02] hover:border-blue-400/20 transition-all duration-500"
						>
							<AccordionTrigger className="hover:no-underline py-8">
								<div className="flex items-center gap-6">
									<div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
										<span className="font-mono text-sm font-bold tracking-tighter">
											{item.label}
										</span>
									</div>
									<span className="text-xl md:text-2xl font-bold font-mono text-slate-900 uppercase tracking-tight text-left">
										{item.title}
									</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-10">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 px-2">
									{item.tools.map((tool) => (
										<Link
											key={tool.name}
											href={tool.link}
											target="_blank"
											className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-[1.5rem] hover:border-blue-400 hover:shadow-2xl transition-all group/item shadow-sm"
										>
											<div className="w-10 h-10 relative shrink-0">
												<Image
													src={tool.logo}
													alt={tool.name}
													fill
													className="object-contain grayscale group-hover/item:grayscale-0 transition-all scale-110"
												/>
											</div>
											<div className="flex flex-col">
												<span className="font-bold text-slate-900 text-xs font-mono uppercase tracking-tight">
													{tool.name}
												</span>
												<span className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter leading-tight mt-1 line-clamp-1">
													{tool.description}
												</span>
											</div>
											<ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover/item:text-blue-600 transition-colors" />
										</Link>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
