const { test } = require('@playwright/test');
const { MainPage } = require('../pages/mainpage');


const { login } = require('../utils/login.js');  // import the helper

test('@API filter products', async ({ page }) => {
    // 1. Login via API helper
    await login(page);
    const mainPage = new MainPage(page);



    // 9. Insert keyword in search field
    await mainPage.searchKeyword('camera');



    // 10. Click on Search input


    // --- Filter flow starts here ---

    // 1. Click on input[id="As"][name="As"]
    await page.click('input[id="As"][name="As"]');

    // 2. Click on label by: Category:
    await page.click('label[for="Cid"]'); // label for category dropdown

    // 3. Select "Electronics" from drop down
    await page.selectOption('#Cid', { label: 'Electronics' });

    // 4. Click on input#Isc
    await page.click('input#Isc');

    // 5. Click on label by: Manufacturer:
    await page.click('label[for="Mid"]'); // label for manufacturer dropdown

    // 6. Select "All" from dropdown
    await page.selectOption('#Mid', { label: 'All' });

    // 7. Fill "100" in //input[@id="Pf"]
    await page.fill('//input[@id="Pf"]', '100');

    // 8. Fill "1000" in //input[@id="Pt"]
    await page.fill('//input[@id="Pt"]', '1000');

    // 9. Tick mark on label by: Search In product descriptions
    await page.check('input#Sid'); // checkbox for "Search in product descriptions"

    // 10. Click on .button-1.search-button
    await page.click('.button-1.search-button');

    // 11. Locate all product-item elements
    const texts = await page.locator('div.product-item[data-productid]').allInnerTexts();
    console.log(texts);


});