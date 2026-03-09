---
title: Resource View
description: Resource View
order: 30
---

# Resource View

- The template can be found here: `/src/pages/resource-view/[id].astro`
- The template dynamically generates based on the resources created in decap
- Example [Resource View](/resource-view/2b6e6c8e-4e1a-4c2a-9b3a-1e2f3d4c5b6a)

## Templating

At the core of dynamically generate content is the `getStaticPaths()` function, which fetches content and creates individual pages.
Fetch the content from decap using the following within said function:

```javascript
const resources = await getDecapCollection('resources')
```

For more information on `getStaticPaths()` visit [Astro Routing Reference](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths).

## Schema

You may have noticed the `<Schema>` component at the bottom of the template. This is used to help with <s>LLMs ripping page content</s> page rankings.
Make sure you're passing the correct values so the site gets properly indexed by search engines.

```jsx
<Schema
  course-name={resource?.value}
  course-code={resource?.code}
  keywords={resource?.value}
  image-url={resource?.imageSrc}
  language="fr-CA"
  orgUrl="https://www.apprentissageenligne.org/"
  orgName="Consortium d'apprentissage virtuel de langue française de l'Ontario"
/>
```
