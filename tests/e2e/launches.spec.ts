import { test, expect } from '@playwright/test';

test('launches page loads with launch cards', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('h1');
    
    const heading = await page.textContent('h1');
    expect(heading).toBe('SpaceX Missions');
    
    // Wait for launches to load
    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && post.includes('launchesPast');
        } catch {
            return false;
        }
    }, { timeout: 5000 });
    
    const launchCards = page.locator('[data-testid=\"launch-card\"]');
    await launchCards.first().waitFor({ timeout: 5000 });
    
    expect(await launchCards.count()).toBeGreaterThan(0);
    
    // Verify card content structure
    const firstCard = launchCards.first();
    const cardText = await firstCard.textContent();
    
    expect(cardText).toContain('Year:');
    expect(cardText).toContain('Estado:');
});

test('launch cards display correct information', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid=\"launch-card\"]');

    const cards = page.locator('[data-testid=\"launch-card\"]');
    await cards.first().waitFor({timeout: 5000});

    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
});