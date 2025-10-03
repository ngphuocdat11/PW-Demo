import {test, expect, BrowserContext, Page} from '@playwright/test'

test('Authenticated popup', async ({browser}) => {
    const context: BrowserContext = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}})
    const page: Page = await context.newPage()
    await page.goto('https://the-internet.herokuapp.com/basic_auth')

    // await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')
    await page.waitForLoadState()
    await expect(page.locator("text=Congratulations")).toBeVisible()

    await page.waitForTimeout(2000)
})