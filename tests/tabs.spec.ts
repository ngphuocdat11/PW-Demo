import {test, expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'

test('Handle tabs', async () => {
    const browser: Browser = await chromium.launch()
    const context: BrowserContext = await browser.newContext()

    const parentPage: Page = await context.newPage()
    await parentPage.goto('https://testautomationpractice.blogspot.com/')
    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.locator("button:has-text('New Tab')").click()
    ])
    const pages: Page[] = context.pages()
    console.log('Number of pages created:', pages.length)
    console.log('Title of the parent page:', await pages[0].title())
    console.log('Title of the child page:', await pages[1].title())

    console.log('Title of the parent page:', await parentPage.title())
    console.log('Title of the child page:', await childPage.title())

})