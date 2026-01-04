import { describe, expect, it } from "vitest";
import { render, screen } from "@/lib/__tests__/test-utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./accordion";

describe("Accordion", () => {
	it("should render accordion components", () => {
		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Item 1</AccordionTrigger>
					<AccordionContent>Content 1</AccordionContent>
				</AccordionItem>
			</Accordion>,
		);

		// Check that trigger text is rendered and accessible
		const trigger = screen.getByText("Item 1");
		expect(trigger).toBeInTheDocument();
		expect(trigger).toBeVisible();
	});

	it("should render multiple accordion items", () => {
		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Item 1</AccordionTrigger>
					<AccordionContent>Content 1</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Item 2</AccordionTrigger>
					<AccordionContent>Content 2</AccordionContent>
				</AccordionItem>
			</Accordion>,
		);

		// Check that both triggers are rendered
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});
});
