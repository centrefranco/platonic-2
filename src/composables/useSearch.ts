import "@lib/extend-primitives";
import { computed, reactive, ref, watch } from "vue";

export type Resource = {
	id: string;
	value: string;
	[key: string]: any; // Whatever other necessary fields
};

export type ResourceFilter = {
	id: string;
	name: string;
	options: Option[];
};

export type Option = {
	value: string;
	label: string;
	isSelected: boolean;
};

export const useSearch = (
	resources: Resource[],
	resourceFilters: ResourceFilter[],
	queryFuzziness = 1,
) => {
	const filterUpdateTrigger = ref(0);
	const state = reactive({
		query: "",
		resourceFilters: resourceFilters,
		resources: resources,
	});

	const query = computed({
		get: () => state.query,
		set: (value: string) => (state.query = value),
	});

	watch(
		() => state.resourceFilters,
		() => {
			filterUpdateTrigger.value++;
		},
		{ deep: true }, // Watch nested resourceFilter properties i.e., isSelected
	);

	const filteredResources = computed(() => {
		const _ = filterUpdateTrigger.value;
		if (!state.query && !hasResourceFilterApplied(state.resourceFilters))
			return state.resources;

		return state.resources.filter((resource) =>
			state.query.length === 0
				? isResourceMatched(state.resourceFilters, resource)
				: state.query.length > 0 &&
						!hasResourceFilterApplied(state.resourceFilters)
					? isStringMatched(resource.name, state.query, queryFuzziness)
					: isStringMatched(resource.name, state.query, queryFuzziness) &&
						isResourceMatched(state.resourceFilters, resource),
		);
	});

	return {
		query,
		filteredResources,
		resourceFilters: state.resourceFilters,
	};
};

const hasResourceFilterApplied = (resourceFilters: ResourceFilter[]) => {
	return resourceFilters.some((resourceFilter) =>
		resourceFilter.options.some((option) => option.isSelected),
	);
};

const isResourceMatched = (
	resourceFilters: ResourceFilter[],
	resource: Resource,
) => {
	if (!resourceFilters || !resource) return false;

	for (const resourceFilter of resourceFilters) {
		const isMatched = resourceFilter.options
			.filter((option) => option.isSelected)
			.some((option) =>
				isStringMatched(option.value, resource?.[resourceFilter.id]),
			);

		if (isMatched) return true;
	}

	return false;
};

const isStringMatched = (a: string, b: string, fuzziness = 0) => {
	if (!a || !b) return false;

	return removeDiacritics(a)
		.trim()
		.toLowerCase()
		.includesFuzzy(removeDiacritics(b).trim().toLowerCase(), fuzziness);
};

const removeDiacritics = (str: string) => {
	return typeof str === "string"
		? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		: "";
};
