import BookCallButton from "@/components/features/BookCallButton";
import TrackedLink from "@/components/features/TrackedLink";
import { CONTACT_EMAIL, contactMailto } from "@/lib/contact";
import { button } from "@/lib/styles";
import { cn } from "@/lib/utils";
import DocSection from "./DocSection";

const contactLink =
	"text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink";

export default function BookCall() {
	return (
		<DocSection id="book" index="07" title="Get started">
			<div>
				<p className="text-balance font-serif text-[2.6rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
					The first call is free.
				</p>
				<p className="mt-5 max-w-[36rem] text-pretty text-[17px] leading-relaxed text-ink/80">
					30 minutes on video. Pick a time that suits you, or email first if you
					prefer. You'll leave with clear next steps, whether or not you sign
					up.
				</p>
				<BookCallButton
					source="final_cta"
					className={cn(button.primary, "mt-8 h-11")}
				>
					Book a free 30-minute call
				</BookCallButton>

				<dl className="mt-12 grid max-w-[36rem] gap-y-3 border-t border-line pt-6 text-[15.5px] sm:grid-cols-[6rem_1fr]">
					<dt className="text-muted-foreground">Email</dt>
					<dd>
						<TrackedLink
							href={contactMailto}
							event="contact_connect_clicked"
							properties={{
								method: "email",
								recipient: CONTACT_EMAIL,
								source: "contact_section",
							}}
							className={contactLink}
						>
							{CONTACT_EMAIL}
						</TrackedLink>
					</dd>
				</dl>
			</div>
		</DocSection>
	);
}
