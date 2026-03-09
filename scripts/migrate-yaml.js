const { readFileSync, writeFileSync } = require("fs");
const { load, dump } = require("js-yaml");
const crypto = require("crypto");

function generateUUID() {
	return crypto.randomUUID();
}

function kebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-+/g, "-"); // Normalize multiple hyphens
}

function validateSlug(slug, existingSlugs) {
	if (!slug || typeof slug !== "string") {
		throw new Error("Slug must be a non-empty string");
	}
	if (!/^[a-z0-9-]+$/.test(slug)) {
		throw new Error(
			`Invalid slug format: "${slug}". Only lowercase letters, numbers, and hyphens allowed.`,
		);
	}
	if (existingSlugs.has(slug)) {
		throw new Error(
			`Duplicate slug: "${slug}". Slugs must be unique within the collection.`,
		);
	}
	return true;
}

function migrateYaml(filePath, collectionKey) {
	try {
		console.log(`Processing ${filePath}...`);
		const content = readFileSync(filePath, "utf8");
		const data = load(content);
		const existingSlugs = new Set();

		if (data[collectionKey] && Array.isArray(data[collectionKey])) {
			data[collectionKey] = data[collectionKey].map((item, index) => {
				const name = item.name || item.value;
				const slug =
					item.slug || (name ? kebabCase(name) : `item-${index + 1}`);

				// Validate slug uniqueness
				validateSlug(slug, existingSlugs);
				existingSlugs.add(slug);

				return {
					...item,
					id: item.id || generateUUID(),
					name: name || `Unnamed Item ${index + 1}`,
					slug: slug,
				};
			});
		}

		writeFileSync(filePath, dump(data, { indent: 2 }));
		console.log(
			`✅ Migrated ${filePath} - ${data[collectionKey].length} items processed`,
		);
	} catch (error) {
		console.error(`❌ Migration failed for ${filePath}: ${error.message}`);
		throw error;
	}
}

// Usage
migrateYaml("src/content/resources.yml", "resources");
migrateYaml("src/content/resourceFilters.yml", "resourceFilters");
