const { test } = require('@playwright/test');
const {login} = require("../utils/login");

test('@API Sorting Product', async ({ page }) => {
    // 1. Login via API helper
    await login(page);

    // 1. click on a[href="/books"]
    // Hover on Electronics
    await page.locator('a:has-text("APPAREL & SHOES")').nth(0).click();

    await page.waitForLoadState('networkidle');
    // 1. Click on #products-viewmode dropdown
    await page.click('#products-viewmode');

    // 2. Select "List" from dropdown
    await page.selectOption('#products-viewmode', { label: 'List' });

    // 3. Wait for 3 seconds
    await page.waitForTimeout(3000);

    // 4. Click on #products-pagesize dropdown
    await page.click('#products-pagesize');

    // 5. Select "4" from dropdown
    await page.selectOption('#products-pagesize', { label: '4' });

    // 6. Wait for 3 seconds
    await page.waitForTimeout(3000);

    // 7. Click on #products-orderby dropdown
    await page.click('#products-orderby');

    // 8. Select "Price: High to Low" from dropdown
    await page.selectOption('#products-orderby', { label: 'Price: High to Low' });

    // 9. Wait for 3 seconds
    await page.waitForTimeout(3000);

    // 10. Print the text of .product-list in console
    const productListText = await page.innerText('.product-list');
    console.log('Product List Text:', productListText);



});