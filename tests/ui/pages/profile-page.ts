import { expect, Page } from "@playwright/test";

export class ProfilePage{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

}

export default ProfilePage;