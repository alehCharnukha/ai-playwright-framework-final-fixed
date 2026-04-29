import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for authentication actions. */
export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  email(): Locator { return this.page.getByTestId('email-input'); }
  password(): Locator { return this.page.getByTestId('password-input'); }
  rememberMe(): Locator { return this.page.getByTestId('remember-me'); }
  submit(): Locator { return this.page.getByTestId('login-button'); }
  errorMessage(): Locator { return this.page.getByRole('alert'); }

  async open(): Promise<void> {
    await this.openApp('/login');
    await expect(this.page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.email().fill(email);
    await this.password().fill(password);
    await this.submit().click();
  }
}
