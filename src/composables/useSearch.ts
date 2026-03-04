import '@lib/extend-primitives'
import { reactive, computed, watch, ref } from 'vue'

export type Item = {
  id: string
  value: string
  [key: string]: any // Whatever other necessary fields
}

export type Filter = {
  id: string
  name: string
  options: Option[]
}

export type Option = {
  value: string
  label: string
  isSelected: boolean
}

export const useSearch = (
  items: Item[],
  filters: Filter[],
  queryFuzziness = 1
) => {
  const filterUpdateTrigger = ref(0)
  const state = reactive({
    query: '',
    filters: filters,
    items: items,
  })

  const query = computed({
    get: () => state.query,
    set: (value: string) => (state.query = value),
  })

  watch(
    () => state.filters,
    () => {
      filterUpdateTrigger.value++
    },
    { deep: true } // Watch nested filter properties i.e., isSelected
  )

  const filteredItems = computed(() => {
    const _ = filterUpdateTrigger.value
    if (!state.query && !hasFilterApplied(state.filters)) return state.items

    return state.items.filter((item) =>
      state.query.length === 0
        ? isItemMatched(state.filters, item)
        : state.query.length > 0 && !hasFilterApplied(state.filters)
          ? isStringMatched(item.value, state.query, queryFuzziness)
          : isStringMatched(item.value, state.query, queryFuzziness) &&
            isItemMatched(state.filters, item)
    )
  })

  return {
    query,
    filteredItems,
    filters: state.filters,
  }
}

const hasFilterApplied = (filters: Filter[]) => {
  return filters.some((filter) =>
    filter.options.some((option) => option.isSelected)
  )
}

const isItemMatched = (filters: Filter[], item: Item) => {
  if (!filters || !item) return false

  for (const filter of filters) {
    const isMatched = filter.options
      .filter((option) => option.isSelected)
      .some((option) => isStringMatched(option.value, item?.[filter.id]))

    if (isMatched) return true
  }

  return false
}

const isStringMatched = (a: string, b: string, fuzziness = 0) => {
  if (!a || !b) return false

  return removeDiacritics(a)
    .trim()
    .toLowerCase()
    .includesFuzzy(removeDiacritics(b).trim().toLowerCase(), fuzziness)
}

const removeDiacritics = (str: string) => {
  return typeof str === 'string'
    ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : ''
}
