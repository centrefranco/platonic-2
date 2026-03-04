import { reactive, onMounted, computed } from 'vue'

const globalModalState = reactive<Record<string, boolean>>({})
let globalListenersSetup = false

const handleGlobalModalTriggerClick = (event: Event) => {
  const target = event.target as HTMLElement

  let element = target
  while (element && element !== document.body) {
    const triggerModalId = element.getAttribute('data-modal-trigger')
    if (triggerModalId) {
      event.preventDefault()
      // Close all modals
      Object.keys(globalModalState).forEach((id) => {
        if (id !== triggerModalId) {
          globalModalState[id] = false
        }
      })
      // Show modal
      globalModalState[triggerModalId] = true
      return
    }
    element = element.parentElement as HTMLElement
  }
}

const handleGlobalEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    // Close all modals
    Object.keys(globalModalState).forEach((id) => {
      globalModalState[id] = false
    })
  }
}

const setupGlobalEventListeners = () => {
  if (!globalListenersSetup) {
    document.addEventListener('click', handleGlobalModalTriggerClick, true)
    document.addEventListener('keydown', handleGlobalEscapeKey)
    globalListenersSetup = true
  }
}

export function useModal(modalId: string) {
  if (!(modalId in globalModalState)) {
    globalModalState[modalId] = false
  }

  const show = () => {
    Object.keys(globalModalState).forEach((id) => {
      if (id !== modalId) {
        globalModalState[id] = false
      }
    })
    globalModalState[modalId] = true
  }

  const hide = () => {
    globalModalState[modalId] = false
  }

  const toggle = () => {
    globalModalState[modalId] = !globalModalState[modalId]
  }

  onMounted(() => {
    setupGlobalEventListeners()
  })

  return {
    isVisible: computed(() => globalModalState[modalId] || false),
    show,
    hide,
    toggle,
  }
}
