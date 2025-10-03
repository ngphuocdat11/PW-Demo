import {test, expect, Page, BrowserContext} from '@playwright/test'

test('Handle popups', async ({browser}) => {
    const context: BrowserContext = await browser.newContext()
    const page: Page = await context.newPage()
    await page.goto('https://testautomationpractice.blogspot.com/')

    await Promise.all([
        page.waitForEvent('popup'),
        page.locator("#PopUp").click()
    ])
    const allPopupWindows: Page[] = context.pages()
    console.log('Number of popup windows:', allPopupWindows.length)
    console.log(allPopupWindows[0].url())
    console.log(allPopupWindows[1].url())
    // console.log(allPopupWindows[2].url())

    for (const popup of allPopupWindows) {
        const title: string = await popup.title()
        if (title.includes('Selenium')) {
            await popup.locator("a[class*='selenium-webdriver']").click()
            await popup.close()
        }
    }

    await page.waitForTimeout(2000)
})