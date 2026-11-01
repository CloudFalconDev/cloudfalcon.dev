import type { ReactNode } from "react";
import { container, docGrid } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface DocSectionProps {
	id: string;
	/** Section number shown above the title, e.g. "01" */
	index: string;
	title: string;
	children: ReactNode;
}

/** A page section laid out like a document: title in the margin, content beside it. */
export default function DocSection({
	id,
	index,
	title,
	children,
}: DocSectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			className="border-t border-line"
		>
			<div className={cn(container, docGrid, "py-16 sm:py-20")}>
				<h2
					id={`${id}-title`}
					className="flex items-baseline gap-3 font-serif text-[1.75rem] leading-tight tracking-[-0.01em] text-ink lg:flex-col lg:gap-2"
				>
					<span className="font-mono text-[12px] tracking-normal text-muted-foreground">
						{index}
					</span>
					{title}
				</h2>
				<div className="min-w-0 lg:pt-[1.375rem]">{children}</div>
			</div>
		</section>
	);
}
