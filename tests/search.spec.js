const { test } = require('@playwright/test');
const { login } = require('../utils/login');
const fs = require('fs');
const { MainPage } = require('../pages/mainpage');

// Load JSON data
const rawData = fs.readFileSync('C:/Users/raxit/WebstormProjects/OpenBank/data/search.json');
const searchData = JSON.parse(rawData);

for (const data of searchData) {
    test(`@DAT ${data.testName}`, async ({ page }) => {
        // 1. Login via API helper
        await login(page);
        const mainPage = new MainPage(page);

        // 2. Insert keyword from JSON
        await mainPage.searchKeyword(data.keyword);

        // 3. Locate all product-item elements
        const texts = await page.locator('div.product-item[data-productid]').allInnerTexts();

        if (texts.length > 0) {
            console.log(`Results for "${data.keyword}":`, texts);
        } else {
            console.log(`No results found for "${data.keyword}"`);
        }
    });
}