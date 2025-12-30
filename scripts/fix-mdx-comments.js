const fs = require("node:fs");
const path = require("node:path");

const CONTENT_DIRS = ["blog", "docs"];

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
	if (!fs.existsSync(contentDir)) return;

	walk(contentDir, (filepath) => {
		if (!filepath.endsWith(".md") && !filepath.endsWith(".mdx")) return;

		const content = fs.readFileSync(filepath, "utf8");

		// Replace <!-- truncate --> and <!--truncate--> with nothing
		// Also generic html comments if we want, but let's stick to truncate first.
		// Actually, MDX fails on ANY <!-- comment -->.
		// So I should replace ALL <!-- ... --> with empty string or valid comment.
		// But be careful not to break code blocks that might contain it (though rare in markdown to have html comment in code block without escaping).
		// Let's target truncate specifically first as it is the known offender.

		const regex = /<!--\s*truncate\s*-->/g;

		if (regex.test(content)) {
			const newContent = content.replace(regex, "");
			fs.writeFileSync(filepath, newContent);
			console.log(`Cleaned truncate tags from ${filepath}`);
		}
	});
});
