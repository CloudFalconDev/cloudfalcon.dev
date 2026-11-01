"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookCallButton from "@/components/features/BookCallButton";
import { button, container } from "@/lib/styles";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MainNav, { NAV_LINKS } from "./MainNav";

export default function Header({
	MainNavComponent = MainNav,
}: {
	MainNavComponent?: React.ComponentType;
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-line bg-paper">
			<div className={cn(container, "flex h-16 items-center justify-between")}>
				<Logo />

				<div className="flex items-center gap-8">
					<MainNavComponent />
					<BookCallButton
						source="header"
						className={cn(
							button.primary,
							"hidden h-9 px-4 text-[14px] sm:inline-flex",
						)}
					>
						Book a call
					</BookCallButton>

					<button
						type="button"
						className="-mr-2 grid h-10 w-10 place-items-center rounded-md text-ink md:hidden"
						aria-expanded={isMenuOpen}
						aria-controls="mobile-navigation"
						onClick={() => setIsMenuOpen((open) => !open)}
					>
						{isMenuOpen ? (
							<X className="h-5 w-5" aria-hidden="true" />
						) : (
							<Menu className="h-5 w-5" aria-hidden="true" />
						)}
						<span className="sr-only">
							{isMenuOpen ? "Close menu" : "Open menu"}
						</span>
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<nav
					id="mobile-navigation"
					aria-label="Mobile navigation"
					className="border-t border-line bg-paper md:hidden"
				>
					<div className={cn(container, "pb-6 pt-2")}>
						<ul className="divide-y divide-line">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										onClick={() => setIsMenuOpen(false)}
										className="block py-3.5 text-base text-ink"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
						<BookCallButton
							source="mobile_menu"
							className={cn(button.primary, "mt-4 h-11 w-full")}
						>
							Book a free 30-minute call
						</BookCallButton>
					</div>
				</nav>
			)}
		</header>
	);
}
