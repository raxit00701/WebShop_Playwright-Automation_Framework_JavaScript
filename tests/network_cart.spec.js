const { test } = require('@playwright/test');
const { login } = require('../utils/login.js');  // your login helper

test(
    '@NET network interception for cart items',

    async ({ page }) => {

        // 1. Login via API helper
        await login(page);

        // 2. Intercept the cart request
        await page.route('**/cart', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Shopping Cart</title>
          </head>
          <body>
            <a href="/build-your-cheap-own-computer" class="product-name">
                Build your own cheap computer
            </a>
            <div class="attributes">
                Processor: Medium [+15.00]<br />RAM: 2 GB<br />HDD: 320 GB
            </div>
            <span class="product-unit-price">815.00</span>
            <input name="itemquantity6077682" type="text" value="10" class="qty-input" />
            <span class="product-subtotal">8150.00</span>
          </body>
        </html>
      `
            });
        });

        // 3. Navigate to cart page
        await page.goto('https://demowebshop.tricentis.com/cart');

        // 4. Assertion: check mocked product name
        await page.locator('.product-name').waitFor();
        const productName = await page.locator('.product-name').innerText();
        console.log('Intercepted cart item:', productName);
    });
