const { test } = require('@playwright/test');
const { login } = require('../utils/login.js');
const { addProductToCartAPI } = require('../utils/product_cart.js');

test('@API using api, Purchasing Product', async ({ page }) => {
    // 1. Login via API helper
    await login(page);

    // 2. Add product to cart via API (instead of clicking)
    const result = await addProductToCartAPI(page, '/computing-and-internet', 1);

    console.log('Product added via API:', result);


    // 3. Navigate directly to cart (skip the Books page click)
    await page.goto('https://demowebshop.tricentis.com/cart');
    await page.waitForLoadState('networkidle');

    // 6. click on label by:Country:
    await page.click('label[for="CountryId"]');

    // 7. select "United States" from dropdown
    await page.selectOption('#CountryId', { label: 'United States' });

    // 8. click on label by:State / province:
    await page.click('label[for="StateProvinceId"]');

    // 9. select "New York" from dropdown
    await page.selectOption('#StateProvinceId', { label: 'New York' });

    // 10. click on label by:Zip / postal code:
    await page.click('label[for="ZipPostalCode"]');

    // 11. fill "111001" in label by:Zip / postal code:
    await page.fill('#ZipPostalCode', '111001');

    // 12. click on input[value="Estimate shipping"]
    await page.click('input[value="Estimate shipping"]');

    // 13. print the text of the .estimate-shipping
    const estimateText = await page.locator('ul.shipping-results').innerText();
    console.log(estimateText);

    // 14. tick mark on #termsofservice
    await page.check('#termsofservice');

    // 15. click on #checkout
    await page.click('#checkout');

    // 16. address selection drop down with option
    await page.click('#billing-address-select');
    await page.selectOption('#billing-address-select', { value: '4586122' });

    // 17 first continue button
    await page.locator('.button-1.new-address-next-step-button').nth(0).click();

    // 18 radio button selection
    await page.check('#PickUpInStore');

    // 19 second continue button
    await page.locator('input.button-1.new-address-next-step-button:visible').click();

    // 20 third continue button
    await page.locator('.button-1.payment-method-next-step-button').click();

    // 21 forth continue button
    await page.locator('input.button-1.payment-info-next-step-button').nth(0).click();

    // 22 delivery details
    const orderReviewText = await page.locator('.order-review-data').innerText();
    console.log('Order Review Data:', orderReviewText);

    // 23 confirmation button
    await page.locator('input.button-1.confirm-order-next-step-button').click();

    // 24 Order confirmation message
    const orderconfirm = await page.locator('.order-completed').innerText();
    console.log('Order confirmation:', orderconfirm);
});