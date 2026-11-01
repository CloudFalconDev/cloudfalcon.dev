import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

import ErrorBoundary from "@/components/layout/ErrorBoundary";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-plex-sans",
	display: "swap",
});

const plexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-plex-mono",
	display: "swap",
});

const newsreader = Newsreader({
	subsets: ["latin"],
	variable: "--font-newsreader",
	display: "swap",
	axes: ["opsz"],
});

export const metadata: Metadata = {
	title: "CloudFalcon | Cloud & DevOps Mentorship",
	description:
		"1:1 mentorship in cloud, DevOps and platform engineering: break into cloud, level up to senior, prepare for AWS, CKA and Terraform certifications, and ace FAANG interviews.",
	keywords: [
		"cloud mentorship",
		"DevOps mentor",
		"platform engineering mentorship",
		"career switch to cloud",
		"AWS certification prep",
		"CKA",
		"Terraform",
		"Kubernetes",
		"infrastructure as code",
		"FAANG interview prep",
		"system design interview",
		"SRE",
	],
	authors: [{ name: "CloudFalcon" }],
	creator: "CloudFalcon",
	metadataBase: new URL("https://cloudfalcon.dev"),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://cloudfalcon.dev",
		siteName: "CloudFalcon",
		title: "CloudFalcon | Cloud & DevOps Mentorship",
		description:
			"1:1 mentorship in cloud, DevOps and platform engineering. From your first deploy to FAANG interviews.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "CloudFalcon - Cloud & DevOps Mentorship",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "CloudFalcon | Cloud & DevOps Mentorship",
		description:
			"1:1 mentorship in cloud, DevOps and platform engineering. From your first deploy to FAANG interviews.",
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
		<html
			lang="en"
			className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable}`}
		>
			<head>
				{/* DNS prefetch for external resources */}
				<link rel="dns-prefetch" href="https://assets.calendly.com" />
				<link rel="dns-prefetch" href="https://calendly.com" />
				<link rel="dns-prefetch" href="https://cdn.sanity.io" />
				<link rel="dns-prefetch" href="https://us.i.posthog.com" />
				{/* Preconnect to external domains for faster connection */}
				<link
					rel="preconnect"
					href="https://assets.calendly.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="preconnect"
					href="https://calendly.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="preconnect"
					href="https://cdn.sanity.io"
					crossOrigin="anonymous"
				/>
			</head>
			<body className="antialiased bg-background text-foreground selection:bg-primary/20">
				<ErrorBoundary>{children}</ErrorBoundary>
			</body>
			{isValidGaId && <GoogleAnalytics gaId={gaId} />}
		</html>
	);
}
