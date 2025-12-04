import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainNav from "./MainNav";

export default function Header({
	onContactClick,
	MainNavComponent = MainNav,
}: {
	onContactClick: () => void;
	MainNavComponent?: React.ComponentType;
}) {
	return (
		<header className="w-full max-w-6xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
			{/* Brand/Logo - Left aligned */}
			<Link
				className="flex items-center justify-center"
				href="#"
				aria-label="CloudFalcon Home"
			>
				<span className="ml-2 text-2xl font-bold text-gray-900">
					CloudFalcon
				</span>
			</Link>
			{/* Navigation - Centered */}
			<MainNavComponent />
			{/* Contact button - Right aligned */}
			<Button
				onClick={onContactClick}
				className="bg-blue-600 text-white hover:bg-blue-700"
				aria-label="Contact Us"
			>
				Contact Us
			</Button>
		</header>
	);
}
