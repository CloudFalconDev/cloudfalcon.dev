import Image from "next/image";
import ArchitectureDiagram from "@/components/features/ArchitectureDiagram";
import {
	iconPath,
	resilienceControls,
	verificationTools,
} from "@/data/architecture";
import DocSection from "./DocSection";

export default function Architecture() {
	return (
		<DocSection id="architecture" index="05" title="Reference architecture">
			<p className="max-w-[40rem] text-pretty font-serif text-[1.6rem] leading-snug text-ink">
				A web app on AWS with no single point of failure.
			</p>
			<p className="mt-3 max-w-[40rem] text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
				us-east-1 runs active and us-west-2 is a warm standby, with two
				Availability Zones in each region.
			</p>

			<div className="mt-8">
				<ArchitectureDiagram />
			</div>

			<h3 className="mt-12 text-[16px] font-semibold text-ink">
				Resilience controls
			</h3>
			<dl className="mt-4 border-t border-line">
				{resilienceControls.map((control) => (
					<div
						key={control.title}
						className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-0"
					>
						<dt className="text-[15.5px] font-semibold text-ink sm:pr-6">
							{control.title}
						</dt>
						<dd className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
							{control.detail}
						</dd>
					</div>
				))}
			</dl>
			<ul
				className="mt-4 flex flex-wrap gap-x-4 gap-y-1"
				aria-label="Tested with"
			>
				{verificationTools.map((tool) => (
					<li
						key={tool.icon}
						className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground"
					>
						<Image
							src={iconPath(tool.icon)}
							alt=""
							width={14}
							height={14}
							className="h-3.5 w-3.5 object-contain"
						/>
						{tool.label}
					</li>
				))}
			</ul>
		</DocSection>
	);
}
