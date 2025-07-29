import { test, expect } from '@playwright/test';

test.describe('Property Search', () => {
  test('should display property search page', async ({ page }) => {
    await page.goto('/properties');

    // Check if the page loads correctly
    await expect(page).toHaveTitle(/Sparta Mortgage/);
    await expect(page.getByText('Find Your Dream Home')).toBeVisible();

    // Check if search form is present
    await expect(
      page.getByPlaceholder('e.g., Louisville, KY or 40202')
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });

  test('should search for properties', async ({ page }) => {
    await page.goto('/properties');

    // Fill in search form
    await page
      .getByPlaceholder('e.g., Louisville, KY or 40202')
      .fill('Louisville, KY');
    await page.getByPlaceholder('e.g., 200000').fill('200000');
    await page.getByPlaceholder('e.g., 400000').fill('400000');

    // Submit search
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for results
    await expect(page.getByText(/Properties Found/)).toBeVisible();

    // Check if properties are displayed
    await expect(page.locator('[data-testid="property-card"]')).toHaveCount(6);
  });

  test('should filter properties by price range', async ({ page }) => {
    await page.goto('/properties');

    // Set price range
    await page.getByPlaceholder('e.g., 200000').fill('300000');
    await page.getByPlaceholder('e.g., 400000').fill('500000');

    // Submit search
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify results are within price range
    const priceElements = page.locator('[data-testid="property-price"]');
    for (let i = 0; i < (await priceElements.count()); i++) {
      const priceText = await priceElements.nth(i).textContent();
      const price = parseInt(priceText?.replace(/[$,]/g, '') || '0');
      expect(price).toBeGreaterThanOrEqual(300000);
      expect(price).toBeLessThanOrEqual(500000);
    }
  });

  test('should sort properties by different criteria', async ({ page }) => {
    await page.goto('/properties');

    // Check if sort dropdown is present
    await expect(page.getByRole('combobox')).toBeVisible();

    // Test sorting by price (low to high)
    await page.getByRole('combobox').selectOption('price-low');
    await expect(page.getByRole('combobox')).toHaveValue('price-low');

    // Test sorting by price (high to low)
    await page.getByRole('combobox').selectOption('price-high');
    await expect(page.getByRole('combobox')).toHaveValue('price-high');
  });

  test('should toggle between grid and list view', async ({ page }) => {
    await page.goto('/properties');

    // Check if view toggle buttons are present
    await expect(page.getByRole('button', { name: /grid/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /list/i })).toBeVisible();

    // Test switching to list view
    await page.getByRole('button', { name: /list/i }).click();
    await expect(page.locator('[data-testid="property-list"]')).toBeVisible();

    // Test switching back to grid view
    await page.getByRole('button', { name: /grid/i }).click();
    await expect(page.locator('[data-testid="property-grid"]')).toBeVisible();
  });

  test('should open property details modal', async ({ page }) => {
    await page.goto('/properties');

    // Click on first property card
    await page.locator('[data-testid="property-card"]').first().click();

    // Check if modal opens
    await expect(page.locator('[data-testid="property-modal"]')).toBeVisible();
    await expect(page.getByText('Property Details')).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(
      page.locator('[data-testid="property-modal"]')
    ).not.toBeVisible();
  });
});
