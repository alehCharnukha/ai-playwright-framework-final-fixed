import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for product details and add-to-cart behavior. */
export class ProductPage extends BasePage {
  constructor(page: Page) { super(page); }
  title(): Locator { return this.page.getByTestId('product-title'); }
  price(): Locator { return this.page.getByTestId('product-price'); }
  addToCart(): Locator { return this.page.getByTestId('add-to-cart'); }
  cartStatus(): Locator { return this.page.getByRole('status'); }

  async expectLoaded(productName: string): Promise<void> {
    await expect(this.title()).toHaveText(productName);
  }
}
