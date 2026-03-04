---
title: Resources Listing
description: Resources Listing
order: 25
---

# Resource Listing

- The example page can be found here `/src/pages/resource-listing.astro` in your codebase.
- Unlike Single Pages, Resources are an _example only_ and need to be modified to match the project's particular resource types.
- Resources can be used in conjunction with the `useSearch` composable: see [resource search](/documentation/resource-search).

## Default Types

Resources are made up of two types:

![Resource Types](/images/docs/resource-types.png)

- **Items**: the resources themselves
- **Filters**: Used for tagging and/or filtering

## Editing the Content

You can edit the structure in `/public/admin/config.yml`. The content will appear in `.yml` files here `/src/content/resources/items.yml`.

## Making the Content Available

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

## Page Content

Once you've created or edited the content, you can include it in your pages like this:

```javascript
---
import { getDecapCollection } from '@lib/AstroDecap';
const items = await getDecapCollection('items')
---

<ul>
  {items && items.map(item => (
    <Card
      name={item.value}
      courseCode={item.code}
      description={item.imageAlt}
      imageUrl={item.imageSrc}
    />
  ))}
</ul>
```

For more information: Check out the resource listing template `/src/pages/resource-listing.astro`.

**Note**: If you need search capabilities, check out [Resource Search](/documentation/resource-search).
