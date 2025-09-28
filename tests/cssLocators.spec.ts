import {test, expect, Locator} from '@playwright/test';

test('Verify CSS Locators', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/')
    // const searchBox: Locator = page.locator('input#small-searchterms')
    // await searchBox.fill('T-Shirts')

    await expect(page.locator('input#small-searchterms')).toBeVisible()
    // await page.locator('input#small-searchterms').fill('T-Shirts')

    // await page.locator('.search-box-text').fill('T-Shirts')

    // await page.locator("input[name='q']").fill('T-Shirts')

    await page.locator("input.search-box-text[value='Search store']").fill('T-Shirts')



})