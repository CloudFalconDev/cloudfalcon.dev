import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Origami,
  Shield,
  DollarSign,
  Zap,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CloudFalconDevLanding() {
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
            href="#cloud-platforms"
          >
            Cloud Platforms
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#cloud-tools"
          >
            Cloud Tools
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#why-choose-us"
          >
            Why Choose Us
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-slate-500 to-gray-400">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Optimize Your Cloud Infrastructure
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                  CloudFalconDev provides expert cloud automation, security,
                  cost optimization, and training services to elevate your
                  business.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              IaC Tools We Use
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Terraform",
                  image: "png/terraform.png",
                  description:
                    "Infrastructure as Code for multi-cloud environments",
                },
                {
                  name: "Pulumi",
                  image: "png/Pulumi.png",
                  description:
                    "Modern Infrastructure as Code using your favorite programming languages",
                },
                {
                  name: "AWS CDK",
                  image: "png/cdk.png",
                  description:
                    "Define cloud infrastructure using familiar programming languages",
                },
                {
                  name: "Crossplane",
                  image: "png/crossplane.png",
                  description: "Open source multi-cloud control plane",
                },
                // {
                //   name: "Docker",
                //   image: "/img/Docker.svg",
                //   description:
                //     "Containerization platform for consistent application deployment",
                // },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
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
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="why-choose-us"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
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
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-white text-blue-600" type="submit">
                    Contact Us
                  </Button>
                </form>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-l text-blue-100">Or call us:</p>
                  <a
                    href="tel:+96890131817"
                    className="text-sm text-blue-100 hover:underline"
                  >
                    +968 90131817
                  </a>
                </div>
                <p className="text-xs text-blue-100">
                  We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2015 - {new Date().getFullYear()} CloudFalconDev -
        </p>
        <p className="text-xs text-gray-500">
          🇴🇲 Owned by SAHAB Investments Solutions, a S.P.C registered in Oman
          under the CR number 1571037.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
