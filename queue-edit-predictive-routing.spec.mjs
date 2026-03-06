/**
 * Queue Edit Page - Predictive Routing functionality validation
 *
 * Run with: npx playwright test queue-edit-predictive-routing.spec.mjs --project=chromium
 * For port 5176: BASE_URL=http://localhost:5176 npx playwright test queue-edit-predictive-routing.spec.mjs --project=chromium
 *
 * Requires: npm install -D @playwright/test && npx playwright install chromium
 */
import { test, expect } from '@playwright/test';

test.describe('Queue Edit Page - Predictive Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Select Admin center from product dropdown (default is Support)
    await page.click('button:has-text("Support")');
    await page.click('button:has-text("Admin center")');
    await page.waitForSelector('h1:has-text("Queues")', { timeout: 5000 });
    // Click on first queue to edit it (use queue name link - e.g. "Billing")
    await page.click('.queues-table__name-link:has-text("Billing")');
    await page.waitForSelector('h1:has-text("Billing")', { timeout: 5000 });
  });

  test('1. Predictive routing section is visible after scrolling', async ({ page }) => {
    // Scroll to Predictive routing section
    const predictiveSection = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await predictiveSection.scrollIntoViewIfNeeded();
    await expect(predictiveSection).toBeVisible();
  });

  test('2. Predictive routing intro state - Turn on and Disable cycle', async ({ page }) => {
    const predictiveSection = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await predictiveSection.scrollIntoViewIfNeeded();

    // Verify intro state - "Turn on Predictive routing" button visible
    const turnOnBtn = page.locator('button:has-text("Turn on Predictive routing")');
    await expect(turnOnBtn).toBeVisible();

    // Click "Turn on Predictive routing"
    await turnOnBtn.click();

    // Verify enabled state - "Predictive routing is live" badge
    const liveBadge = page.locator('.predictive-routing__enabled-badge:has-text("Predictive routing is live")');
    await expect(liveBadge).toBeVisible({ timeout: 3000 });

    // Click "Disable Predictive routing"
    const disableBtn = page.locator('button:has-text("Disable Predictive routing")');
    await expect(disableBtn).toBeVisible();
    await disableBtn.click();

    // Verify back to intro state
    await expect(turnOnBtn).toBeVisible({ timeout: 3000 });
  });

  test('3. Run evaluation first - analyzing state and progress steps', async ({ page }) => {
    const predictiveSection = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await predictiveSection.scrollIntoViewIfNeeded();

    // Click "Run evaluation first"
    const runEvalBtn = page.locator('button:has-text("Run evaluation first")');
    await runEvalBtn.click();

    // Verify analyzing state appears
    const analyzingHeader = page.locator('.predictive-routing__analyzing-title, .predictive-routing__analyzing-card-title');
    await expect(analyzingHeader.first()).toBeVisible({ timeout: 2000 });

    // Verify progress steps exist
    const progressSteps = page.locator('.predictive-routing__step');
    await expect(progressSteps.first()).toBeVisible({ timeout: 2000 });
  });

  test('4. Run evaluation - wait for completion and results view', async ({ page }) => {
    const predictiveSection = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await predictiveSection.scrollIntoViewIfNeeded();

    // Click "Run evaluation first"
    await page.locator('button:has-text("Run evaluation first")').click();

    // Wait for analyzing to complete (~10-12 seconds)
    await page.waitForSelector('.predictive-routing__results, .predictive-routing__analyzing', { timeout: 15000 });

    // Wait up to 15 sec for results view (metrics cards)
    const resultsView = page.locator('.predictive-routing__results');
    await expect(resultsView).toBeVisible({ timeout: 15000 });

    // Verify metrics cards
    const metricsCards = page.locator('.predictive-routing__metric-card');
    await expect(metricsCards.first()).toBeVisible({ timeout: 2000 });
    const cardCount = await metricsCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3); // AHT, RWT, Time saved, Confidence
  });
});

test.describe('Queue Edit Page - Predictive Routing (screenshots)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Support")');
    await page.click('button:has-text("Admin center")');
    await page.waitForSelector('h1:has-text("Queues")', { timeout: 5000 });
    await page.click('.queues-table__name-link:has-text("Billing")');
    await page.waitForSelector('h1:has-text("Billing")', { timeout: 5000 });
  });

  test('Screenshot 1: Predictive routing intro section', async ({ page }) => {
    const section = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await page.screenshot({ path: 'test-results/predictive-routing-intro.png', fullPage: false });
  });

  test('Screenshot 2: Predictive routing enabled state', async ({ page }) => {
    const section = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await section.scrollIntoViewIfNeeded();
    await page.locator('button:has-text("Turn on Predictive routing")').click();
    await expect(page.locator('.predictive-routing__enabled-badge')).toBeVisible({ timeout: 3000 });
    await page.screenshot({ path: 'test-results/predictive-routing-enabled.png', fullPage: false });
  });

  test('Screenshot 3: Predictive routing results (metrics cards)', async ({ page }) => {
    const section = page.locator('section.queue-edit-section:has(h2:has-text("Predictive routing"))');
    await section.scrollIntoViewIfNeeded();
    await page.locator('button:has-text("Run evaluation first")').click();
    await expect(page.locator('.predictive-routing__results')).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'test-results/predictive-routing-results.png', fullPage: false });
  });
});
