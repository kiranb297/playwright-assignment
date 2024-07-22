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

    // verify product in the cart.
    async verifyItemInCart(): Promise<void> {
        const itemCount = await this.itemsInCart.count();
        if(itemCount>0){
            console.log("Product added to cart successfully")
        }else{
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