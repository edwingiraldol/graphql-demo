import { test, expect } from '@playwright/test';

test('navigate to launches page from home', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Should redirect to launches
    await page.waitForURL('**/launches');
    await page.waitForSelector('h1');
    
    const heading = await page.textContent('h1');
    expect(heading).toBe('SpaceX Missions');
});

test('navigate between pages using header navigation', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('h1');
    
    // Navigate to rockets
    await page.click('text=Rockets');
    await page.waitForURL('**/rockets');
    await page.waitForSelector('h1');
    
    let heading = await page.textContent('h1');
    expect(heading).toBe('Rocket Missions');
    
    // Navigate to users
    await page.click('text=Users');
    await page.waitForURL('**/users');
    await page.waitForSelector('h2');
    
    heading = await page.textContent('h2');
    expect(heading).toBe('Users');
    
    // Navigate back to launches
    await page.click('text=Launches');
    await page.waitForURL('**/launches');
    await page.waitForSelector('h1');
    
    heading = await page.textContent('h1');
    expect(heading).toBe('SpaceX Missions');
});

test('launch card navigation to detail page', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    await page.waitForSelector('[data-testid=\"launch-card\"]');
    
    const firstCard = page.locator('[data-testid=\"launch-card\"]').first();
    await firstCard.waitFor({ timeout: 5000 });
    
    // Get launch ID from href
    const href = await firstCard.getAttribute('href');
    expect(href).toMatch(/\/launch\/\d+/);
    
    await firstCard.click();
    await page.waitForURL('**/launch/*');
    
    // Should be on launch detail page
    expect(page.url()).toMatch(/\/launch\/\d+/);
});

test('rockets page loads and displays rocket cards', async ({ page }) => {
    await page.goto('http://localhost:5173/rockets');
    await page.waitForSelector('h1');
    
    const heading = await page.textContent('h1');
    expect(heading).toBe('Rocket Missions');
    
    // Wait for rockets to load
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

test('about page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/about');
    await page.waitForSelector('h1');
    
    // Should display about content
    const content = await page.textContent('body');
    expect(content).toContain('About');
});

test('missions page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/missions');
    await page.waitForSelector('h1');
    
    // Should display missions content
    const content = await page.textContent('body');
    expect(content).toContain('Missions');
});

test('page loading states display correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/launches');
    
    // Should show loading state initially
    const loadingText = page.locator('text=Loading...');
    
    // Wait for content to load
    await page.waitForSelector('[data-testid=\"launch-card\"]', { timeout: 10000 });
    
    // Loading should be gone
    expect(await loadingText.count()).toBe(0);
});

test('error handling displays when network fails', async ({ page }) => {
    // Intercept and fail the GraphQL request
    await page.route('**/spacex-production.up.railway.app**', route => {
        route.abort();
    });
    
    await page.goto('http://localhost:5173/launches');
    
    // Should show error message
    await page.waitForSelector('text=Error:', { timeout: 10000 });
    
    const errorText = await page.textContent('.text-red-600');
    expect(errorText).toContain('Error:');
});