import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useInViewNavigation(items) {
  const activeItem = ref(null)
  const observer = ref(null)
  const visibleSections = ref([])
  const userClickedItem = ref(false)
  const clickTimeout = ref(null)

  const handleLinkClick = (slug, event) => {
    // Prevent default anchor navigation
    if (event) {
      event.preventDefault()
    }

    activeItem.value = slug
    userClickedItem.value = true

    if (clickTimeout.value) {
      clearTimeout(clickTimeout.value)
    }

    // Smooth scroll to the target element
    const targetElement = document.getElementById(slug)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    // Update URL hash without causing a jump
    if (history.pushState) {
      history.pushState(null, null, `#${slug}`)
    } else {
      location.hash = `#${slug}`
    }

    clickTimeout.value = setTimeout(() => {
      userClickedItem.value = false
      if (visibleSections.value.length > 0) {
        updateActiveItem()
      }
    }, 1200)
  }

  const updateActiveItem = () => {
    if (userClickedItem.value) return

    if (visibleSections.value.length === 0) return

    // Filter out sections that don't have corresponding DOM elements
    const validSections = visibleSections.value.filter((section) =>
      document.getElementById(section)
    )

    if (validSections.length === 0) return

    const mostRelevantSection = [...validSections].sort((a, b) => {
      const aRect = document.getElementById(a).getBoundingClientRect()
      const bRect = document.getElementById(b).getBoundingClientRect()
      return aRect.top - bRect.top
    })[0]

    activeItem.value = mostRelevantSection
  }

  const setupIntersectionObserver = () => {
    if (observer.value) {
      observer.value.disconnect()
    }

    visibleSections.value = []

    observer.value = new IntersectionObserver(
      (entries) => {
        let needsUpdate = false

        entries.forEach((entry) => {
          const slug = entry.target.id

          if (entry.isIntersecting) {
            if (!visibleSections.value.includes(slug)) {
              visibleSections.value.push(slug)
              needsUpdate = true
            }
          } else {
            const index = visibleSections.value.indexOf(slug)
            if (index !== -1) {
              visibleSections.value.splice(index, 1)
              needsUpdate = true
            }
          }
        })

        if (needsUpdate && !userClickedItem.value) {
          updateActiveItem()
        }
      },
      {
        threshold: [0, 0.1, 0.5],
        rootMargin: '-10% 0px -40% 0px',
      }
    )

    items.value.forEach((item) => {
      if (item.slug) {
        const element = document.getElementById(item.slug)
        if (element) {
          // Ensure the element has an ID that matches the slug
          if (!element.id) {
            element.id = item.slug
          }
          observer.value.observe(element)
        } else {
          console.warn(`Element with slug '${item.slug}' not found in the DOM`)
        }
      }
    })

    if (items.value.length > 0 && !activeItem.value) {
      activeItem.value = items.value[0].slug
    }
  }

  const handleHashChange = () => {
    const hash = window.location.hash.substring(1)
    if (
      hash &&
      items.value.some((item) => item.slug === hash) &&
      document.getElementById(hash)
    ) {
      activeItem.value = hash
      userClickedItem.value = true

      if (clickTimeout.value) {
        clearTimeout(clickTimeout.value)
      }

      clickTimeout.value = setTimeout(() => {
        userClickedItem.value = false
      }, 2000)
    }
  }

  const initialize = () => {
    if (items.value.length > 0) {
      setTimeout(setupIntersectionObserver, 100)
    }

    const hash = window.location.hash.substring(1)
    if (
      hash &&
      items.value.some((item) => item.slug === hash) &&
      document.getElementById(hash)
    ) {
      activeItem.value = hash
    }

    window.addEventListener('hashchange', handleHashChange)
  }

  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
    }

    window.removeEventListener('hashchange', handleHashChange)

    if (clickTimeout.value) {
      clearTimeout(clickTimeout.value)
    }
  }

  watch(
    items,
    () => {
      if (items.value.length > 0) {
        setTimeout(setupIntersectionObserver, 100)
      }
    },
    { immediate: true }
  )

  onMounted(initialize)
  onUnmounted(cleanup)

  return {
    activeItem,
    handleLinkClick,
  }
}
