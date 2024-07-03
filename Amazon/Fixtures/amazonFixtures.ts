import { test as base } from '@playwright/test';
import { homePage } from '../Pages/homePage';
import { searchResultsPage } from '../Pages/searchResultsPage';
import { cartPage } from '../Pages/cartPage';

type MyFixtures = {
    homePage: homePage;
    searchResultsPage: searchResultsPage;
    cartPage: cartPage;
};

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
        const homepage = new homePage(page);
        await use(homepage);
    },

    searchResultsPage: async ({ page }, use) => {
        const searchResultspage = new searchResultsPage(page);
        await use(searchResultspage);
    },

    cartPage: async ({ page }, use) => {
        const cartpage = new cartPage(page);
        await use(cartpage);
    },
});

export { expect } from '@playwright/test';