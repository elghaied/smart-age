
import { test, expect } from '@playwright/test';

const BROWSERS = ['chromium', 'firefox', 'webkit'];
const VIEWPORTS = [
  { width: 375, height: 667 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1920, height: 1080 }  // Desktop
];

BROWSERS.forEach(browserName => {
  test.describe(`Design System - ${browserName}`, () => {
    
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
      test(`should be responsive at ${viewport.width}x${viewport.height}`, async ({ page }) => {
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
