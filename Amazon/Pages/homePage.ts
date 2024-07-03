import { Locator, Page, expect } from "@playwright/test";

//Signin POM
export class homePage {

    private readonly amazonLogo: Locator;
    private readonly accountInfo: Locator;
    private readonly productSearchBar: Locator;

    constructor(public readonly page: Page) {
        this.amazonLogo = this.page.locator("//a[@id='nav-logo-sprites']");
        this.accountInfo = this.page.locator("//span[contains(@id,'accountList')]");
        this.productSearchBar =this.page.getByPlaceholder('Search Amazon.in');
    }

    //Launching Amazon URL
    async goto(URL: string): Promise<void> {
        await this.page.goto(URL);
        await this.page.waitForLoadState();
        await expect(this.amazonLogo, 'Verify "Amazon" logo').toHaveAttribute('aria-label', 'Amazon.in');
    }

    // Verifying user "Demo" is logged in.
    async verifyUser(): Promise<void> {
        await expect(this.accountInfo, 'Verify user "Demo" logged in to Amazon').toContainText("Demo");
    }

    // Search for products
    async searchProduct(productName: string): Promise<void> {
        await this.productSearchBar.fill(productName);
        await this.page.keyboard.press('Enter');
    }

}