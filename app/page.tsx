import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import Architecture from "@/components/sections/Architecture";
import Audience from "@/components/sections/Audience";
import BookCall from "@/components/sections/BookCall";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import PricingSection from "@/components/sections/PricingSection";
import Stack from "@/components/sections/Stack";
import Tracks from "@/components/sections/Tracks";

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header MainNavComponent={MainNav} />
			<main className="flex-1">
				<Hero />
				<Audience />
				<Tracks />
				<Stack />
				<HowItWorks />
				<Architecture />
				<PricingSection />
				<BookCall />
			</main>
			<Footer />
		</div>
	);
}
