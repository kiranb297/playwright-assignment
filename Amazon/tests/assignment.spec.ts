import { test, expect } from '../Fixtures/amazonFixtures';

// Test case to search for Shoes in Amazon
test('Search for "Shoes"', async ({ homePage,searchResultsPage }) => {

  // Launching Amazon url.
  await homePage.goto("https://www.amazon.in/")

  // Verifying user "Demo" is logged in.
  await homePage.verifyUser()

  // Search for Shoes in the Search bar.
  await homePage.searchProduct("Shoes")

  // Verify it is showing results for searched product "Shoes".
  await searchResultsPage.verifySearchResult("Shoes")
  
});

// Test case to search for watches in Amazon and apply two filters.
// test('Apply filters for search results', async ({ page }) => {



// })