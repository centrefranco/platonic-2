// https://docs.astro.build/en/guides/content-collections/#building-a-custom-loader
// https://docs.astro.build/en/reference/content-loader-reference/

import { existsSync, readFileSync } from "node:fs";
import { AstroError } from "astro/errors";
import type { Loader, LoaderContext } from "astro/loaders";
import yaml from "js-yaml";
import { hasOnlyRootElement } from "./decap-utils.ts";
// import { UUID } from '@universal/mag/lib/utils.js'

type DecapLoaderProps = {
	filePath: string;
	options?: object;
};

export function decapLoader({ filePath, options }: DecapLoaderProps): Loader {
	const syncData = async (
		filePath: string,
		store: any,
		parseData: any,
		logger: any,
	) => {
		if (!existsSync(filePath)) {
			throw new AstroError(`File not found: ${filePath}`);
		}

		let content: Record<string, any>;
		try {
			const fileContent = readFileSync(filePath, "utf-8");
			content = yaml.load(fileContent);
		} catch (error) {
			throw new AstroError(`Error reading file ${filePath}: ${error}`);
		}

		store.clear();

		const rootElement = hasOnlyRootElement(content);

		if (!rootElement) {
			const uuid = crypto.randomUUID();
			const parsedData = await parseData({
				id: uuid,
				data: content,
				filePath,
			});

			store.set({
				id: uuid,
				data: parsedData,
				filePath,
			});

			return;
		}

		for (const value of rootElement ? content[rootElement] : content) {
			try {
				const parsedData = await parseData({
					id: value.id,
					data: value,
					filePath,
				});

				store.set({
					id: value.id,
					data: parsedData,
					filePath,
				});
			} catch (error) {
				logger.error(`Error processing entry with id ${value.id}: ${error}`);
			}
		}
	};

	return {
		name: "decap-loader",
		load: async ({
			logger,
			parseData,
			store,
			watcher,
			config,
		}: LoaderContext) => {
			logger.info(`Loading Decap data from ${filePath}`);
			await syncData(filePath, store, parseData, logger);

			watcher?.on("change", async (changedPath) => {
				if (changedPath === filePath) {
					logger.info(`Reloading data from ${filePath}`);
					await syncData(filePath, store, parseData, logger);
				}
			});
		},
	};
}
