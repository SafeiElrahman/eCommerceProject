import { expect } from '@playwright/test';
export default class RegisterAndLoginPage {
    constructor(page) {
        this.page = page;
        this.registerEmailInput = page.locator('#reg_email')
        this.registerPasswordInput = page.locator("//input[@id='reg_password']")
        this.registerButton = page.locator('[name="register"]')
        this.loginEmailInput = page.locator('#username')
        this.loginPasswordInput = page.locator("//input[@id='password']")
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.locator('.woocommerce-error');
    }


    async register(email, password) {
        await this.registerEmailInput.type(email, { delay: 80 });
        await this.registerPasswordInput.type(password, { delay: 80 });

        await expect(this.registerButton).toBeEnabled({ timeout: 5000 });
        await this.registerButton.click();
    }


    async login(email, password) {
        await this.loginEmailInput.type(email, { delay: 80 });
        await this.loginPasswordInput.type(password, { delay: 80 });
        await this.loginButton.click();
        await this.page.waitForURL('**/my-account/**');
    }



    async verifyLoginError(username) {
        await expect(this.loginError)
            .toContainText(`username ${username} is incorrect`);
    }

}