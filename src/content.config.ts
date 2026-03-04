import { defineCollection, z } from "astro:content";
import { decapLoader } from "@lib/decap-loader";
import { glob } from "astro/loaders";

const settings = defineCollection({
	loader: decapLoader({ filePath: "src/content/_settings/general.yml" }),
});

const social = defineCollection({
	loader: decapLoader({ filePath: "src/content/_settings/social.yml" }),
});

const documents = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/documents" }),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		order: z.number().optional(),
	}),
});

const items = defineCollection({
	loader: decapLoader({ filePath: "src/content/resources/items.yml" }),
});

const filters = defineCollection({
	loader: decapLoader({ filePath: "src/content/resources/filters.yml" }),
});

// Expose your defined collections to Astro with the `collections` export
export const collections = {
	documents,
	items,
	filters,
	settings,
	social,
};
