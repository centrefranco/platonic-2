---
title: Single Page
description: Editable Pages
order: 20
---

# Single Page Example

Since single pages tend to have a structures that are not repeated, it's best to build those pages using flexible content blocks (similar to the magazines).

You can see a working example here [Single Page](/single-page) which is located here `/src/pages/single-page.astro` inside the codebase.

## Default Types

By default, the two content types for single pages are **images** and **text**. You can create additional types, but this should at least get your started.

![Single Page Default Types](/images/docs/single-page-default-types.png)

## Page Content

```javascript
---
import { getDecapPage } from '@lib/AstroDecap'
const page = await getDecapPage('home') // 'home' as defined in config.yml
---

// Pass 'page' to the Layout debug attribute to see the values in the debug tool
<Layout title="Home" debug={{ page }}>
  {page.title}
</Layout>
```

- [Single Page](/single-page)

## Configuring Types

To configure individual pages, you can edit the decap settings located in `/public/admin/config.yml`.

```yaml
  # Page Type
  - label: 'Pages'
    label_singular: 'Page'
    name: 'pages'
    files:

  # Individual Pages
      - label: 'Home Page'
        name: 'home' # Used to fetch content using getDecapPage
        file: 'src/content/pages/home.yml'
        fields:

  # Page "Components"
          - label: "Content"
            name: "content"
            required: false
            widget: "list"

  # Individual Components Shown in the Content Dropdown
              - label: "Text"
                name: "textBlock"
                widget: "object"
                summary: "{{fields.text}}"
```

For more information on configuration and decap types visit [Decap Widgets](https://decapcms.org/docs/widgets/).
