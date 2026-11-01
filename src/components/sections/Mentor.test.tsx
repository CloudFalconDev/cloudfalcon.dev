import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Mentor from "@/components/sections/Mentor";
import { mentor } from "@/data/mentor";

describe("Mentor", () => {
	it("introduces the mentor with their background and certifications", () => {
		render(<Mentor />);

		const section = screen.getByRole("region", { name: /your mentor/i });
		expect(within(section).getByText(mentor.name)).toBeInTheDocument();
		for (const fact of mentor.facts) {
			expect(within(section).getByText(fact.label)).toBeInTheDocument();
		}
		expect(
			within(section).getByText(/terraform associate/i),
		).toBeInTheDocument();
	});

	it("opens the mentor's profiles in a new tab", () => {
		render(<Mentor />);

		for (const link of mentor.links) {
			const anchor = screen.getByRole("link", { name: link.name });
			expect(anchor).toHaveAttribute("href", link.href);
			expect(anchor).toHaveAttribute("target", "_blank");
			expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
		}
	});
});
