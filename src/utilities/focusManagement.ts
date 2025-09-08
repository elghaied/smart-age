/**
 * Focus management utilities for accessibility
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[role="button"]:not([disabled])',
    '[role="link"]',
    'details summary',
    'audio[controls]',
    'video[controls]',
  ].join(', ')

  return Array.from(container.querySelectorAll(focusableSelectors)).filter((element) => {
    const el = element as HTMLElement

    // In test environment, check for basic visibility
    if (typeof window === 'undefined' || !window.getComputedStyle) {
      return !el.hasAttribute('hidden') && !el.hasAttribute('disabled')
    }

    const style = window.getComputedStyle(el)
    return (
      !el.hasAttribute('hidden') &&
      !el.hasAttribute('disabled') &&
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0)
    )
  }) as HTMLElement[]
}

/**
 * Trap focus within a container (useful for modals)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  // Focus the first element
  firstElement?.focus()

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Restore focus to a previously focused element
 */
export function createFocusManager() {
  let previouslyFocusedElement: HTMLElement | null = null

  return {
    save: () => {
      previouslyFocusedElement = document.activeElement as HTMLElement
    },
    restore: () => {
      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus()
        previouslyFocusedElement = null
      }
    },
  }
}

/**
 * Check if an element is currently visible and focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute('disabled') || element.hasAttribute('hidden')) {
    return false
  }

  // In test environment, basic check
  if (typeof window === 'undefined' || !window.getComputedStyle) {
    return true
  }

  const style = window.getComputedStyle(element)
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false
  }

  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

/**
 * Move focus to the next/previous focusable element
 */
export function moveFocus(direction: 'next' | 'previous', container?: HTMLElement) {
  const root = container || document.body
  const focusableElements = getFocusableElements(root)
  const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

  let nextIndex: number
  if (direction === 'next') {
    nextIndex = currentIndex + 1
    if (nextIndex >= focusableElements.length) {
      nextIndex = 0 // Wrap to first element
    }
  } else {
    nextIndex = currentIndex - 1
    if (nextIndex < 0) {
      nextIndex = focusableElements.length - 1 // Wrap to last element
    }
  }

  focusableElements[nextIndex]?.focus()
}

/**
 * Announce text to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Add screen reader only class to globals if not present
 */
export function ensureScreenReaderStyles() {
  if (!document.querySelector('style[data-sr-only]')) {
    const style = document.createElement('style')
    style.setAttribute('data-sr-only', 'true')
    style.textContent = `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `
    document.head.appendChild(style)
  }
}
