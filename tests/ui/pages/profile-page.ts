import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import bookListData from "../../data/book-list-data";

class ProfilePage{
    readonly page: Page;
    readonly notLoggedInLabel: Locator;
    readonly titleHeaderLabel: Locator;
    readonly gridRow1: Locator;
    readonly gridRow2: Locator;
    readonly booksCollectionRequestRegExp: RegExp;

    constructor(page: Page){
        this.page = page;
        this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
        this.titleHeaderLabel = page.getByText('Title');
        this.gridRow1 =  page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
        this.gridRow2 = page.locator('div:nth-child(2) > .rt-tr > div:nth-child(2)');
        this.booksCollectionRequestRegExp = new RegExp('Account/v1/User');
    }

    async checkLoggedIn() {
        await expect(this.notLoggedInLabel).not.toBeVisible();
        // await expect(this.notLoggedInLabel).toBeVisible();
    }
    async checkBooksList() {
        for (const book of bookListData.books){
          await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
        }
    }
    async sortBooksList() {
        await this.titleHeaderLabel.click({ clickCount: 2 });
    }
    async checkSort() {
        await expect(this.gridRow1).toContainText(bookListData.books[1].title);
        await expect(this.gridRow2).toContainText(bookListData.books[0].title);
    }
    async mockBooksListResponse(context: BrowserContext) {
        await context.route(this.booksCollectionRequestRegExp, (route) => route.fulfill({
          body: JSON.stringify({...(bookListData)})
        }));
      }
}

export default ProfilePage;