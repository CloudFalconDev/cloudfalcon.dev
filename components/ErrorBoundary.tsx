"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

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

		// In production, you could log to an error reporting service
		// Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
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
				<div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
					<div className="max-w-md space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-bold text-slate-900 font-mono uppercase">
								System Error
							</h2>
							<p className="text-slate-600 font-mono text-sm">
								An unexpected error occurred. Please try again.
							</p>
						</div>

						{process.env.NODE_ENV === "development" && this.state.error && (
							<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-left">
								<p className="text-xs font-mono text-red-800 break-all">
									{this.state.error.toString()}
								</p>
								{this.state.error.stack && (
									<pre className="mt-2 text-xs font-mono text-red-600 overflow-auto max-h-40">
										{this.state.error.stack}
									</pre>
								)}
							</div>
						)}

						<div className="flex gap-4 justify-center">
							<Button
								onClick={this.handleReset}
								className="bg-blue-600 hover:bg-blue-700 text-white"
							>
								Try Again
							</Button>
							<Button
								onClick={() => window.location.reload()}
								variant="outline"
							>
								Reload Page
							</Button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
