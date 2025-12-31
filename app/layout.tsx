import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

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
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/20`}
			>
				{children}
			</body>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID ?? ""} />
		</html>
	);
}
