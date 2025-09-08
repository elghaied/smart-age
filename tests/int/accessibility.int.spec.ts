import { describe, it, expect } from 'vitest'
import {
  testColorContrastCompliance,
  generateAccessibilityReport,
  validateFocusIndicators,
  WCAG_STANDARDS,
  meetsWCAGStandard,
  getContrastRatio,
} from '../../src/utilities/accessibility'

describe('Accessibility Color Contrast Compliance', () => {
  it('should meet WCAG AA standards for all critical color combinations', () => {
    const results = testColorContrastCompliance()

    // Log the full report for debugging
    console.log(generateAccessibilityReport())

    // All critical combinations should pass
    expect(results.failed.length).toBe(0)
    expect(results.passed.length).toBeGreaterThan(0)
  })

  it('should have proper WCAG standard thresholds', () => {
    expect(WCAG_STANDARDS.AA_NORMAL).toBe(4.5)
    expect(WCAG_STANDARDS.AA_LARGE).toBe(3.0)
    expect(WCAG_STANDARDS.AAA_NORMAL).toBe(7.0)
    expect(WCAG_STANDARDS.AAA_LARGE).toBe(4.5)
  })

  it('should correctly identify passing contrast ratios', () => {
    // Test with a high contrast ratio
    expect(meetsWCAGStandard(7.0, 'AA_NORMAL')).toBe(true)
    expect(meetsWCAGStandard(4.5, 'AA_NORMAL')).toBe(true)
    expect(meetsWCAGStandard(4.0, 'AA_NORMAL')).toBe(false)
  })

  it('should validate focus indicator requirements', () => {
    const validation = validateFocusIndicators()

    expect(validation.requirements).toHaveLength(5)
    expect(validation.implementation).toHaveLength(5)

    // Check that all requirements are addressed
    expect(validation.requirements.some((req) => req.includes('2px outline'))).toBe(true)
    expect(validation.requirements.some((req) => req.includes('high contrast'))).toBe(true)
    expect(validation.implementation.some((impl) => impl.includes('focus-visible'))).toBe(true)
  })
})

describe('Color Contrast Calculation', () => {
  it('should calculate contrast ratios correctly', () => {
    // Test black on white (should be 21:1)
    const blackOnWhite = getContrastRatio([0, 0, 0], [255, 255, 255])
    expect(blackOnWhite).toBeCloseTo(21, 0)

    // Test white on black (should be 21:1)
    const whiteOnBlack = getContrastRatio([255, 255, 255], [0, 0, 0])
    expect(whiteOnBlack).toBeCloseTo(21, 0)

    // Test same colors (should be 1:1)
    const sameColor = getContrastRatio([128, 128, 128], [128, 128, 128])
    expect(sameColor).toBeCloseTo(1, 1)
  })
})
