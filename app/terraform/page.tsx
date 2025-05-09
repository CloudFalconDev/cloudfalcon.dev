"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { terraformTools } from "@/data/terraformTools";
import MainNav from "@/components/MainNav";

export default function TerraformEcosystemPage() {
    return (
        <>
            <MainNav />
            <main className="min-h-screen bg-white">
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Terraform/OpenTofu Ecosystem
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {terraformTools.map((tool) => (
                                <motion.div
                                    key={tool.name}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-6 rounded-lg shadow-lg"
                                >
                                    <Link
                                        href={tool.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={tool.logo}
                                                alt={`${tool.name} logo`}
                                                width={48}
                                                height={48}
                                                className="rounded-lg"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/img/svg/plank.svg";
                                                }}
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold">{tool.name}</h3>
                                                <p className="text-gray-600">{tool.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 