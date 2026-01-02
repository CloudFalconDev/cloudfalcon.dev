export default function DocsLoading() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-1 container mx-auto px-4 py-16 max-w-6xl">
				<div className="flex gap-8">
					{/* Sidebar skeleton */}
					<aside className="hidden md:block w-64 shrink-0">
						<div className="space-y-2 animate-pulse">
							<div className="h-4 w-32 bg-slate-200 rounded" />
							<div className="h-4 w-40 bg-slate-200 rounded ml-4" />
							<div className="h-4 w-36 bg-slate-200 rounded ml-4" />
							<div className="h-4 w-28 bg-slate-200 rounded ml-8" />
							<div className="h-4 w-32 bg-slate-200 rounded ml-4" />
						</div>
					</aside>

					{/* Content skeleton */}
					<main className="flex-1">
						<div className="animate-pulse space-y-6">
							{/* Title skeleton */}
							<div className="h-10 w-3/4 bg-slate-200 rounded" />

							{/* Content skeleton */}
							<div className="space-y-4">
								<div className="h-4 w-full bg-slate-200 rounded" />
								<div className="h-4 w-full bg-slate-200 rounded" />
								<div className="h-4 w-5/6 bg-slate-200 rounded" />
								<div className="h-4 w-full bg-slate-200 rounded" />
								<div className="h-4 w-4/6 bg-slate-200 rounded" />
								<div className="h-32 w-full bg-slate-200 rounded mt-8" />
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
