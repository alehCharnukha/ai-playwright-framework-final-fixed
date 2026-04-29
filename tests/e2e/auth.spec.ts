import { expect, test } from '@playwright/test';
import { users } from '../../src/fixtures/testData';
import { HomePage } from '../../src/pages/HomePage';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('Authentication', () => {
  test('valid user can sign in and see the dashboard avatar', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // Initialization
    await login.open();

    // User actions
    await login.login(users.valid.email, users.valid.password);

    // Verification
    await expect(page).toHaveURL(/\/home$/);
    await home.expectLoaded();
  });

  test('invalid password shows a clear error message', async ({ page }) => {
    const login = new LoginPage(page);

    // Initialization
    await login.open();

    // User actions
    await login.login(users.invalid.email, users.invalid.password);

    // Verification
    await expect(login.errorMessage()).toHaveText('Invalid email or password');
  });

  test('remember me checkbox can be selected before sign in', async ({ page }) => {
    const login = new LoginPage(page);

    // Initialization
    await login.open();

    // User actions
    await login.rememberMe().check();

    // Verification
    await expect(login.rememberMe()).toBeChecked();
  });

  test('signed in user can log out and return to login page', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // Initialization
    await login.open();
    await login.login(users.valid.email, users.valid.password);
    await home.expectLoaded();

    // User actions
    await home.logoutButton().click();

    // Verification
    await expect(page).toHaveURL(/\/login$/);
    await expect(login.submit()).toBeVisible();
  });
});
