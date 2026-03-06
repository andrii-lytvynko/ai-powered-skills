import { chromium } from '@playwright/test';

const url = 'http://localhost:5174/';

const browser = await chromium.launch();
const page = await browser.newPage();

// Set viewport for full page capture
await page.setViewportSize({ width: 1920, height: 1080 });

// Navigate and wait for network idle
await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

// Extra wait for any async content
await page.waitForTimeout(2000);

// Full page screenshot
await page.screenshot({ path: 'screenshot-full.png', fullPage: true });

await browser.close();
console.log('Screenshot saved to screenshot-full.png');
