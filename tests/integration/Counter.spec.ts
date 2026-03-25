import { expect, test } from '@playwright/test';

test.describe('Counter', () => {
  test('rejects invalid increment in the form', async ({ page }) => {
    await page.goto('/counter');

    await page.locator('#increment').fill('-1');
    await page.getByRole('button', { name: 'Increment' }).click();

    await expect(page.getByText(/Value must be between/)).toBeVisible();
  });

  test('rejects increment greater than 3', async ({ page }) => {
    await page.goto('/counter');

    await page.locator('#increment').fill('5');
    await page.getByRole('button', { name: 'Increment' }).click();

    await expect(page.getByText(/Value must be between/)).toBeVisible();
  });

  test('increments the displayed count', async ({ page }) => {
    await page.goto('/counter');

    await expect(page.getByText(/^Count: 0$/)).toBeVisible();

    await page.locator('#increment').fill('2');
    await page.getByRole('button', { name: 'Increment' }).click();

    await expect(page.getByText(/^Count: 2$/)).toBeVisible();

    await page.locator('#increment').fill('1');
    await page.getByRole('button', { name: 'Increment' }).click();

    await expect(page.getByText(/^Count: 3$/)).toBeVisible();
  });
});
