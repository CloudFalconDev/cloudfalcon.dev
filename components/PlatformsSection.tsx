import Link from "next/link";
import Image from "next/image";

export default function PlatformsSection() {
    return (
        <section
            id="cloud-platforms"
            className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
                    Cloud Platforms We Excel In
                </h2>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {/* AWS */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://aws.amazon.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/AWS.svg"
                                alt="AWS Logo"
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Leverage the power of AWS with our expert guidance and
                                optimization.
                            </p>
                        </Link>
                    </div>
                    {/* Azure */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://azure.microsoft.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/AZURE.svg"
                                alt="Azure Logo"
                                width={150}
                                height={150}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Maximize your Azure infrastructure with our specialized
                                knowledge.
                            </p>
                        </Link>
                    </div>
                    {/* GCP */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://cloud.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/GCP.svg"
                                alt="GCP Logo"
                                width={200}
                                height={400}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Optimize your GCP environment with our tailored solutions.
                            </p>
                        </Link>
                    </div>
                    {/* DigitalOcean */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://www.digitalocean.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/digitalocean.svg"
                                alt="DigitalOcean"
                                width={200}
                                height={150}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Simplified cloud infrastructure with DigitalOcean's
                                developer-friendly platform for deploying and scaling
                                applications.
                            </p>
                        </Link>
                    </div>
                    {/* CNCF */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://www.cncf.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/cncf.svg"
                                alt="CNCF Logo"
                                width={200}
                                height={150}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Expert implementation of Cloud Native Computing Foundation
                                technologies including Kubernetes and Prometheus.
                            </p>
                        </Link>
                    </div>
                    {/* HashiCorp */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                        <Link
                            href="https://www.hashicorp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/svg/hashicorp.svg"
                                alt="HashiCorp Logo"
                                width={200}
                                height={150}
                                className="mb-4"
                            />
                            <p className="text-gray-500">
                                Expertise in HashiCorp suite including Terraform, Vault,
                                Consul, and Nomad for infrastructure automation.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 