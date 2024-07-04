import { test } from '../Fixtures/amazonFixtures';
import amazonTestData from '../Testdata/amazonTestData.json';

test.describe('Amazon product search', async () => {

  // Test case to search for Shoes in Amazon
  test('Search for "Shoes"', async ({ homePage, searchResultsPage }) => {

    // Launching Amazon url.
    await homePage.goto(amazonTestData.amazon_url);

    // Verifying user "Demo" is logged in.
    await homePage.verifyUser();

    // Search for Shoes in the Search bar.
    await homePage.searchProduct("Shoes");

    // Verify it is showing results for searched product "Shoes".
    await searchResultsPage.verifySearchResult("Shoes");

  });

  // Test case to search for Shoes in Amazon and apply any two filters.
  test('Apply filters for search results', async ({ homePage, searchResultsPage }) => {

    // Launching Amazon url.
    await homePage.goto(amazonTestData.amazon_url);

    // Verifying user "Demo" is logged in.
    await homePage.verifyUser();

    // Search for Shoes in the Search bar.
    await homePage.searchProduct("Shoes");

    // Filter search results by brand example [Puma, ASIAN, Campus, SPARX, adidas, Red Tape, Nike, Reebok....]
    await searchResultsPage.filterByBrand("Puma");

    // Verify the product is filtered based on brand.
    await searchResultsPage.verifyBrandFilter("Puma");

    // Filter search results by shoe material example [Canvas, Cotton, Faux Leather, Leather, Mesh....]
    await searchResultsPage.filterByMaterial("Leather");

    // Verify the product is filtered by material
    await searchResultsPage.verifyMaterialFilter("Leather");
  })


  // Test case to add perticular product to amazon cart.
  test('Add perticular product to cart', async ({ homePage, searchResultsPage, cartPage}) => {

    // Launching Amazon url.
    await homePage.goto(amazonTestData.amazon_url);

    // Verifying user "Demo" is logged in.
    await homePage.verifyUser();

    // Search for Shoes in the Search bar.
    await homePage.searchProduct("Shoes");

    // Filter search results by brand example [Puma, ASIAN, Campus, SPARX, adidas, Red Tape, Nike, Reebok....]
    await searchResultsPage.filterByBrand("Nike");

    // Verify the product is filtered based on brand.
    await searchResultsPage.verifyBrandFilter("Nike");

    // Filter search results by shoe material example [Canvas, Cotton, Faux Leather, Leather, Mesh....]
    await searchResultsPage.filterByMaterial("Leather");

    // Verify the product is filtered by material
    await searchResultsPage.verifyMaterialFilter("Leather");

    // Add perticular product to cart by verifying applied filters in product details page.
    await searchResultsPage.addProductToCart();

    // Navigate to cart page
    await cartPage.gotoCart();

    // Verify Product name in the cart page
    await cartPage.verifyItemInCart();

    // Remove items in the cart page
    await cartPage.removeItemFromCart();
  })

  // Sign out of Amazon
  test.afterEach('Signout', async ({ homePage }) => {
    await homePage.signOut();
  })
  
})