import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page object for working with search result collections. */
export class ResultsPage extends BasePage {
  constructor(page: Page) { super(page); }
  items(): Locator { return this.page.getByTestId('result-item'); }
  selectFirstProduct(): Locator { return this.page.getByTestId('select-product').first(); }

  async getAllPrices(): Promise<number[]> {
    const prices = await this.page.getByTestId('result-price').allTextContents();
    return prices.map(price => Number(price.replace('$', '')));
  }

  async expectAllPricesBelow(limit: number): Promise<void> {
    const prices = await this.getAllPrices();
    expect(prices.every(price => price < limit)).toBeTruthy();
  }
}
