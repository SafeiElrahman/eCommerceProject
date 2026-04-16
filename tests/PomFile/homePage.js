/**
 * @class HomePage
 * @description Page Object Model für die Startseite.
 * Enthält Methoden zur Navigation und grundlegenden Seiteninteraktionen.
 */
export default class HomePage {

    /**
     * @constructor
     * @param {import('@playwright/test').Page} page - Die Playwright-Page-Instanz
     */
    constructor(page) {
        this.page = page;
        this.myAccountButton = page.getByRole('link', { name: 'My Account' }).first();
        this.signOutButton = page.getByRole('link', { name: 'Sign out' });
        this.shopButton = page.locator('nav').locator('a:has-text("Shop")');
    }

    /**
     * @method acceptCookies
     * @description Akzeptiert den Cookie-Dialog, falls dieser sichtbar ist.
     * Klickt auf den "Consent"-Button im Cookie-Banner.
     * @returns {Promise<void>}
     */
    async acceptCookies() {
        const dialog = this.page.getByRole('dialog');
        if (await dialog.isVisible()) {
            await dialog.getByRole('button', { name: 'Consent', exact: true }).click();
        }
    }

    /**
     * @method clickMyAccount
     * @description Klickt auf den "My Account"-Link in der Navigation.
     * @returns {Promise<void>}
     */
    async clickMyAccount() {
        await this.myAccountButton.click();
    }

    /**
     * @method clickShop
     * @description Klickt auf den "Shop"-Link in der Navigationsleiste.
     * @returns {Promise<void>}
     */
    async clickShop() {
        await this.shopButton.click();
    }

    /**
     * @method signOut
     * @description Klickt auf den "Sign out"-Link und meldet den Benutzer ab.
     * @returns {Promise<void>}
     */
    async signOut() {
        await this.signOutButton.click();
    }
}