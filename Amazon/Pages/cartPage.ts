import { Locator, Page, expect } from "@playwright/test";

//Signin page POM
export class cartPage {

    private readonly cart: Locator;
    private readonly itemsInCart: Locator;
    private readonly deleteProductFromCart: Locator;
    private readonly emptyCart: Locator;

    constructor(public readonly page: Page) {
        this.cart = this.page.locator("//a[contains(@aria-label,'items in cart')]");
        this.itemsInCart = this.page.locator("//div[@class='sc-list-item-content']//span[@class='a-truncate-full a-offscreen']")
        this.deleteProductFromCart = this.page.locator("//div[@class='sc-list-item-content']//input[@value='Delete']")
        this.emptyCart=this.page.getByRole('heading', { name: 'Your Amazon Cart is empty.' })
    }

    //navigate to cart page
    async gotoCart(): Promise<void> {
        await this.cart.click()
        await expect(this.itemsInCart.nth(0), 'Verify cart item is visible').toBeVisible();
    }

    // verify product name in the cart.
    async verifyItemInCart(): Promise<void> {
        const itemCount = await this.itemsInCart.count();
        let productAdded = false;
        for (let i = 0; i < itemCount; i++) {
            let itemName = await this.itemsInCart.nth(i).textContent();
            if (itemName?.includes("Full Force Low Men's Shoes")) {
                await expect(this.itemsInCart.nth(i), 'Verify added product title in cart').toContainText("Full Force Low Men's Shoes");
                productAdded = true;
                break;
            }
        }
        if(!productAdded){
            throw new Error("Failed to add product to the cart");
        }
    }

    // Remove all products from the cart.
    async removeItemFromCart(): Promise<void> {
        let count = await this.deleteProductFromCart.count();
        for (let i = count - 1; i >= 0; i--) {
            await this.deleteProductFromCart.nth(i).click();
            await this.page.waitForLoadState();
        }
        await expect(this.emptyCart,'Verify all products are removed from cart').toBeVisible();
    }
}