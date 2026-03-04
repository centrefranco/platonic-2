<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
    @click="hide()"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
      @click.stop
    >
      <div class="flex items-center justify-between px-6 pt-6">
        <h2 v-if="title" class="text-xl font-semibold text-gray-800 m-0">
          {{ title }}
        </h2>
        <button
          class="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors duration-200"
          @click="hide()"
          aria-label="Close modal"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="px-6 py-6 flex-1 overflow-y-auto">
        <slot>
          <p>{{ content || 'Modal content goes here.' }}</p>
        </slot>
      </div>
      <div class="px-6 pb-6 flex justify-end gap-3">
        <slot name="footer">
          <button
            class="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            @click="hide()"
          >
            Close
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModal } from '@composables/useModal'

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})

const { isVisible, hide } = useModal(props.modalId)
</script>
