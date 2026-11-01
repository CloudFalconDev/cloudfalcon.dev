import Link from "next/link";
import StatusMessage from "@/components/content/StatusMessage";
import TrackView from "@/components/features/TrackView";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MainNav from "@/components/layout/MainNav";
import { container, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header MainNavComponent={MainNav} />
			<main id="content" className={cn(container, "flex-1 py-20 sm:py-28")}>
				<TrackView
					event="not_found_page_viewed"
					properties={{ status_code: 404, source: "not_found_page" }}
				/>
				<StatusMessage
					code="404"
					title="This page doesn't exist."
					actions={
						<>
							<Link href="/" className={textLink}>
								Go to the home page
							</Link>
							<Link href="/blog" className={textLink}>
								Read the blog
							</Link>
						</>
					}
				>
					The link may be old, or the page may have moved.
				</StatusMessage>
			</main>
			<Footer />
		</div>
	);
}
