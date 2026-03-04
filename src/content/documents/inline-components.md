---
title: Inline Components
description: Inline Components
order: 38
---

# Inline Components

Inline components allow you to embed interactive elements directly within your text content using a special syntax. The system automatically processes these components and renders them as proper HTML elements.

The components have associated templates which can be edited located here `/src/components/inline/`.

### Modal Triggers

Create clickable elements that trigger modals.

**Syntax:** `#modal_trigger(text | modal_id)`

**Example:** `#modal_trigger(Click here | my-modal)`

**Component:** `/src/components/inline/ModalTrigger.astro`

### Tooltips

Add hover tooltips to any text.

**Syntax:** `#tooltip(text | tooltip_text)`

**Example:** `#tooltip(Hover me | This is a helpful tooltip)`

**Component:** `/src/components/inline/Tooltip.astro`

### External Links

Create external links that open in a new tab with proper security attributes.

**Syntax:** `#external_link(text | url)`

**Example:** `#external_link(Visit Google | https://google.com)`

**Component:** `/src/components/inline/ExternalLink.astro`

## Usage in Code

The inline component processor is automatically applied to content loaded through:

- `getDecapCollection()` - for collection data
- `getDecapPage()` - for page data

This ensures that any content loaded from your CMS or markdown files will have inline components properly processed and rendered.

## Vue Modal Component

A complete Vue modal component is available that integrates seamlessly with the inline modal triggers.

### Modal Component

**Location:** `/src/component/Modal.vue`

**Usage:**

```vue
<Modal
  modalId="my-modal"
  title="Modal Title"
  content="Simple text content"
  client:load
/>

<!-- Or with custom content using slots -->
<Modal modalId="my-modal" title="Custom Modal" client:load>
  <p>Custom HTML content goes here</p>
</Modal>
```

**Props:**

- `modalId` (string, required): The ID that matches the modal trigger
- `title` (string, optional): Modal title displayed in the header
- `content` (string, optional): Simple text content (ignored if slot is used)

**Features:**

- Automatically responds to modal triggers with matching `modalId`
- Supports custom content through default slot
- Customizable footer through named slot
- Keyboard navigation (Escape key to close)

## Vue Composable for Modal Management

For Vue components that need to interact with modal triggers, use the `useModal` composable:

### useModal Composable

**Location:** `/src/composables/useModal.ts`

**Usage:**

```javascript
import { useModal } from '@composables/useModal'

const { isVisible, hide } = useModal('my-modal-id')
```

**Parameters:**

- `modalId` (string): The ID of the modal to manage

**Returns:**

- `isVisible` (ref): Reactive boolean indicating if the modal is visible
- `show()`: Function to show the modal
- `hide()`: Function to hide the modal
- `toggle()`: Function to toggle modal visibility

**Features:**

- Automatically detects clicks on elements with `data-modal-trigger` attribute matching the modalId
- Supports keyboard navigation (Escape key to close)
- Properly manages event listeners with Vue lifecycle hooks
- Can be controlled programmatically from within Vue components

**Example:**

```vue
<template>
  <div>
    <!-- Modal trigger created by inline component processor -->
    <!-- #modal_trigger(Open Settings | settings-modal) -->

    <!-- Manual controls -->
    <button @click="show()">Show Modal</button>
    <button @click="hide()">Hide Modal</button>

    <!-- Modal content -->
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <h2>Settings Modal</h2>
        <button @click="hide()">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useModal } from '@composables/useModal'

const { show, hide, isVisible } = useModal('settings-modal')
</script>
```
