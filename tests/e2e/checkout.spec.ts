import { expect, test } from '@playwright/test';
import { Header } from '../../src/components/Header';
import { checkout, products, search } from '../../src/fixtures/testData';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { ProductPage } from '../../src/pages/ProductPage';
import { ResultsPage } from '../../src/pages/ResultsPage';
import { SearchPage } from '../../src/pages/SearchPage';

test.describe('Checkout', () => {
  test('adding a product increments the cart badge', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);
    const product = new ProductPage(page);
    const header = new Header(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);
    await results.selectFirstProduct().click();

    // User actions
    await product.addToCart().click();

    // Verification
    await expect(product.cartStatus()).toHaveText('Added to cart');
    await header.expectCartCount('1');
  });

  test('cart shows the selected product and expected total', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);
    const product = new ProductPage(page);
    const header = new Header(page);
    const cart = new CartPage(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);
    await results.selectFirstProduct().click();
    await product.addToCart().click();

    // User actions
    await header.cartButton().click();

    // Verification
    await expect(cart.items()).toHaveText(products.backpack.name);
    await cart.expectTotal(`$${products.backpack.price}`);
  });

  test('user can proceed from cart to checkout', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);
    const product = new ProductPage(page);
    const header = new Header(page);
    const cart = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);
    await results.selectFirstProduct().click();
    await product.addToCart().click();
    await header.cartButton().click();

    // User actions
    await cart.proceedToCheckout().click();

    // Verification
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(checkoutPage.total()).toHaveText(`$${products.backpack.price}`);
  });

  test('user can place an order with valid checkout details', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const results = new ResultsPage(page);
    const product = new ProductPage(page);
    const header = new Header(page);
    const cart = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Initialization
    await searchPage.open();
    await searchPage.searchFor(search.query);
    await results.selectFirstProduct().click();
    await product.addToCart().click();
    await header.cartButton().click();
    await cart.proceedToCheckout().click();

    // User actions
    await checkoutPage.fillShippingDetails(checkout.shippingName, checkout.address, checkout.cardNumber);
    await checkoutPage.placeOrder().click();

    // Verification
    await checkoutPage.expectOrderPlaced();
  });
});
