#!/usr/bin/env node

/**
 * Cross-browser testing script for the design system
 * Tests CSS custom properties, OKLCH support, and visual consistency
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Browser compatibility matrix
const BROWSER_SUPPORT = {
  chrome: {
    name: 'Chrome',
    cssCustomProps: 49,
    oklch: 111,
    grid: 57,
    focusVisible: 86,
    clamp: 79,
    reducedMotion: 74,
  },
  firefox: {
    name: 'Firefox',
    cssCustomProps: 31,
    oklch: 113,
    grid: 52,
    focusVisible: 85,
    clamp: 75,
    reducedMotion: 63,
  },
  safari: {
    name: 'Safari',
    cssCustomProps: 9.1,
    oklch: 15.4,
    grid: 10.1,
    focusVisible: 15.4,
    clamp: 13.1,
    reducedMotion: 10.1,
  },
  edge: {
    name: 'Edge',
    cssCustomProps: 16,
    oklch: 111,
    grid: 16,
    focusVisible: 86,
    clamp: 79,
    reducedMotion: 74,
  },
}

// Test cases for design system features
const TEST_CASES = [
  {
    name: 'CSS Custom Properties',
    description: 'Verify CSS custom properties work correctly',
    test: 'CSS.supports("color", "var(--test-color)")',
    fallback: 'HSL color values as fallback',
  },
  {
    name: 'OKLCH Color Support',
    description: 'Test modern OKLCH color space support',
    test: 'CSS.supports("color", "oklch(0.5 0.1 180)")',
    fallback: 'HSL color values as fallback',
  },
  {
    name: 'CSS Grid Layout',
    description: 'Verify CSS Grid support for responsive layouts',
    test: 'CSS.supports("display", "grid")',
    fallback: 'Flexbox layouts as fallback',
  },
  {
    name: 'Focus Visible Pseudo-class',
    description: 'Test :focus-visible for accessibility',
    test: 'CSS.supports("selector(:focus-visible)")',
    fallback: ':focus pseudo-class as fallback',
  },
  {
    name: 'CSS Clamp Function',
    description: 'Test clamp() for responsive typography',
    test: 'CSS.supports("font-size", "clamp(1rem, 2vw, 2rem)")',
    fallback: 'Media queries for responsive sizing',
  },
  {
    name: 'Reduced Motion Preference',
    description: 'Test prefers-reduced-motion media query',
    test: 'window.matchMedia("(prefers-reduced-motion)").media !== "not all"',
    fallback: 'Animation controls in UI',
  },
]

// Color contrast testing
const COLOR_TESTS = [
  {
    name: 'Primary Text on Background',
    foreground: 'var(--foreground)',
    background: 'var(--background)',
    minContrast: 4.5,
  },
  {
    name: 'Primary Button',
    foreground: 'var(--primary-foreground)',
    background: 'var(--primary)',
    minContrast: 4.5,
  },
  {
    name: 'Muted Text',
    foreground: 'var(--muted-foreground)',
    background: 'var(--background)',
    minContrast: 3.0,
  },
  {
    name: 'Focus Ring',
    foreground: 'var(--ring)',
    background: 'var(--background)',
    minContrast: 3.0,
  },
]

function generateTestReport() {
  const report = {
    timestamp: new Date().toISOString(),
    testSuite: 'Design System Cross-Browser Compatibility',
    browsers: BROWSER_SUPPORT,
    testCases: TEST_CASES,
    colorTests: COLOR_TESTS,
    instructions: {
      manual: [
        '1. Open tests/cross-browser/design-system-test.html in each target browser',
        '2. Verify all color swatches display correctly',
        '3. Test button hover effects and focus states',
        '4. Toggle between light and dark themes',
        '5. Test responsive behavior by resizing window',
        '6. Verify keyboard navigation works properly',
        '7. Check console for any JavaScript errors',
        '8. Test on different screen sizes and devices',
      ],
      automated: [
        '1. Run this script: node tests/cross-browser/run-browser-tests.js',
        '2. Use Playwright for automated testing: npm run test:e2e',
        '3. Check Lighthouse scores for performance',
        '4. Validate HTML and CSS with W3C validators',
      ],
    },
    expectedResults: {
      chrome: 'Full support for all features',
      firefox: 'Full support for all features',
      safari: 'OKLCH may fallback to HSL in older versions',
      edge: 'Full support for all features',
      fallbacks: 'HSL colors should work in all browsers',
    },
  }

  return report
}

function generatePlaywrightTest() {
  return `
import { test, expect } from '@playwright/test';

const BROWSERS = ['chromium', 'firefox', 'webkit'];
const VIEWPORTS = [
  { width: 375, height: 667 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1920, height: 1080 }  // Desktop
];

BROWSERS.forEach(browserName => {
  test.describe(\`Design System - \${browserName}\`, () => {
    
    test('should load design system correctly', async ({ page }) => {
      await page.goto('/tests/cross-browser/design-system-test.html');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check if CSS custom properties are working
      const primaryColor = await page.evaluate(() => {
        return getComputedStyle(document.documentElement).getPropertyValue('--primary');
      });
      
      expect(primaryColor).toBeTruthy();
    });

    test('should display colors correctly', async ({ page }) => {
      await page.goto('/tests/cross-browser/design-system-test.html');
      
      // Check color swatches are visible
      const colorSwatches = page.locator('.color-swatch');
      await expect(colorSwatches).toHaveCount(4);
      
      // Verify each swatch has background color
      for (let i = 0; i < 4; i++) {
        const swatch = colorSwatches.nth(i);
        const bgColor = await swatch.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
      }
    });

    test('should handle theme switching', async ({ page }) => {
      await page.goto('/tests/cross-browser/design-system-test.html');
      
      // Get initial theme
      const initialTheme = await page.getAttribute('html', 'data-theme');
      
      // Click theme toggle
      await page.click('.theme-toggle');
      
      // Verify theme changed
      const newTheme = await page.getAttribute('html', 'data-theme');
      expect(newTheme).not.toBe(initialTheme);
      
      // Verify colors updated
      const backgroundColor = await page.evaluate(() => {
        return getComputedStyle(document.body).backgroundColor;
      });
      expect(backgroundColor).toBeTruthy();
    });

    test('should have proper focus states', async ({ page }) => {
      await page.goto('/tests/cross-browser/design-system-test.html');
      
      // Test button focus
      const button = page.locator('.test-button').first();
      await button.focus();
      
      const focusOutline = await button.evaluate(el => {
        return getComputedStyle(el).outline;
      });
      
      // Should have some form of focus indication
      expect(focusOutline !== 'none' || 
             await button.evaluate(el => getComputedStyle(el).boxShadow !== 'none')).toBeTruthy();
    });

    VIEWPORTS.forEach(viewport => {
      test(\`should be responsive at \${viewport.width}x\${viewport.height}\`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('/tests/cross-browser/design-system-test.html');
        
        // Check if layout adapts properly
        const container = page.locator('.container');
        const containerWidth = await container.evaluate(el => el.offsetWidth);
        
        expect(containerWidth).toBeGreaterThan(0);
        expect(containerWidth).toBeLessThanOrEqual(viewport.width);
        
        // Check if text is readable
        const heading = page.locator('h1').first();
        const fontSize = await heading.evaluate(el => {
          return parseFloat(getComputedStyle(el).fontSize);
        });
        
        expect(fontSize).toBeGreaterThan(16); // Minimum readable size
      });
    });

    test('should respect reduced motion preference', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/tests/cross-browser/design-system-test.html');
      
      // Check if animations are disabled
      const button = page.locator('.test-button').first();
      const transitionDuration = await button.evaluate(el => {
        return getComputedStyle(el).transitionDuration;
      });
      
      // Should have very short or no transition
      expect(parseFloat(transitionDuration) < 0.1).toBeTruthy();
    });
  });
});
`
}

function main() {
  console.log('🧪 Design System Cross-Browser Testing Suite')
  console.log('============================================\n')

  // Generate test report
  const report = generateTestReport()

  // Save test report
  const reportPath = path.join(__dirname, 'test-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`📊 Test report generated: ${reportPath}`)

  // Generate Playwright test
  const playwrightTest = generatePlaywrightTest()
  const testPath = path.join(__dirname, 'design-system.spec.ts')
  fs.writeFileSync(testPath, playwrightTest)
  console.log(`🎭 Playwright test generated: ${testPath}`)

  // Display manual testing instructions
  console.log('\n📋 Manual Testing Instructions:')
  console.log('================================')
  report.instructions.manual.forEach((instruction, index) => {
    console.log(`${index + 1}. ${instruction}`)
  })

  console.log('\n🤖 Automated Testing Instructions:')
  console.log('==================================')
  report.instructions.automated.forEach((instruction, index) => {
    console.log(`${index + 1}. ${instruction}`)
  })

  console.log('\n🎯 Expected Results by Browser:')
  console.log('===============================')
  Object.entries(report.expectedResults).forEach(([browser, result]) => {
    console.log(`${browser.toUpperCase()}: ${result}`)
  })

  console.log('\n✅ Test suite setup complete!')
  console.log(
    'Open tests/cross-browser/design-system-test.html in different browsers to begin testing.',
  )
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { generateTestReport, generatePlaywrightTest, BROWSER_SUPPORT, TEST_CASES, COLOR_TESTS }
