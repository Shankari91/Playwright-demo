import { test as base } from '@playwright/test';
import hooks from '../../utils/hooks';
import BookPage from '../pages/book-page';

type MyFixtures = {
  bookPage: BookPage;
}

export type Duplicate = {
  isDupe: boolean;
}

export const test = base.extend<MyFixtures & Duplicate>({

  isDupe: false, 

  bookPage: async ({ page, isDupe }, use) => {
    const bookPage = await hooks.beforeEach(page, BookPage, 'bookStore');
    
    await use(bookPage);
    
    await bookPage.addToYourCollection(isDupe);
  },
});

export { expect } from '@playwright/test';