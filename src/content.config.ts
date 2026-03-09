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

const resources = defineCollection({
	loader: glob({ pattern: "**/*.yml", base: "./src/content/resources" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		description: z.string().optional(),
		code: z.string().optional(),
		color: z.string().optional(),
		size: z.string().optional(),
		href: z.string().optional(),
		price: z.string().optional(),
		imageSrc: z.string().optional(),
		imageAlt: z.string().optional(),
	}),
});

const resourceFilters = defineCollection({
	loader: glob({ pattern: "**/*.yml", base: "./src/content/resourceFilters" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		options: z
			.array(
				z.object({
					value: z.string(),
					label: z.string(),
					isSelected: z.boolean().optional(),
				}),
			)
			.optional(),
	}),
});

// Expose your defined collections to Astro with the `collections` export
export const collections = {
	documents,
	resources,
	resourceFilters,
	settings,
	social,
};
