"use client";

import {
	ArrowUpCircle,
	BarChart,
	CheckCircle,
	FolderGit2,
	LineChart,
	Server,
	Users,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import CalendlyWidget from "@/components/CalendlyWidget";
import Footer from "@/components/Footer";
import GeometricBackground from "@/components/GeometricBackground";
import Header from "@/components/Header";
import IaCToolsSection from "@/components/IaCToolsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import MainNav from "@/components/MainNav";
import PlatformsSection from "@/components/PlatformsSection";
import PricingSection from "@/components/PricingSection";
import ServicesSection from "@/components/ServicesSection";
import { Button } from "@/components/ui/button";
import { handleContactClick } from "@/lib/contact";

export default function CloudFalconLanding() {
	return (
		<>
			<Head>
				<title>CloudFalcon | Cloud Automation, Security, and IaC Experts</title>
				<meta
					name="description"
					content="CloudFalcon provides expert cloud automation, security, cost optimization, and training services to elevate your business."
				/>
				<meta
					property="og:title"
					content="CloudFalcon | Cloud Automation, Security, and IaC Experts"
				/>
				<meta
					property="og:description"
					content="CloudFalcon provides expert cloud automation, security, cost optimization, and training services to elevate your business."
				/>
				<meta property="og:image" content="/img/png/cloudfalcon-og.png" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="CloudFalcon | Cloud Automation, Security, and IaC Experts"
				/>
				<meta
					name="twitter:description"
					content="CloudFalcon provides expert cloud automation, security, cost optimization, and training services to elevate your business."
				/>
				<meta name="twitter:image" content="/img/png/cloudfalcon-og.png" />
			</Head>
			<div className="flex flex-col min-h-screen">
				<Header
					onContactClick={handleContactClick}
					MainNavComponent={MainNav}
				/>
				<main className="flex-1">
					<section
						className="w-full py-8 md:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
						aria-labelledby="hero-heading"
					>
						<GeometricBackground />
						<div className="absolute inset-0 bg-gradient-to-r from-olive/90 to-olive/95" />
						<div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="space-y-2">
									<h1
										id="hero-heading"
										className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white"
									>
										Optimize Your Cloud and Ship faster with IaC in the same
										programming language you use
									</h1>
									<p className="mx-auto max-w-[700px] text-cream md:text-xl">
										CloudFalcon provides expert cloud automation, security, cost
										optimization, and training services to elevate your
										business.
									</p>
								</div>
							</div>
						</div>
					</section>
					<ServicesSection />
					<PlatformsSection />
					<IaCToolsSection />
					<IntegrationsSection />
					<PricingSection />
					<section className="w-full py-12 md:py-24 lg:py-32 bg-sage">
						<div className="container px-4 md:px-6 max-w-6xl mx-auto">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss">
								Impact & Results
							</h2>
							<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{/* Performance Improvement */}
								<div className="flex flex-col items-center p-6 bg-cream rounded-lg shadow-sm">
									<ArrowUpCircle className="h-12 w-12 text-moss mb-4" />
									<CountUp
										end={50}
										suffix="%"
										className="text-4xl font-bold text-moss"
										duration={2.5}
									/>
									<p className="text-olive mt-2 text-center">
										Average Performance Improvement
									</p>
								</div>

								{/* Cost Reduction */}
								<div className="flex flex-col items-center p-6 bg-cream rounded-lg shadow-sm">
									<LineChart className="h-12 w-12 text-moss mb-4" />
									<CountUp
										end={40}
										suffix="%"
										className="text-4xl font-bold text-moss"
										duration={2.5}
									/>
									<p className="text-olive mt-2 text-center">
										Average Cost Reduction
									</p>
								</div>

								{/* Servers Managed */}
								<div className="flex flex-col items-center p-6 bg-cream rounded-lg shadow-sm">
									<Server className="h-12 w-12 text-moss mb-4" />
									<CountUp
										end={1000}
										prefix=">"
										className="text-4xl font-bold text-moss"
										duration={2.5}
									/>
									<p className="text-olive mt-2 text-center">
										Servers | Containers Managed
									</p>
								</div>

								{/* Deployment Time */}
								<div className="flex flex-col items-center p-6 bg-cream rounded-lg shadow-sm">
									<BarChart className="h-12 w-12 text-moss mb-4" />
									<CountUp
										end={50}
										suffix="%"
										className="text-4xl font-bold text-moss"
										duration={2.5}
									/>
									<p className="text-olive mt-2 text-center">
										Faster Deployment Time
									</p>
								</div>
							</div>
						</div>
					</section>
					<section className="w-full py-12 bg-cream">
						<div className="container px-4 md:px-6 max-w-6xl mx-auto">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
								{/* Clients Stats */}
								<div className="p-6 rounded-lg bg-sage">
									<div className="text-4xl font-bold text-moss mb-2">
										<Link className="flex items-center justify-center" href="#">
											<Users className="h-6 w-6 text-moss" />
											<span className="ml-2 text-2xl font-bold text-moss">
												25+
											</span>
										</Link>
									</div>
									<h3 className="text-xl font-semibold text-moss mb-2">
										Global Clients
									</h3>
									<p className="text-olive">
										From innovative startups to established enterprises, serving
										clients worldwide
									</p>
								</div>

								{/* Projects Stats */}
								<div className="p-6 rounded-lg bg-sage">
									<Link className="flex items-center justify-center" href="#">
										<FolderGit2 className="h-6 w-6 text-moss" />
										<span className="ml-2 text-2xl font-bold text-moss">
											50+
										</span>
									</Link>
									<h3 className="text-xl font-semibold text-moss mb-2">
										Projects Delivered
									</h3>
									<p className="text-olive">
										Successfully completed projects ranging from simple to
										complex implementations
									</p>
								</div>
							</div>
						</div>
					</section>
					<section
						id="why-choose-us"
						className="w-full py-12 md:py-24 lg:py-32 bg-cream"
					>
						<div className="container px-4 md:px-6 max-w-6xl mx-auto">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss">
								Why Choose CloudFalcon
							</h2>
							<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
								{[
									"Expert consultants with years of experience",
									"Tailored solutions for your unique needs",
									"24/7 support and monitoring",
									"Proven track record of success",
									"Cutting-edge technology and best practices",
									"Significant cost savings for our clients",
								].map((item) => (
									<div key={item} className="flex items-center space-x-2">
										<CheckCircle className="h-6 w-6 text-moss" />
										<span className="text-olive">{item}</span>
									</div>
								))}
							</div>
						</div>
					</section>
					<section
						id="how-we-work"
						className="w-full py-12 md:py-24 lg:py-32 bg-sage"
					>
						<div className="container px-4 md:px-6 max-w-6xl mx-auto">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss">
								How CloudFalcon Works
							</h2>
							<h4 className="text-2xl font-bold text-center mb-8 text-olive">
								You will be invited to our streamlined process to ensures a
								seamless experience!
							</h4>
							<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{/* Slack */}
								<Link
									href="https://slack.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center text-center p-6 bg-sage rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex flex-col items-center text-center p-6 bg-cream rounded-lg shadow-sm">
										<Image
											src="/img/png/slack.png"
											alt="Slack"
											width={64}
											height={64}
											className="mb-4"
										/>
										<h3 className="text-xl font-bold mb-2 text-olive">
											Communication
										</h3>
										<p className="text-olive">
											Direct access via <strong>Slack</strong> for real-time
											communication and troubleshooting
										</p>
									</div>
								</Link>

								{/* Linear */}
								<Link
									href="https://linear.app/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center text-center p-6 bg-sage rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex flex-col items-center text-center p-6 bg-cream rounded-lg shadow-sm">
										<Image
											src="/img/png/linear.png"
											alt="Linear"
											width={64}
											height={64}
											className="mb-4"
										/>
										<h3 className="text-xl font-bold mb-2 text-olive">
											Task Management
										</h3>
										<p className="text-olive">
											Transparent project tracking and task management through
											<strong> Linear</strong>
										</p>
									</div>
								</Link>
								{/* Notion */}
								<Link
									href="https://notion.so/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center text-center p-6 bg-sage rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex flex-col items-center text-center p-6 bg-cream rounded-lg shadow-sm">
										<Image
											src="/img/png/notion.png"
											alt="Notion"
											width={64}
											height={64}
											className="mb-4"
										/>
										<h3 className="text-xl font-bold mb-2 text-olive">
											Documentation
										</h3>
										<p className="text-olive">
											Comprehensive documentation and knowledge base in{" "}
											<strong> Notion</strong>
										</p>
									</div>
								</Link>
								{/* Github */}
								<Link
									href="https://github.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center text-center p-6 bg-sage rounded-lg shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex flex-col items-center text-center p-6 bg-cream rounded-lg shadow-sm">
										<Image
											src="/img/png/github.png"
											alt="Github"
											width={64}
											height={64}
											className="mb-4"
										/>
										<h3 className="text-xl font-bold mb-2 text-olive">
											Code Access
										</h3>
										<p className="text-olive">
											Secure code access and package management via{" "}
											<strong> Github</strong>
										</p>
									</div>
								</Link>
							</div>
						</div>
					</section>
					<section
						id="contact"
						className="w-full py-12 md:py-24 lg:py-32 bg-olive text-cream"
					>
						<div className="container px-4 md:px-6 max-w-6xl mx-auto">
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="space-y-2">
									<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
										Ready to Optimize Your Cloud?
									</h2>
									<p className="mx-auto max-w-[600px] text-cream/80 md:text-l">
										Get in touch with our experts and start your cloud
										optimization journey today.
									</p>
								</div>
								<div className="w-full max-w-sm space-y-4">
									<Button
										className="bg-cream text-olive hover:bg-cream/90"
										type="button"
										onClick={handleContactClick}
									>
										Email Us
									</Button>{" "}
									| Or call us:{" "}
									<a
										href="tel:+96890131817"
										className="text-sm text-cream/80 hover:underline"
									>
										+968 90131817
									</a>
									<p className="text-xs text-cream/80">
										We respect your privacy.
									</p>
								</div>
							</div>
						</div>
					</section>
				</main>
				<CalendlyWidget />
				<Footer />
			</div>
		</>
	);
}
