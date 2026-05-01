import { test, expect } from '@playwright/test';
import { HomePage, RegisterAndLoginPage } from '../PomFile/index.js';


test('Register Test', async ({ page }) => {
    const randomEmail = `user${Math.random().toString(36).substring(2, 8)}@gmail.com`;
    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.register(randomEmail, 'TestPassword123@H');
    await expect(homePage.signOutButton).toBeVisible();
});