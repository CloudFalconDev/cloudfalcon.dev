import Image from "next/image";
import { mentorshipSteps } from "@/data/mentorshipSteps";
import { sampleRoadmap } from "@/data/roadmap";
import DocSection from "./DocSection";

export default function HowItWorks() {
	return (
		<DocSection id="process" index="04" title="How it works">
			<ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
				{mentorshipSteps.map((step, index) => (
					<li key={step.title} className="grid grid-cols-[2rem_1fr]">
						<span
							className="font-serif text-[1.6rem] leading-none text-ink/35"
							aria-hidden="true"
						>
							{index + 1}
						</span>
						<div>
							<h3 className="text-[16px] font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-1.5 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
								{step.description}
							</p>
							{step.tools.length > 0 && (
								<ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
									{step.tools.map((tool) => (
										<li
											key={tool.name}
											className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground"
										>
											{tool.logo && (
												<Image
													src={tool.logo}
													alt=""
													width={14}
													height={14}
													className="h-3.5 w-3.5 object-contain"
												/>
											)}
											{tool.name}
										</li>
									))}
								</ul>
							)}
						</div>
					</li>
				))}
			</ol>

			<figure className="mt-16">
				<figcaption className="text-[15.5px] text-ink">
					<span className="font-semibold">Example plan:</span>{" "}
					<span className="text-muted-foreground">
						a 12-week Career Track for someone moving into cloud.
					</span>
				</figcaption>
				<ol className="mt-4 border-t border-line">
					{sampleRoadmap.map((item) => (
						<li
							key={item.weeks}
							className="grid grid-cols-[6.5rem_1fr] border-b border-line py-3 text-[15.5px]"
						>
							<span className="font-mono text-[12.5px] leading-[1.6rem] text-muted-foreground">
								Weeks {item.weeks}
							</span>
							<span className="text-ink">{item.title}</span>
						</li>
					))}
				</ol>
			</figure>
		</DocSection>
	);
}
