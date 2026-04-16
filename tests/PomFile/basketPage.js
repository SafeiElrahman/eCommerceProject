import { expect } from "@playwright/test"; 

/**
 * @class BasketPage
 * @description Page Object Model für die Warenkorb-Seite.
 * Enthält Methoden zur Überprüfung und Verwaltung des Warenkorbs.
 */
export default class BasketPage {
    
    /**
     * @constructor
     * @param {import('@playwright/test').Page} page - Die Playwright-Page-Instanz
     */
    constructor(page) {
        this.page = page;
        this.productNameLocator = this.page.locator('.product-name a');
    }

    /**
     * @method verifyProductInBasket
     * @description Überprüft, ob ein bestimmtes Produkt im Warenkorb sichtbar ist.
     * @param {string} productName - Der Name des zu prüfenden Produkts
     * @returns {Promise<void>}
     */
    async verifyProductInBasket(productName) {
        const productLocator = this.page.locator('.product-name a').filter({ hasText: productName });
        await expect(productLocator).toBeVisible();
    }

    /**
     * @method verifyAllProductsInBasket
     * @description Überprüft, ob alle angegebenen Produkte im Warenkorb sichtbar sind.
     * @param {string[]} productNames - Array mit den Namen der zu prüfenden Produkte
     * @returns {Promise<void>}
     */
    async verifyAllProductsInBasket(productNames) {
        for (const productName of productNames) {
            const productLocator = this.page.locator('.product-name a').filter({ hasText: productName });
            await expect(productLocator).toBeVisible();
        }
    }

    /**
     * @method clickProceedToCheckout
     * @description Klickt auf den "Proceed to Checkout"-Button, um zur Kasse zu navigieren.
     * @returns {Promise<void>}
     */
    async clickProceedToCheckout() {
        const checkoutButton = this.page.getByRole('link', { name: 'Proceed to Checkout' });
        await checkoutButton.click();
    }

    /**
     * @method clearCart
     * @description Leert den Warenkorb vollständig.
     * Navigiert zur Warenkorb-Seite, entfernt alle Produkte einzeln
     * und kehrt anschließend zur Startseite zurück.
     * @returns {Promise<void>}
     */
    async clearCart() {
        try {
            await this.page.goto('/basket/', { waitUntil: 'domcontentloaded' });
            const removeButtons = this.page.locator('a:has-text("×")');
            let count = await removeButtons.count();
            
            for (let i = 0; i < 10 && count > 0; i++) {
                try {
                    const firstButton = removeButtons.first();
                    await firstButton.click({ timeout: 5000 });
                    await this.page.waitForLoadState('domcontentloaded');
                } catch (e) {
                    break;
                }
                count = await removeButtons.count();
            }
            
            // Reload to ensure cart is truly empty
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            
            // Navigate to home to reset page state
            await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        } catch (e) {
            // Cart might already be empty or page load failed, continue
        }
    }
}