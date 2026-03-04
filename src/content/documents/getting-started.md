---
title: Getting Started
description: Development Overview
order: 15
---

# Getting Started

## Installation

```bash
npm install # Install dependencies
git submodule update --init # Initialize and Download Universal Components
npx playwright install # Setup accessibility testing
```

## Additional Setup / Dev Notes

- Copy `.env.example` to `.env`
- Node Version Manager tends to have difficulty across platforms. Consider
  using [Volta](https://docs.volta.sh/guide/getting-started).
- Ensure that decap is properly configured `public/admin/config.yml` (Heavily commented config)
- Content changes by the Project Managers or Content Creators are commited to the `test` branch. The ideal development process is to **pull and merge content changes from `test` into `dev` before pushing**.
- The development sites are hidden behind passwords. The username / password combo is included in the README.md

## Running Decap

Before running decap, make sure that it's properly configured `public/admin/config.yml`. Once configured,
you'll need to run the following commands in two separate terminal windows:

```bash
# Run Astro/Decap platform
npm run dev:all
```

This will run a local instance here: [localhost:4321/admin](http://localhost:4321/admin).

More instructions at https://decapcms.org/docs/working-with-a-local-git-repository/

## Code Examples / Use Cases

Every example template has corresponding decap content. Visit the documentation below as well as the associated template
to get started.

- [Single Page](/single-page) located `/src/pages/single-page.astro`
- [Documentation](/documentation) located `/src/pages/documentation/`
- [Resource Listing](/resource-listing) located `/src/pages/resource-listing.astro`
- [Resource Search](/resource-search) located `/src/pages/resource-search.astro`
- [Resource View](/resource-view/2b6e6c8e-4e1a-4c2a-9b3a-1e2f3d4c5b6a) located `/src/pages/resource-view/[id].astro`

## Accessibility Testing

As part of the development process, make sure you're passing the Axe accessibility tests. They aren't exhaustive, but will
catch a lot of basic accessibility issues.

To run the accessibility tests:

```bash
npm run test
```

This will launch a server with details regarding the accessibility violations. It includes screenshots.

## Basic Commands

For additional commands go to the [Useful Commands](/documentation/useful-commands) section.
