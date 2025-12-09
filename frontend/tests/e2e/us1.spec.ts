import { test, expect } from '@playwright/test';

test('select an image and enter text', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Select the first image
  await page.getByRole('button', { name: /Select .* as background/ }).first().click();

  // Enter name and job title
  await page.getByLabel('Name').fill('John Doe');
  await page.getByLabel('Job Title').fill('Software Engineer');

  // Expect the canvas to be updated
  // This is a placeholder for a more specific assertion
  const canvas = await page.getByRole('presentation');
  expect(canvas).toBeVisible();
});
