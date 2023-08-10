import {test} from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({page}) => {
    profilePage = await hooks.beforeEach(page, ProfilePage , pages.profile);
    // await page.goto('https://demoqa.com/profile');
    // profilePage = new ProfilePage(page);
});

test.describe('Profile - Stored Auth', () => {
    test('Check login', async ( { page }) => {
        await profilePage.checkLoggedIn();
    });
});
