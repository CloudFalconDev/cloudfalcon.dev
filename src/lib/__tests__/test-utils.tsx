import {
	type RenderOptions,
	render as rtlRender,
} from "@testing-library/react";
import type * as React from "react";

// Custom render function that can be extended with providers
function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
	return rtlRender(ui, { ...options });
}

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
export { vi } from "vitest";

// Override render method
export { renderWithProviders as render };
