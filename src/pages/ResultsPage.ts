import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for working with search result collections. */
export class ResultsPage extends BasePage {
  constructor(page: Page) { super(page); }
  items(): Locator { return this.page.getByTestId('result-item'); }
  selectFirstProduct(): Locator { return this.page.getByTestId('select-product').first(); }

  /** Returns numeric prices for all currently visible result items. */
  async getAllVisiblePrices(): Promise<number[]> {
    const prices = await this.page
      .getByTestId('result-item')
      .filter({ visible: true })
      .getByTestId('result-price')
      .allTextContents();

    return prices.map(price => Number(price.replace('$', '')));
  }

  /** Verifies every visible result price is below the supplied limit using an auto-retrying assertion. */
  async expectAllPricesBelow(limit: number): Promise<void> {
    await expect.poll(async () => this.getAllVisiblePrices()).toSatisfy(prices => prices.length > 0 && prices.every(price => price < limit));
  }
}
