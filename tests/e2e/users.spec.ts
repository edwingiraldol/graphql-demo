import { test, expect } from '@playwright/test';

test('users page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/users');
    await page.waitForSelector('h2');
    
    const heading = await page.textContent('h2');
    expect(heading).toBe('Users');
});

test('users page displays add user form', async ({ page }) => {
    await page.goto('http://localhost:5173/users');
    await page.waitForSelector('h2');
    
    // Check form elements exist
    const nameInput = page.locator('input[placeholder=\"Nombre\"]');
    const addButton = page.locator('button:has-text(\"Agregar\")');
    
    expect(await nameInput.count()).toBe(1);
    expect(await addButton.count()).toBe(1);
    
    // Form should be functional
    expect(await nameInput.isEnabled()).toBe(true);
    expect(await addButton.isEnabled()).toBe(true);
});
