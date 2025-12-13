// @ts-check
import { request, expect } from '@playwright/test';

/**
 * Logs in via API and injects cookies into the given page.
 * @param {import('@playwright/test').Page} page
 */
export async function login(page) {
    // Step 1: Create API request context
    const apiContext = await request.newContext();

    // Step 2: Perform login via POST
    const response = await apiContext.post('https://demowebshop.tricentis.com/login', {
        form: {
            Email: 'neyon63299@datehype.com',
            Password: 'Password@12',
            RememberMe: 'true'
        }
    });

    // Step 3: Ensure login succeeded
    expect(response.ok()).toBeTruthy();

    // Step 4: Extract cookies
    const storage = await apiContext.storageState();
    const cookies = storage.cookies;

    // Step 5: Inject cookies into browser page
    await page.context().addCookies(cookies);

    // Step 6: Navigate to homepage
    await page.goto('https://demowebshop.tricentis.com/');
    // Step 7: Verify login link with user email
    const userLink = page.locator("(//a[@class='account'])[1]\n");
    await expect(userLink).toBeVisible();

    console.log('User link text:', await userLink.textContent());


}