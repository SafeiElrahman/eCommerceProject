import { test, expect } from '@playwright/test';
import HomePage from '../PomFile/homePage';
import LoginPage from '../PomFile/registerAndLoginPage';

test('Login Test', async ({ page }) => {
    const randomEmail = `user${Math.random().toString(36).substring(2, 8)}@gmail.com`;
    const homePage = new HomePage(page);
    const registerAndLoginPage = new LoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.register(randomEmail, 'TestPassword123@H');
    await expect(homePage.signOutButton).toBeVisible();
});