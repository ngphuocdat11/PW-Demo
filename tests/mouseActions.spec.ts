import {test, expect, Locator, BrowserContext, Page, Frame} from '@playwright/test'

test('Mouse hover', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://testautomationpractice.blogspot.com/')
    const pointMe: Locator = page.locator(".dropbtn")
    await pointMe.hover()
    const laptops: Locator = page.locator(".dropdown-content a:nth-child(2)")
    await laptops.hover()

    await page.waitForTimeout(2000)
})

test('Right click', async ({browser}) => {
    const context: BrowserContext = await browser.newContext()
    const page: Page = await context.newPage()
    await page.goto('http://swisnl.github.io/jQuery-contextMenu/demo.html')
    const button: Locator = page.locator(".btn.btn-neutral")
    await button.click({button: 'right'})

    await page.waitForTimeout(2000)
})

test('Double click', async ({browser}) => {
    const context: BrowserContext = await browser.newContext()
    const page: Page = await context.newPage()
    await page.goto('https://testautomationpractice.blogspot.com/')
    const buttonCopy: Locator = page.locator("button[ondblclick='myFunction1()']")
    await buttonCopy.dblclick()
    const field2: Locator = page.locator("#field2")
    await expect(field2).toHaveValue('Hello World!')

    await page.waitForTimeout(2000)
})

test.only('Drag and drop', async ({browser}) => {
    const context: BrowserContext = await browser.newContext()
    const page: Page = await context.newPage()
    await page.goto('https://jqueryui.com/droppable/')
    const frame: Frame = page.frame("/resources/demos/droppable/default.html")
    if (frame) {
        const dragElement: Locator = frame.locator("draggable")
        const dropElement: Locator = frame.locator("div.droppable")
        await dragElement.dragTo(dropElement)
    }
    
    await page.waitForTimeout(2000)
})