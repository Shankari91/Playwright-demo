import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';

let profilePage: ProfilePage;

test.beforeEach(async({page}) => {
    // await page.goto('https://demoqa.com/profile');
    await hooks.beforeEach(page, 'profile');
    profilePage = new ProfilePage(page);
});