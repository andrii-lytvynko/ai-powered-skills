/**
 * Queue page UI validation script
 * Run with: npx playwright test queue-validation.spec.mjs --project=chromium
 * Requires: npm install -D @playwright/test
 */
import { test, expect } from '@playwright/test';

test.describe('Queue list page UI validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    // Select Admin center from product dropdown (default is Support)
    await page.click('button:has-text("Support")');
    await page.click('button:has-text("Admin center")');
    await page.waitForSelector('h1:has-text("Queues")', { timeout: 5000 });
  });

  test('shows promo card "Unlock smarter ticket routing with AI" between header and search', async ({ page }) => {
    const promo = page.locator('section.queues-promo h2:has-text("Unlock smarter ticket routing with AI")');
    await expect(promo).toBeVisible();
    const header = page.locator('.queues-page-header');
    const search = page.locator('.queues-search-section');
    await expect(header).toBeVisible();
    await expect(search).toBeVisible();
    // Promo should be between header and search in DOM order
    const headerBox = await header.boundingBox();
    const promoBox = await promo.boundingBox();
    const searchBox = await search.boundingBox();
    expect(promoBox.y).toBeGreaterThan(headerBox.y + headerBox.height - 5);
    expect(promoBox.y).toBeLessThan(searchBox.y + searchBox.height + 5);
  });

  test('page description has links "Learn about queues" and "Initial routing configuration"', async ({ page }) => {
    await expect(page.locator('a:has-text("Learn about queues")')).toBeVisible();
    await expect(page.locator('a:has-text("Initial routing configuration")')).toBeVisible();
  });

  test('table headers include Predictive routing and do NOT include Assignment method', async ({ page }) => {
    const header = page.locator('.queues-table__header');
    await expect(header.locator('span:has-text("Predictive routing")')).toBeVisible();
    await expect(header.locator('span:has-text("Assignment method")')).not.toBeVisible();
  });

  test('each row shows Start queue evaluation in Predictive routing column', async ({ page }) => {
    const rows = page.locator('.queues-table__row');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const predictiveCell = rows.nth(i).locator('.queues-table__cell--predictive');
      await expect(predictiveCell.locator('button:has-text("Start queue evaluation")')).toBeVisible();
    }
  });
});
