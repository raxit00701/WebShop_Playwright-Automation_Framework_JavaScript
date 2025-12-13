const { test } = require('@playwright/test');
const { login } = require('../utils/login.js');
const fs = require('fs');

// Read JSON file as string → parse to JS object
const rawData = fs.readFileSync('C:/Users/raxit/WebstormProjects/OpenBank/data/product.json');
const products = JSON.parse(rawData);
const { MainPage } = require('../pages/mainpage');


for (const product of products) {
    test(`@DAT ${product.testName}`, async ({ page }) => {
        // 1. Login via API helper
        await login(page);
        const mainPage = new MainPage(page);


        // 2. Navigate to Books
        await mainPage.goToBooks();


        await page.waitForLoadState('networkidle');

        // 3. Select product
        await page.click('//h2[@class="product-title"]//a[normalize-space()="Computing and Internet"]');

        // 4. Fill quantity from JSON
        await page.fill('input#addtocart_13_EnteredQuantity', product.qty);

        // 5. Add to cart
        await page.click('#add-to-cart-button-13');
        await page.click('a.ico-cart');

        // 6. Country & State
        await page.selectOption('#CountryId', { label: product.country });
        await page.selectOption('#StateProvinceId', { label: product.state });

        // 7. Zip
        await page.fill('#ZipPostalCode', product.zip);

        // 8. Estimate shipping
        await page.click('input[value="Estimate shipping"]');
        const estimateText = await page.locator('ul.shipping-results').innerText();
        console.log('Shipping Estimate:', estimateText);

        // 9. Checkout
        await page.check('#termsofservice');
        await page.click('#checkout');

        // 10. Billing address
        await page.selectOption('#billing-address-select', { value: product.billingAddressId });
        await page.locator('.button-1.new-address-next-step-button').nth(0).click();

        // 11. Pickup option
        if (product.pickupInStore) {
            await page.check('#PickUpInStore');
        }
        await page.locator('input.button-1.new-address-next-step-button:visible').click();

        // 12. Payment steps
        await page.locator('.button-1.payment-method-next-step-button').click();
        await page.locator('input.button-1.payment-info-next-step-button').nth(0).click();

        // 13. Order review
        const orderReviewText = await page.locator('.order-review-data').innerText();
        console.log('Order Review Data:', orderReviewText);

        // 14. Confirm order
        await page.locator('input.button-1.confirm-order-next-step-button').click();
        const orderconfirm = await page.locator('.order-completed').innerText();
        console.log('Order confirmation:', orderconfirm);
    });
}