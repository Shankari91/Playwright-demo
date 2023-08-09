import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let loginPage: LoginPage;
const userName = process.env.USERNAME!;
const password = process.env.PASSWORD!;

test.beforeEach( async ({page}) => {
    loginPage = await hooks.beforeEach(page, LoginPage, pages.login);
});

test.describe('Book Store - Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } }); 
    test.describe.configure({ mode: 'serial' });
    test('successfull login', async () => {
        await loginPage.doLogin(userName, password);
        await loginPage.checkLoggedIn();
    });
    test('Invalid Username', async () => {
        await loginPage.doLogin('sshhhjjee', password);
        await loginPage.checkInvalidCredentials();
    });
    test('Invalid password', async () => {
        await loginPage.doLogin(userName, 'sshekids');
        await loginPage.checkInvalidCredentials();
    });
});


