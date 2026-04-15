import { expect } from '@playwright/test';
export default class ShopPage {
    constructor(page) {
        this.page = page;
        this.addedToCartMessage = this.page.locator('.woocommerce-message');
        this.viewPasketButton = this.page.getByRole('link', { name: 'View basket' });
    }

    async addProductByName(productName) {
        const product = this.page.locator('li.product', {
            has: this.page.getByRole('heading', { name: productName }),
        });

        await product.locator('a.button').click();
    }

    async verifyProductAddedToCart(productName) {
        await expect(this.addedToCartMessage).toBeVisible();
        await expect(this.addedToCartMessage).toContainText(productName);
    }

    async clickViewBasket() {
        await this.viewPasketButton.click();
    }

}   