import {test, expect, Locator} from '@playwright/test';

test('Handle Dynamic Elements using XPath', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com')

    for(let i = 1; i <= 5; i++) {
        let button:Locator = page.locator('//button[text()=\'START\' or text()=\'STOP\']')
        await button.click()
        await page.waitForTimeout(2000)
    }

})

test('Handle Dynamic Elements using CSS locator', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com')

    for(let i = 1; i <= 5; i++) {
        let button:Locator = page.locator("button[name='start'], button[name='stop']")
        await button.click()
        await page.waitForTimeout(2000)
    }

})

test('Handle Dynamic Elements using PW locator', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com')

    for(let i = 1; i <= 5; i++) {
        let button:Locator = page.getByRole('button', {name: /START|STOP/})
        await button.click()
        await page.waitForTimeout(2000)
    }

})

