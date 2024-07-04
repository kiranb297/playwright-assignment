import { Locator, Page, expect } from "@playwright/test";

//Home page POM
export class homePage {

    private readonly amazonLogo: Locator;
    private readonly accountInfo: Locator;
    private readonly productSearchBar: Locator;
    private readonly signOutBtn: Locator;
    private readonly signinHeader: Locator;
    private readonly accountList: Locator;

    constructor(public readonly page: Page) {
        this.amazonLogo = this.page.locator("//a[@id='nav-logo-sprites']");
        this.accountInfo = this.page.locator("//span[contains(@id,'accountList')]");
        this.productSearchBar =this.page.getByPlaceholder('Search Amazon.in');
        this.signOutBtn=this.page.locator("//span[text()='Sign Out']");
        this.signinHeader=this.page.locator("//h1[contains(text(),'Sign in')]");
        this.accountList=this.page.locator("//span[text()='Account & Lists']//span");
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

    // Sign out of Amazon account
    async signOut(): Promise<void> {
        await this.accountList.hover();
        await this.signOutBtn.click();
        await expect(this.signinHeader,'Verify user logged out of Amazon').toBeVisible();
    }
}