import Link from "next/link";
import StatusMessage from "@/components/content/StatusMessage";
import { textLink } from "@/lib/styles";

export default function DocNotFound() {
	return (
		<StatusMessage
			code="404"
			title="This page isn't in the docs."
			actions={
				<Link href="/docs" className={textLink}>
					Go to the docs overview
				</Link>
			}
		>
			It may have been moved or renamed. Every page is listed in the sidebar.
		</StatusMessage>
	);
}
