"use client";

import posthog from "posthog-js";
import { Component, type ReactNode } from "react";
import { button, container, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("ErrorBoundary caught an error:", error, errorInfo);
		}

		// Capture error with PostHog
		posthog.capture("error_boundary_triggered", {
			error_message: error.message,
			error_name: error.name,
			component_stack: errorInfo.componentStack,
			source: "error_boundary",
		});

		// Also capture as exception for PostHog error tracking
		posthog.captureException(error);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className={cn(container, "py-20 sm:py-28")}>
					<p className="font-mono text-[12px] text-muted-foreground">Error</p>
					<h2 className="mt-3 font-serif text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink">
						Something went wrong.
					</h2>
					<p className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-ink/80">
						An unexpected error stopped this page from loading. Reloading
						usually fixes it.
					</p>

					{process.env.NODE_ENV === "development" && this.state.error && (
						<pre className="mt-6 max-h-60 max-w-3xl overflow-auto rounded-[3px] border border-line bg-[#f2f1ec] p-4 font-mono text-[12px] text-ink">
							{this.state.error.stack ?? this.state.error.toString()}
						</pre>
					)}

					<div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
						<button
							type="button"
							onClick={() => window.location.reload()}
							className={cn(button.primary, "h-10")}
						>
							Reload the page
						</button>
						<button
							type="button"
							onClick={this.handleReset}
							className={cn(textLink, "text-[15px]")}
						>
							Try again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
