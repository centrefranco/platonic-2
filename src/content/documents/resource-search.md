---
title: Resource Search
description: Resource Search
order: 35
---

## Resource Search

- The example page can be found here `/src/pages/resource-search.astro` in your codebase.
- Link to [Resource Search](/resource-search)
- Resources are an _example only_ and are meant to be modified.
- For search functionality, you can build your own, or use the `useSearch` composable.

### Default Types

Resources are made up of two types:

![Resource Types](/images/docs/resource-types.png)

- **Items**: the resources themselves
- **Filters**: Used for tagging and/or filtering. This is a requirement when using the `useSearch` composable.

## Editing the Content

You can edit the structure in `/public/admin/config.yml`. The content will appear in `.yml` files here `/src/content/resources/items.yml`.

**Important**: If you add new content, you need to make it available to Astro as a collection in `/src/content/content.config.ts`.

```javascript
const items = defineCollection({
  loader: decapLoader({ filePath: 'src/content/resources/items.yml' }),
})

const filters = defineCollection({
  loader: decapLoader({ filePath: 'src/content/resources/filters.yml' }),
})

// Expose your defined collections to Astro with the `collections` export
export const collections = {
  documents,
  items,
  filters,
  settings,
  social,
}
```

### Page Content

The Astro template is relatively lean in terms of code. Due to the dynamic nature of searching, the meat of the functionality is in the `.vue` file.

#### Astro Template

```astro
---
import Layout from '@layouts/Layout.astro'
import Search from '@components/Search.vue' // Vue component that does the heavy lifting
import { getDecapCollection } from '@lib/AstroDecap' // Use the AstroDecap lib to import content

const filters = await getDecapCollection('filters')
const items = await getDecapCollection('items')
---

<Layout title="Resource Search" debug={{ items, filters }}>
  <Search client:only="vue" items={items} filters={filters} />
</Layout>
```

#### Vue Template

Searching is dynamic in nature, and for that we'll create a _vue_ component. You can pass in both **filters** and **items** as props.
From there, you can either roll out your own solution or use the `useSearch` composable

```vue
<script setup lang="ts">
import { useSearch } from '@composables/useSearch'

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const SEARCH_FUZZINESS = 1
const { query, filteredItems, filters } = useSearch(
  props.items,
  props.filters,
  SEARCH_FUZZINESS
)
</script>

<template>
  <ul>
    <li v-for="product in filteredItems">
      {{ product.value }} - ${{ product.price }}
    </li>
  </ul>

  <div v-for="section in filters">
    <fieldset>
      <legend>{{ section.name }}</legend>
      <div v-for="(option, optionIdx) in section.options">
        <input
          v-model="option.isSelected"
          :id="`${section.id}-${optionIdx}`"
          :name="`${section.id}-${optionIdx}`"
          :value="option.value"
          type="checkbox"
        />
        <label :for="`${section.id}-${optionIdx}`">{{ option.label }}</label>
      </div>
    </fieldset>
  </div>
</template>
```

For more information, check out the template located in your codebase `/src/pages/resource-search.astro`.
