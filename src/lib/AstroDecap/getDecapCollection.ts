import { getCollection } from "astro:content";
import type { Resource } from "@composables/useSearch";

const preparedResources = (rawResources: any) => {
	if (Array.isArray(rawResources) && rawResources.length === 1) {
		return rawResources[0].data as Resource;
	}

	return rawResources.map((resource: any) => resource.data as Resource);
};

const getDecapCollection = async (collectionName: string) => {
	const collection = await getCollection(collectionName);
	return preparedResources(collection);
};

export { getDecapCollection };
