import{expect, type Locator, type Page} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly messagePanel: Locator;

    constructor(page: Page){
        this.page = page;
        this.userName = page.getByPlaceholder('UserName');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.messagePanel = page.locator('#output');
    }

    async fillUsername(userName: string){
        await this.userName.fill(userName);        
    }
    async fillPassword(password: string){
        await this.password.fill(password);
    }
    async doLogin(userName: string, password: string){
        await this.fillUsername(userName);
        await this.fillPassword(password);
        await this.loginButton.click();
    }
    async checkLoggedIn(){
        await expect(this.page).toHaveURL(/.*profile/);
        await expect(this.page).toHaveTitle('DEMOQA');
    }
    async checkInvalidCredentials(){
        await expect(this.messagePanel).toHaveText('Invalid username or password!')
    }

}

export default LoginPage;