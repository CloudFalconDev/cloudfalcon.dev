import BookCallButton from "@/components/features/BookCallButton";
import { heroStats } from "@/data/hero";
import { button, container, docGrid, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function Hero() {
	return (
		<section className={cn(container, "pb-16 pt-16 sm:pb-24 sm:pt-24")}>
			<h1 className="max-w-[15ch] text-balance font-serif text-[2.9rem] font-normal leading-[1.02] tracking-[-0.025em] text-ink sm:text-[4.4rem] lg:text-[5.4rem]">
				Mentorship for cloud, DevOps and platform engineers.
			</h1>

			<div className={cn(docGrid, "mt-12 sm:mt-16")}>
				<ul className="order-last space-y-1.5 font-mono text-[12.5px] leading-relaxed text-muted-foreground lg:order-first lg:pt-1.5">
					<li>Since 2015</li>
					{heroStats.map((stat) => (
						<li key={stat.label}>
							{stat.value} {stat.label}
						</li>
					))}
				</ul>

				<div className="max-w-[40rem]">
					<p className="text-pretty text-[19px] leading-[1.6] text-ink/80">
						One-to-one sessions with engineers who have built and run production
						infrastructure for over ten years. We help people get their first
						cloud job, move up to senior and platform roles, pass AWS, CKA and
						Terraform exams, and prepare for FAANG interviews.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
						<BookCallButton
							source="hero"
							className={cn(button.primary, "h-11")}
						>
							Book a free 30-minute call
						</BookCallButton>
						<a href="#pricing" className={cn(textLink, "text-[15px]")}>
							See pricing
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
