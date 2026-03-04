---
title: What's in the bag?
description: Tech stack
order: 5
---

## What's in the Bag?

When creating new projects, a copy of this repo made, which means that everything inside your project is customizable.
Feel free to modify any code according to your needs. If you discover improved implementations or best practices you'd
like to share with other developers, please feel free to submit a Pull Request (PR) to the [Platonic repo](https://github.com/centrefranco/platonic/pulls).

## Platonic Functionality

Here's what's built into Platonic:

- `/src/lib/AstroDecap` library of functions help bridge Decap and Astro
- `/scripts/boostrap.js` serves both Astro and Decap on the same port, triggered by `npm run dev:all`. This will ensure auto refresh on content changes (you no longer have to re-run `npm run preview`), and everything is served on the same port.
- MarkerIO is built in by default
- Google Analytics is included and configured using Decap
- `<Meta>` component used for site meta-information, and is also configured using Decap
- The `<DebugTool>` is built-in, with Decap site and social settings included by default
- An editable `<Socials>` component is included `/src/components/Socials.astro` which is integrated into Decap.
- An editable `useSearch` composable which integrates with Decaps `items` and `filters`. Includes a `fuzziness` parameter.
- Includes a documentation section which serves both as developer documentation and a documentation site example
- A configurable playwright-based test suite that includes [accessibility testing](/documentation/accessibility-testing) using `npm run test`
- A series of examples contained in `/src/pages`
- By default, the resource view template uses the `<Schema>` component which helps with search indexing.
- Default [path aliases](/documentation/path-aliases) e.g. `import MyComponent from '@universal/shared/MyComponent'`

## Tech Stack

- [Astro](https://docs.astro.build/en/basics/project-structure/) - Core framework
- [Tailwind 4.x](https://tailwindcss.com/docs/styling-with-utility-classes) - CSS utilities
- [Vue](https://vuejs.org/guide/introduction.html) - UI components
- [Vue Use](https://vueuse.org/functions.html) - Composition utilities
- [Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/marketing) - Premium components
  - [Heroicons](https://heroicons.com/) - Tailwind Icons
  - [Headless UI](https://headlessui.com/v1/vue) - Interactivity and animations for components
- [Universal Components](https://github.com/centrefranco/components-universal) - Shared library
- [Font Awesome Pro](https://fontawesome.com/search) - Icon system
- [Playwright](https://playwright.dev/docs/writing-tests) - E2E testing
