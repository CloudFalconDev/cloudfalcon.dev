#!/bin/bash

# Lighthouse Performance Test Script
# Tests local development server performance

PORT=${PORT:-3000}
URL="http://localhost:${PORT}"

echo "🚀 Starting Lighthouse performance test..."
echo "📊 Testing: ${URL}"
echo ""

# Check if server is running
if ! curl -s "${URL}" > /dev/null; then
	echo "❌ Error: Server not running on port ${PORT}"
	echo "💡 Start the dev server first: npm run dev"
	exit 1
fi

# Ensure .lighthouse directory exists
mkdir -p .lighthouse

# Run Lighthouse
npx lighthouse "${URL}" \
	--output=html \
	--output-path=./.lighthouse/lighthouse-report.html \
	--chrome-flags="--headless" \
	--only-categories=performance \
	--view

echo ""
echo "✅ Lighthouse report saved to: ./.lighthouse/lighthouse-report.html"
