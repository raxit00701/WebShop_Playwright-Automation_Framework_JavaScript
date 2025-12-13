// @ts-check
import { test, expect, request } from '@playwright/test';

test('@API Login API + UI validation', async ({ page }) => {
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

    // Step 5: Find specific cookie values dynamically
    const authCookie = cookies.find(c => c.name === 'NOPCOMMERCE.AUTH');
    const affinityCookie = cookies.find(c => c.name === 'ARRAffinity');

    console.log('Cookie is:', authCookie?.value);
    console.log('token value:', affinityCookie?.value);

    // Step 6: Inject cookies into browser page (local storage/session)
    await page.context().addCookies(cookies);

    // Step 7: Navigate to homepage
    await page.goto('https://demowebshop.tricentis.com/');

    // Step 8: Verify login link with user email
    const userLink = page.getByRole('link', { name: 'neyon63299@datehype.com' }).first();
    await expect(userLink).toBeVisible();

    // Print the text on console
    console.log('User link text:', await userLink.textContent());
});