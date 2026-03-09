const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const { load, dump } = require("js-yaml");
const { join } = require("path");

function splitYamlArrays(filePath, collectionKey, outputDir) {
	const content = readFileSync(filePath, "utf8");
	const data = load(content);

	if (!existsSync(outputDir)) {
		mkdirSync(outputDir, { recursive: true });
	}

	if (data[collectionKey] && Array.isArray(data[collectionKey])) {
		data[collectionKey].forEach((item, index) => {
			const slug = item.slug || `item-${index + 1}`;
			let filename = `${slug}.yml`;
			let filePath = join(outputDir, filename);

			// Ensure unique filename
			let counter = 1;
			while (existsSync(filePath)) {
				const baseSlug = slug.replace(/-\d+$/, "");
				filename = `${baseSlug}-${counter}.yml`;
				filePath = join(outputDir, filename);
				counter++;
			}

			writeFileSync(filePath, dump(item, { indent: 2 }));
			console.log(`✅ Created ${filePath}`);
		});
	}
}

// Usage
splitYamlArrays(
	"src/content/resources.yml",
	"resources",
	"src/content/resources",
);
splitYamlArrays(
	"src/content/resourceFilters.yml",
	"resourceFilters",
	"src/content/resourceFilters",
);
