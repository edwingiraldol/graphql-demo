import { test, expect } from '@playwright/test';

test('rockets page loads and displays rockets', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('h1');
    
    const heading = await page.textContent('h1');
    expect(heading).toBe('Rocket Missions');
    
    // Wait for rockets API call
    await page.waitForResponse((response) => {
        try {
            const req = response.request();
            const url = req.url();
            const post = req.postData() ?? '';
            return url.includes('spacex-production.up.railway.app') && post.includes('rockets');
        } catch {
            return false;
        }
    }, { timeout: 5000 });
    
    const rocketCards = page.locator('[data-testid=\"launch-card\"]');
    await rocketCards.first().waitFor({ timeout: 5000 });
    
    expect(await rocketCards.count()).toBeGreaterThan(0);
});

test('rocket cards display correct information', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('[data-testid=\"launch-card\"]');
    
    const cards = page.locator('[data-testid=\"launch-card\"]');
    await cards.first().waitFor({ timeout: 5000 });
    
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Check first card has required elements
    const firstCard = cards.first();
    const cardText = await firstCard.textContent();
    console.log(cardText);
    // Should have rocket name
    
    // Should have first flight info
    expect(cardText).toContain('First flight:');
    
    // Should have cost info
    expect(cardText).toContain('Cost per launch:');
    
    // Should have status
    expect(cardText).toMatch(/Estado: (Active|Inactive)/);
});

test('rocket cards are clickable links', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('[data-testid=\"launch-card\"]');
    
    const firstCard = page.locator('[data-testid=\"launch-card\"]').first();
    await firstCard.waitFor({ timeout: 5000 });
    // Should be a link element
    const tagName = await firstCard.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('a');
});

test('rockets page shows loading state', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    
    // Should show loading initially
    const loadingText = page.locator('text=Loading...');
    
    // Wait for content to load
    await page.waitForSelector('[data-testid=\"launch-card\"]', { timeout: 10000 });
    
    // Loading should be gone
    expect(await loadingText.count()).toBe(0);
});

test('rockets page handles API errors', async ({ page }) => {
    // Intercept and fail the GraphQL request
    await page.route('**/spacex-production.up.railway.app**', route => {
        route.abort();
    });
    
    await page.goto('http://localhost:5173/rockets');
    
    // Should show error message
    await page.waitForSelector('text=Error:', { timeout: 10000 });
    
    const errorText = await page.textContent('.text-red-600');
    expect(errorText).toContain('Error:');
});

test('rockets grid layout is responsive', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('[data-testid=\"launch-card\"]');
    
    const grid = page.locator('section.grid');
    await grid.waitFor({ timeout: 5000 });
    
    // Should have responsive grid classes
    const className = await grid.getAttribute('class');
    expect(className).toContain('grid');
    expect(className).toContain('grid-cols-1');
    expect(className).toContain('md:grid-cols-2');
    expect(className).toContain('lg:grid-cols-3');
});

test('rockets page handles empty results', async ({ page }) => {
    // Mock empty response
    await page.route('**/spacex-production.up.railway.app**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: {
                    rockets: []
                }
            })
        });
    });
    
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('h1');
    
    // Should not show any rocket cards
    const cards = page.locator('[data-testid=\"launch-card\"]');
    expect(await cards.count()).toBe(0);
    
    // Should not show loading or error
    expect(await page.locator('text=Loading...').count()).toBe(0);
    expect(await page.locator('.text-red-600').count()).toBe(0);
});