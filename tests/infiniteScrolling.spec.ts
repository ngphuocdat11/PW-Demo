import {test, expect} from '@playwright/test'

test('Infinite Scrolling', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    test.slow()
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500')

    let previousHeight: number = 0

    while (true) {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })
        await page.waitForTimeout(2000)
        const currentHeight: number = await page.evaluate(() => {
            return document.body.scrollHeight
        })
        console.log('Previous height:', previousHeight)
        console.log('Current height:', currentHeight)

        if (currentHeight === previousHeight) {
            break
        }
        previousHeight = currentHeight
    }
    console.log('Reached the end of the page')

    await page.waitForTimeout(2000)
})