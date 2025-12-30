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
