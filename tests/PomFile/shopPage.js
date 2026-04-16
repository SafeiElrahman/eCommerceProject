import { expect } from '@playwright/test';

/**
 * @class ShopPage
 * @description Page Object Model für die Shop-Seite.
 * Enthält Methoden zum Hinzufügen von Produkten zum Warenkorb
 * und zur Überprüfung der Warenkorb-Benachrichtigungen.
 */
export default class ShopPage {

    /**
     * @constructor
     * @param {import('@playwright/test').Page} page - Die Playwright-Page-Instanz
     */
    constructor(page) {
        this.page = page;
        this.addedToCartMessage = this.page.locator('.woocommerce-message');
        this.viewPasketButton = this.page.getByRole('link', { name: 'View basket' });
    }

    /**
     * @method addProductByName
     * @description Sucht ein Produkt anhand seines Namens und fügt es dem Warenkorb hinzu.
     * @param {string} productName - Der Name des hinzuzufügenden Produkts
     * @returns {Promise<void>}
     */
    async addProductByName(productName) {
        const product = this.page.locator('li.product', {
            has: this.page.getByRole('heading', { name: productName }),
        });
        await product.locator('a.button').click();
    }

    /**
     * @method verifyProductAddedToCart
     * @description Überprüft, ob die Erfolgsbenachrichtigung nach dem Hinzufügen
     * eines Produkts sichtbar ist und den Produktnamen enthält.
     * @param {string} productName - Der Name des hinzugefügten Produkts
     * @returns {Promise<void>}
     */
    async verifyProductAddedToCart(productName) {
        await expect(this.addedToCartMessage).toBeVisible();
        await expect(this.addedToCartMessage).toContainText(productName);
    }

    /**
     * @method clickViewBasket
     * @description Klickt auf den "View basket"-Button um zum Warenkorb zu navigieren.
     * @returns {Promise<void>}
     */
    async clickViewBasket() {
        await this.viewPasketButton.click();
    }
}