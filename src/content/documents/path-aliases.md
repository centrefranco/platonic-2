---
title: Path Aliases
description: Path Aliases
order: 50
---

# Path Aliases

As a best practice, you should use path aliases instead of relative paths. Several path aliases are built into the
Platonic platform.

For instance:

```javascript
// ⚠ Bad
import MyComponent from '../../../components/universal/shared/MyComponent'

// Good
import MyComponent from '@universal/shared/MyComponent'
import { getDecapPage } from '@lib/AstroDecap'
import Layout from '@layouts/Layout.astro'
import Search from '@components/Search.vue'
```

## Default Configuration

```javascript
{
    '@assets': '/src/assets',
    '@composables': '/src/composables',
    '@content': '/src/content',
    '@layouts': '/src/layouts',
    '@lib': '/src/lib',
    '@pages': '/src/pages',
    '@styles': '/src/styles',
    '@universal': '/src/components/universal',
}
```

## Adding Path Aliases

To add a new path alias to your project, you need to configure it in two places:

- `astro.config.mjs`
- `tsconfig.json`
