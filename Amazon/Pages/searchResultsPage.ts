import { Locator, Page, expect } from "@playwright/test";

//Search Results Page POM
export class searchResultsPage {

    private readonly searchedProductName: Locator;
    private readonly resultPage: Locator;
    private readonly nikeShoe: Locator;

    constructor(public readonly page: Page) {
        this.resultPage = this.page.getByText('Results', { exact: true });
        this.searchedProductName = this.page.locator("//span[contains(@data-component-type,'result-info')]//span[contains(text(),'results')]/following-sibling::span[@class]");
        this.nikeShoe = this.page.locator("//span[text()='Mens Full Force LoRunning Shoe']");
    }

    // Verify it is showing results for "searched product".
    async verifySearchResult(productName: string): Promise<void> {
        await expect(this.resultPage, 'Verify "Result" page').toBeVisible();
        await expect(this.searchedProductName, `Verify showing results for searched keyword "${productName}"`).toContainText(productName);
    }

    // Apply filters by company/brand name
    async filterByBrand(brandName: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.getByRole('link', { name: brandName, exact: true }).click();
    }

    // Verify brand filters
    async verifyBrandFilter(brandName: string): Promise<void> {
        await this.page.waitForLoadState()
        await expect(this.page.locator(`//span[text()='${brandName}']/..//input`), `Verify product is filtered by "${brandName}" brand/company`).toBeChecked();
    }

    // Apply filters by material
    async filterByMaterial(material: string): Promise<void> {
        await this.page.waitForLoadState()
        await this.page.getByRole('link', { name: material, exact: true }).click();
    }

    // Verify material filters
    async verifyMaterialFilter(material: string): Promise<void> {
        await this.page.waitForLoadState()
        await expect(this.page.locator(`//span[text()='${material}']/..//input`), `Verify product is filtered by "${material}" material`).toBeChecked();
    }

    // Add perticular product to cart
    async addProductToCart(): Promise<void> {
        await this.page.waitForLoadState()
        const pagePromise = this.page.context().waitForEvent('page');
        await this.nikeShoe.click()
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        // Verify filters in the product details page.
        await expect(newPage.locator("//a[@id='bylineInfo']"),'Verify product brand to be "Nike"').toContainText("Nike");
        await expect(newPage.locator("//span[text()='Outer material']/../../following-sibling::div//span//span"),'Verify product material to be "Leather"').toContainText("Leather");
        // Add product to cart
        await newPage.getByLabel('Add to Cart').click();
        await expect(newPage.getByRole('heading', { name: 'Added to Cart' }),'Verify product added to cart').toBeVisible();
        await newPage.close();
    }
}