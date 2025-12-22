import { test, expect } from '@playwright/test';

test('filter by year', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid="year-select"]');

    await page.selectOption('[data-testid="year-select"]', '2018');
    await page.click('[data-testid="apply-btn"]');

    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && post.includes('"launch_year":"2018"');
        } catch {
            return false;
        }
    }, { timeout: 5000 });

    const cards = page.locator('[data-testid="launch-card"]');
    await cards.first().waitFor({ timeout: 5000 }); // espera más generosa
    const texts = await cards.allTextContents();

    expect(texts.length).toBeGreaterThan(0);
    for (const text of texts) {
        expect(text).toContain('2014');
    }
});
