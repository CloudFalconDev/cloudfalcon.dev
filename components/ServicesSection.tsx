import { motion } from "framer-motion";
import { serviceDetails } from "@/data/serviceDetails";

export default function ServicesSection() {
	return (
		<section
			id="services"
			className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
		>
			<div className="container px-4 md:px-6 max-w-6xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500"
				>
					Our Services
				</motion.h2>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{serviceDetails.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="group relative overflow-hidden rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
							/>
							<div className="relative z-10 space-y-4">
								<div className="mb-4 p-3 rounded-full bg-blue-50 inline-block">
									{service.icon}
								</div>
								<h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
									{service.title}
								</h3>
								<p className="text-gray-500 group-hover:text-gray-600 transition-colors">
									{service.description}
								</p>
								<div className="py-4 border-t border-gray-100">
									<div className="flex items-center justify-between mb-4">
										<span className="text-3xl font-bold text-blue-600">
											{service.stats.value}
										</span>
										<span className="text-sm text-gray-500">
											{service.stats.label}
										</span>
									</div>
								</div>
								<ul className="space-y-3">
									{service.features.map((feature, idx) => (
										<li key={idx} className="flex items-center text-gray-600">
											<span className="mr-2 text-blue-500">{feature.icon}</span>
											{feature.text}
										</li>
									))}
								</ul>
								<motion.div
									className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
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
