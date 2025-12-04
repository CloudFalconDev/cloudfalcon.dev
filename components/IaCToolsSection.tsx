import Image from "next/image";
import Link from "next/link";
import { iacTools } from "@/data/iacTools";

export default function IaCToolsSection() {
	return (
		<section
			id="iac-tools"
			className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
			aria-labelledby="iac-tools-heading"
		>
			<div className="container px-4 md:px-6 max-w-6xl mx-auto">
				<h2
					id="iac-tools-heading"
					className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500"
				>
					IaC Tools We Use
				</h2>
				<ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{iacTools.map((tool) => (
						<li
							key={tool.name}
							className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm list-none"
						>
							<Link
								href={tool.link}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
								aria-label={`${tool.name} website`}
							>
								<Image
									src={`/img/${tool.image}`}
									alt={tool.name}
									width={200}
									height={50}
									className="mb-4"
								/>
								<h3 className="text-xl font-bold mb-2">{tool.name}</h3>
								<p className="text-gray-500">{tool.description}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
