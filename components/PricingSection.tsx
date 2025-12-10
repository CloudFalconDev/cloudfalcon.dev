import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
	return (
		<section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-sage">
			<div className="container px-4 md:px-6 max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss">
					Service Tiers
				</h2>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{/* Basic Tier */}
					<div className="flex flex-col p-6 bg-cream rounded-lg shadow-sm">
						<h3 className="text-xl font-bold mb-4 text-olive">Basic Tier</h3>
						<p className="text-olive mb-6">Cloud Assessment & Planning</p>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">
									Initial cloud readiness assessment
								</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">Basic migration planning</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">
									Monthly cost optimization review
								</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">Business hours support</span>
							</li>
						</ul>
						<p className="text-sm text-olive mb-4">
							Starting at $2,500 per project
						</p>
						<Button
							className="mt-auto bg-moss text-cream hover:bg-moss/90"
							onClick={() => {
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							aria-label="Contact us for more information"
						>
							Get Started
						</Button>{" "}
					</div>
					{/* Professional Tier */}
					<div className="flex flex-col p-6 bg-moss rounded-lg shadow-sm text-cream">
						<h3 className="text-xl font-bold mb-4">Professional Tier</h3>
						<p className="text-cream/80 mb-6">Implementation & Management</p>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-sage mr-2" />
								<span>Everything in Basic tier</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-sage mr-2" />
								<span>Full migration execution</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-sage mr-2" />
								<span>Cloud architecture design</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-sage mr-2" />
								<span>24/7 support</span>
							</li>
						</ul>
						<p className="text-sm text-cream/80 mb-4">
							Starting at $5,000 per project
						</p>
						<Button
							className="bg-cream text-moss hover:bg-cream/90 mt-auto"
							onClick={() => {
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							aria-label="Contact us for more information"
						>
							Get Started
						</Button>{" "}
					</div>
					{/* Enterprise Tier */}
					<div className="flex flex-col p-6 bg-cream rounded-lg shadow-sm">
						<h3 className="text-xl font-bold mb-4 text-olive">
							Enterprise Tier
						</h3>
						<p className="text-olive mb-6">Strategic Partnership</p>
						<ul className="space-y-3 mb-6">
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">
									Everything in Professional tier
								</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">Dedicated team</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">Custom solutions development</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="h-5 w-5 text-moss mr-2" />
								<span className="text-olive">Priority support</span>
							</li>
						</ul>
						<p className="text-sm text-olive mb-4">
							Custom project-based pricing
						</p>
						<Button
							className="mt-auto bg-moss text-cream hover:bg-moss/90"
							onClick={() => {
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							aria-label="Contact us for more information"
						>
							Email Us
						</Button>{" "}
					</div>
				</div>
			</div>
		</section>
	);
}
