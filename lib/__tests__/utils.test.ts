import { describe, expect, it } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
	it("should merge class names correctly", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("should handle conditional classes", () => {
		expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
	});

	it("should handle Tailwind conflicts", () => {
		expect(cn("p-4", "p-6")).toBe("p-6");
	});

	it("should handle empty strings", () => {
		expect(cn("", "foo")).toBe("foo");
	});

	it("should handle undefined and null", () => {
		expect(cn(undefined, null, "foo")).toBe("foo");
	});
});
