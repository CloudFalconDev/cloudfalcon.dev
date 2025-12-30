import Link from "next/link";
import type { SidebarItem as SidebarItemType } from "@/lib/content";

function SidebarItem({ item }: { item: SidebarItemType }) {
	if (item.type === "category") {
		return (
			<div className="mb-6">
				<h3 className="font-bold text-slate-900 mb-2 capitalize text-xs uppercase tracking-wider px-3">
					{item.name.replace(/-/g, " ")}
				</h3>
				<ul className="space-y-1">
					{item.children?.map((child, idx) => (
						<li key={idx}>
							<SidebarItem item={child} />
						</li>
					))}
				</ul>
			</div>
		);
	}
	return (
		<Link
			href={item.href || "#"}
			className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 block capitalize py-2 px-3 text-sm rounded-lg transition-colors"
		>
			{item.name.replace(/-/g, " ")}
		</Link>
	);
}

export default function DocsSidebar({
	structure,
}: {
	structure: SidebarItemType[];
}) {
	return (
		<aside className="w-64 pr-4 hidden md:block border-r border-slate-100 mr-8 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-24 shrink-0">
			<nav className="space-y-1 pr-2">
				{structure.map((item, idx) => (
					<SidebarItem key={idx} item={item} />
				))}
			</nav>
		</aside>
	);
}
