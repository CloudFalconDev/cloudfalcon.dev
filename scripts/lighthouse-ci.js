#!/usr/bin/env node

/**
 * Lighthouse CI Script
 * Runs Lighthouse tests and outputs results
 */

const { default: lighthouse } = await import("lighthouse");
const chromeLauncher = await import("chrome-launcher");
const fs = require("node:fs");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

async function runLighthouse() {
	console.log("🚀 Starting Lighthouse performance test...");
	console.log(`📊 Testing: ${URL}\n`);

	// Launch Chrome
	const chrome = await chromeLauncher.launch({
		chromeFlags: ["--headless", "--no-sandbox"],
	});

	const options = {
		logLevel: "info",
		output: "html",
		onlyCategories: ["performance"],
		port: chrome.port,
	};

	try {
		// Run Lighthouse
		const runnerResult = await lighthouse(URL, options);

		// Ensure .lighthouse directory exists
		const lighthouseDir = path.join(process.cwd(), ".lighthouse");
		if (!fs.existsSync(lighthouseDir)) {
			fs.mkdirSync(lighthouseDir, { recursive: true });
		}

		// Save HTML report
		const reportHtml = runnerResult.report;
		const reportPath = path.join(lighthouseDir, "lighthouse-report.html");
		fs.writeFileSync(reportPath, reportHtml);
		console.log(`✅ Report saved to: ${reportPath}`);

		// Extract scores
		const lhr = runnerResult.lhr;
		const scores = {
			performance: Math.round(lhr.categories.performance.score * 100),
			firstContentfulPaint: Math.round(
				lhr.audits["first-contentful-paint"].numericValue,
			),
			largestContentfulPaint: Math.round(
				lhr.audits["largest-contentful-paint"].numericValue,
			),
			totalBlockingTime: Math.round(
				lhr.audits["total-blocking-time"].numericValue,
			),
			cumulativeLayoutShift: lhr.audits["cumulative-layout-shift"].numericValue,
		};

		console.log("\n📈 Performance Scores:");
		console.log(`   Performance: ${scores.performance}/100`);
		console.log(`   First Contentful Paint: ${scores.firstContentfulPaint}ms`);
		console.log(
			`   Largest Contentful Paint: ${scores.largestContentfulPaint}ms`,
		);
		console.log(`   Total Blocking Time: ${scores.totalBlockingTime}ms`);
		console.log(
			`   Cumulative Layout Shift: ${scores.cumulativeLayoutShift.toFixed(3)}`,
		);

		// Check if server is running
		const response = await fetch(URL);
		if (!response.ok) {
			throw new Error(`Server returned ${response.status}`);
		}
	} catch (error) {
		console.error("❌ Error running Lighthouse:", error.message);
		if (error.message.includes("ECONNREFUSED")) {
			console.error("\n💡 Make sure the dev server is running: npm run dev");
		}
		process.exit(1);
	} finally {
		await chrome.kill();
	}
}

runLighthouse();
