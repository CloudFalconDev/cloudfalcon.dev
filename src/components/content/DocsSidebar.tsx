"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SidebarItem as SidebarItemType } from "@/lib/content";
import { cn } from "@/lib/utils";

function SidebarLink({
	item,
	pathname,
}: {
	item: SidebarItemType;
	pathname: string;
}) {
	// Normalize paths for comparison (remove trailing slashes, handle empty)
	const normalizePath = (path: string) => {
		if (!path) return "/docs";
		return path.replace(/\/$/, "") || "/docs";
	};

	const normalizedHref = normalizePath(item.href || "");
	const normalizedPathname = normalizePath(pathname);
	const isActive = normalizedPathname === normalizedHref;
	// Use label directly from Sanity, don't transform it
	const displayName = item.label || item.name || "Untitled";

	// Ensure href is valid
	const href = item.href && item.href !== "#" ? item.href : "/docs";

	return (
		<Link
			href={href}
			className={cn(
				"block py-2 px-3 text-sm rounded-lg transition-colors",
				isActive
					? "bg-blue-50 text-blue-600 font-semibold border border-blue-100"
					: "text-slate-600 hover:text-blue-600 hover:bg-slate-50",
			)}
		>
			{displayName}
		</Link>
	);
}

function SidebarCategory({
	item,
	pathname,
}: {
	item: SidebarItemType;
	pathname: string;
}) {
	// Use label directly from Sanity, don't transform it
	const displayName = item.label || item.name || "Category";
	const children = item.children || [];

	return (
		<div className="mb-6">
			<h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider px-3">
				{displayName}
			</h3>
			{children.length > 0 ? (
				<ul className="space-y-1">
					{children.map((child, index) => (
						<li key={child.href || child.name || `child-${index}`}>
							{child.type === "category" ? (
								<SidebarCategory item={child} pathname={pathname} />
							) : (
								<SidebarLink item={child} pathname={pathname} />
							)}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

function SidebarContent({
	structure,
	pathname,
}: {
	structure: SidebarItemType[];
	pathname: string;
}) {
	return (
		<nav className="space-y-1 pr-2">
			{structure.map((item) =>
				item.type === "category" ? (
					<SidebarCategory key={item.name} item={item} pathname={pathname} />
				) : (
					<SidebarLink
						key={item.href || item.name}
						item={item}
						pathname={pathname}
					/>
				),
			)}
		</nav>
	);
}

export default function DocsSidebar({
	structure,
}: {
	structure: SidebarItemType[];
}) {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				type="button"
				onClick={() => setMobileOpen(true)}
				className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
				aria-label="Open navigation menu"
			>
				<Menu className="w-6 h-6" aria-hidden="true" />
			</button>

			{/* Mobile Sidebar Overlay */}
			{mobileOpen && (
				<>
					<button
						type="button"
						className="md:hidden fixed inset-0 z-50 bg-black/50 cursor-default min-h-[48px]"
						onClick={() => setMobileOpen(false)}
						aria-label="Close navigation menu"
					/>
					<aside className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto shadow-xl z-50 custom-scrollbar">
						<div className="flex items-center justify-between mb-6">
							<span className="font-bold text-slate-900 uppercase text-xs tracking-wider">
								Documentation
							</span>
							<button
								type="button"
								onClick={() => setMobileOpen(false)}
								className="p-3 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 min-w-[48px] min-h-[48px] flex items-center justify-center"
								aria-label="Close navigation menu"
							>
								<X className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
						<SidebarContent structure={structure} pathname={pathname} />
					</aside>
				</>
			)}

			{/* Desktop Sidebar */}
			<aside className="w-64 pr-4 hidden md:block border-r border-slate-100 mr-8 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24 shrink-0 custom-scrollbar">
				<SidebarContent structure={structure} pathname={pathname} />
			</aside>
		</>
	);
}
