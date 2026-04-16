import { expect } from '@playwright/test';

/**
 * @class RegisterAndLoginPage
 * @description Page Object Model für die Registrierungs- und Login-Seite.
 * Enthält Methoden zur Benutzerregistrierung, Anmeldung und Fehlerüberprüfung.
 */
export default class RegisterAndLoginPage {

    /**
     * @constructor
     * @param {import('@playwright/test').Page} page - Die Playwright-Page-Instanz
     */
    constructor(page) {
        this.page = page;
        this.registerEmailInput = page.locator('#reg_email');
        this.registerPasswordInput = page.locator("//input[@id='reg_password']");
        this.registerButton = page.locator('[name="register"]');
        this.loginEmailInput = page.locator('#username');
        this.loginPasswordInput = page.locator("//input[@id='password']");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.locator('.woocommerce-error');
    }

    /**
     * @method register
     * @description Registriert einen neuen Benutzer mit E-Mail und Passwort.
     * Tippt die Daten mit einer Verzögerung ein und klickt auf den Registrieren-Button.
     * @param {string} email - Die E-Mail-Adresse des neuen Benutzers
     * @param {string} password - Das Passwort des neuen Benutzers
     * @returns {Promise<void>}
     */
    async register(email, password) {
        await this.registerEmailInput.type(email, { delay: 80 });
        await this.registerPasswordInput.type(password, { delay: 80 });
        await expect(this.registerButton).toBeEnabled({ timeout: 5000 });
        await this.registerButton.click();
    }

    /**
     * @method login
     * @description Meldet einen bestehenden Benutzer mit E-Mail und Passwort an.
     * Wartet nach dem Login auf die Weiterleitung zur "My Account"-Seite.
     * @param {string} email - Die E-Mail-Adresse des Benutzers
     * @param {string} password - Das Passwort des Benutzers
     * @returns {Promise<void>}
     * @throws {Error} Wenn die Weiterleitung zur Account-Seite ausbleibt
     */
    async login(email, password) {
        await this.loginEmailInput.type(email, { delay: 80 });
        await this.loginPasswordInput.type(password, { delay: 80 });
        await this.loginButton.click();
        await this.page.waitForURL('**/my-account/**');
    }

    /**
     * @method verifyLoginError
     * @description Überprüft, ob eine Fehlermeldung bei falschem Benutzernamen angezeigt wird.
     * @param {string} username - Der verwendete Benutzername, der in der Fehlermeldung erscheinen soll
     * @returns {Promise<void>}
     */
    async verifyLoginError(username) {
        await expect(this.loginError)
            .toContainText(`username ${username} is incorrect`);
    }
}