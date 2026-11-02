"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
	{ label: "Topics", href: "/#topics" },
	{ label: "How it works", href: "/#process" },
	{ label: "Mentor", href: "/#mentor" },
	{ label: "Pricing", href: "/#pricing" },
	{ label: "Blog", href: "/blog" },
	{ label: "Docs", href: "/docs" },
];

export default function MainNav() {
	const pathname = usePathname() ?? "/";

	return (
		<nav aria-label="Main navigation" className="hidden md:block">
			<ul className="flex items-center gap-7">
				{NAV_LINKS.map((link) => {
					// Blog and Docs stay marked on every page inside them
					const current =
						!link.href.includes("#") &&
						(pathname === link.href || pathname.startsWith(`${link.href}/`));
					return (
						<li key={link.href}>
							<Link
								href={link.href}
								aria-current={current ? "page" : undefined}
								className={cn(
									"text-[14.5px] transition-colors hover:text-ink",
									current ? "text-ink" : "text-muted-foreground",
								)}
							>
								{link.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
