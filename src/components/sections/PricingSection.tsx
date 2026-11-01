import BookCallButton from "@/components/features/BookCallButton";
import TrackedLink from "@/components/features/TrackedLink";
import { mentorshipPlans } from "@/data/mentorshipPlans";
import { contactMailto } from "@/lib/contact";
import { textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";
import DocSection from "./DocSection";

const rowClass =
	"grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[10rem_11rem_minmax(0,1fr)_7rem] md:items-baseline";

export default function PricingSection() {
	return (
		<DocSection id="pricing" index="06" title="Pricing">
			<p className="max-w-[40rem] text-pretty font-serif text-[1.6rem] leading-snug text-ink">
				Every plan starts with a free 30-minute call.
			</p>

			<ul className="mt-8 border-t border-line">
				{mentorshipPlans.map((plan) => (
					<li key={plan.id} className={rowClass}>
						<h3 className="text-[16px] font-semibold text-ink">{plan.name}</h3>
						<p className="flex items-baseline gap-1.5">
							<span className="font-serif text-[1.9rem] leading-none text-ink">
								{plan.price}
							</span>
							<span className="whitespace-nowrap text-[13.5px] text-muted-foreground">
								{plan.billing}
							</span>
						</p>
						<p className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
							{plan.includes}
						</p>
						<BookCallButton
							source="pricing"
							plan={{ id: plan.id, name: plan.name }}
							className={cn(textLink, "text-[15px] md:justify-self-end")}
						>
							Book a call
						</BookCallButton>
					</li>
				))}
				<li className={rowClass}>
					<h3 className="text-[16px] font-semibold text-ink">Teams</h3>
					<p className="font-serif text-[1.9rem] leading-none text-ink">
						Custom
					</p>
					<p className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
						Regular sessions and reviews for a whole engineering team, priced
						per team.
					</p>
					<TrackedLink
						href={contactMailto}
						event="pricing_tier_contact_clicked"
						properties={{
							tier_id: "team",
							tier_name: "Team",
							source: "pricing_section",
						}}
						className={cn(textLink, "text-[15px] md:justify-self-end")}
					>
						Email us
					</TrackedLink>
				</li>
			</ul>
			<p className="mt-4 text-[13.5px] text-muted-foreground">
				Prices in US dollars.
			</p>
		</DocSection>
	);
}
