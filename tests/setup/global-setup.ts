import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import pages from '../utils/pages';
import { buildUrl } from '../utils/uiUrlBuilder';

async function globalSetup(config: FullConfig) {
  const password = process.env.PASSWORD!;
  const user = process.env.USERNAME!;
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await page.goto(baseURL+ pages.login);
  // await page.goto(buildUrl(pages.login));
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;