import { stackGroups } from "@/data/stack";
import DocSection from "./DocSection";

export default function Stack() {
	return (
		<DocSection id="tools" index="03" title="Tools">
			<dl className="border-t border-line">
				{stackGroups.map((group) => (
					<div
						key={group.name}
						className="grid gap-1 border-b border-line py-4 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-0"
					>
						<dt className="text-[15.5px] font-semibold text-ink sm:pr-6">
							{group.name}
						</dt>
						<dd className="text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
							{group.items.join(", ")}
						</dd>
					</div>
				))}
			</dl>
		</DocSection>
	);
}
