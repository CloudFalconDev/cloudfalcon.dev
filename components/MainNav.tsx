import Link from "next/link";
import { Wrench, Home, Cloud, Tag, ChevronDown, Network, Shield, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function MainNav() {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    // If on homepage, use hash links; otherwise, use absolute links to homepage sections
    const isHome = pathname === "/";
    const sectionLink = (hash: string) => (isHome ? hash : `/${hash}`);

    return (
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6" aria-label="Main navigation">
            <Link
                className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-1"
                href={sectionLink("#services")}
            >
                <Home className="w-4 h-4" /> Services
            </Link>
            <Link
                className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-1"
                href={sectionLink("#cloud-platforms")}
            >
                <Cloud className="w-4 h-4" /> Platforms
            </Link>
            <Link
                className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-1"
                href={sectionLink("#iac-tools")}
                aria-label="Infrastructure as Code Tools"
            >
                <Wrench className="w-4 h-4" /> IaC
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-1 focus:outline-none"
                        aria-haspopup="true"
                        aria-controls="tools-menu"
                        type="button"
                    >
                        <Cloud className="w-4 h-4" /> Tools <ChevronDown className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" id="tools-menu" className="w-48">
                    <DropdownMenuItem asChild>
                        <Link
                            href="/kubernetes"
                            className="flex items-center gap-2"
                            aria-label="Kubernetes Tools"
                        >
                            <Network className="w-4 h-4" /> Kubernetes
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/security"
                            className="flex items-center gap-2"
                            aria-label="Security Tools"
                        >
                            <Shield className="w-4 h-4" /> Security
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link
                            href="/terraform"
                            className="flex items-center gap-2"
                            aria-label="Terraform Tools"
                        >
                            <FileText className="w-4 h-4" /> Terraform
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link
                className="text-md font-medium hover:underline underline-offset-4 flex items-center gap-1"
                href={sectionLink("#pricing")}
            >
                <Tag className="w-4 h-4" /> Pricing
            </Link>
        </nav>
    );
} 