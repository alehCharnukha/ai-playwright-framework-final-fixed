import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for the cart page. */
export class CartPage extends BasePage {
  constructor(page: Page) { super(page); }
  items(): Locator { return this.page.getByTestId('cart-item'); }
  total(): Locator { return this.page.getByTestId('cart-total'); }
  proceedToCheckout(): Locator { return this.page.getByTestId('checkout-button'); }

  async expectTotal(total: string): Promise<void> {
    await expect(this.total()).toHaveText(total);
  }
}
