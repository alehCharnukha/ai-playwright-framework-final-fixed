import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for product search. */
export class SearchPage extends BasePage {
  constructor(page: Page) { super(page); }
  queryInput(): Locator { return this.page.getByTestId('search-input'); }
  submit(): Locator { return this.page.getByTestId('search-button'); }
  filterUnder100(): Locator { return this.page.getByTestId('filter-under-100'); }
  results(): Locator { return this.page.getByTestId('results'); }
  productResult(name: string): Locator { return this.page.getByRole('heading', { name }); }

  async open(): Promise<void> {
    await this.loadDemoApp();
    await expect(this.page.getByRole('heading', { name: 'Search products' })).toBeVisible();
  }

  async searchFor(query: string): Promise<void> {
    await this.queryInput().fill(query);
    await this.submit().click();
  }
}
