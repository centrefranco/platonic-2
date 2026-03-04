---
title: Accessibility Testing
description: Accessibility Testing
order: 70
---

## 🧪 Accessibility Testing

The project includes automated accessibility testing using Playwright and axe-core.
These tests check all pages for compliance with WCAG 2.1 A and AA standards.
Note that these tests aren't exhaustive, so additional testing may be required.

To run the accessibility tests:

```bash
npm run test
```

This will launch a server usually hosted on [localhost:9323](http://localhost:9323). When checking out individual
issues, make sure to open `Attachments > stdout` to see the issue details.

**N.B.** If pages are being dynamically generated, make sure to create appropriate tests. `tests/accessibility.spec.ts`
has a commented out test to get your started.
