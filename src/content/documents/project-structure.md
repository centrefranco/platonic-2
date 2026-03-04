---
title: Project Structure
description: Understanding Architecture
order: 10
---

## 🚀 Project Structure

The files and folders that are critical to development:

```text
/
├── public/
│   └── admin/
│       └── config.yml (Decap Content Settings)
├── src/
│   ├── content/ (Site content: .yml or .md)
│   │   ├── _settings/ (Standardized Site Settings)
│   │   │  ├── general.yml (Standardized Site Settings)
│   │   │  └── social.yml (Social Settings)
│   │   ├── documents/ (Content for documentation sites)
│   │   ├── pages/ (Content for single pages)
│   │   └── resources/ (Content for resource listing/search)
│   ├── layouts/
│   │   └── Layout.astro (Default Layout)
│   ├── pages/
│   │   ├── admin.astro (Decap Content Admin)
│   │   ├── index.astro
│   │   ├── resources-listing.astro (Code Example)
│   │   ├── resource-search.astro (Code Example)
│   │   └── single-page.astro (Code Example)
│   ├── src/lib/
│   │   └── AstroDecap/ (Functionality to import Decap content into Astro)
│   └── content.config.ts (Bridge Content from Decap to Contentful)
├── tests/
│   └── accessibility.spec.ts (Accessibility Tests)
├── astro.config.mjs
├── package.json
└── tailwind.config.js
```

## Content Config

The two most important files when it comes to configuring content are:

- `/public/admin/config.yml` which is the decap configuration
- `/src/content.config.ts` which makes your decap content visible to Astro

## Platonic API

For the most part Platonic works behind the scenes, however some default Astro functions have been substituted and are
part of the **AstroDecap** interface.

```javascript
import {
  getDecapCollection, // Replaces Astro's getCollection
  getDecapPage, // Used for single page content
  getDecapConfig, // Used to see decap's config, primarily used for debugging
} from '@lib/AstroDecap'
```

Individual functions are located in the `/src/lib/AstroDecap` folder.

## Layout

The layout is located in Astro's default layout folder `/src/layouts/`. The primary layout `Layout.astro` has some
built-in features.

### Page Title

To change the title of an individual page, pass the value to the Layout.

```jsx
<Layout title="My Page Title">{/* ... markup ... */}</Layout>
```

### Debug Tool

Values can be passed into the debug tool as objects.

```jsx
<Layout debug={{ some_value }}>{/* ... markup ... */}</Layout>
```

To learn more about the folder structure of an Astro project, refer
to [the official documentation](https://docs.astro.build/en/basics/project-structure/).
