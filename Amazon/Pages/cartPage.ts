import { Locator, Page, expect } from "@playwright/test";

//Signin POM
export class cartPage {

    private readonly cart: Locator;
    private readonly itemInCart: Locator;
    private readonly itemCount: Locator;

    constructor(public readonly page: Page) {
        this.cart = this.page.locator("//a[contains(@aria-label,'items in cart')]");
        this.itemInCart = this.page.locator("//div[@class='sc-list-item-content']//span[@class='a-truncate-full a-offscreen']")       
        this.itemCount= this.page.locator("//div[@class='sc-list-item-content']//input[@value='Delete']")
    }

    //navigate to cart page
    async gotoCart(): Promise<void> {
        await this.cart.click()
        await expect(this.itemInCart.nth(0)).toBeVisible()
    }

    // verify item name in the cart
    async verifyItemInCart(): Promise<void> {
        await expect(this.itemInCart).toContainText("Nike Mens E-Series Running Shoes")
    }

    //Delete item from the cart
    async removeItemFromCart(): Promise<void>{
        let count = await this.itemCount.count()
        for(let i=count-1;i>=0;i--){
            await this.itemCount.nth(i).click()
            await this.page.waitForLoadState()
        }
    }
}