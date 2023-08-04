import { expect, Locator, Page } from "@playwright/test";

export class ProfilePage{
    readonly page: Page;
    readonly notLoggedInLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    }

    async checkLoggedIn() {
        await expect(this.notLoggedInLabel).not.toBeVisible();
        // await expect(this.notLoggedInLabel).toBeVisible();
      }

}

export default ProfilePage;