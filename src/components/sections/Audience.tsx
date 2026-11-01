import { audiences } from "@/data/audiences";
import DocSection from "./DocSection";

export default function Audience() {
	return (
		<DocSection id="for" index="01" title="Who it's for">
			<dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
				{audiences.map((audience) => (
					<div key={audience.title}>
						<dt className="text-[16px] font-semibold text-ink">
							{audience.title}
						</dt>
						<dd className="mt-1.5 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
							{audience.description}
						</dd>
					</div>
				))}
			</dl>
		</DocSection>
	);
}
