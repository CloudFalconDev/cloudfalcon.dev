import type { ReactNode } from "react";

/** Not-found and error states, set like the rest of the site. */
export default function StatusMessage({
	code,
	title,
	children,
	actions,
}: {
	code: string;
	title: string;
	children: ReactNode;
	actions?: ReactNode;
}) {
	return (
		<div>
			<p className="font-mono text-[12px] text-muted-foreground">{code}</p>
			<h1 className="mt-3 text-balance font-serif text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.9rem]">
				{title}
			</h1>
			<div className="mt-4 max-w-[36rem] text-pretty text-[17px] leading-relaxed text-ink/80">
				{children}
			</div>
			{actions && (
				<div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
					{actions}
				</div>
			)}
		</div>
	);
}
