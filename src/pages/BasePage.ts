import { expect, type Locator, type Page } from '@playwright/test';
import { buildDemoAppHtml } from '../utils/demoApp';

/** Shared page object functionality used by all concrete pages. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  /** Loads the deterministic demo application into the browser context. */
  async loadDemoApp(): Promise<void> {
    await this.page.setContent(buildDemoAppHtml(), { waitUntil: 'domcontentloaded' });
  }

  /** Verifies that a locator is visible using Playwright auto-retry assertions. */
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
