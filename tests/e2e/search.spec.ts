import { expect, test } from '@playwright/test';
import { search } from '../../src/fixtures/testData';
import { ResultsPage } from '../../src/pages/ResultsPage';
import { ProductPage } from '../../src/pages/ProductPage';
import { SearchPage } from '../../src/pages/SearchPage';

test.describe('Search', () => {
  test('user can search and see product results', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Initialization
    await searchPage.open();

    // User actions
    await searchPage.searchFor(search.query);

    // Verification
    await expect(searchPage.results()).toBeVisible();
    await expect(searchPage.productResult('Trail Backpack')).toBeVisible();
  });

  test('price filter keeps all visible results under 100 dollars', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);

    // User actions
    await searchPage.filterUnder100().click();

    // Verification
    await results.expectAllPricesBelow(100);
  });

  test('user can open the first result details page', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);
    const product = new ProductPage(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);

    // User actions
    await results.selectFirstProduct().click();

    // Verification
    await expect(page).toHaveURL(/\/product\/trail-backpack$/);
    await product.expectLoaded('Trail Backpack');
  });
});
