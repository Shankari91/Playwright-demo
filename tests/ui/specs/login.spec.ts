import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import hooks from '../../utils/hooks';

let loginPage: LoginPage;
const userName = 'shankaris';
const password = 'Hello@123';

test.use({ storageState: { cookies: [], origins: [] } }); 
test.describe.configure({ mode: 'serial' });

test.beforeEach( async ({page}) => {
    // await page.goto('https://demoqa.com/login');
    // loginPage = new LoginPage(page);
    loginPage = await hooks.beforeEach(page, LoginPage, 'login');
});

test.describe('Book Store - Login', () => {
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


