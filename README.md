# playwright-assignment
Tests : Amazon product search Repo consists of three test cases
1. Search for "Shoes" : In th Amazon Search for Shoes and verify the search result.
2. Apply filters for search results: After searching for product apply atleast of 2 filters for the search result.
3. Add perticular product to cart : Add a perticular product to cart by verifying the applied filters to the search result.

Fixtures : Amazon Fixtures
1. Home Page : Fixture for Amazon home page
2. Search result page : Fixture for Amazon search result page
3. Cart page : FIxture for Amazon cart page

Pages POM (Page Object Model)
1. Home Page
2. Search result page
3. Cart page

Test Data : Amazon test data file for storing test data.

To run test case locally follow the steps below:
  * Prerequisites : VS code, Nodejs.
  * Copy the GitGub URL : "https://github.com/kiranb297/playwright-assignment.git"
  * Open VS code then goto "Source control" or (Ctrl + Shift + G) and select Clone Repository
  * Then paste the GitHub URL and click enter.
  * Select the project location in the file explorer and click "Select as Repository Destination".
  * Open terminal (Ctrl + Shift +`) or click on three ellipses on the top select terminal and click on new terminal.
  * Enter "npm install" in the terminal and click enter.
  * After installation
    * "npx playwright test --headed" run this command to run all test cases in headded mode in parrallel.
          Note : If it is showing to install browsers use the command "npx playwright install".
    * "npx playwright test" run this command to run all test cases in headless mode.
    * "npx playwright show-report" run this command to view html report with attached video.

      
  ############################ IMPORTANT ####################################
  
  Note : If the test cases are running more than 6 to 7 times continuously, Amazon uses captcha to verify it is not automated bot,so we need to login to Amazon manually and verify the captcha for the Demo user.
  If the product is not available and if product is out of stock, so we need to change the product because the script is written for a perticular product.
