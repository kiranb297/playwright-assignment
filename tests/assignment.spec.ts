import { test, expect } from '@playwright/test';

// Test case to search for Shoes in Amazon
test('Search for "Shoes', async ({ page }) => {
  // Launching amazon url.
  await page.goto("https://www.amazon.in/");

  // Verifying user "Demo" is logged in.
  await expect(page.locator("//span[contains(@id,'accountList')]"), 'Verify user "Demo" logged in to Amazon').toContainText("Demo");

  // Search for Shoes in the Search bar.
  await page.getByPlaceholder('Search Amazon.in').fill("Shoes");
  await page.keyboard.press('Enter');
  await expect(page.getByText('Results', { exact: true })).toBeVisible()

  // Verify it is showing results for "Shoes".
  await expect(page.locator("//span[contains(@data-component-type,'result-info')]//span[contains(text(),'results')]/following-sibling::span[@class]"))
    .toContainText("Shoes");
});
