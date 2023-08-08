import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';

let profilePage: ProfilePage;

test.beforeEach(async({page}) => {
     profilePage = await hooks.beforeEach(page, ProfilePage ,'profile');
    // await page.goto('https://demoqa.com/profile');
    // profilePage = new ProfilePage(page);
});

test.describe('Profile - Book list', () => {
    test('Check login', async ( { page }) => {
        await profilePage.checkLoggedIn();
    });
});