"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocsNavGroup } from "@/lib/content";
import { cn } from "@/lib/utils";

function normalize(path: string): string {
	return path.replace(/\/+$/, "") || "/";
}

function NavList({ nav, pathname }: { nav: DocsNavGroup[]; pathname: string }) {
	return (
		<div className="space-y-7">
			{nav.map((group) => (
				<div key={group.id}>
					{group.label && (
						<p className="mb-2 text-[13px] font-semibold text-ink">
							{group.label}
						</p>
					)}
					<ul className="border-l border-line">
						{group.items.map((item) => {
							const active = normalize(item.href) === pathname;
							return (
								<li key={item.href}>
									<Link
										href={item.href}
										aria-current={active ? "page" : undefined}
										className={cn(
											"-ml-px block border-l py-[5px] pl-4 text-[14px] leading-snug transition-colors",
											active
												? "border-ink font-medium text-ink"
												: "border-transparent text-muted-foreground hover:border-ink/25 hover:text-ink",
										)}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			))}
		</div>
	);
}

/** Docs navigation: a sticky column on desktop, a disclosure on small screens. */
export default function DocsSidebar({ nav }: { nav: DocsNavGroup[] }) {
	const pathname = normalize(usePathname() ?? "/docs");

	return (
		<>
			{/* Keyed by path so it closes after choosing a page */}
			<details key={pathname} className="group border-b border-line lg:hidden">
				<summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[14.5px] text-ink [&::-webkit-details-marker]:hidden">
					Browse the docs
					<ChevronDown
						className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
						aria-hidden="true"
					/>
				</summary>
				<nav aria-label="Docs" className="pb-8 pt-3">
					<NavList nav={nav} pathname={pathname} />
				</nav>
			</details>

			<nav
				aria-label="Docs"
				className="sticky top-16 hidden max-h-[calc(100vh-4rem)] self-start overflow-y-auto py-12 pr-2 [scrollbar-width:thin] lg:block"
			>
				<NavList nav={nav} pathname={pathname} />
			</nav>
		</>
	);
}
