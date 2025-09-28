/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
 */

import {test, expect, Locator} from '@playwright/test';

test('Verfiy on Playwright Locators', async({page}) => {
    await page.goto('https://demo.nopcommerce.com/')
    const logo:Locator = page.getByAltText('nopCommerce demo store')
    await expect(logo).toBeVisible()

    // const text: Locator = page.getByText('Welcome to our store')
    // await expect(text).toBeVisible()

    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible()

    await page.getByRole('link', {name: 'Register'}).click()
    await expect(page.getByRole('heading', {name: 'Register'})).toBeVisible()

    await page.getByLabel('First name:').fill('John')
    await page.getByLabel('Last name:').fill('Kennedy')
    await page.getByLabel('Email:').fill('abc@gmail.com')

    await page.getByPlaceholder('Search store').fill('Apple Macbook Pro')

    await page.goto('file:///C:/Users/Phuoc%20Dat/Downloads/ClassDemos/ClassDemos/app.html')
    const link:Locator = page.getByTitle('Home page link')
    await expect(link).toHaveText('Home')
    await expect(page.getByTitle('HyperText Markup Language')).toHaveText('HTML')

    await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com')
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe')




})