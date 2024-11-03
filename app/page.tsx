"use client";

import { Button } from "@/components/ui/button";
import {
  Origami,
  Shield,
  DollarSign,
  Zap,
  CheckCircle,
  GraduationCap,
  Users,
  FolderGit2,
  Twitter,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import CalendlyWidget from "@/components/CalendlyWidget";

function GeometricBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometric shapes
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhongMaterial({
      color: "#3b82f6",
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const light = new THREE.DirectionalLight("#60a5fa", 1);
    light.position.set(0, 0, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight("#1e293b", 0.5));

    // Camera setup
    camera.position.z = 1; // Adjust depth
    camera.position.y = 0; // Center vertically
    camera.position.x = 0; // Center horizontally

    // Update mesh position
    mesh.position.set(0, 0, 0); // Center the mesh

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mesh.rotation.x = y * 0.3;
      mesh.rotation.y = x * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const camera = cameraRef.current;
      const renderer = rendererRef.current;

      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update container styles
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 flex items-center justify-center"
      style={{
        pointerEvents: "none",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    />
  );
}

export default function CloudFalconDevLanding() {
  const handleContactClick = () => {
    const subject = "CloudFalcon Dev Services Inquiry";
    const body = "I'm interested in learning more about your services.";
    window.location.href = `mailto:info@cloudfalcon.dev?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full max-w-6xl mx-auto px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Origami className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            CloudFalconDev
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#services"
          >
            Services
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 relative overflow-hidden">
          <GeometricBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-gray-900/90" />
          <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Optimize Your Cloud Infrastructure
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
                  CloudFalconDev provides expert cloud automation, security,
                  cost optimization, and training services to elevate your
                  business.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
              Our Services
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Cloud Automation</h3>
                <p className="text-gray-500">
                  Streamline your operations with cutting-edge automation
                  solutions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
                <p className="text-gray-500">
                  Protect your assets with our advanced cloud security measures.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Cloud Cost Optimization
                </h3>
                <p className="text-gray-500">
                  Maximize your ROI with our cost-effective cloud strategies.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Cloud Training</h3>
                <p className="text-gray-500">
                  Empower your team with expert-led cloud technology training.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cloud-platforms"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
              Cloud Platforms We Excel In
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <Image
                  src="/img/svg/AWS.svg?height=80&width=80"
                  alt="AWS Logo"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                {/* <h3 className="text-xl font-bold mb-2">Amazon Web Services</h3> */}
                <p className="text-gray-500">
                  Leverage the power of AWS with our expert guidance and
                  optimization.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <Image
                  src="/img/svg/AZURE.svg?height=80&width=80"
                  alt="Azure Logo"
                  width={150}
                  height={150}
                  className="mb-4"
                />
                {/* <h3 className="text-xl font-bold mb-2">Microsoft Azure</h3> */}
                <p className="text-gray-500">
                  Maximize your Azure infrastructure with our specialized
                  knowledge.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                <Image
                  src="/img/svg/GCP.svg?height=80&width=80"
                  alt="GCP Logo"
                  width={200}
                  height={400}
                  className="mb-4"
                />
                {/* <h3 className="text-xl font-bold mb-2">
                  Google Cloud Platform
                </h3> */}
                <p className="text-gray-500">
                  Optimize your GCP environment with our tailored solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cloud-tools"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
              IaC Tools We Use
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Terraform",
                  image: "png/terraform.png",
                  description:
                    "Infrastructure as Code for multi-cloud environments",
                  link: "https://www.terraform.io/",
                },
                {
                  name: "Pulumi",
                  image: "png/Pulumi.png",
                  description:
                    "Modern Infrastructure as Code using your favorite programming languages",
                  link: "https://www.pulumi.com/",
                },
                {
                  name: "AWS CDK",
                  image: "png/cdk.png",
                  description:
                    "Define cloud infrastructure using familiar programming languages",
                  link: "https://aws.amazon.com/cdk/",
                },
                {
                  name: "Crossplane",
                  image: "png/crossplane.png",
                  description: "Open source multi-cloud control plane",
                  link: "https://www.crossplane.io/",
                },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
                >
                  <Link
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
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
                </div>
              ))}
            </div>
          </div>
        </section>
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
        <section className="w-full py-12 bg-white/5 backdrop-blur-sm">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              {/* Clients Stats */}
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur">
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  <Link className="flex items-center justify-center" href="#">
                    <Users className="h-6 w-6 text-blue-500" />
                    <span className="ml-2 text-2xl font-bold text-blue-500">
                      25+
                    </span>
                  </Link>
                </div>
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  Global Clients
                </h3>
                <p className="text-gray-700">
                  From innovative startups to established enterprises, serving
                  clients worldwide
                </p>
              </div>

              {/* Projects Stats */}
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur">
                <Link className="flex items-center justify-center" href="#">
                  <FolderGit2 className="h-6 w-6 text-blue-500" />
                  <span className="ml-2 text-2xl font-bold text-blue-500">
                    50+
                  </span>
                </Link>
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  Projects Delivered
                </h3>
                <p className="text-gray-700">
                  Successfully completed projects ranging from simple to complex
                  implementations
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="why-choose-us"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
              Why Choose CloudFalconDev
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Expert consultants with years of experience",
                "Tailored solutions for your unique needs",
                "24/7 support and monitoring",
                "Proven track record of success",
                "Cutting-edge technology and best practices",
                "Significant cost savings for our clients",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-we-work"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-500">
              How CloudFalconDev Works
            </h2>
            <h4 className="text-2xl font-bold text-center mb-8 text-gray-700">
              You will be invited to our streamlined process to ensures a
              seamless experience!
            </h4>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Slack */}
              <Link
                href="https://slack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Image
                    src="/img/png/slack.png"
                    alt="Slack"
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Communication</h3>
                  <p className="text-gray-500">
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
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Image
                    src="/img/png/linear.png"
                    alt="Linear"
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Task Management</h3>
                  <p className="text-gray-500">
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
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Image
                    src="/img/png/notion.png"
                    alt="Notion"
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Documentation</h3>
                  <p className="text-gray-500">
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
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Image
                    src="/img/png/github.png"
                    alt="Github"
                    width={64}
                    height={64}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Code Access</h3>
                  <p className="text-gray-500">
                    Secure code access and package management via{" "}
                    <strong> Github</strong>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
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

        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Optimize Your Cloud?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-l">
                  Get in touch with our experts and start your cloud
                  optimization journey today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                <Button
                  className="bg-white text-blue-600"
                  type="button"
                  onClick={handleContactClick}
                >
                  Email Us
                </Button>{" "}
                | Or call us:{" "}
                <a
                  href="tel:+96890131817"
                  className="text-sm text-blue-100 hover:underline"
                >
                  +968 90131817
                </a>
                <p className="text-xs text-blue-100">
                  We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section
          id="calendly"
          className="w-full py-4 md:py-4 lg:py-4 bg-white-600 text-white"
        >
          <div className="calendly">
            <InlineWidget url="https://calendly.com/cloudfalcon" />
          </div>
        </section> */}
      </main>
      <CalendlyWidget />
      <footer className="w-full py-6 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex justify-center items-center space-x-6">
            <Link
              href="https://twitter.com/cloudfalcondev"
              target="_blank"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>

            <Link
              href="https://linkedin.com/company/cloudfalcondev"
              target="_blank"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>

            <Link
              href="https://github.com/cloudfalcondev"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>

            <Link
              href="https://youtube.com/@cloudfalcondev"
              target="_blank"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </footer>
      <footer className="w-full max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2015 - {new Date().getFullYear()} CloudFalconDev{" "}
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-xs text-gray-500">
            <span>🇺🇸 New Jersey, USA</span>
            <span className="hidden sm:inline">•</span>
            <span>🇪🇬 Cairo, Egypt</span>
            <span className="hidden sm:inline">•</span>
            <span>
              🇴🇲 Muscat, Oman - Owned by <strong>SAHAB</strong> Investments
              Solutions, a S.P.C registered in Oman under the CR number 1571037.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
