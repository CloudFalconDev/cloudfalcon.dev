import { describe, expect, it } from "vitest";
import { render, screen } from "@/lib/__tests__/test-utils";
import { Button } from "./button";

describe("Button", () => {
	it("should render button with default variant", () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toBeInTheDocument();
	});

	it("should render button with different variants", () => {
		const { rerender } = render(<Button variant="destructive">Delete</Button>);
		let button = screen.getByRole("button", { name: "Delete" });
		expect(button).toBeInTheDocument();

		rerender(<Button variant="outline">Outline</Button>);
		button = screen.getByRole("button", { name: "Outline" });
		expect(button).toBeInTheDocument();

		rerender(<Button variant="ghost">Ghost</Button>);
		button = screen.getByRole("button", { name: "Ghost" });
		expect(button).toBeInTheDocument();

		rerender(<Button variant="link">Link</Button>);
		button = screen.getByRole("button", { name: "Link" });
		expect(button).toBeInTheDocument();
	});

	it("should render button with different sizes", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		let button = screen.getByRole("button", { name: "Small" });
		expect(button).toBeInTheDocument();

		rerender(<Button size="lg">Large</Button>);
		button = screen.getByRole("button", { name: "Large" });
		expect(button).toBeInTheDocument();

		rerender(<Button size="icon">Icon</Button>);
		button = screen.getByRole("button", { name: "Icon" });
		expect(button).toBeInTheDocument();
	});

	it("should handle disabled state", () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole("button", { name: "Disabled" });
		expect(button).toBeDisabled();
	});

	it("should handle click events", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);
		const button = screen.getByRole("button", { name: "Click me" });
		button.click();
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should accept custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole("button", { name: "Custom" });
		expect(button).toHaveClass("custom-class");
	});

	it("should render as child when asChild is true", () => {
		render(
			<Button asChild>
				<a href="/test">Link Button</a>
			</Button>,
		);
		const link = screen.getByRole("link", { name: "Link Button" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
	});
});
