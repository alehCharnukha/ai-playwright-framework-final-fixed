import { expect, type Locator, type Page } from '@playwright/test';
import { buildDemoAppHtml } from '../utils/demoApp';

/** Shared page object functionality used by all concrete pages. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /**
   * Serves the deterministic demo application through Playwright routing and opens a path.
   * This keeps tests independent from external websites while still allowing URL assertions.
   */
  async openApp(path = '/login'): Promise<void> {
    await this.page.route('**/*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: buildDemoAppHtml()
      });
    });

    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /** Verifies that a locator is visible using Playwright auto-retry assertions. */
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
