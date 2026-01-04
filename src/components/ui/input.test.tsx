import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@/lib/__tests__/test-utils";
import { Input } from "./input";

describe("Input", () => {
	it("should render input element", () => {
		render(<Input />);
		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
	});

	it("should accept placeholder text", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
	});

	it("should accept value and onChange", () => {
		const handleChange = vi.fn();
		render(<Input value="test" onChange={handleChange} />);
		const input = screen.getByDisplayValue("test") as HTMLInputElement;
		expect(input).toBeInTheDocument();

		// Simulate user input
		fireEvent.change(input, { target: { value: "new value" } });
		expect(handleChange).toHaveBeenCalled();
	});

	it("should handle different input types", () => {
		const { rerender } = render(<Input type="email" />);
		let input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("type", "email");

		rerender(<Input type="password" />);
		input = document.querySelector(
			'input[type="password"]',
		) as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "password");

		rerender(<Input type="number" />);
		input = screen.getByRole("spinbutton");
		expect(input).toHaveAttribute("type", "number");
	});

	it("should handle disabled state", () => {
		render(<Input disabled />);
		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();
	});

	it("should accept custom className", () => {
		render(<Input className="custom-input" />);
		const input = screen.getByRole("textbox");
		expect(input).toHaveClass("custom-input");
	});

	it("should accept name and id attributes", () => {
		render(<Input name="username" id="user-input" />);
		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("name", "username");
		expect(input).toHaveAttribute("id", "user-input");
	});
});
