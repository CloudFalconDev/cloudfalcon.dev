import Image from "next/image";
import TrackedLink from "@/components/features/TrackedLink";
import { mentor } from "@/data/mentor";
import { textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";
import DocSection from "./DocSection";

export default function Mentor() {
	return (
		<DocSection id="mentor" index="06" title="Your mentor">
			<div className="flex items-center gap-5">
				{mentor.photo && (
					<Image
						src={mentor.photo}
						alt={mentor.name}
						width={80}
						height={80}
						className="h-20 w-20 rounded-full object-cover"
					/>
				)}
				<div>
					<p className="font-serif text-[1.6rem] leading-snug text-ink">
						{mentor.name}
					</p>
					<p className="mt-1 text-[15.5px] text-muted-foreground">
						{mentor.role} · {mentor.location}
					</p>
				</div>
			</div>

			<div className="mt-6 max-w-[40rem] space-y-4 text-pretty text-[17px] leading-relaxed text-ink/80">
				{mentor.bio.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>

			<dl className="mt-8 border-t border-line">
				{mentor.facts.map((fact) => (
					<div
						key={fact.label}
						className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-0"
					>
						<dt className="text-[15.5px] font-semibold text-ink sm:pr-6">
							{fact.label}
						</dt>
						<dd className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
							{fact.value}
						</dd>
					</div>
				))}
			</dl>

			<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
				{mentor.links.map((link) => (
					<li key={link.name}>
						<TrackedLink
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							event="social_link_clicked"
							properties={{
								platform: link.name,
								url: link.href,
								source: "mentor_section",
							}}
							className={cn(textLink, "text-[15px]")}
						>
							{link.name}
						</TrackedLink>
					</li>
				))}
			</ul>
		</DocSection>
	);
}
