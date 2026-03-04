<template>
  <nav
    v-if="items"
    :class="[
      'fixed top-20 right-8 z-50 bg-white shadow-lg rounded-lg p-5 hover:shadow-xl',
      'transition-all duration-300 ease-in-out animate-pulse-subtle',
    ]"
  >
    <ul class="space-y-3">
      <li v-for="item in items" :key="item.slug">
        <a
          :href="`${documentId}#${item.slug}`"
          :class="[
            'block font-medium transition-all duration-200 ease-in-out hover:scale-101 transform',
            activeItem === item.slug
              ? 'text-blue-600'
              : 'text-gray-800 hover:text-blue-600',
          ]"
          @click="handleLinkClick(item.slug, $event)"
        >
          {{ item.text.truncate(34) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import '@lib/extend-primitives.js'
import { useInViewNavigation } from '@composables/useInViewNavigation'
import { ref } from 'vue'
const props = defineProps({
  documentId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

const itemsRef = ref(props.items)
const { activeItem, handleLinkClick } = useInViewNavigation(itemsRef)
</script>
