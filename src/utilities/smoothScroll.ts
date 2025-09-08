/**
 * Smooth scroll utility for navigation links
 */

/**
 * Smoothly scrolls to an element by ID
 * @param elementId - The ID of the element to scroll to (without #)
 * @param offset - Optional offset from the top (default: 80px for header)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  if (prefersReducedMotion) {
    // Jump directly without animation if reduced motion is preferred
    window.scrollTo({
      top: offsetPosition,
      behavior: 'auto',
    })
  } else {
    // Smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}

/**
 * Creates a smooth scroll handler for anchor links
 * @param href - The href attribute of the link
 * @param offset - Optional offset from the top
 */
export function createSmoothScrollHandler(href: string, offset?: number) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle hash links on the same page
    if (href.startsWith('#')) {
      event.preventDefault()
      const elementId = href.substring(1) // Remove the #
      scrollToElement(elementId, offset)
    }
  }
}

/**
 * Hook to add smooth scroll behavior to navigation links
 */
export function useSmoothScroll(offset: number = 80) {
  React.useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.hash) {
        const href = target.getAttribute('href')
        if (href && href.startsWith('#')) {
          event.preventDefault()
          const elementId = href.substring(1)
          scrollToElement(elementId, offset)
        }
      }
    }

    // Add event listener to document for all anchor links
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [offset])
}

// Import React for the hook
import React from 'react'
