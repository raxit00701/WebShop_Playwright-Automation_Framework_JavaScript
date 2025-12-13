const { test } = require('@playwright/test');
const fs = require('fs');
const { LoginPage } = require('../pages/login');

// Load JSON data
const rawData = fs.readFileSync('C:/Users/raxit/WebstormProjects/OpenBank/data/login.json');
const loginData = JSON.parse(rawData);

for (const data of loginData) {
    test(`@DAT ${data.testName}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Navigate
        await loginPage.goto();

        // 2. Click login link
        await loginPage.clickLoginLink();

        // 3. Fill credentials
        await loginPage.fillCredentials(data.email, data.password);

        // 4. RememberMe toggle
        await loginPage.toggleRememberMe(data.rememberMe);

        // 5. Submit login
        await loginPage.submitLogin();

        // 6. Validation check
        const errorMessage = await loginPage.checkErrors();
        if (errorMessage) {
            console.log(errorMessage);
            console.log('Test Pass: Login failed');
        } else {
            const successMessage = await loginPage.checkSuccess();
            if (successMessage) {
                console.log(successMessage);
                console.log('Test Pass: Login successful');
            }
        }
    });
}