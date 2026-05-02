import { HomePage, RegisterAndLoginPage } from '../../PomFile/index.js';

export async function validLoginTemplate(page,validUsername,validPassword) {
    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.login(validUsername, validPassword);
    await page.waitForURL('**/my-account/**');
}