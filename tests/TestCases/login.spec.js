import {test, expect} from '@playwright/test';
import HomePage from '../PomFile/homePage';
import RegisterAndLoginPage from '../PomFile/registerAndLoginPage';

test ('login - valid', async ({page}) => {
    const validUsername = 'safei@test.com';
    const validPassword = 'TestPassword123@H';

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
    const invalidUsername ="test@test.com"
    const invalidPassword = 'InvalidPassword123@H';
    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.login(invalidUsername, invalidPassword);
    await registerAndLoginPage.verifyLoginError(invalidUsername);
});