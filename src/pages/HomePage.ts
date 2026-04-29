import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for the authenticated home page. */
export class HomePage extends BasePage {
  constructor(page: Page) { super(page); }
  avatar(): Locator { return this.page.getByTestId('user-avatar'); }
  logoutButton(): Locator { return this.page.getByTestId('logout-button'); }
  heading(): Locator { return this.page.getByRole('heading', { name: /Welcome/ }); }

  async expectLoaded(): Promise<void> {
    await expect(this.heading()).toBeVisible();
    await expect(this.avatar()).toBeVisible();
  }
}
