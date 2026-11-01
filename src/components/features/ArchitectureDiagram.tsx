"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	boxes,
	DIAGRAM_VIEWBOX,
	type DiagramFlow,
	flows,
	groupLabels,
	iconPath,
	labels,
	legend,
	nodes,
	type Zone,
	zoneColors,
	zonePills,
} from "@/data/architecture";

const ARROW_ZONES: Zone[] = [
	"internet",
	"region",
	"vpc",
	"publicSubnet",
	"privateSubnet",
];

const TEXT_ANCHOR = { left: "start", center: "middle", right: "end" } as const;

// Stop the line short of the arrowhead so the marker tip lands on the target.
function lineEnd({ from, to, arrow }: DiagramFlow): [number, number] {
	if (!arrow) return to;
	return [
		to[0] - Math.sign(to[0] - from[0]) * 4,
		to[1] - Math.sign(to[1] - from[1]) * 4,
	];
}

function DiagramSvg({ zoomed, pulses }: { zoomed: boolean; pulses: boolean }) {
	const { x, y, w, h } = DIAGRAM_VIEWBOX;

	return (
		<svg
			viewBox={`${x} ${y} ${w} ${h}`}
			width={w}
			height={h}
			className={zoomed ? "block max-w-none" : "block h-auto w-full"}
			role="img"
			aria-labelledby="arch-diagram-title arch-diagram-desc"
		>
			<title id="arch-diagram-title">
				Highly available multi-region web app on AWS
			</title>
			<desc id="arch-diagram-desc">
				Users reach Route 53 and CloudFront, protected by AWS WAF and Shield
				Advanced. CloudFront sends traffic to an Application Load Balancer in
				us-east-1, the active region, which spreads requests across stateless
				EC2 instances in two Availability Zones. The app keeps sessions in
				ElastiCache and data in an Aurora writer with a reader in the second
				zone; slow jobs go through SQS to a Lambda worker that sends email with
				SES. us-west-2 runs the same stack as a warm standby: Aurora Global
				Database and ElastiCache Global Datastore replicate data across regions,
				CloudFront fails over to the standby load balancer, and S3, Secrets
				Manager, KMS keys and AWS Backup are copied cross-region.
			</desc>
			<defs>
				{ARROW_ZONES.map((zone) => (
					<marker
						key={zone}
						id={`arch-arrow-${zone}`}
						orient="auto"
						markerWidth={5}
						markerHeight={5}
						refX={2}
						refY={2}
						overflow="visible"
					>
						<path d="M0 0 L4 2 L0 4 Z" fill={zoneColors[zone].stroke} />
					</marker>
				))}
			</defs>

			{boxes.map((box) => {
				// CSS borders sit inside the box; SVG strokes straddle the edge.
				const inset = (box.strokeWidth ?? 0) / 2;
				return (
					<rect
						key={`${box.x}-${box.y}-${box.w}`}
						x={box.x + inset}
						y={box.y + inset}
						width={box.w - inset * 2}
						height={box.h - inset * 2}
						rx={box.radius}
						fill={box.fill ?? "none"}
						stroke={box.stroke}
						strokeWidth={box.strokeWidth}
						strokeDasharray={
							box.dashed ? (box.strokeWidth === 1 ? "4 3" : "6 4") : undefined
						}
					/>
				);
			})}

			{flows.map((flow) => {
				const color = zoneColors[flow.zone].stroke;
				const [fx, fy] = flow.from;
				const [ex, ey] = lineEnd(flow);
				return (
					<g
						key={`${flow.from}-${flow.to}`}
						fill="none"
						stroke={color}
						color={color}
						strokeWidth={2}
						strokeLinecap="round"
					>
						<path
							d={`M ${fx} ${fy} L ${ex} ${ey}`}
							strokeDasharray={flow.dashed ? "6 6" : undefined}
							markerEnd={
								flow.arrow ? `url(#arch-arrow-${flow.zone})` : undefined
							}
						/>
						{pulses && flow.delay !== undefined && (
							<path
								className="arch-pulse"
								pathLength={100}
								d={`M ${fx} ${fy} L ${flow.to[0]} ${flow.to[1]}`}
								style={{
									animationDelay: `${flow.delay}s`,
									animationDuration: flow.duration
										? `${flow.duration}s`
										: undefined,
								}}
							/>
						)}
					</g>
				);
			})}

			{groupLabels.map((group) => (
				<g key={`${group.x}-${group.y}`}>
					<image
						href={iconPath(group.icon)}
						x={group.x}
						y={group.y}
						width={group.size}
						height={group.size}
					/>
					<text
						x={group.x + group.size + 8}
						y={group.y + group.size / 2 + 4.5}
						fontSize={13}
						fill={zoneColors[group.tone].text}
					>
						{group.bold && <tspan fontWeight={600}>{group.bold}</tspan>}
						{group.text}
					</text>
				</g>
			))}

			{zonePills.map((pill) => (
				<g key={`${pill.x}-${pill.y}`}>
					<rect
						x={pill.x + 0.5}
						y={pill.y + 0.5}
						width={135}
						height={19}
						rx={9.5}
						fill="#FFFFFF"
						stroke={zoneColors.privateSubnet.stroke}
						strokeDasharray="4 3"
					/>
					<text
						x={pill.x + 68}
						y={pill.y + 14}
						fontSize={12}
						textAnchor="middle"
						fill={zoneColors.privateSubnet.text}
					>
						{pill.text}
					</text>
				</g>
			))}

			{labels.map((label) => {
				const lx =
					label.align === "left"
						? label.x
						: label.align === "center"
							? label.x + label.w / 2
							: label.x + label.w;
				return (
					<text
						key={`${label.x}-${label.y}`}
						y={label.y + 12.5}
						fontSize={13}
						textAnchor={TEXT_ANCHOR[label.align]}
						fill={zoneColors[label.tone].text}
					>
						{label.lines.map((line, i) => (
							<tspan key={line} x={lx} dy={i === 0 ? 0 : 16}>
								{line}
							</tspan>
						))}
					</text>
				);
			})}

			{nodes.map((node) => (
				<g key={`${node.x}-${node.y}`}>
					<image
						href={iconPath(node.icon)}
						x={node.x + 40}
						y={node.y}
						width={56}
						height={56}
					/>
					<text
						y={node.y + 78}
						fontSize={14}
						textAnchor="middle"
						fill="#16191F"
					>
						{node.lines.map((line, i) => (
							<tspan key={line} x={node.x + 68} dy={i === 0 ? 0 : 18}>
								{line}
							</tspan>
						))}
					</text>
				</g>
			))}
		</svg>
	);
}

