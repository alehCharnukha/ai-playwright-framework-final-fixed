import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for checkout and order placement. */
export class CheckoutPage extends BasePage {
  constructor(page: Page) { super(page); }
  fullName(): Locator { return this.page.getByTestId('shipping-name'); }
  address(): Locator { return this.page.getByTestId('shipping-address'); }
  cardNumber(): Locator { return this.page.getByTestId('card-number'); }
  total(): Locator { return this.page.getByTestId('checkout-total'); }
  placeOrder(): Locator { return this.page.getByTestId('place-order'); }
  orderStatus(): Locator { return this.page.getByRole('status'); }

  async fillShippingDetails(name: string, address: string, cardNumber: string): Promise<void> {
    await this.fullName().fill(name);
    await this.address().fill(address);
    await this.cardNumber().fill(cardNumber);
  }

  async expectOrderPlaced(): Promise<void> {
    await expect(this.orderStatus()).toHaveText('Order placed');
  }
}
