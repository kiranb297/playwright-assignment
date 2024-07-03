import { Locator, Page, expect } from "@playwright/test";

//Search Results Page POM
export class searchResultsPage {

    private readonly searchedProductName: Locator;
    private readonly resultPage: Locator;

    constructor(public readonly page: Page) {
        this.resultPage =this.page.getByText('Results', { exact: true });
        this.searchedProductName = this.page.locator("//span[contains(@data-component-type,'result-info')]//span[contains(text(),'results')]/following-sibling::span[@class]");
    }

    // Verify it is showing results for "searched product".
    async verifySearchResult(productName: string): Promise<void> {
        await expect( this.resultPage,'Verify "Result" page').toBeVisible();
        await expect(this.searchedProductName, `Verify showing results for searched keyword "${productName}"`).toContainText(productName);
    }
}