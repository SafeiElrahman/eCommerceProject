import {test, expect} from '@playwright/test';
import { HomePage, RegisterAndLoginPage } from '../PomFile/index.js';

test ('login - valid', async ({page}) => {
    const validUsername = process.env.VALID_EMAIL;
    const validPassword = process.env.VALID_PASSWORD;

    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.login(validUsername, validPassword);
    await expect(homePage.signOutButton).toBeVisible();
    await homePage.clickShop();
});

test ('login - invalid', async ({page}) => {
    const invalidUsername = process.env.INVALID_EMAIL;
    const invalidPassword = process.env.INVALID_PASSWORD;
    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.login(invalidUsername, invalidPassword);
    await registerAndLoginPage.verifyLoginError(invalidUsername);
});