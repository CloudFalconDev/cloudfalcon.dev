import Image from "next/image";
import Link from "next/link";
import { integrations } from "@/data/integrations";

export default function IntegrationsSection() {
	return (
		<section
			id="integrations"
			className="w-full py-12 md:py-24 lg:py-32 bg-cream"
		>
			<div className="container px-4 md:px-6 max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss">
					Integrations
				</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{integrations.map((integration) => (
						<Link
							key={integration.name}
							href={integration.href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col items-center text-center p-6 bg-sage rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="h-16 w-full flex items-center justify-center mb-4">
								<Image
									src={integration.logo}
									alt={integration.alt}
									width={160}
									height={64}
									className="max-h-16 w-auto object-contain"
								/>
							</div>
							<h3 className="text-xl font-bold mb-2 text-olive">
								{integration.name}
							</h3>
							<p className="text-olive text-sm">{integration.description}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
