import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import ErrorBoundary from "@/components/layout/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
	title: "CloudFalcon | Cloud Automation, Security, and IaC Experts",
	description:
		"CloudFalcon orchestrates production-grade automation, hardens security postures, refactors cost structures, and bootstraps engineering teams via technical deep-dives.",
	keywords: [
		"cloud automation",
		"infrastructure as code",
		"IaC",
		"Terraform",
		"Kubernetes",
		"AWS",
		"Azure",
		"GCP",
		"DevOps",
		"cloud security",
		"FinOps",
		"cloud consulting",
	],
	authors: [{ name: "CloudFalcon" }],
	creator: "CloudFalcon",
	metadataBase: new URL("https://cloudfalcon.dev"),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://cloudfalcon.dev",
		siteName: "CloudFalcon",
		title: "CloudFalcon | Cloud Automation, Security, and IaC Experts",
		description:
			"Orchestrating production-grade automation, security hardening, cost optimization, and engineering deep-dives at global scale.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "CloudFalcon - Cloud Orchestration Experts",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "CloudFalcon | Cloud Automation, Security, and IaC Experts",
		description:
			"Orchestrating production-grade automation, security hardening, cost optimization, and engineering deep-dives at global scale.",
		images: ["/og-image.png"],
		creator: "@cloudfalcon",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gaId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

	// Validate Google Analytics ID format (G-XXXXXXXXXX)
	const isValidGaId = gaId && /^G-[A-Z0-9]+$/i.test(gaId);

	if (process.env.NODE_ENV === "development" && !isValidGaId && gaId) {
		console.warn(
			"Invalid Google Analytics ID format. Expected format: G-XXXXXXXXXX",
		);
	}

	return (
		<html lang="en">
			<head>
				{/* DNS prefetch for external resources */}
				<link rel="dns-prefetch" href="https://assets.calendly.com" />
				<link rel="dns-prefetch" href="https://calendly.com" />
				{/* Preconnect to external domains for faster connection */}
				<link rel="preconnect" href="https://assets.calendly.com" />
				<link rel="preconnect" href="https://calendly.com" />
			</head>
			<body className="antialiased bg-background text-foreground selection:bg-primary/20">
				<ErrorBoundary>{children}</ErrorBoundary>
			</body>
			{isValidGaId && <GoogleAnalytics gaId={gaId} />}
		</html>
	);
}
