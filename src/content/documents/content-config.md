---
title: Configuring Content
description: Configuring Content
order: 40
---

# Configuring Content

Content is configured in `public/admin/config.yml`. The content is then exposed to Astro in `src/content.config.ts`.

```text
/
├── public/
│   └── admin/
│       └── config.yml (Decap Content Settings)
└── src/
    └── content.config.ts (Bridge Content from Decap to Contentful)
```

## Decap Widget Types

Decap CMS provides various widget types for different content input needs. Each widget type has specific configuration options and use cases.

### Basic Text Widgets

#### String Widget

For single-line text input, useful for URLs:

```yaml
- { label: 'Site Title', name: 'title', widget: 'string', required: false }
```

#### Text Widget

For multi-line text input:

```yaml
- { label: 'Description', name: 'description', widget: 'text', required: false }
```

#### Formatted Text Widget

Formatted text input with rich formatting support, allows for bold, italic, superscript, and subscript. Useful for titles.

**Note**: This outputs text as HTML. Make sure that you render the HTML in your template.

Astro: `<p set:html={page.content[2].formattedText} />`

Vue: `<div v-html="product.description" />`

```yaml
- { label: 'Description', name: 'description', widget: 'formatted-text', required: false }
```

#### Markdown (Rich Text) Widget

For rich text content with markdown support:

```yaml
- { label: 'Body', name: 'body', widget: 'markdown' }
```

### Media Widgets

#### Image Widget

For image uploads with optional media library configuration:

```yaml
- label: 'Image'
  name: 'image'
  widget: 'image'
  media_library:
    config:
      multiple: false
```

### Selection Widgets

#### Select Widget

For dropdown selections with predefined options:

```yaml
- label: 'Code'
  name: 'code'
  widget: 'select'
  options:
    - { label: 'Science', value: 'sci' }
    - { label: 'Economics', value: 'eco' }
    - { label: 'Grammar', value: 'gra' }
```

#### Boolean Widget

For true/false checkboxes:

```yaml
- { label: 'Is Selected', name: 'isSelected', widget: 'boolean' }
```

#### Color Widget

For color picker with optional manual input:

```yaml
- { label: 'Color', name: 'color', widget: 'color', allow_input: true }
```

### Complex Widgets

#### List Widget

For repeatable content blocks:

```yaml
- label: 'Items'
  name: 'items'
  widget: 'list'
  fields:
    - { label: 'Value', name: 'value', widget: 'string' }
    - { label: 'ID', name: 'id', widget: 'string' }
```

#### Object Widget

For grouped fields with optional summary preview:

```yaml
- label: 'Text Block'
  name: 'textBlock'
  widget: 'object'
  summary: '{{fields.text}}'
  fields:
    - label: 'Text'
      name: 'text'
      widget: 'text'
      required: false
```

#### List with Types

For lists with multiple content block types:

```yaml
- label: 'Content'
  name: 'content'
  widget: 'list'
  types:
    - label: 'Text'
      name: 'textBlock'
      widget: 'object'
      fields:
        - { label: 'Text', name: 'text', widget: 'text' }
    - label: 'Image'
      name: 'imageBlock'
      widget: 'object'
      fields:
        - { label: 'Image', name: 'image', widget: 'image' }
        - { label: 'Alt Text', name: 'alt', widget: 'string' }
```

### Common Widget Options

- `required: false` - Makes field optional
- `i18n: true` - Enables internationalization support
- `summary: "{{fields.fieldName}}"` - Sets preview text for object widgets
- `multiple: false` - Controls multiple file selection for media widgets

### Widget Configuration Best Practices

1.  **Use appropriate widget types** - Match the widget to your content type
2.  **Set meaningful labels** - Use clear, descriptive labels for content editors
3.  **Configure required fields** - Mark essential fields as required
4.  **Provide helpful summaries** - Use summary templates for object widgets to improve editor experience
5.  **Structure complex content** - Use list and object widgets for flexible, structured content
