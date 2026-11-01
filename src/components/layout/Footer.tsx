import Link from "next/link";
import TrackedLink from "@/components/features/TrackedLink";
import { CONTACT_EMAIL, contactMailto } from "@/lib/contact";
import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const SOCIALS = [
	{ name: "X", href: "https://twitter.com/cloudfalcondev" },
	{ name: "LinkedIn", href: "https://linkedin.com/company/cloudfalcondev" },
	{ name: "GitHub", href: "https://github.com/cloudfalcondev" },
	{ name: "YouTube", href: "https://youtube.com/@cloudfalcondev" },
];

const LOCATIONS = ["🇪🇬 Cairo", "🇪🇸 Madrid", "🇵🇸 Gaza ❤️"];

const linkClass = "transition-colors hover:text-ink";

export default function Footer() {
	return (
		<footer className="border-t border-line">
			<div
				className={cn(
					container,
					"flex flex-col gap-8 py-10 text-[14px] text-muted-foreground md:flex-row md:items-start md:justify-between",
				)}
			>
				<div className="space-y-1.5">
					<Logo size="sm" className="mb-3" />
					<p>© 2015–{new Date().getFullYear()}</p>
					<p>{LOCATIONS.join(" · ")}</p>
				</div>

				<ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
					<li>
						<Link href="/blog" className={linkClass}>
							Blog
						</Link>
					</li>
					<li>
						<Link href="/docs" className={linkClass}>
							Docs
						</Link>
					</li>
					{SOCIALS.map((social) => (
						<li key={social.name}>
							<TrackedLink
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								event="social_link_clicked"
								properties={{
									platform: social.name,
									url: social.href,
									source: "footer",
								}}
								className={linkClass}
							>
								{social.name}
							</TrackedLink>
						</li>
					))}
					<li>
						<TrackedLink
							href={contactMailto}
							event="contact_connect_clicked"
							properties={{
								method: "email",
								recipient: CONTACT_EMAIL,
								source: "footer",
							}}
							className={linkClass}
						>
							{CONTACT_EMAIL}
						</TrackedLink>
					</li>
				</ul>
			</div>
		</footer>
	);
}
