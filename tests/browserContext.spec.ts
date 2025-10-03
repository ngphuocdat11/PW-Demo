import {test, expect, Locator, chromium, Page} from '@playwright/test'

test('Browser context demo', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page1: Page = await context.newPage()
    const page2: Page = await context.newPage()
    console.log("No. of pages created:", context.pages().length)

    await page1.goto('https://www.playwright.dev')
    await expect(page1).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
    await page2.goto('https://www.selenium.dev')
    await expect(page2).toHaveTitle('Selenium')

    await page1.waitForTimeout(2000)
    await page2.waitForTimeout(2000)

})