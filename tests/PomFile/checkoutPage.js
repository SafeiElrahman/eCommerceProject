import { expect } from '@playwright/test';

/**
 * @class CheckoutPage
 * @description Page Object Model für die Checkout-Seite.
 * Enthält Methoden zum Ausfüllen der Versanddetails,
 * Aufgeben von Bestellungen und Überprüfen der Bestellbestätigung.
 */
export default class CheckoutPage {

    /**
     * @constructor
     * @param {import('@playwright/test').Page} page - Die Playwright-Page-Instanz
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * @method fillShippingDetails
     * @description Füllt die Versand- und Rechnungsdetails im Checkout-Formular aus.
     * Alle Felder sind optional – nur vorhandene Werte werden ausgefüllt.
     * @param {Object} details - Objekt mit den Versanddetails
     * @param {string} [details.firstName] - Vorname
     * @param {string} [details.lastName] - Nachname
     * @param {string} [details.address] - Straße und Hausnummer
     * @param {string} [details.city] - Stadt
     * @param {string} [details.postcode] - Postleitzahl
     * @param {string} [details.phone] - Telefonnummer
     * @returns {Promise<void>}
     */
    async fillShippingDetails(details) {
        if (details.firstName) {
            const firstNameInput = this.page.locator('input[name*="first_name"], #billing_first_name');
            await firstNameInput.fill(details.firstName);
        }
        if (details.lastName) {
            const lastNameInput = this.page.locator('input[name*="last_name"], #billing_last_name');
            await lastNameInput.fill(details.lastName);
        }
        if (details.address) {
            const addressInput = this.page.locator('#billing_address_1');
            await addressInput.fill(details.address);
        }
        if (details.city) {
            const cityInput = this.page.locator('input[name*="city"], #billing_city');
            await cityInput.fill(details.city);
        }
        if (details.postcode) {
            const postcodeInput = this.page.locator('input[name*="postcode"], #billing_postcode');
            await postcodeInput.fill(details.postcode);
        }
        if (details.phone) {
            const phoneInput = this.page.locator('input[name*="phone"], #billing_phone');
            await phoneInput.fill(details.phone);
        }
    }

    /**
     * @method placeOrder
     * @description Klickt auf den "Place Order"-Button und wartet,
     * bis die Bestellbestätigungsseite geladen ist.
     * @returns {Promise<void>}
     * @throws {Error} Wenn die Weiterleitung zur Bestätigungsseite nach 15 Sekunden ausbleibt
     */
    async placeOrder() {
        const placeOrderButton = this.page.locator('#place_order');
        await placeOrderButton.click();
        await this.page.waitForURL(/.*\/order-received\//, { timeout: 15000 });
    }

    /**
     * @method verifyOrderConfirmation
     * @description Überprüft, ob die Bestellbestätigungsseite korrekt angezeigt wird.
     * Prüft sowohl die URL als auch die Sichtbarkeit der Erfolgsmeldung.
     * @returns {Promise<void>}
     */
    async verifyOrderConfirmation() {
        await expect(this.page).toHaveURL(/.*\/order-received\//);
        const successMessage = this.page.locator('.woocommerce-thankyou-order-received, h1');
        await expect(successMessage).toBeVisible();
    }

    /**
     * @method verifyProductInCheckout
     * @description Überprüft, ob ein bestimmtes Produkt auf der Checkout-Seite sichtbar ist.
     * @param {string} productName - Der Name des zu prüfenden Produkts
     * @returns {Promise<void>}
     */
    async verifyProductInCheckout(productName) {
        const productInCheckout = this.page.locator(`text=${productName}`);
        await expect(productInCheckout).toBeVisible();
    }
}