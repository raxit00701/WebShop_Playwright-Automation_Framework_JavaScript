const { test } = require('@playwright/test');

// Utility: generate a natural-looking email
function generateEmail(customPrefix = 'user') {
    const timestamp = Date.now(); // ensures uniqueness
    const randomNum = Math.floor(Math.random() * 1000);
    return `${customPrefix}${randomNum}${timestamp}@example.com`;
}

test('@DAT Register flow validation', async ({ page }) => {
    // 1. Go to site
    await page.goto('https://demowebshop.tricentis.com/');

    // 2. Click Register link
    await page.click('a[href="/register"]');

    // 3. Click Male radio button
    await page.click('input#gender-male');

    // 4. Fill First name
    await page.fill('input#FirstName', 'John');

    // 5. Fill Last name
    await page.fill('input#LastName', 'doe');

    // 6. Generate or customize email
    const email = generateEmail(''); // <-- customise prefix here
    await page.fill('input#Email', email);

    // 7. Fill Password
    await page.fill('input#Password', 'Password@123');

    // 8. Fill Confirm Password
    await page.fill('input#ConfirmPassword', 'Password@123');

    // 10. Click Register button
    await page.click('#register-button');

    // 11. Check for validation errors
    const errorLocators = [
        'span.field-validation-error[data-valmsg-for="FirstName"]',
        'span[for="LastName"]',
        'span[for="Email"]',
        'span[for="Password"]',
        'span[for="ConfirmPassword"]',
        '//li[normalize-space()="The specified email already exists"]'
    ];

    let errorFound = false;
    for (const locator of errorLocators) {
        const element = page.locator(locator);
        if (await element.isVisible()) {
            console.log(await element.textContent());
            console.log('Test Pass: Login failed');
            errorFound = true;
            break;
        }
    }

    // 12. Else check success result
    if (!errorFound) {
        const result = page.locator('div.result');
        if (await result.isVisible()) {
            console.log(await result.textContent());
            console.log('Test Pass');
        }
    }
});



test(' strict Register flow validation2', async ({ page }) => {
    // 1. Go to site
    await page.goto('https://demowebshop.tricentis.com/');

    // 2. Click Register link
    await page.click('a[href="/register"]');

    // 3. Click Male radio button
    await page.click('input#gender-male');

    // 4. Fill First name
    await page.fill('input#FirstName', 'John');

    // 5. Fill Last name
    await page.fill('input#LastName', 'doe');

    // 6. Fill Email
    await page.fill('input#Email', 'dolewow965@datehype.com');

    // 7. Fill Password
    await page.fill('input#Password', 'Password@123');

    // 8. Fill Confirm Password
    await page.fill('input#ConfirmPassword', 'Password@123');

    // 10. Click Register button
    await page.click('#register-button');

    // 11. Check for validation errors
    const errorLocators = [
        'span.field-validation-error[data-valmsg-for="FirstName"]',
        'span[for="LastName"]',
        'span[for="Email"]',
        'span[for="Password"]',
        'span[for="ConfirmPassword"]',
        '//li[normalize-space()="The specified email already exists"]'
    ];

    let errorFound = false;
    for (const locator of errorLocators) {
        const element = page.locator(locator);
        if (await element.isVisible()) {
            console.log(await element.textContent());
            console.log('Test Pass: Login failed');
            errorFound = true;
            break;
        }
    }

    // 12. Else check success result
    if (!errorFound) {
        const result = page.locator('div.result');
        if (await result.isVisible()) {
            console.log(await result.textContent());
            console.log('Test Pass');
        }
    }
});