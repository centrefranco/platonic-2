---
title: Documentation
description: Documentation
order: 37
---

## Documentation

Documentation is different from other content in that it leverages markdown files `.md` instead of `.yml` files.

![Documentation](/images/docs/documentation.png)

- The example pages can be found in this sub-folder `/src/pages/documentation/`.
- The contents can be found in `/src/content/documents/`
- This very documentation is an example of how to build a documentation site
- As shown above, documentation can be edited in the Decap admin screen via the **Documents** tab

### Document Ordering

Documents can be ordered using a weight system. The higher the relative weight, the further down it will go in the list.
**For example**: A file with the weight of `25` will appear below one with the weight of `10`.

![Document Ordering](/images/docs/document-ordering.png)

## Templates

There are two templates:

- `/src/pages/documentation/index.astro` which is a landing page that points to the documentation
- `/src/pages/documentation/[slug].astro` which generates individual pages

For more info on the markdown format check this out [Markdown - Basic Syntax](https://www.markdownguide.org/basic-syntax/).
