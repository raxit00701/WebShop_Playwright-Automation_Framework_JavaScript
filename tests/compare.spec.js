const { test } = require('@playwright/test');
const { login } = require('../utils/login.js');  // import the helper
const { MainPage } = require('../pages/mainpage');


test('@API comparing products', async ({ page }) => {
    // 1. Login via API helper
    await login(page);
    const mainPage = new MainPage(page);


    // 2. Hover on Electronics
    await mainPage.hoverElectronics();


    // 3. Click the first Cell Phones menu link
    await mainPage.goToCellPhones();
    await page.waitForLoadState('networkidle');

    // 4. Click on smartphone
    await mainPage.goToSmartphone();

    // 5. Click on 1st compare button
    await page.locator('input.button-2.add-to-compare-list-button').nth(0).click();

    // 6. Hover again on Electronics
    await page.hover('a[href="/electronics"]');

    // 7. Click Cell Phones again
    await mainPage.goToCellPhones();
    await page.waitForLoadState('networkidle');

    // 8. Click on Used phone
    await page.getByText('Used phone', { exact: true }).click();

    // 9. Click compare button
    await page.locator('input.button-2.add-to-compare-list-button').nth(0).click();

    // 10. Get the text content of the table
    const tableText = await page.locator('.compare-products-table').innerText();

    console.log('Compare Products Table:', tableText);
});