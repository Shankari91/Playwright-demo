import {test} from '@playwright/test';
import ProfilePage from '../pages/profile-page';

let profilePage: ProfilePage;

test.beforeEach(async ({page}) => {
    await page.goto('https://demoqa.com/profile');
    profilePage = new ProfilePage(page);
});

test.describe('Profile - Stored Auth', () => {
    test('Check login', async ( { page }) => {
        await profilePage.checkLoggedIn();
    });
});
