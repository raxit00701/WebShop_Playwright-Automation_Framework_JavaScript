// pages/mainpage.js
class MainPage {
    constructor(page) {
        this.page = page;
        this.searchField = '#small-searchterms';
        this.searchButton = 'input[value="Search"]';
        this.cellPhonesLink = 'a[href="/cell-phones"]';
        this.smartphoneLink = 'a[href="/smartphone"]';
        this.booksLink = 'a[href="/books"]';
        this.electronicsLink = 'a[href="/electronics"]';
    }

    async searchKeyword(keyword) {
        await this.page.locator(this.searchField).fill(keyword);
        await this.page.click(this.searchButton);
    }

    async goToCellPhones() {
        await this.page.locator(this.cellPhonesLink).nth(0).click();
    }

    async goToSmartphone() {
        await this.page.locator(this.smartphoneLink).nth(0).click();
    }

    async goToBooks() {
        await this.page.click(this.booksLink);
    }

    async hoverElectronics() {
        await this.page.hover(this.electronicsLink);
    }
}

module.exports = { MainPage };