import { Page } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import ProfilePage from '../ui/pages/profile-page';
import { buildUrl } from './uiUrlBuilder';

async function beforeEach<T>(
  page: Page,
  PageObjectParam:{ new(page:Page): T },
  targetPage: string,
  params?: Record<any, any>
) {
  await page.goto(buildUrl(targetPage, params));
  const pageObject = new PageObjectParam(page);
  return pageObject;
}


export default { beforeEach };