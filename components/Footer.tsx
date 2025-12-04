import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<>
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
							© 2015 - {new Date().getFullYear()} CloudFalcon{" "}
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
		</>
	);
}
