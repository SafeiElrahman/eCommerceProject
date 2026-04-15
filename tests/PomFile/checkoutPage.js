import { expect } from '@playwright/test';

export default class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillShippingDetails(details) {
        // Fill first name
        if (details.firstName) {
            const firstNameInput = this.page.locator('input[name*="first_name"], #billing_first_name');
            await firstNameInput.fill(details.firstName);
        }

        // Fill last name
        if (details.lastName) {
            const lastNameInput = this.page.locator('input[name*="last_name"], #billing_last_name');
            await lastNameInput.fill(details.lastName);
        }

        // Fill address
        if (details.address) {
            const addressInput = this.page.locator('#billing_address_1');
            await addressInput.fill(details.address);
        }

        // Fill city
        if (details.city) {
            const cityInput = this.page.locator('input[name*="city"], #billing_city');
            await cityInput.fill(details.city);
        }

        // Fill postcode
        if (details.postcode) {
            const postcodeInput = this.page.locator('input[name*="postcode"], #billing_postcode');
            await postcodeInput.fill(details.postcode);
        }

        // Fill phone
        if (details.phone) {
            const phoneInput = this.page.locator('input[name*="phone"], #billing_phone');
            await phoneInput.fill(details.phone);
        }
    }

    async placeOrder() {
    const placeOrderButton = this.page.locator('#place_order');
    await placeOrderButton.click();
    await this.page.waitForURL(/.*\/order-received\//, { timeout: 15000 });
}

    async verifyOrderConfirmation() {
        // Verify order received page is shown
        await expect(this.page).toHaveURL(/.*\/order-received\//);
        
        // Verify success message
        const successMessage = this.page.locator('.woocommerce-thankyou-order-received, h1');
        await expect(successMessage).toBeVisible();
    }

    async verifyProductInCheckout(productName) {
        // Verify product is visible on checkout page
        const productInCheckout = this.page.locator(`text=${productName}`);
        await expect(productInCheckout).toBeVisible();
    }
}
