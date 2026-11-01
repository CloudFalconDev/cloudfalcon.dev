import Link from "next/link";
import StatusMessage from "@/components/content/StatusMessage";
import { container, textLink } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function BlogPostNotFound() {
	return (
		<div className={cn(container, "py-20 sm:py-28")}>
			<StatusMessage
				code="404"
				title="This post doesn't exist."
				actions={
					<Link href="/blog" className={textLink}>
						See all posts
					</Link>
				}
			>
				It may have been moved or removed.
			</StatusMessage>
		</div>
	);
}
