const fs = require("node:fs");
const path = require("node:path");

const CONTENT_DIRS = ["blog", "docs"];
const PUBLIC_IMG_DIR = path.join(process.cwd(), "public/images");

function walk(dir, callback) {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filepath = path.join(dir, file);
		const stats = fs.statSync(filepath);
		if (stats.isDirectory()) {
			walk(filepath, callback);
		} else if (stats.isFile()) {
			callback(filepath);
		}
	});
}

CONTENT_DIRS.forEach((type) => {
	const contentDir = path.join(process.cwd(), "content", type);
	const outputBaseDir = path.join(PUBLIC_IMG_DIR, type);

	if (!fs.existsSync(contentDir)) return;

	walk(contentDir, (filepath) => {
		if (!filepath.endsWith(".md") && !filepath.endsWith(".mdx")) return;

		let content = fs.readFileSync(filepath, "utf8");
		const mdDir = path.dirname(filepath);

		// Regex for markdown images ![alt](url) and HTML src="url"
		const regex = /!\[.*?\]\((.*?)\)|src=["'](.*?)["']/g;
		const replacements = [];
		const matches = content.matchAll(regex);

		for (const match of matches) {
			const link = match[1] || match[2];
			// Filter out external links, absolute links, and anchors
			if (
				!link ||
				link.startsWith("http") ||
				link.startsWith("/") ||
				link.startsWith("#") ||
				link.startsWith("mailto:")
			)
				continue;

			// Clean link
			const cleanLink = link.split(/[?#]/)[0];

			try {
				const imgPath = path.resolve(mdDir, cleanLink);

				if (fs.existsSync(imgPath) && fs.lstatSync(imgPath).isFile()) {
					const relPath = path.relative(contentDir, imgPath);
					const destPath = path.join(outputBaseDir, relPath);

					fs.mkdirSync(path.dirname(destPath), { recursive: true });
					fs.copyFileSync(imgPath, destPath);

					// Web path
					const webPath = `/images/${type}/${relPath.split(path.sep).join("/")}`;
					replacements.push({ old: link, new: webPath });
				}
			} catch (e) {
				console.error(`Error processing ${link} in ${filepath}:`, e.message);
			}
		}

		if (replacements.length > 0) {
			replacements.forEach((r) => {
				content = content.split(r.old).join(r.new);
			});
			fs.writeFileSync(filepath, content);
			console.log(`Updated ${filepath}: moved ${replacements.length} images.`);
		}
	});
});
