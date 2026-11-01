import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArchitectureDiagram from "@/components/features/ArchitectureDiagram";
import { flows } from "@/data/architecture";

describe("ArchitectureDiagram", () => {
	it("renders the diagram with an accessible name and its flow pulses", () => {
		const { container } = render(<ArchitectureDiagram />);

		expect(
			screen.getByRole("img", {
				name: /highly available multi-region web app on aws/i,
			}),
		).toBeInTheDocument();
		// jsdom has no IntersectionObserver, so the diagram counts as on screen
		expect(container.querySelectorAll(".arch-pulse")).toHaveLength(
			flows.filter((flow) => flow.delay !== undefined).length,
		);
	});

	it("switches between fit-to-width and a scrollable actual-size view", () => {
		render(<ArchitectureDiagram />);

		const toggle = screen.getByRole("button", { name: /actual size/i });
		expect(toggle).toHaveAttribute("aria-pressed", "false");
		expect(screen.queryByRole("region", { name: /scroll to pan/i })).toBeNull();

		fireEvent.click(toggle);

		expect(
			screen.getByRole("button", { name: /fit to width/i }),
		).toHaveAttribute("aria-pressed", "true");
		expect(
			screen.getByRole("region", { name: /scroll to pan/i }),
		).toBeInTheDocument();
	});
});
