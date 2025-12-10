import { test, expect } from '@playwright/test';
import { getCanvasObject } from './utils/canvas-helper';

test('User can select Cymraeg status and canvas remains visible', async ({ page }) => {
  await page.goto('/');

  // Check if Cymraeg dropdown exists and defaults to 'None'
  const cymraegSelect = page.getByLabel('Cymraeg');
  await expect(cymraegSelect).toBeVisible();
  await expect(cymraegSelect).toHaveValue('None');

  // Select 'Learner'
  await cymraegSelect.selectOption('Learner');
  await expect(cymraegSelect).toHaveValue('Learner');

  // Select 'Fluent'
  await cymraegSelect.selectOption('Fluent');
  await expect(cymraegSelect).toHaveValue('Fluent');

  // Verify canvas is still visible (no crash)
  const canvas = page.getByRole('presentation');
  await expect(canvas).toBeVisible();
});

test('should display correct Cymraeg text when Learner or Fluent is selected', async ({ page }) => {
  await page.goto('/');

  // Select an image that has logoConfig (e.g., the Christmas 2025 Fluent Welsh background)
  // We need to wait for images to load
  await page.getByRole('button', { name: /Select .* as background/ }).first().click();

  // Select 'Learner' from the Cymraeg dropdown
  await page.getByLabel('Cymraeg').selectOption('Learner');

  // Verify 'Dysgwyr\nLearner' text object exists on canvas
  await expect.poll(async () => {
    const obj = await getCanvasObject(page, 'cymraeg-text');
    return obj?.text;
  }).toBe('Dysgwyr\nLearner');

  // Select 'Fluent' from the Cymraeg dropdown
  await page.getByLabel('Cymraeg').selectOption('Fluent');

  // Verify 'Rhugl\nFluent' text object exists on canvas
  await expect.poll(async () => {
    const obj = await getCanvasObject(page, 'cymraeg-text');
    return obj?.text;
  }).toBe('Rhugl\nFluent');
});

test('Cymraeg logo functionality does not crash application', async ({ page }) => {
    await page.goto('/');

    // Select a background that definitely has logo config (all do now, but good to be sure)
    // We can just rely on default or click the first one.
    const firstBg = page.getByRole('button', { name: /Select .* as background/ }).first();
    await firstBg.click();

    const cymraegSelect = page.getByLabel('Cymraeg');
    
    // Toggle through options
    await cymraegSelect.selectOption('Learner');
    await page.waitForTimeout(100); // Give it a slight moment for canvas render
    
    await cymraegSelect.selectOption('None');
    await page.waitForTimeout(100);

    // Enter some text as well to ensure interactions work together
    await page.getByLabel('Name').fill('Test User');
    
    await cymraegSelect.selectOption('Fluent');
    
    // Check download button still works (clickable)
    const downloadBtn = page.getByRole('button', { name: 'Download Image' });
    await expect(downloadBtn).toBeEnabled();
});
