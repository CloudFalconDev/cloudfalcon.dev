export default function BlogPostLoading() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
				<div className="animate-pulse space-y-8">
					{/* Header skeleton */}
					<div className="space-y-4 pb-12 border-b border-slate-100">
						<div className="flex items-center gap-3">
							<div className="h-6 w-32 bg-slate-200 rounded" />
							<div className="h-4 w-40 bg-slate-200 rounded" />
						</div>
						<div className="h-12 w-3/4 bg-slate-200 rounded" />
					</div>

					{/* Content skeleton */}
					<div className="space-y-4">
						<div className="h-4 w-full bg-slate-200 rounded" />
						<div className="h-4 w-full bg-slate-200 rounded" />
						<div className="h-4 w-5/6 bg-slate-200 rounded" />
						<div className="h-4 w-full bg-slate-200 rounded" />
						<div className="h-4 w-4/6 bg-slate-200 rounded" />
					</div>
				</div>
			</div>
		</div>
	);
}
