import { test, expect } from '@playwright/test';


test.describe('Form element validation', () => {

  test('check alert', async ({ page }) => {
    await page.goto('http://autopract.com/selenium/alert5/');
    await page.click('#alert-button');
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain('alert');   
      expect(dialog.message()).toContain('This is an Alert Box.');
      await dialog.accept();
    });
    // Verify Message displayed after clicking on ok button
    await expect(page.locator('#msg')).toHaveText( 'You clicked on Ok button.')
  });
  test('Confirm alert', async({page}) => {
    await page.goto('http://autopract.com/selenium/alert5/');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Do you want to save changes?');
        await dialog.accept();
    });
    await page.click('#confirm-button');
    // Verify message displayed after clicking on OK button
    await expect(page.locator('#msg')).toHaveText( 'Data saved successfully!')
  });

  test('Confirm alert - dismiss', async({page}) => {
    await page.goto('http://autopract.com/selenium/alert5/');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Do you want to save changes?');
        await dialog.dismiss();
    });
    await page.click('#confirm-button');
    await expect(page.locator('#msg')).toHaveText( 'Save Canceled!')
  });

  test('Prompt Alert', async ({ page }) => {
    await page.goto('http://autopract.com/selenium/alert5/');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt');  
        expect(dialog.message()).toContain('Please enter any number');
        expect(dialog.defaultValue()).toContain('10');
        await dialog.accept('15');
    });
    await page.click('#prompt-button');
    await expect(page.locator('#msg')).toHaveText( 'You have entered number: 15')
});

  test('check box validation', async ({ page }) => {
    await page.goto('http://autopract.com/selenium/form5/');
    expect(await page.locator("input[value='one']").isChecked()).toBeTruthy();
    await page.locator("input[value='three']").check();
    expect(await page.locator("input[value='three']").isChecked()).toBeTruthy();
  });
  
  test('Radio Button validation', async ({ page }) => {
    await page.goto('http://autopract.com/selenium/form5/');
    expect(await page.locator("input[value='US']").isChecked()).toBeTruthy();
    expect(await page.locator("input[value='CA']").isChecked()).toBeFalsy();
    await page.locator("input[value='CA']").check();
  });

  test('Dropdown validation', async({page}) => {
    await page.goto('http://autopract.com/selenium/dropdown1/');
    await page.locator('select.custom-select').selectOption('item2');
  })

  test('Dynaminc Dropdown validation', async({page}) => {
    await page.goto('http://autopract.com/selenium/dropdown4/');
    await page.locator('button.dropdown-toggle').click();
    // await page.locator('ul.dropdown-menu').locator('li').filter({ hasText: /^India$/}).click();
  })

});

