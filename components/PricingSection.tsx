import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PricingSection() {
    return (
        <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
                    Service Tiers
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Basic Tier */}
                    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Basic Tier</h3>
                        <p className="text-gray-500 mb-6">
                            Cloud Assessment & Planning
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Initial cloud readiness assessment</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Basic migration planning</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Monthly cost optimization review</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Business hours support</span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-500 mb-4">
                            Starting at $2,500 per project
                        </p>
                        <Button
                            className="mt-auto"
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
                    <div className="flex flex-col p-6 bg-blue-600 rounded-lg shadow-sm text-white">
                        <h3 className="text-xl font-bold mb-4">Professional Tier</h3>
                        <p className="text-blue-100 mb-6">
                            Implementation & Management
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                                <span>Everything in Basic tier</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                                <span>Full migration execution</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                                <span>Cloud architecture design</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                                <span>24/7 support</span>
                            </li>
                        </ul>
                        <p className="text-sm text-blue-100 mb-4">
                            Starting at $5,000 per project
                        </p>
                        <Button
                            className="bg-white text-blue-600 hover:bg-blue-50 mt-auto"
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
                    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Enterprise Tier</h3>
                        <p className="text-gray-500 mb-6">Strategic Partnership</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Everything in Professional tier</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Dedicated team</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Custom solutions development</span>
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                <span>Priority support</span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-500 mb-4">
                            Custom project-based pricing
                        </p>
                        <Button
                            className="mt-auto"
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