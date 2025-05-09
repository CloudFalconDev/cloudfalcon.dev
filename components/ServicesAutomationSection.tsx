import Link from "next/link";
import Image from "next/image";

export default function ServicesAutomationSection() {
    return (
        <section
            id="services-automation"
            className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
                    Services We Automate
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Datadog */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Link
                            href="https://www.datadoghq.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/png/datadog.png"
                                alt="Datadog"
                                width={100}
                                height={600}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Datadog</h3>
                            <p className="text-gray-500">
                                Automated monitoring, metrics collection, and alerting setup
                                for comprehensive observability
                            </p>
                        </Link>
                    </div>
                    {/* Vanta */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Link
                            href="https://www.vanta.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/png/vanta.png"
                                alt="Vanta"
                                width={600}
                                height={600}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Vanta</h3>
                            <p className="text-gray-500">
                                Streamlined security compliance automation and continuous
                                monitoring for SOC 2, ISO 27001, and more
                            </p>
                        </Link>
                    </div>
                    {/* Twingate */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Link
                            href="https://www.twingate.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/png/twingate.png"
                                alt="Twingate"
                                width={600}
                                height={600}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Twingate</h3>
                            <p className="text-gray-500">
                                Zero-trust network access automation for secure resource
                                connectivity and access management
                            </p>
                        </Link>
                    </div>
                    {/* Github */}
                    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Link
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src="/img/png/github.png"
                                alt="Github"
                                width={600}
                                height={600}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2">Github</h3>
                            <p className="text-gray-500">
                                Automated repository management, CI/CD pipelines, and
                                security controls.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 