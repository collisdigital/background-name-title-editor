import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Vite' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*vitejs\.dev/);
});
