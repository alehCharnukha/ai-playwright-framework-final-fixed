import { expect, type Locator, type Page } from '@playwright/test';

/** Header component shared across shop pages. */
export class Header {
  constructor(private readonly page: Page) {}

  brandLink(): Locator { return this.page.getByRole('link', { name: 'AI Shop' }); }
  cartButton(): Locator { return this.page.getByTestId('cart-button'); }
  cartBadge(): Locator { return this.page.getByTestId('cart-badge'); }
  userAvatar(): Locator { return this.page.getByTestId('user-avatar'); }

  async expectCartCount(count: string): Promise<void> {
    await expect(this.cartBadge()).toHaveText(count);
  }
}
