<template>
  <ul role="list" class="-mx-2 space-y-1">
    <li v-for="document in props.documents" :key="document.id">
      <!-- Without Children -->
      <a
        v-if="!document.headings"
        :href="`/documentation/${document.id}`"
        :class="[
          isActiveDocument(document)
            ? 'bg-blue-50 text-blue-600'
            : 'hover:bg-gray-50 text-gray-700',
          'block rounded-md py-2 pr-2 pl-10 text-sm/6 font-semibold',
        ]"
      >
        {{ document.data.title }}
      </a>

      <!-- With Children -->
      <Disclosure
        as="div"
        v-else
        v-slot="{ open }"
        :defaultOpen="isActiveDocument(document)"
      >
        <DisclosureButton
          :class="[
            isActiveDocument(document)
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50 text-gray-700',
            'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold',
            { 'rounded-b-none': open },
          ]"
          @click="navigateToDocument(document, $event)"
        >
          <ChevronRightIcon
            :class="[
              open ? 'rotate-90' : '',
              isActiveDocument(document)
                ? 'text-blue-500'
                : open
                  ? 'text-gray-500'
                  : 'text-gray-400',
              'size-5 shrink-0',
            ]"
            aria-hidden="true"
          />
          {{ document.data.title }}
        </DisclosureButton>
        <DisclosurePanel as="ul" class="mt-1 px-2">
          <li v-for="heading in filteredHeadings(document)" :key="heading.slug">
            <a
              :href="`/documentation/${document.id}#${heading.slug}`"
              :class="[
                isActiveDocument(document) && isActiveHeading(heading)
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50 text-gray-700',
                'block rounded-md py-2 pr-2 pl-9 text-sm/6',
              ]"
              @click.stop="handleLinkClick(heading.slug, $event)"
            >
              {{ heading.text }}
            </a>
          </li>
        </DisclosurePanel>
      </Disclosure>
    </li>
  </ul>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useInViewNavigation } from '@composables/useInViewNavigation'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  documents: {
    type: Array,
    required: true,
  },
  currentDocumentId: {
    type: String,
    required: true,
  },
})

const MIN_HEADING_DEPTH = 2 // Excludes H1
const MAX_HEADING_DEPTH = 2 // Includes H2 only

const filteredHeadings = (document) => {
  return document.headings.filter(
    (h) => h.depth >= MIN_HEADING_DEPTH && h.depth <= MAX_HEADING_DEPTH
  )
}

const currentDocument = computed(() => {
  return (
    props.documents.find((doc) => doc.id === props.currentDocumentId) || null
  )
})

const currentHeadings = computed(() => {
  if (!currentDocument.value || !currentDocument.value.headings) return []
  return filteredHeadings(currentDocument.value).map((heading) => ({
    slug: heading.slug,
    text: heading.text,
  }))
})

const headingsRef = ref(currentHeadings.value)
const { activeItem, handleLinkClick } = useInViewNavigation(headingsRef)

watch(currentHeadings, (newHeadings) => {
  headingsRef.value = newHeadings
})

const isActiveDocument = (document) => {
  return document.id === props.currentDocumentId
}
const isActiveHeading = (heading) => {
  return activeItem.value === heading.slug
}

const navigateToDocument = (document, event) => {
  window.location.href = `/documentation/${document.id}`
}
</script>
