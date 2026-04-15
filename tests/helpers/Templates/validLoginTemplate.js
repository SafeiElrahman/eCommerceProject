import HomePage from '../../PomFile/homePage';
import RegisterAndLoginPage from '../../PomFile/registerAndLoginPage';

export async function validLoginTemplate(page,validUsername,validPassword) {
    const homePage = new HomePage(page);
    const registerAndLoginPage = new RegisterAndLoginPage(page);

    await page.goto('/');
    await homePage.acceptCookies();
    await homePage.clickMyAccount();
    await registerAndLoginPage.login(validUsername, validPassword);
    await page.waitForURL('**/my-account/**');
}