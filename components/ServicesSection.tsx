import { motion } from "framer-motion";
import { serviceDetails } from "@/data/serviceDetails";

export default function ServicesSection() {
	return (
		<section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-sage">
			<div className="container px-4 md:px-6 max-w-6xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-moss"
				>
					Our Services
				</motion.h2>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{serviceDetails.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="group relative overflow-hidden rounded-xl p-6 bg-cream shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
							/>
							<div className="relative z-10 space-y-4">
								<div className="mb-4 p-3 rounded-full bg-sage inline-block">
									{service.icon}
								</div>
								<h3 className="text-xl font-bold group-hover:text-moss transition-colors text-olive">
									{service.title}
								</h3>
								<p className="text-olive group-hover:text-olive/80 transition-colors">
									{service.description}
								</p>
								<div className="py-4 border-t border-sage">
									<div className="flex items-center justify-between mb-4">
										<span className="text-3xl font-bold text-moss">
											{service.stats.value}
										</span>
										<span className="text-sm text-olive">
											{service.stats.label}
										</span>
									</div>
								</div>
								<ul className="space-y-3">
									{service.features.map((feature) => (
										<li
											key={feature.text}
											className="flex items-center text-olive"
										>
											<span className="mr-2 text-moss">{feature.icon}</span>
											{feature.text}
										</li>
									))}
								</ul>
								<motion.div
									className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-moss to-sage"
									initial={{ width: "0%" }}
									whileHover={{ width: "100%" }}
									transition={{ duration: 0.3 }}
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
