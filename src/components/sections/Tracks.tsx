import { mentorshipTracks } from "@/data/mentorshipTracks";
import DocSection from "./DocSection";

export default function Tracks() {
	return (
		<DocSection id="topics" index="02" title="Topics">
			<p className="max-w-[40rem] text-pretty text-[17px] leading-relaxed text-ink/80">
				Pick one or combine a few. Sessions mix explanation with hands-on work
				and reviews of what you build.
			</p>
			<table className="mt-8 w-full border-t border-line text-left">
				<thead className="sr-only">
					<tr>
						<th scope="col">Topic</th>
						<th scope="col">What it covers</th>
						<th scope="col">Good for</th>
					</tr>
				</thead>
				<tbody>
					{mentorshipTracks.map((track) => (
						<tr
							key={track.title}
							className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line py-4 sm:table-row sm:py-0"
						>
							<th
								scope="row"
								className="text-[15.5px] font-semibold text-ink sm:w-[15rem] sm:py-4 sm:pr-6 sm:align-baseline"
							>
								{track.title}
							</th>
							<td className="col-span-2 row-start-2 text-pretty text-[15.5px] leading-relaxed text-muted-foreground sm:py-4 sm:pr-6 sm:align-baseline">
								{track.description}
							</td>
							<td className="col-start-2 row-start-1 whitespace-nowrap text-right font-mono text-[12px] text-muted-foreground sm:py-4 sm:align-baseline">
								{track.focus}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</DocSection>
	);
}
