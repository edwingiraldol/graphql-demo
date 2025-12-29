import { test, expect } from '@playwright/test';

test('filter by year', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid="year-select"]');

    await page.selectOption('[data-testid="year-select"]', '2014');
    await page.click('[data-testid="apply-btn"]');

    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && post.includes('"launch_year":"2014"');
        } catch {
            return false;
        }
    }, { timeout: 5000 });

    const cards = page.locator('[data-testid="launch-card"]');
    await cards.first().waitFor({ timeout: 5000 });
    const texts = await cards.allTextContents();

    expect(texts.length).toBeGreaterThan(0);
    const text = texts[0];
    expect(text).toContain('2014');
});


test('combined filters - year and success', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid="year-select"]');

    await page.selectOption('[data-testid="year-select"]', '2018');
    await page.selectOption('[data-testid="success-select"]', 'true');
    await page.click('[data-testid="apply-btn"]');

    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && 
                   post.includes('"launch_year":"2018"') && 
                   post.includes('"launch_success":"true"');
        } catch {
            return false;
        }
    }, { timeout: 5000 });

    const cards = page.locator('[data-testid="launch-card"]');
    if (await cards.count() > 0) {
        const texts = await cards.allTextContents();
        for (const text of texts) {
            expect(text).toContain('2018');
            expect(text).toContain('Success');
        }
    }
});

test('reset filters to show all launches', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid="year-select"]');

    // Apply filters first
    await page.selectOption('[data-testid="year-select"]', '2014');
    await page.click('[data-testid="apply-btn"]');
    await page.waitForTimeout(1000);

    // Reset filters
    await page.selectOption('[data-testid="year-select"]', '');
    await page.selectOption('[data-testid="success-select"]', '');
    await page.click('[data-testid="apply-btn"]');

    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && 
                   !post.includes('"launch_year"') && 
                   !post.includes('"launch_success"');
        } catch {
            return false;
        }
    }, { timeout: 5000 });

    const cards = page.locator('[data-testid="launch-card"]');
    await cards.first().waitFor({ timeout: 5000 });
    expect(await cards.count()).toBeGreaterThan(5); // Should show many launches
});
