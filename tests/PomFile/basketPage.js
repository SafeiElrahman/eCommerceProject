import { expect } from "@playwright/test"; 
export default class BasketPage {
    constructor(page) {
        this.page = page;
        this.productNameLocator = this.page.locator('.product-name a');
    }

    async verifyProductInBasket(productName) {
        const productLocator = this.page.locator('.product-name a').filter({ hasText: productName });
        await expect(productLocator).toBeVisible();
    }

    async verifyAllProductsInBasket(productNames) {
        for (const productName of productNames) {
            const productLocator = this.page.locator('.product-name a').filter({ hasText: productName });
            await expect(productLocator).toBeVisible();
        }
    }

    async clickProceedToCheckout() {
        const checkoutButton = this.page.getByRole('link', { name: 'Proceed to Checkout' });
        await checkoutButton.click();
    }

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