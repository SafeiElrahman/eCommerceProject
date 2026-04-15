export default class HomePage {
    constructor(page) {
        this.page = page;
        this.myAccountButton = page.getByRole('link', { name: 'My Account' }).first();
        this.signOutButton = page.getByRole('link', { name: 'Sign out' });
        this.shopButton = page.locator('nav').locator('a:has-text("Shop")');

    }

    async acceptCookies() {
        const dialog = this.page.getByRole('dialog');

        if (await dialog.isVisible()) {
            await dialog.getByRole('button', { name: 'Consent', exact: true }).click();
        }
    }

    async clickMyAccount() {
        await this.myAccountButton.click();
    }

    async clickShop() {
        await this.shopButton.click();
    }

    async signOut() {
        await this.signOutButton.click();
    }



}