#!/bin/bash
# Comprehensive check script for all code quality checks

set -e

echo "🔍 Running comprehensive code quality checks..."
echo ""

echo "📝 Checking Biome (JS/TS/JSON)..."
npm run check:js || exit 1

echo ""
echo "🎨 Checking Stylelint (CSS)..."
npm run check:css || exit 1

echo ""
echo "📘 Checking TypeScript types..."
npm run type-check || exit 1

echo ""
echo "✅ All checks passed!"