/** The diagram fitted to its column, with a toggle for a scrollable actual-size view. */
export default function ArchitectureDiagram() {
	const [zoomed, setZoomed] = useState(false);
	const [onScreen, setOnScreen] = useState(false);
	const figureRef = useRef<HTMLElement>(null);

	// Only render the flow pulses while the diagram is near the viewport.
	useEffect(() => {
		const figure = figureRef.current;
		if (!figure) return;
		if (typeof IntersectionObserver === "undefined") {
			setOnScreen(true);
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => setOnScreen(entry.isIntersecting),
			{ rootMargin: "200px 0px" },
		);
		observer.observe(figure);
		return () => observer.disconnect();
	}, []);

	return (
		<figure
			ref={figureRef}
			className="overflow-hidden rounded-md border border-line bg-white"
		>
			<div className="flex items-center justify-end gap-4 border-b border-line pr-1 pl-4 sm:justify-between">
				<span className="hidden font-mono text-[12px] text-muted-foreground sm:block">
					us-east-1 ⇄ us-west-2
				</span>
				<button
					type="button"
					onClick={() => setZoomed((value) => !value)}
					aria-pressed={zoomed}
					className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md px-3 font-mono text-[12px] text-muted-foreground transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
				>
					{zoomed ? (
						<Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
					) : (
						<Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
					)}
					{zoomed ? "Fit to width" : "Actual size"}
				</button>
			</div>

			{zoomed ? (
				<section
					className="max-h-[80vh] overflow-auto"
					aria-label="Architecture diagram at actual size, scroll to pan"
				>
					<DiagramSvg zoomed pulses={onScreen} />
				</section>
			) : (
				<div className="p-2 sm:p-3">
					<DiagramSvg zoomed={false} pulses={onScreen} />
				</div>
			)}

			<figcaption className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-3">
				{legend.map(({ zone, label }) => (
					<span
						key={zone}
						className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground"
					>
						<span
							className="h-0.5 w-4 rounded-full"
							style={{ backgroundColor: zoneColors[zone].stroke }}
							aria-hidden="true"
						/>
						{label}
					</span>
				))}
				<span className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground">
					<span
						className="w-4 border-t-2 border-dashed border-muted-foreground/60"
						aria-hidden="true"
					/>
					Replication / failover
				</span>
			</figcaption>
		</figure>
	);
}
