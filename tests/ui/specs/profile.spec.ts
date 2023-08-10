import { BrowserContext, test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';
import { Page } from '@playwright/test';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async({page}) => {
     profilePage = await hooks.beforeEach(page, ProfilePage , pages.profile);
    // await page.goto('https://demoqa.com/profile');
    // profilePage = new ProfilePage(page);
});

test.describe('Profile - API Interception', () => {
    test('Sort books', async ({ page, context }) => { 
        await watchAPICallAndMockResponse(page, context);
        await profilePage.checkBooksList();
        await profilePage.sortBooksList();
        await profilePage.checkSort();
    });
});

async function watchAPICallAndMockResponse(page: Page, context: BrowserContext) {
    await profilePage.mockBooksListResponse(context);
    const [response] = await Promise.all([
        page.waitForResponse(new RegExp('Account/v1/User')),
        await page.reload(),
    ]);
    await response.json();
}