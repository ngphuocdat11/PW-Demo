import {test, expect} from '@playwright/test'

test('', async ({page}) => {
    test.slow()
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500')

    let previousHeight: number = 0
    let bookFound: boolean = false

    while (true) {
        const titles: string[] = await page.locator("#productsDiv h3").allInnerTexts()
        if (titles.includes('Inferno')) {
            console.log('Book found!')
            bookFound = true
            expect(bookFound).toBe(true)
            break
        }
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

    if (!bookFound) {
        console.log('Book not found!')
    }

    await page.waitForTimeout(2000)
})