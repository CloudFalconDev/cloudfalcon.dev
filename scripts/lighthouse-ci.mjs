#!/usr/bin/env node

/**
 * Lighthouse CI Script
 * Runs Lighthouse tests and outputs results
 */

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;
const PRESET = process.env.PRESET || "desktop"; // desktop, mobile, or perf
const FORM_FACTOR = process.env.FORM_FACTOR || PRESET; // mobile or desktop

async function runLighthouse() {
  console.log("🚀 Starting Lighthouse performance test...");
  console.log(`📊 Testing: ${URL}`);
  console.log(`📱 Preset: ${PRESET}`);
  console.log(`🖥️  Form Factor: ${FORM_FACTOR}\n`);

  // Launch Chrome with optimized flags
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ],
  });

  // Build options with preset and form factor
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance"],
    port: chrome.port,
    ...(PRESET === "mobile" && { preset: "mobile" }),
    ...(PRESET === "desktop" && { preset: "desktop" }),
    ...(PRESET === "perf" && { preset: "perf" }),
    formFactor: FORM_FACTOR,
    screenEmulation: {
      mobile: FORM_FACTOR === "mobile",
      width: FORM_FACTOR === "mobile" ? 412 : 1350,
      height: FORM_FACTOR === "mobile" ? 732 : 940,
      deviceScaleFactor: FORM_FACTOR === "mobile" ? 2.625 : 1,
    },
    throttling: {
      rttMs: FORM_FACTOR === "mobile" ? 150 : 40,
      throughputKbps: FORM_FACTOR === "mobile" ? 1638.4 : 10240,
      cpuSlowdownMultiplier: FORM_FACTOR === "mobile" ? 4 : 1,
    },
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
    const reportFileName = `lighthouse-report-${PRESET}.html`;
    const reportPath = path.join(lighthouseDir, reportFileName);
    fs.writeFileSync(reportPath, reportHtml);
    console.log(`✅ Report saved to: ${reportPath}`);

    // Also save JSON report for programmatic access
    const reportJson = JSON.stringify(runnerResult.lhr, null, 2);
    const jsonFileName = `lighthouse-report-${PRESET}.json`;
    const jsonPath = path.join(lighthouseDir, jsonFileName);
    fs.writeFileSync(jsonPath, reportJson);
    console.log(`✅ JSON report saved to: ${jsonPath}`);

    // Extract scores
    const lhr = runnerResult.lhr;
    const performanceScore = lhr.categories?.performance?.score;
    const scores = {
      performance: performanceScore ? Math.round(performanceScore * 100) : 0,
      firstContentfulPaint: Math.round(
        lhr.audits["first-contentful-paint"]?.numericValue || 0
      ),
      largestContentfulPaint: Math.round(
        lhr.audits["largest-contentful-paint"]?.numericValue || 0
      ),
      totalBlockingTime: Math.round(
        lhr.audits["total-blocking-time"]?.numericValue || 0
      ),
      cumulativeLayoutShift:
        lhr.audits["cumulative-layout-shift"]?.numericValue || 0,
    };

    console.log("\n📈 Performance Scores:");
    console.log(`   Performance: ${scores.performance}/100`);
    console.log(`   First Contentful Paint: ${scores.firstContentfulPaint}ms`);
    console.log(
      `   Largest Contentful Paint: ${scores.largestContentfulPaint}ms`
    );
    console.log(`   Total Blocking Time: ${scores.totalBlockingTime}ms`);
    console.log(
      `   Cumulative Layout Shift: ${scores.cumulativeLayoutShift.toFixed(3)}`
    );

    // Check thresholds
    const thresholds = {
      performance: 90,
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      totalBlockingTime: 200,
      cumulativeLayoutShift: 0.1,
    };

    console.log("\n🎯 Thresholds:");
    console.log(
      `   Performance: ${
        scores.performance >= thresholds.performance ? "✅" : "❌"
      } ${scores.performance}/100 (target: ${thresholds.performance})`
    );
    console.log(
      `   FCP: ${
        scores.firstContentfulPaint <= thresholds.firstContentfulPaint
          ? "✅"
          : "❌"
      } ${scores.firstContentfulPaint}ms (target: ${
        thresholds.firstContentfulPaint
      }ms)`
    );
    console.log(
      `   LCP: ${
        scores.largestContentfulPaint <= thresholds.largestContentfulPaint
          ? "✅"
          : "❌"
      } ${scores.largestContentfulPaint}ms (target: ${
        thresholds.largestContentfulPaint
      }ms)`
    );
    console.log(
      `   TBT: ${
        scores.totalBlockingTime <= thresholds.totalBlockingTime ? "✅" : "❌"
      } ${scores.totalBlockingTime}ms (target: ${
        thresholds.totalBlockingTime
      }ms)`
    );
    console.log(
      `   CLS: ${
        scores.cumulativeLayoutShift <= thresholds.cumulativeLayoutShift
          ? "✅"
          : "❌"
      } ${scores.cumulativeLayoutShift.toFixed(3)} (target: ${
        thresholds.cumulativeLayoutShift
      })`
    );
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
