import { test, expect } from '@playwright/test';
import { getCanvasObject } from './utils/canvas-helper';

test('select an image and enter text', async ({ page }) => {
  await page.goto('/');

  // Select the first image
  await page.getByRole('button', { name: /Select .* as background/ }).first().click();

  // Enter name and job title
  await page.getByLabel('Name').fill('John Doe');
  await page.getByLabel('Job Title').fill('Software Engineer');

  // Verify Name on canvas
  await expect.poll(async () => {
    const obj = await getCanvasObject(page, 'name');
    return obj?.text;
  }).toBe('John Doe');

  // Verify Job Title on canvas
  await expect.poll(async () => {
    const obj = await getCanvasObject(page, 'title');
    return obj?.text;
  }).toBe('Software Engineer');
});
