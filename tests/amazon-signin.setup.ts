import { test as setup, expect } from '@playwright/test';

const auth = './.auth/amazonuser.json';

const testData={
  emailid:"demomailid465@gmail.com",
  password:"demo@123"
}

// Signin to amazon.in
setup('Signin to amazon.in', async ({ page }) => {
  // Launching Amazon URL
  await page.goto("https://www.amazon.in/");
  await page.waitForLoadState();
  await expect(page.locator("//a[@id='nav-logo-sprites']"),'Verify amazon logo').toHaveAttribute('aria-label', 'Amazon.in');
  await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' }), 'Verify "Signin" heading to be visible').toBeVisible();
  
  // Entering User mail id
  await page.locator("//input[@type='email']").fill(testData.emailid);
  await page.getByLabel('Continue').click();
  await expect(page.locator("//span[@id='auth-email-claim']"),'Verify entered "emailid"').toHaveText(testData.emailid);
  
  //Entering User password
  await page.getByLabel('Password').fill(testData.password);
  
  // Click on sigin in button
  await page.getByLabel('Sign in').click();
  
  // Verifying user "Demo" is logged in
  await expect(page.getByRole('link', { name: 'Hello, Demo Account & Lists' }),"Verify Demo user logged in to Amazon").toBeVisible();

  // Storing current cookies to json file.
  await page.context().storageState({ path: auth });
});