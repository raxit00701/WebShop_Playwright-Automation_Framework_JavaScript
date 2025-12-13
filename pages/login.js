// pages/login.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginLink = '//a[normalize-space()="Log in"]';
        this.emailField = '#Email';
        this.passwordField = '#Password';
        this.rememberMeCheckbox = '#RememberMe';
        this.loginButton = 'input[value="Log in"]';
        this.errorLocators = [
            'div[class="validation-summary-errors"] span',
            '.validation-summary-errors ul li'
        ];
        this.successLocator = 'div.topic-html-content';
    }

    async goto() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }

    async clickLoginLink() {
        await this.page.click(this.loginLink);
    }

    async fillCredentials(email, password) {
        await this.page.fill(this.emailField, email);
        await this.page.fill(this.passwordField, password);
    }

    async toggleRememberMe(rememberMe) {
        if (rememberMe) {
            await this.page.check(this.rememberMeCheckbox);
        }
    }

    async submitLogin() {
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.page.click(this.loginButton)
        ]);
    }

    async checkErrors() {
        for (const locator of this.errorLocators) {
            const element = this.page.locator(locator);
            if (await element.isVisible()) {
                return await element.textContent();
            }
        }
        return null;
    }

    async checkSuccess() {
        const element = this.page.locator(this.successLocator);
        if (await element.isVisible()) {
            return await element.textContent();
        }
        return null;
    }
}

module.exports = { LoginPage };