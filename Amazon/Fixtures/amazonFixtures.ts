import { test as base } from '@playwright/test';
import { homePage } from '../Pages/homePage';
import { searchResultsPage } from '../Pages/searchResultsPage';

type MyFixtures = {
    homePage: homePage;
    searchResultsPage:searchResultsPage
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
});

export { expect } from '@playwright/test';