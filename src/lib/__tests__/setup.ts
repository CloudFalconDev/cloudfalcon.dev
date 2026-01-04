import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";

// Set environment variables for tests
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test";
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
	process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
}

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

// Mock CSS imports for tests
vi.mock("*.css", () => ({}));
vi.mock("*.module.css", () => ({}));
