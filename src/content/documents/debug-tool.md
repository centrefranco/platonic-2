---
title: Debug Tool
description: Debug Tool
order: 45
---

# Debug Tool

The debug tool is part of the `Layout.astro` file. By default, both the _general settings_ and the _social settings_ are included.

## Passing values to the debug tool

To view values in the debug tool, pass a value to the layout.

```jsx
<Layout debug={some_object}>{/* ... markup ... */}</Layout>
```

or multiple values can be passed as an object:

```jsx
<Layout debug={{ some_object, some_other_objects }}>
  {/* ... markup ... */}
</Layout>
```

## Using the Debug Tool

### Shortcut

Use the **/** key to bring up the debug tool with the search field in focus, and **/** again to close it.

### Copy Paths

![Debug Tool Click](/images/docs/debug-tool-click.png)

**Clicking on a field copies the path** to that field to your clipboard, which can be pasted in your code.

### Dropdown Options

The dropdown gives you the option to view the specific field you're search for only using `Show Field Only`.

![Debug Tool Dropdown](/images/docs/debug-tool-dropdown.png)

The default setting is `Show Related Fields` which shows you the found field and it's sibling fields, which is useful when
searching for content by `id` for example.
